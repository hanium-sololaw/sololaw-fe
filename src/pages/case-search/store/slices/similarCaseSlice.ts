import type { StateCreator } from "zustand";
import { listMyCases, type Case } from "@/shared/api/cases";
import { createCitation, deleteCitation, listMyCitations } from "@/shared/api/citations";
import { listDocuments } from "@/pages/document/shared/listDocuments";
import { listEvidence } from "@/pages/evidence/api";
import type { ChecklistId } from "../../data/checklistMeta";
import { searchCases } from "../../lib/search";
import type { CaseCard, RelatedStatute, SearchStatistics } from "../../lib/search";
import { errorMessage, toggleId } from "../storeHelpers";
import type { CaseSearchState } from "../types";

const RESULT_LIMIT = 10;

const emptyChecklist: Record<ChecklistId, boolean> = {
  basic: false,
  complaint: false,
  evidence: false,
};

export type SimilarCaseSlice = {
  isAnalyzing: boolean;
  hasAnalyzed: boolean;
  analyzeError: string | null;
  cases: CaseCard[];
  casesTotal: number;
  statutes: RelatedStatute[];
  statistics: SearchStatistics | null;
  myCases: Case[];
  casesLoading: boolean;
  selectedCaseId: number | null;
  caseConfirmed: boolean;
  checkedItems: Record<ChecklistId, boolean>;
  savedCaseIds: Set<string>;
  citedCaseIds: Set<string>;
  citationIdByCase: Record<string, number>;
  loadMyCases: () => Promise<void>;
  loadCitations: (caseId: number) => Promise<void>;
  loadRegisteredInfo: (caseId: number) => Promise<void>;
  analyze: (caseContext: string) => Promise<void>;
  selectCase: (id: number) => void;
  confirmCase: () => void;
  editCase: () => void;
  toggleSavedCase: (id: string) => void;
  toggleCitedCase: (item: CaseCard) => Promise<void>;
};

export const createSimilarCaseSlice: StateCreator<CaseSearchState, [], [], SimilarCaseSlice> = (set, get) => ({
  isAnalyzing: false,
  hasAnalyzed: false,
  analyzeError: null,
  cases: [],
  casesTotal: 0,
  statutes: [],
  statistics: null,
  myCases: [],
  casesLoading: false,
  selectedCaseId: null,
  caseConfirmed: false,
  checkedItems: emptyChecklist,
  savedCaseIds: new Set(),
  citedCaseIds: new Set(),
  citationIdByCase: {},

  loadMyCases: async () => {
    set({ casesLoading: true });
    try {
      const result = await listMyCases();
      const selectedCaseId = get().selectedCaseId ?? result.content[0]?.id ?? null;
      set({ casesLoading: false, myCases: result.content, selectedCaseId });
      if (selectedCaseId !== null) {
        void get().loadCitations(selectedCaseId);
        void get().loadRegisteredInfo(selectedCaseId);
      }
    } catch {
      set({ casesLoading: false, myCases: [] });
    }
  },

  loadCitations: async (caseId) => {
    try {
      const citations = await listMyCitations({ caseId });
      if (get().selectedCaseId !== caseId) return;
      const citedCaseIds = new Set(citations.map((c) => c.serialId));
      const citationIdByCase = Object.fromEntries(citations.map((c) => [c.serialId, c.id]));
      set({ citedCaseIds, citationIdByCase });
    } catch {
      // 목록을 못 불러와도 검색 자체는 계속 쓸 수 있어야 하므로 조용히 무시
    }
  },

  // 사건에 이미 등록된 소장·증거·준비서면을 분석 정보로 자동 반영한다.
  loadRegisteredInfo: async (caseId) => {
    set({ checkedItems: { basic: true, complaint: false, evidence: false } });
    try {
      const [docs, evidence] = await Promise.all([
        listDocuments({ caseId, size: 100 }),
        listEvidence({ caseId, size: 1 }),
      ]);
      if (get().selectedCaseId !== caseId) return;
      set({
        checkedItems: {
          basic: true,
          complaint: docs.content.some((d) => d.docType === "COMPLAINT"),
          evidence: evidence.totalElements > 0 || docs.content.some((d) => d.docType === "BRIEF"),
        },
      });
    } catch {
      // 조회 실패 시 기본 정보만 반영된 상태로 둔다.
    }
  },

  analyze: async (caseContext) => {
    set({ isAnalyzing: true, analyzeError: null });
    try {
      const result = await searchCases({ caseContext, limit: RESULT_LIMIT });
      set({
        isAnalyzing: false,
        hasAnalyzed: true,
        cases: result.cases,
        casesTotal: result.total,
        statutes: result.statutes,
        statistics: result.statistics,
      });
    } catch (err) {
      set({ isAnalyzing: false, hasAnalyzed: true, analyzeError: errorMessage(err, "유사 판례 분석에 실패했습니다.") });
    }
  },

  selectCase: (id) => {
    if (id !== get().selectedCaseId) {
      set({ hasAnalyzed: false, analyzeError: null, cases: [], casesTotal: 0, statutes: [], statistics: null });
    }
    set({ selectedCaseId: id });
    void get().loadCitations(id);
    void get().loadRegisteredInfo(id);
  },
  confirmCase: () => set({ caseConfirmed: true }),
  editCase: () => set({ caseConfirmed: false }),
  toggleSavedCase: (id) => set((state) => ({ savedCaseIds: toggleId(state.savedCaseIds, id) })),

  toggleCitedCase: async (item) => {
    const state = get();
    const caseId = state.selectedCaseId;
    if (state.citedCaseIds.has(item.id)) {
      const citationId = state.citationIdByCase[item.id];
      set((s) => ({ citedCaseIds: toggleId(s.citedCaseIds, item.id) }));
      if (citationId !== undefined) {
        try {
          await deleteCitation(citationId);
          set((s) => {
            const next = { ...s.citationIdByCase };
            delete next[item.id];
            return { citationIdByCase: next };
          });
        } catch {
          // 삭제 실패 시 서버에는 인용이 남아있으므로 UI도 되돌려 재시도할 수 있게 한다.
          set((s) => ({ citedCaseIds: toggleId(s.citedCaseIds, item.id) }));
        }
      }
      return;
    }
    if (caseId === null) return;
    set((s) => ({ citedCaseIds: toggleId(s.citedCaseIds, item.id) }));
    try {
      const citation = await createCitation({
        serialId: item.id,
        name: item.title,
        caseNo: item.caseNumber,
        court: item.court,
        decisionDate: item.date,
        category: item.category,
        referenceNote: item.summary,
        detailUrl: item.detailUrl,
        caseId,
      });
      set((s) => ({ citationIdByCase: { ...s.citationIdByCase, [item.id]: citation.id } }));
    } catch {
      set((s) => ({ citedCaseIds: toggleId(s.citedCaseIds, item.id) }));
    }
  },
});

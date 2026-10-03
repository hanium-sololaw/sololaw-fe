import { create } from "zustand";
import type { CaseSearchTab } from "../data/tabs";
import type { ChecklistId } from "../data/checklistMeta";
import { listMyCases, type Case } from "@/shared/api/cases";
import { listDocuments } from "@/pages/document/shared/listDocuments";
import { listEvidence } from "@/pages/evidence/api";
import { createCitation, deleteCitation, listMyCitations } from "@/shared/api/citations";
import { searchCases } from "../lib/search";
import type { CaseCard, RelatedStatute, SearchCategory, SearchStatistics } from "../lib/search";

const emptyChecklist: Record<ChecklistId, boolean> = {
  basic: false,
  complaint: false,
  evidence: false,
};

const RESULT_LIMIT = 10;

type CaseSearchState = {
  activeTab: CaseSearchTab;

  // "내 사건과 비슷한 판례" 탭
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

  // "키워드로 판례 검색" 탭
  isSearching: boolean;
  hasSearched: boolean;
  searchError: string | null;
  keywordCases: CaseCard[];
  keywordCasesTotal: number;
  keywordStatutes: RelatedStatute[];
  savedKeywordCaseIds: Set<string>;
  citedKeywordCaseIds: Set<string>;

  setActiveTab: (tab: CaseSearchTab) => void;
  loadMyCases: () => Promise<void>;
  loadCitations: (caseId: number) => Promise<void>;
  loadRegisteredInfo: (caseId: number) => Promise<void>;
  analyze: (caseContext: string) => Promise<void>;
  search: (query: string, category: SearchCategory | null) => Promise<void>;
  selectCase: (id: number) => void;
  confirmCase: () => void;
  editCase: () => void;
  toggleSavedCase: (id: string) => void;
  toggleSavedKeywordCase: (id: string) => void;
  toggleCitedCase: (item: CaseCard) => Promise<void>;
  toggleCitedKeywordCase: (id: string) => void;
};

function toggleId(ids: Set<string>, id: string) {
  const next = new Set(ids);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

export const useCaseSearchStore = create<CaseSearchState>((set, get) => ({
  activeTab: "similar",
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

  isSearching: false,
  hasSearched: false,
  searchError: null,
  keywordCases: [],
  keywordCasesTotal: 0,
  keywordStatutes: [],
  savedKeywordCaseIds: new Set(),
  citedKeywordCaseIds: new Set(),

  setActiveTab: (tab) => set({ activeTab: tab }),

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

  search: async (query, category) => {
    set({ isSearching: true, searchError: null });
    try {
      const result = await searchCases({ query, category: category ?? undefined, limit: RESULT_LIMIT });
      set({
        isSearching: false,
        hasSearched: true,
        keywordCases: result.cases,
        keywordCasesTotal: result.total,
        keywordStatutes: result.statutes,
      });
    } catch (err) {
      set({ isSearching: false, hasSearched: true, searchError: errorMessage(err, "판례 검색에 실패했습니다.") });
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
  toggleSavedCase: (id) =>
    set((state) => ({ savedCaseIds: toggleId(state.savedCaseIds, id) })),
  toggleSavedKeywordCase: (id) =>
    set((state) => ({
      savedKeywordCaseIds: toggleId(state.savedKeywordCaseIds, id),
    })),
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
  toggleCitedKeywordCase: (id) =>
    set((state) => ({
      citedKeywordCaseIds: toggleId(state.citedKeywordCaseIds, id),
    })),
}));

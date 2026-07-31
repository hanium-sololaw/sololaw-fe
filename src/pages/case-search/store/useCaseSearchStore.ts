import { create } from "zustand";
import type { CaseSearchTab } from "../data/tabs";
import type { ChecklistId } from "../data/checklistMeta";
import { myCases } from "../data/myCases";
import { mockCases } from "../data/mockCases";
import { keywordSearchResults } from "../data/keywordSearch";

const emptyChecklist: Record<ChecklistId, boolean> = {
  basic: false,
  complaint: false,
  evidence: false,
};

const ANALYSIS_DURATION_MS = 1800;

type CaseSearchState = {
  activeTab: CaseSearchTab;
  isAnalyzing: boolean;
  hasAnalyzed: boolean;
  selectedCaseId: string;
  caseConfirmed: boolean;
  checkedItems: Record<ChecklistId, boolean>;
  savedCaseIds: Set<string>;
  savedKeywordCaseIds: Set<string>;
  citedCaseIds: Set<string>;
  citedKeywordCaseIds: Set<string>;
  setActiveTab: (tab: CaseSearchTab) => void;
  analyze: () => void;
  selectCase: (id: string) => void;
  confirmCase: () => void;
  editCase: () => void;
  toggleChecklistItem: (id: ChecklistId) => void;
  toggleSavedCase: (id: string) => void;
  toggleSavedKeywordCase: (id: string) => void;
  toggleCitedCase: (id: string) => void;
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

export const useCaseSearchStore = create<CaseSearchState>((set) => ({
  activeTab: "similar",
  isAnalyzing: false,
  hasAnalyzed: false,
  selectedCaseId: myCases[1].id,
  caseConfirmed: true,
  checkedItems: emptyChecklist,
  savedCaseIds: new Set([mockCases[0].id]),
  savedKeywordCaseIds: new Set([keywordSearchResults[0].id]),
  citedCaseIds: new Set(),
  citedKeywordCaseIds: new Set([keywordSearchResults[0].id]),
  setActiveTab: (tab) => set({ activeTab: tab }),
  analyze: () => {
    set({ isAnalyzing: true });
    setTimeout(() => {
      set({ isAnalyzing: false, hasAnalyzed: true });
    }, ANALYSIS_DURATION_MS);
  },
  selectCase: (id) => set({ selectedCaseId: id }),
  confirmCase: () => set({ caseConfirmed: true, checkedItems: emptyChecklist }),
  editCase: () => set({ caseConfirmed: false }),
  toggleChecklistItem: (id) =>
    set((state) => ({
      checkedItems: { ...state.checkedItems, [id]: !state.checkedItems[id] },
    })),
  toggleSavedCase: (id) =>
    set((state) => ({ savedCaseIds: toggleId(state.savedCaseIds, id) })),
  toggleSavedKeywordCase: (id) =>
    set((state) => ({
      savedKeywordCaseIds: toggleId(state.savedKeywordCaseIds, id),
    })),
  toggleCitedCase: (id) =>
    set((state) => ({ citedCaseIds: toggleId(state.citedCaseIds, id) })),
  toggleCitedKeywordCase: (id) =>
    set((state) => ({
      citedKeywordCaseIds: toggleId(state.citedKeywordCaseIds, id),
    })),
}));

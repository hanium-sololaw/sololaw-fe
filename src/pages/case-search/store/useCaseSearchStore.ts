import { create } from "zustand";
import type { CaseSearchTab } from "../data/tabs";
import type { ChecklistId } from "../data/checklistMeta";
import { myCases } from "../data/myCases";

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
  setActiveTab: (tab: CaseSearchTab) => void;
  analyze: () => void;
  selectCase: (id: string) => void;
  confirmCase: () => void;
  editCase: () => void;
  toggleChecklistItem: (id: ChecklistId) => void;
};

export const useCaseSearchStore = create<CaseSearchState>((set) => ({
  activeTab: "similar",
  isAnalyzing: false,
  hasAnalyzed: false,
  selectedCaseId: myCases[1].id,
  caseConfirmed: true,
  checkedItems: emptyChecklist,
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
}));

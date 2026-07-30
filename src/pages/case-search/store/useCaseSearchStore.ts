import { create } from "zustand";
import type { CaseSearchTab } from "../data/tabs";
import type { ChecklistId } from "../data/checklistMeta";
import { myCases } from "../data/myCases";

const emptyChecklist: Record<ChecklistId, boolean> = {
  basic: false,
  complaint: false,
  evidence: false,
};

type CaseSearchState = {
  activeTab: CaseSearchTab;
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
  hasAnalyzed: false,
  selectedCaseId: myCases[1].id,
  caseConfirmed: true,
  checkedItems: emptyChecklist,
  setActiveTab: (tab) => set({ activeTab: tab }),
  analyze: () => set({ hasAnalyzed: true }),
  selectCase: (id) => set({ selectedCaseId: id }),
  confirmCase: () => set({ caseConfirmed: true, checkedItems: emptyChecklist }),
  editCase: () => set({ caseConfirmed: false }),
  toggleChecklistItem: (id) =>
    set((state) => ({
      checkedItems: { ...state.checkedItems, [id]: !state.checkedItems[id] },
    })),
}));

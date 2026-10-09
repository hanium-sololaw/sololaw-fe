import { create } from "zustand";
import { createKeywordSearchSlice } from "./slices/keywordSearchSlice";
import { createSimilarCaseSlice } from "./slices/similarCaseSlice";
import type { CaseSearchState } from "./types";

export const useCaseSearchStore = create<CaseSearchState>()((set, get, api) => ({
  activeTab: "similar",
  setActiveTab: (tab) => set({ activeTab: tab }),
  ...createSimilarCaseSlice(set, get, api),
  ...createKeywordSearchSlice(set, get, api),
}));

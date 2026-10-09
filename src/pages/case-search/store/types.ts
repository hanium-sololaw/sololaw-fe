import type { CaseSearchTab } from "../data/tabs";
import type { KeywordSearchSlice } from "./slices/keywordSearchSlice";
import type { SimilarCaseSlice } from "./slices/similarCaseSlice";

type TabSlice = {
  activeTab: CaseSearchTab;
  setActiveTab: (tab: CaseSearchTab) => void;
};

export type CaseSearchState = TabSlice & SimilarCaseSlice & KeywordSearchSlice;

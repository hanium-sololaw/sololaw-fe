import type { StateCreator } from "zustand";
import { searchCases } from "../../lib/search";
import type { CaseCard, RelatedStatute, SearchCategory } from "../../lib/search";
import { errorMessage, toggleId } from "../storeHelpers";
import type { CaseSearchState } from "../types";

const RESULT_LIMIT = 25;

export type KeywordSearchSlice = {
  isSearching: boolean;
  hasSearched: boolean;
  searchError: string | null;
  keywordCases: CaseCard[];
  keywordCasesTotal: number;
  keywordPage: number;
  keywordStatutes: RelatedStatute[];
  savedKeywordCaseIds: Set<string>;
  citedKeywordCaseIds: Set<string>;
  setKeywordPage: (page: number) => void;
  search: (query: string, category: SearchCategory | null) => Promise<void>;
  toggleSavedKeywordCase: (id: string) => void;
  toggleCitedKeywordCase: (id: string) => void;
};

export const createKeywordSearchSlice: StateCreator<CaseSearchState, [], [], KeywordSearchSlice> = (set) => ({
  isSearching: false,
  hasSearched: false,
  searchError: null,
  keywordCases: [],
  keywordCasesTotal: 0,
  keywordPage: 1,
  keywordStatutes: [],
  savedKeywordCaseIds: new Set(),
  citedKeywordCaseIds: new Set(),

  setKeywordPage: (page) => set({ keywordPage: page }),

  search: async (query, category) => {
    set({ isSearching: true, searchError: null });
    try {
      const result = await searchCases({ query, category: category ?? undefined, limit: RESULT_LIMIT });
      set({
        isSearching: false,
        hasSearched: true,
        keywordCases: result.cases,
        keywordCasesTotal: result.total,
        keywordPage: 1,
        keywordStatutes: result.statutes,
      });
    } catch (err) {
      set({ isSearching: false, hasSearched: true, searchError: errorMessage(err, "판례 검색에 실패했습니다.") });
    }
  },

  toggleSavedKeywordCase: (id) => set((state) => ({ savedKeywordCaseIds: toggleId(state.savedKeywordCaseIds, id) })),
  toggleCitedKeywordCase: (id) => set((state) => ({ citedKeywordCaseIds: toggleId(state.citedKeywordCaseIds, id) })),
});

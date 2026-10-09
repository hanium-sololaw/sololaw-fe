import type { StateCreator } from "zustand";
import { searchCases } from "../../lib/search";
import type { CaseCard, RelatedStatute, SearchCategory } from "../../lib/search";
import { errorMessage, toggleId } from "../storeHelpers";
import type { CaseSearchState } from "../types";

const RESULT_LIMIT = 10;

export type KeywordSearchSlice = {
  isSearching: boolean;
  hasSearched: boolean;
  searchError: string | null;
  keywordCases: CaseCard[];
  keywordCasesTotal: number;
  keywordStatutes: RelatedStatute[];
  savedKeywordCaseIds: Set<string>;
  citedKeywordCaseIds: Set<string>;
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
  keywordStatutes: [],
  savedKeywordCaseIds: new Set(),
  citedKeywordCaseIds: new Set(),

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

  toggleSavedKeywordCase: (id) => set((state) => ({ savedKeywordCaseIds: toggleId(state.savedKeywordCaseIds, id) })),
  toggleCitedKeywordCase: (id) => set((state) => ({ citedKeywordCaseIds: toggleId(state.citedKeywordCaseIds, id) })),
});

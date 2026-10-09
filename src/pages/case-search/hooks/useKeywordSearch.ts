import { useEffect, useEffectEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { autocompleteKeywords } from "../data/keywordSearch";
import { useCaseSearchStore } from "../store/useCaseSearchStore";

export function useKeywordSearch() {
  const search = useCaseSearchStore((state) => state.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const searchInitialQuery = useEffectEvent(() => {
    if (initialQuery) void search(initialQuery, null);
  });

  useEffect(() => {
    searchInitialQuery();
  }, []);

  const runSearch = (keyword?: string) => {
    const nextQuery = keyword ?? query;
    if (nextQuery.trim() === "") return;
    if (keyword !== undefined) setQuery(keyword);
    setIsInputFocused(false);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("q", nextQuery);
      return next;
    });
    void search(nextQuery, null);
  };

  const trimmedQuery = query.trim();
  const suggestions = autocompleteKeywords.filter((keyword) => keyword.includes(trimmedQuery));
  const showSuggestions = isInputFocused && trimmedQuery !== "" && suggestions.length > 0;

  return { query, setQuery, setIsInputFocused, runSearch, suggestions, showSuggestions };
}

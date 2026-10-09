import { useCaseSearchStore } from "../store/useCaseSearchStore";

export function useCitedItems() {
  const cases = useCaseSearchStore((state) => state.cases);
  const keywordCases = useCaseSearchStore((state) => state.keywordCases);
  const citedCaseIds = useCaseSearchStore((state) => state.citedCaseIds);
  const citedKeywordCaseIds = useCaseSearchStore((state) => state.citedKeywordCaseIds);
  const toggleCitedCase = useCaseSearchStore((state) => state.toggleCitedCase);
  const toggleCitedKeywordCase = useCaseSearchStore((state) => state.toggleCitedKeywordCase);

  const similar = cases
    .filter((item) => citedCaseIds.has(item.id))
    .map((item) => ({ ...item, onRemove: () => toggleCitedCase(item) }));
  const keyword = keywordCases
    .filter((item) => citedKeywordCaseIds.has(item.id))
    .map((item) => ({ ...item, onRemove: () => toggleCitedKeywordCase(item.id) }));

  return [...similar, ...keyword];
}

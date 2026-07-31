import { useState } from "react";
import Icon from "@/shared/ui/Icon";
import SearchIcon from "@/assets/icons/case-search/search-icon.svg?react";
import {
  categoryFilters,
  suggestedKeywords,
  autocompleteKeywords,
  keywordSearchResults,
  matchesCategoryFilter,
  matchesQuery,
  type CategoryFilter,
} from "../../data/keywordSearch";
import CaseResultCard from "../shared/CaseResultCard";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

type ResultTab = "search" | "saved";

const PAGE_SIZE = 5;

export default function KeywordSearchTab() {
  const savedKeywordCaseIds = useCaseSearchStore(
    (state) => state.savedKeywordCaseIds,
  );
  const toggleSavedKeywordCase = useCaseSearchStore(
    (state) => state.toggleSavedKeywordCase,
  );
  const savedResults = keywordSearchResults.filter((item) =>
    savedKeywordCaseIds.has(item.id),
  );
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter | null>(
    null,
  );
  const [resultTab, setResultTab] = useState<ResultTab>("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const runSearch = (value?: string) => {
    const nextQuery = value ?? query;
    if (value !== undefined) setQuery(value);
    setSubmittedQuery(nextQuery);
    setSearched(true);
    setCurrentPage(1);
    setIsInputFocused(false);
  };

  const matchingAutocomplete = autocompleteKeywords.filter((keyword) =>
    keyword.includes(query.trim()),
  );
  const showAutocomplete =
    isInputFocused && query.trim() !== "" && matchingAutocomplete.length > 0;

  const selectCategory = (category: CategoryFilter) => {
    setActiveCategory((prev) => (prev === category ? null : category));
    setSearched(true);
    setCurrentPage(1);
  };

  const filteredResults = keywordSearchResults.filter(
    (item) =>
      matchesCategoryFilter(item, activeCategory) &&
      matchesQuery(item, submittedQuery),
  );
  const totalPages = Math.max(1, Math.ceil(filteredResults.length / PAGE_SIZE));
  const pagedResults = filteredResults.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="relative flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 px-4 py-3">
            <Icon icon={SearchIcon} size={16} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="키워드나 사건 내용을 입력하세요 (예: 임대차 보증금 반환 거부, 동시이행)"
              className="w-full text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>
          <button
            type="button"
            onClick={() => runSearch()}
            className="shrink-0 rounded-xl bg-blue-400 px-6 text-sm font-semibold text-white"
          >
            검색
          </button>

          {showAutocomplete && (
            <ul className="absolute top-full left-0 z-10 mt-1 flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
              {matchingAutocomplete.map((keyword) => (
                <li key={keyword}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => runSearch(keyword)}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Icon
                      icon={SearchIcon}
                      size={14}
                      className="shrink-0 text-gray-400"
                    />
                    {keyword}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeCategory === category
                  ? "bg-blue-400 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            관련 판례{" "}
            <span className="text-blue-500">
              {searched ? filteredResults.length : 0}건
            </span>
          </h2>
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1 text-sm">
            <button
              type="button"
              onClick={() => setResultTab("search")}
              className={`rounded-md px-3 py-1.5 ${
                resultTab === "search"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              검색 결과
            </button>
            <button
              type="button"
              onClick={() => setResultTab("saved")}
              className={`rounded-md px-3 py-1.5 ${
                resultTab === "saved"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              저장됨({savedResults.length})
            </button>
          </div>
        </div>

        {resultTab === "saved" ? (
          savedResults.length === 0 ? (
            <p className="rounded-xl bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">
              아직 저장한 판례가 없어요.
            </p>
          ) : (
            savedResults.map((item) => (
              <CaseResultCard
                key={item.id}
                title={item.title}
                outcome={item.outcome}
                court={item.court}
                caseNumber={item.caseNumber}
                date={item.date}
                relevance={item.relevance}
                summary={item.summary}
                relatedLaws={item.relatedLaws}
                saved
                onToggleSave={() => toggleSavedKeywordCase(item.id)}
              />
            ))
          )
        ) : !searched || filteredResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl px-8 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Icon icon={SearchIcon} size={22} />
            </div>
            <p className="text-lg font-semibold text-gray-900">
              검색 결과가 없어요
            </p>
            <p className="text-sm text-gray-500">
              입력하신 키워드와 관련된 공개 판례를 찾지 못했어요.
              <br />
              키워드를 줄이거나 다른 표현으로 다시 검색해보세요.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {suggestedKeywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => runSearch(keyword)}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-500"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {pagedResults.map((item) => (
              <CaseResultCard
                key={item.id}
                title={item.title}
                outcome={item.outcome}
                court={item.court}
                caseNumber={item.caseNumber}
                date={item.date}
                relevance={item.relevance}
                summary={item.summary}
                relatedLaws={item.relatedLaws}
                saved={savedKeywordCaseIds.has(item.id)}
                onToggleSave={() => toggleSavedKeywordCase(item.id)}
              />
            ))}

            <div className="flex items-center justify-center gap-1 pt-2 text-sm text-gray-500">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      currentPage === page
                        ? "bg-blue-400 font-semibold text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg"
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

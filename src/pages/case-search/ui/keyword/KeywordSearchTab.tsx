import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "@/shared/ui/Icon";
import { useModal } from "@/shared/hooks/useModal";
import SearchIcon from "@/assets/icons/case-search/search-icon.svg?react";
import LockIcon from "@/assets/icons/case-search/lock-icon.svg?react";
import CrownIcon from "@/assets/icons/case-search/crown-icon.svg?react";
import {
  suggestedKeywords,
  autocompleteKeywords,
} from "../../data/keywordSearch";
import CaseResultCard from "../shared/CaseResultCard";
import SearchLoading from "../shared/SearchLoading";
import PremiumUpgradeModal from "@/pages/mypage/ui/PremiumUpgradeModal";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

type ResultTab = "search" | "saved";

const QUICK_KEYWORDS = ["민사", "대여금", "임대차", "보증금", "임금 체불"];
const VISIBLE_LIMIT = 5;

export default function KeywordSearchTab() {
  const savedKeywordCaseIds = useCaseSearchStore(
    (state) => state.savedKeywordCaseIds,
  );
  const toggleSavedKeywordCase = useCaseSearchStore(
    (state) => state.toggleSavedKeywordCase,
  );
  const citedKeywordCaseIds = useCaseSearchStore(
    (state) => state.citedKeywordCaseIds,
  );
  const toggleCitedKeywordCase = useCaseSearchStore(
    (state) => state.toggleCitedKeywordCase,
  );
  const isSearching = useCaseSearchStore((state) => state.isSearching);
  const hasSearched = useCaseSearchStore((state) => state.hasSearched);
  const searchError = useCaseSearchStore((state) => state.searchError);
  const keywordCases = useCaseSearchStore((state) => state.keywordCases);
  const keywordCasesTotal = useCaseSearchStore(
    (state) => state.keywordCasesTotal,
  );
  const runSearchAction = useCaseSearchStore((state) => state.search);

  const savedResults = keywordCases.filter((item) =>
    savedKeywordCaseIds.has(item.id),
  );
  const visibleKeywordCases = keywordCases.slice(0, VISIBLE_LIMIT);
  const remainingCount = keywordCasesTotal - visibleKeywordCases.length;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [resultTab, setResultTab] = useState<ResultTab>("search");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const premiumModal = useModal();

  const runSearch = (value?: string) => {
    const nextQuery = value ?? query;
    if (nextQuery.trim() === "") return;
    if (value !== undefined) setQuery(value);
    setIsInputFocused(false);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("q", nextQuery);
      return next;
    });
    void runSearchAction(nextQuery, null);
  };

  useEffect(() => {
    if (initialQuery) void runSearchAction(initialQuery, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchingAutocomplete = autocompleteKeywords.filter((keyword) =>
    keyword.includes(query.trim()),
  );
  const showAutocomplete =
    isInputFocused && query.trim() !== "" && matchingAutocomplete.length > 0;

  function renderResults() {
    if (resultTab === "saved") {
      if (savedResults.length === 0) {
        return (
          <p className="rounded-xl bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">
            아직 저장한 판례가 없어요.
          </p>
        );
      }
      return savedResults.map((item) => (
        <CaseResultCard
          key={item.id}
          title={item.title}
          outcome={item.outcome}
          court={item.court}
          caseNumber={item.caseNumber}
          date={item.date}
          relevance={item.relevance}
          summary={item.summary}
          detailUrl={item.detailUrl}
          cited={citedKeywordCaseIds.has(item.id)}
          onToggleCite={() => toggleCitedKeywordCase(item.id)}
          saved
          onToggleSave={() => toggleSavedKeywordCase(item.id)}
        />
      ));
    }

    if (isSearching) {
      return (
        <SearchLoading
          title="AI가 판례를 검색하고 있어요"
          subtitle="입력하신 키워드와 관련된 판례를 찾는 중입니다..."
        />
      );
    }

    if (searchError) {
      return (
        <div className="flex flex-col items-center gap-1 rounded-xl bg-red-50 px-8 py-16 text-center">
          <p className="text-base font-semibold text-red-500">
            판례 검색에 실패했어요
          </p>
          <p className="text-sm text-red-400">
            {searchError} 잠시 후 다시 시도해주세요.
          </p>
        </div>
      );
    }

    if (!hasSearched) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl px-8 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Icon icon={SearchIcon} size={22} />
          </div>
          <p className="text-lg font-semibold text-gray-900">
            찾고 싶은 내용을 입력해 주세요
          </p>
          <p className="text-sm text-gray-500">
            사건 내용을 문장 그대로 넣어도 괜찮아요.
            <br />
            쟁점·금액을 함께 적으면 더 가까운 판례가 나옵니다.
          </p>
        </div>
      );
    }

    if (keywordCases.length === 0) {
      return (
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
      );
    }

    return visibleKeywordCases.map((item) => (
      <CaseResultCard
        key={item.id}
        title={item.title}
        outcome={item.outcome}
        court={item.court}
        caseNumber={item.caseNumber}
        date={item.date}
        relevance={item.relevance}
        summary={item.summary}
        detailUrl={item.detailUrl}
        cited={citedKeywordCaseIds.has(item.id)}
        onToggleCite={() => toggleCitedKeywordCase(item.id)}
        saved={savedKeywordCaseIds.has(item.id)}
        onToggleSave={() => toggleSavedKeywordCase(item.id)}
      />
    ));
  }

  const resultsContent = renderResults();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
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
          {QUICK_KEYWORDS.map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => runSearch(keyword)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                query === keyword
                  ? "bg-blue-400 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              관련 판례{" "}
              <span className="text-blue-500">
                {hasSearched && !isSearching ? visibleKeywordCases.length : 0}건
              </span>
            </h2>
          </div>
          <div className="flex gap-1 self-start rounded-lg bg-gray-100 p-1 text-sm">
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

        {resultsContent}

        {resultTab === "search" && remainingCount > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-blue-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <Icon icon={LockIcon} size={22} className="text-blue-400" />
              <div>
                <p className="font-semibold text-blue-400">
                  유사 판례 {remainingCount}건이 더 있어요
                </p>
                <p className="text-sm text-gray-400">관련성 보통</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={premiumModal.open}
                className="flex items-center gap-1.5 rounded-xl border border-[#C9E2FF] bg-[rgba(232,243,255,0.34)] px-[18px] py-3 text-sm font-semibold text-blue-400"
              >
                <Icon icon={CrownIcon} size={15} />
                프리미엄으로 전체 보기 →
              </button>
              <p className="text-xs text-gray-400">월 9,900원 · 언제든 해지</p>
            </div>
          </div>
        )}
      </section>

      {premiumModal.isOpen && (
        <PremiumUpgradeModal onClose={premiumModal.close} />
      )}
    </div>
  );
}

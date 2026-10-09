import { useState, type ReactNode } from "react";
import Icon from "@/shared/ui/Icon";
import SearchIcon from "@/assets/icons/case-search/search-icon.svg?react";
import { suggestedKeywords } from "../../data/keywordSearch";
import { useKeywordSearch } from "../../hooks/useKeywordSearch";
import type { CaseCard } from "../../lib/search";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";
import CaseResultCard from "../shared/CaseResultCard";
import ResultTabSwitch, { type ResultTab } from "../shared/ResultTabSwitch";
import SearchLoading from "../shared/SearchLoading";

const QUICK_KEYWORDS = ["민사", "대여금", "임대차", "보증금", "임금 체불"];

function KeywordCaseCard({ item }: { item: CaseCard }) {
  const saved = useCaseSearchStore((state) => state.savedKeywordCaseIds.has(item.id));
  const cited = useCaseSearchStore((state) => state.citedKeywordCaseIds.has(item.id));
  const toggleSaved = useCaseSearchStore((state) => state.toggleSavedKeywordCase);
  const toggleCited = useCaseSearchStore((state) => state.toggleCitedKeywordCase);

  return (
    <CaseResultCard
      title={item.title}
      outcome={item.outcome}
      court={item.court}
      caseNumber={item.caseNumber}
      date={item.date}
      relevance={item.relevance}
      summary={item.summary}
      detailUrl={item.detailUrl}
      cited={cited}
      onToggleCite={() => toggleCited(item.id)}
      saved={saved}
      onToggleSave={() => toggleSaved(item.id)}
    />
  );
}

type EmptyStateProps = {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
};

function EmptyState({ title, children, actions }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl px-8 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Icon icon={SearchIcon} size={22} />
      </div>
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{children}</p>
      {actions}
    </div>
  );
}

type KeywordResultsProps = {
  tab: ResultTab;
  onSearch: (keyword: string) => void;
};

function KeywordResults({ tab, onSearch }: KeywordResultsProps) {
  const isSearching = useCaseSearchStore((state) => state.isSearching);
  const hasSearched = useCaseSearchStore((state) => state.hasSearched);
  const searchError = useCaseSearchStore((state) => state.searchError);
  const keywordCases = useCaseSearchStore((state) => state.keywordCases);
  const savedIds = useCaseSearchStore((state) => state.savedKeywordCaseIds);

  if (tab === "saved") {
    const savedCases = keywordCases.filter((item) => savedIds.has(item.id));
    if (savedCases.length === 0) {
      return (
        <p className="rounded-xl bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">아직 저장한 판례가 없어요.</p>
      );
    }
    return savedCases.map((item) => <KeywordCaseCard key={item.id} item={item} />);
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
        <p className="text-base font-semibold text-red-500">판례 검색에 실패했어요</p>
        <p className="text-sm text-red-400">{searchError} 잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <EmptyState title="찾고 싶은 내용을 입력해 주세요">
        사건 내용을 문장 그대로 넣어도 괜찮아요.
        <br />
        쟁점·금액을 함께 적으면 더 가까운 판례가 나옵니다.
      </EmptyState>
    );
  }

  if (keywordCases.length === 0) {
    return (
      <EmptyState
        title="검색 결과가 없어요"
        actions={
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {suggestedKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => onSearch(keyword)}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-500"
              >
                {keyword}
              </button>
            ))}
          </div>
        }
      >
        입력하신 키워드와 관련된 공개 판례를 찾지 못했어요.
        <br />
        키워드를 줄이거나 다른 표현으로 다시 검색해보세요.
      </EmptyState>
    );
  }

  return keywordCases.map((item) => <KeywordCaseCard key={item.id} item={item} />);
}

export default function KeywordSearchTab() {
  const { query, setQuery, setIsInputFocused, runSearch, suggestions, showSuggestions } = useKeywordSearch();
  const [resultTab, setResultTab] = useState<ResultTab>("search");

  const isSearching = useCaseSearchStore((state) => state.isSearching);
  const hasSearched = useCaseSearchStore((state) => state.hasSearched);
  const total = useCaseSearchStore((state) => state.keywordCasesTotal);
  const savedCount = useCaseSearchStore(
    (state) => state.keywordCases.filter((item) => state.savedKeywordCaseIds.has(item.id)).length,
  );

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
            className="shrink-0 rounded-xl bg-blue-300 px-6 text-sm font-semibold text-white"
          >
            검색
          </button>

          {showSuggestions && (
            <ul className="absolute top-full left-0 z-10 mt-1 flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
              {suggestions.map((keyword) => (
                <li key={keyword}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => runSearch(keyword)}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Icon icon={SearchIcon} size={14} className="shrink-0 text-gray-400" />
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
                query === keyword ? "bg-blue-300 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            관련 판례 <span className="text-blue-500">{hasSearched && !isSearching ? total : 0}건</span>
          </h2>
          <ResultTabSwitch tab={resultTab} savedCount={savedCount} onChange={setResultTab} />
        </div>
        <KeywordResults tab={resultTab} onSearch={runSearch} />
      </section>
    </div>
  );
}

import { useState } from "react";
import ShineIcon from "@/assets/icons/case-search/shine-line-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";
import type { CaseCard } from "../../lib/search";
import CaseResultCard from "../shared/CaseResultCard";
import PremiumUpsellBanner from "./PremiumUpsellBanner";
import ResultTabSwitch, { type ResultTab } from "../shared/ResultTabSwitch";

const VISIBLE_LIMIT = 5;

function SimilarCaseCard({ item }: { item: CaseCard }) {
  const saved = useCaseSearchStore((state) => state.savedCaseIds.has(item.id));
  const cited = useCaseSearchStore((state) => state.citedCaseIds.has(item.id));
  const toggleSaved = useCaseSearchStore((state) => state.toggleSavedCase);
  const toggleCited = useCaseSearchStore((state) => state.toggleCitedCase);

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
      onToggleCite={() => toggleCited(item)}
      saved={saved}
      onToggleSave={() => toggleSaved(item.id)}
    />
  );
}

const EmptyNotice = ({ message }: { message: string }) => (
  <p className="rounded-xl bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">{message}</p>
);

function AnalysisPlaceholder() {
  return (
    <section className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white px-8 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Icon icon={ShineIcon} size={28} />
      </div>
      <p className="mt-1 text-lg font-semibold text-gray-900">아직 분석 전이에요</p>
      <p className="text-sm text-gray-500">
        위 정보를 확인하고 [이 정보로 유사 판례 분석]을 누르면 관련 판례와 통계가 여기에 표시됩니다.
      </p>
    </section>
  );
}

function AnalysisError({ message }: { message: string }) {
  return (
    <section className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-red-200 bg-red-50 px-8 py-16 text-center">
      <p className="text-base font-semibold text-red-500">유사 판례 분석에 실패했어요</p>
      <p className="text-sm text-red-400">{message} 잠시 후 다시 시도해주세요.</p>
    </section>
  );
}

export default function CaseResultPanel() {
  const hasAnalyzed = useCaseSearchStore((state) => state.hasAnalyzed);
  const analyzeError = useCaseSearchStore((state) => state.analyzeError);
  const cases = useCaseSearchStore((state) => state.cases);
  const casesTotal = useCaseSearchStore((state) => state.casesTotal);
  const savedCaseIds = useCaseSearchStore((state) => state.savedCaseIds);
  const [tab, setTab] = useState<ResultTab>("search");

  if (!hasAnalyzed) return <AnalysisPlaceholder />;
  if (analyzeError) return <AnalysisError message={analyzeError} />;

  const savedCases = cases.filter((item) => savedCaseIds.has(item.id));
  const visibleCases = cases.slice(0, VISIBLE_LIMIT);
  const remainingCount = casesTotal - visibleCases.length;
  const isSavedTab = tab === "saved";
  const shownCases = isSavedTab ? savedCases : visibleCases;
  const emptyMessage = isSavedTab
    ? "아직 저장한 판례가 없어요."
    : "입력하신 사건과 관련된 공개 판례를 찾지 못했어요.";

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          {isSavedTab ? "저장한 판례" : "내 사건과 유사한 판례"}{" "}
          <span className="text-blue-500">{shownCases.length}건</span>
        </h2>
        <ResultTabSwitch tab={tab} savedCount={savedCases.length} onChange={setTab} />
      </div>

      {isSavedTab && savedCases.length > 0 && <div className="h-px bg-gray-200" />}
      {shownCases.length === 0 && <EmptyNotice message={emptyMessage} />}
      {shownCases.map((item) => (
        <SimilarCaseCard key={item.id} item={item} />
      ))}

      {!isSavedTab && remainingCount > 0 && <PremiumUpsellBanner remainingCount={remainingCount} />}
    </section>
  );
}

import GraphIcon from "@/assets/icons/case-search/graph-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import {
  mockStats,
  totalSimilarCaseCount,
  winRatePercent,
  wonCaseCount,
} from "../../data/mockStats";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

export default function RelatedStatsCard() {
  const hasAnalyzed = useCaseSearchStore((state) => state.hasAnalyzed);
  const isAnalyzing = useCaseSearchStore((state) => state.isAnalyzing);

  if (isAnalyzing) {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2 pt-1">
            <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </section>
    );
  }

  if (!hasAnalyzed) {
    return (
      <section className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <Icon icon={GraphIcon} size={20} />
        </div>
        <p className="text-sm text-gray-500">
          사건을 선택하면 유사 판례 통계가 표시됩니다
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
        <Icon icon={GraphIcon} size={16} />
        유사 판례 통계
      </h2>

      <div className="flex flex-col gap-1">
        <p className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-blue-500">
            {winRatePercent}%
          </span>
          <span className="text-sm font-medium text-gray-500">원고 승소</span>
        </p>
        <p className="text-sm text-gray-400">
          이 사건과 유사한 판례 {totalSimilarCaseCount}건 중 {wonCaseCount}건
          승소
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {mockStats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{stat.label}</span>
              <span className="font-medium text-gray-900">{stat.count}건</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100">
              <div
                className="h-1.5 rounded-full bg-blue-400"
                style={{ width: `${stat.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="rounded-lg bg-gray-50 px-3 py-2.5 text-xs text-gray-400">
        ⓘ 검색된 판례는 표본 기준이에요. 전국 통계나 재판 결과 예측이 아니며,
        전체 판례를 대표하지 않습니다.
      </p>
    </section>
  );
}

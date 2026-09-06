import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GraphIcon from "@/assets/icons/case-search/graph-icon.svg?react";
import AboutIcon from "@/assets/icons/case-search/about-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

const BAR_COLORS = { win: "bg-blue-500", partial: "bg-blue-300", lose: "bg-gray-400" } as const;
const BAR_LABELS = { win: "원고 승소", partial: "원고 일부승소", lose: "원고 패소" } as const;

export default function RelatedStatsCard() {
  const hasAnalyzed = useCaseSearchStore((state) => state.hasAnalyzed);
  const isAnalyzing = useCaseSearchStore((state) => state.isAnalyzing);
  const statistics = useCaseSearchStore((state) => state.statistics);

  if (isAnalyzing) {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2">
          <Skeleton width={16} height={16} />
          <Skeleton width={96} height={16} />
        </div>
        <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4">
          <Skeleton width={128} height={20} />
          <Skeleton />
          <Skeleton width="80%" />
          <div className="flex gap-2 pt-1">
            <Skeleton width={64} height={24} borderRadius={8} />
            <Skeleton width={64} height={24} borderRadius={8} />
            <Skeleton width={64} height={24} borderRadius={8} />
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

  if (!statistics) {
    return (
      <section className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <Icon icon={GraphIcon} size={20} />
        </div>
        <p className="text-sm text-gray-500">통계를 계산하지 못했어요. 판례 목록은 정상적으로 표시됩니다.</p>
      </section>
    );
  }

  const wonCount = statistics.win + statistics.partial;
  const bars = (["win", "partial", "lose"] as const).map((key) => ({
    key,
    label: BAR_LABELS[key],
    count: statistics[key],
    color: BAR_COLORS[key],
    percent: statistics.classified > 0 ? (statistics[key] / statistics.classified) * 100 : 0,
  }));

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
        <Icon icon={GraphIcon} size={16} />
        유사 판례 통계
      </h2>

      <div className="flex flex-col gap-1">
        {statistics.plaintiffWinRate === null ? (
          <p className="text-sm font-semibold text-gray-500">표본이 부족해요</p>
        ) : (
          <p className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-blue-500">{statistics.plaintiffWinRate}%</span>
            <span className="text-sm font-semibold text-gray-500">원고 승소</span>
          </p>
        )}
        <p className="text-sm text-gray-500">
          이 사건과 유사한 판례 {statistics.classified}건 중 {wonCount}건 승소·일부승소
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {bars.map((bar) => (
          <div key={bar.key} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{bar.label}</span>
              <span className="text-gray-700">{bar.count}건</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100">
              <div className={`h-1.5 rounded-full ${bar.color}`} style={{ width: `${bar.percent}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-1.5 rounded-lg bg-gray-50 px-3 py-2.5 text-gray-500">
        <Icon icon={AboutIcon} size={14} className="mt-0.5" />
        <p className="text-sm">{statistics.disclaimer}</p>
      </div>
    </section>
  );
}

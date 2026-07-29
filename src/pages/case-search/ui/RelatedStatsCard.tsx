import GraphIcon from "@/assets/icons/graph_icon.svg?react";
import Icon from "@/shared/ui/Icon";

const mockStats = [
  { label: "대법원 판례", value: "7건" },
  { label: "하급심 판례", value: "5건" },
  { label: "평균 관련도", value: "82%" },
];

export default function RelatedStatsCard({
  hasAnalyzed,
}: {
  hasAnalyzed: boolean;
}) {
  if (!hasAnalyzed) {
    return (
      <section className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Icon icon={GraphIcon} size={20} />
        </div>
        <p className="text-sm text-gray-400">
          사건을 선택하면 유사 판례 통계가 표시됩니다
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6">
      {mockStats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center justify-between text-sm"
        >
          <span className="text-gray-500">{stat.label}</span>
          <span className="font-semibold text-gray-900">{stat.value}</span>
        </div>
      ))}
    </section>
  );
}

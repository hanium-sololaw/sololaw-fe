import { Link } from "react-router-dom";
import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";
import type { CaseDetail } from "../model";

type StatsOverviewCardProps = {
  stats: CaseDetail["stats"];
};

export default function StatsOverviewCard({ stats }: StatsOverviewCardProps) {
  const rows = [
    {
      id: "documents",
      label: "문서",
      count: `${stats.documentCount}개`,
      note: stats.documentNote,
      to: undefined,
    },
    {
      id: "evidence",
      label: "증빙자료",
      count: `${stats.evidenceCount}개`,
      note: stats.evidenceNote,
      to: "/evidence",
    },
    {
      id: "schedule",
      label: "일정",
      count: `${stats.scheduleCount}건`,
      note: stats.scheduleNote,
      to: "/schedule",
    },
  ] as const;

  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">자료·일정 현황</h2>
        <span className="text-xs text-gray-400">이 사건 기준</span>
      </div>

      <div className="flex flex-col divide-y divide-gray-100">
        {rows.map((row) => {
          const content = (
            <>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600">
                  {row.label}
                </span>
                <span className="text-base font-bold text-gray-900">
                  {row.count}
                </span>
              </div>
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-xs text-gray-400">
                  {row.note}
                </span>
                <ChevronRightIcon className="shrink-0" />
              </div>
            </>
          );

          return row.to ? (
            <Link
              key={row.id}
              to={row.to}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
            >
              {content}
            </Link>
          ) : (
            <div
              key={row.id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}

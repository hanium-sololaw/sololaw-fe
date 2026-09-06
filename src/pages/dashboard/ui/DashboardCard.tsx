import { useEffect, useState } from "react";
import { getCaseList } from "@/pages/case-management/api/getCaseList";
import { getSchedules } from "@/pages/schedule/api/getSchedules";
import { formatDDay, formatMonthDay } from "@/pages/schedule/lib/scheduleMapping";

type SummaryCard = {
  id: string;
  title: string;
  value: string;
  badge: string;
};

function SummaryCardItem({ title, value, badge }: Omit<SummaryCard, "id">) {
  return (
    <div
      className="
        relative
        overflow-hidden
        flex h-47 flex-col justify-between
        rounded-[20px]
        border border-gray-200
        bg-white
        px-9 pt-6 pb-7.5
        shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)]
      "
    >
      <div
        className="
        pointer-events-none
        absolute
        left-5
        right-5
        bottom-3
        h-16
        rounded-[20px]
        bg-[linear-gradient(180deg,transparent_0%,#F6FAFF_30%,#E8F2FF_100%)]    blur-lg
        opacity-70
      "
      />

      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-blue-700">{title}</h3>

        <p className="text-3xl font-bold text-blue-700">{value}</p>
      </div>

      <div className="relative z-10">
        <span
          className="
            inline-flex items-center
            rounded-[20px]
            bg-blue-50
            px-4 py-1
            text-xl
            font-normal
            text-blue-400
          "
        >
          {badge}
        </span>
      </div>
    </div>
  );
}

export default function DashboardSummary() {
  const [activeCaseCount, setActiveCaseCount] = useState<number | null>(null);
  const [urgentCaseCount, setUrgentCaseCount] = useState<number | null>(null);
  const [nextHearing, setNextHearing] = useState<{
    dDay: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCaseList({ status: "IN_PROGRESS", size: 1 })
      .then((page) => {
        if (!cancelled) setActiveCaseCount(page.totalElements);
      })
      .catch(() => {
        // keep the placeholder count when the API call fails
      });

    getSchedules()
      .then((schedules) => {
        if (cancelled) return;

        const urgentCaseIds = new Set(
          schedules
            .filter((item) => item.dDay >= 0 && item.dDay <= 3 && item.caseId)
            .map((item) => item.caseId),
        );
        setUrgentCaseCount(urgentCaseIds.size);

        const nextHearingItem = schedules
          .filter((item) => item.scheduleType === "HEARING" && item.dDay >= 0)
          .sort((a, b) => a.dDay - b.dDay)[0];

        if (nextHearingItem) {
          setNextHearing({
            dDay: formatDDay(nextHearingItem.dDay),
            date: formatMonthDay(nextHearingItem.eventDate),
          });
        }
      })
      .catch(() => {
        // keep the placeholder deadline when the API call fails
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const summaryCards: SummaryCard[] = [
    {
      id: "cases",
      title: "진행 중인 사건",
      value: activeCaseCount !== null ? `${activeCaseCount}건` : "-",
      badge: urgentCaseCount !== null ? `${urgentCaseCount}건 기일 임박` : "-",
    },
    {
      id: "deadline",
      title: "다음 변론기일",
      value: nextHearing?.dDay ?? "-",
      badge: nextHearing?.date ?? "일정 없음",
    },
    {
      id: "documents",
      title: "생성한 문서",
      value: "7",
      badge: "2개 제출 완료",
    },
    { id: "evidence", title: "등록된 증거", value: "14", badge: "갑호증 9개" },
  ];

  return (
    <section className="grid grid-cols-4 gap-2.5">
      {summaryCards.map((card) => (
        <SummaryCardItem key={card.id} {...card} />
      ))}
    </section>
  );
}

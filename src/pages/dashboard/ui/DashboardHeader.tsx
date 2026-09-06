import { useEffect, useState } from "react";
import { listMyCases } from "@/shared/api/cases";
import { getMyProfile } from "@/shared/api/users";
import { getSchedules } from "@/pages/schedule/api/getSchedules";
import { formatDDay } from "@/pages/schedule/lib/scheduleMapping";

type DashboardHeaderProps = {
  hasCases: boolean;
};

export default function DashboardHeader({ hasCases }: DashboardHeaderProps) {
  const [name, setName] = useState("");
  const [activeCaseCount, setActiveCaseCount] = useState<number | null>(null);
  const [nextDDay, setNextDDay] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getMyProfile()
      .then((profile) => {
        if (!cancelled) setName(profile.name);
      })
      .catch(() => {
        // keep the placeholder name when the API call fails
      });

    if (hasCases) {
      listMyCases({ status: "IN_PROGRESS", size: 1 })
        .then((page) => {
          if (!cancelled) setActiveCaseCount(page.totalElements);
        })
        .catch(() => {
          // keep the placeholder count when the API call fails
        });

      getSchedules()
        .then((schedules) => {
          if (cancelled) return;

          const next = schedules
            .filter((item) => item.dDay >= 0)
            .sort((a, b) => a.dDay - b.dDay)[0];

          if (next) setNextDDay(formatDDay(next.dDay));
        })
        .catch(() => {
          // keep the placeholder deadline when the API call fails
        });
    }

    return () => {
      cancelled = true;
    };
  }, [hasCases]);

  const now = new Date();

  return (
    <div className="flex items-center justify-between px-4 py-5">
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold text-gray-900">안녕하세요, {name}님</p>
        {hasCases ? (
          <p className="text-lg text-gray-700">
            진행 중인 사건 {activeCaseCount !== null ? `${activeCaseCount}건` : "-"} | 다음 기일까지
            <span className="font-bold text-red-500"> {nextDDay ?? "-"}</span>
          </p>
        ) : (
          <p className="text-lg text-gray-700">
            첫 사건을 등록하고 소송 준비를 시작해보세요.
          </p>
        )}
      </div>

      <div className="flex flex-col justify-center text-right text-sm text-gray-700 gap-1">
        <p>
          {now.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </p>
        <p className="font-semibold text-gray-800">
          {now.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

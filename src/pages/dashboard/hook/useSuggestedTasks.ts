import { useEffect, useState } from "react";
import { listMyCases } from "@/shared/api/cases";
import { getUnreadNotificationCount } from "@/shared/api/notifications";
import { getSchedules } from "@/pages/schedule/api/getSchedules";
import { formatDDay } from "@/pages/schedule/lib/scheduleMapping";
import { listEvidence } from "@/pages/evidence/api";
import { documentRouteFor } from "../lib/documentRoute";
import { toDateKey } from "@/pages/schedule/utils";

export type SuggestedTask = {
  id: string;
  label: string;
  to: string;
  urgent?: boolean;
};

const MAX_TASKS = 3;

const fallbackTasks: SuggestedTask[] = [
  { id: "schedule", label: "법원 통지서 등록하기", to: "/schedule?upload=court-notice" },
  { id: "search", label: "비슷한 판례 찾아보기", to: "/case" },
  { id: "guide", label: "소송 절차 알아보기", to: "/guide" },
];

/**
 * Rule-based "next step" suggestions built from the user's real schedules, evidence, cases and
 * notifications (there is no AI recommendation API). Each source fails independently.
 */
export function useSuggestedTasks() {
  const [tasks, setTasks] = useState<SuggestedTask[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fromSchedules = getSchedules({ from: toDateKey(new Date()) }).then(
      (schedules) => {
        const result: SuggestedTask[] = [];

        const deadline = schedules.find(
          (item) =>
            item.scheduleType === "SUBMISSION_DEADLINE" && item.dDay >= 0 && item.dDay <= 7,
        );
        if (deadline) {
          result.push({
            id: `deadline-${deadline.id}`,
            label: `${deadline.title} 준비 ${formatDDay(deadline.dDay)}`,
            to: documentRouteFor(deadline.title, deadline.caseId),
            urgent: deadline.dDay <= 3,
          });
        }

        const hearing = schedules.find(
          (item) => item.scheduleType === "HEARING" && item.dDay >= 0 && item.dDay <= 14,
        );
        if (hearing) {
          result.push({
            id: `hearing-${hearing.id}`,
            label: `변론기일 준비 ${formatDDay(hearing.dDay)}`,
            to: hearing.caseId ? `/case-management/${hearing.caseId}` : "/schedule",
            urgent: hearing.dDay <= 3,
          });
        }

        return result;
      },
    );

    const fromEvidence = listEvidence({ status: "NEEDS_SUPPLEMENT", size: 1 }).then(
      (page): SuggestedTask[] =>
        page.totalElements > 0
          ? [{ id: "evidence", label: `증거 보완 ${page.totalElements}건`, to: "/evidence" }]
          : [],
    );

    const fromCases = listMyCases({ status: "PREPARING", size: 1 }).then(
      (page): SuggestedTask[] => {
        const preparing = page.content[0];
        return preparing
          ? [
              {
                id: `complaint-${preparing.id}`,
                label: "소장 작성하기",
                to: `/document/complaint?caseId=${preparing.id}`,
              },
            ]
          : [];
      },
    );

    const fromNotifications = getUnreadNotificationCount().then(
      (count): SuggestedTask[] =>
        count > 0
          ? [{ id: "notifications", label: `새 알림 ${count}건 확인`, to: "/mypage/notifications" }]
          : [],
    );

    // listed in priority order; a failed source just contributes nothing
    Promise.allSettled([fromSchedules, fromEvidence, fromCases, fromNotifications]).then(
      (results) => {
        if (cancelled) return;

        const found = results
          .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
          .sort((a, b) => Number(Boolean(b.urgent)) - Number(Boolean(a.urgent)));

        setTasks(
          [...found, ...fallbackTasks].slice(0, MAX_TASKS),
        );
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return tasks;
}

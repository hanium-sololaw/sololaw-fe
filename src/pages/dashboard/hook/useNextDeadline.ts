import { useEffect, useState } from "react";
import { getCaseDetail } from "@/shared/api/cases";
import { getSchedules } from "@/pages/schedule/api/getSchedules";
import type { ScheduleRecord } from "@/pages/schedule/api/types";

export type NextDeadline = {
  schedule: ScheduleRecord;
  court: string | null;
  caseNumber: string | null;
};

/** The closest upcoming (D-day ≥ 0) submission deadline, plus its case's court/number. */
export function useNextDeadline() {
  const [deadline, setDeadline] = useState<NextDeadline | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getSchedules({ scheduleType: "SUBMISSION_DEADLINE" })
      .then(async (schedules) => {
        // the API already sorts by eventDate ascending
        const next = schedules.find((item) => item.dDay >= 0);
        if (!next) return null;

        const detail = next.caseId
          ? await getCaseDetail(next.caseId).catch(() => null)
          : null;
        return {
          schedule: next,
          court: detail?.court ?? null,
          caseNumber: detail?.caseNumber ?? null,
        };
      })
      .then((result) => {
        if (!cancelled) setDeadline(result);
      })
      .catch(() => {
        // fall back to the empty banner when the API call fails
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { deadline, isLoading };
}

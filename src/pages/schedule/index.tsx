import { useEffect, useState } from "react";
import { listMyCases } from "@/shared/api/cases";
import ScheduleHeader from "./ui/ScheduleHeader";
import ScheduleNoticeBanner from "./ui/ScheduleNoticeBanner";
import ScheduleCalendar from "./ui/ScheduleCalendar";
import DaySchedulePanel from "./ui/DaySchedulePanel";
import UpcomingSchedules from "./ui/UpcomingSchedules";
import type { ScheduleEvent } from "./data/mockSchedule";
import { toDateKey } from "./utils";
import { getSchedules } from "./api/getSchedules";
import { formatDDay } from "./lib/scheduleMapping";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getSchedules(), listMyCases({ size: 200 })])
      .then(([schedules, caseListPage]) => {
        if (cancelled) return;

        const caseTitleById = new Map(
          caseListPage.content.map((item) => [item.id, item.title]),
        );

        setEvents(
          schedules.map((record) => {
            const time = record.eventTime
              ? `${String(record.eventTime.hour).padStart(2, "0")}:${String(
                  record.eventTime.minute,
                ).padStart(2, "0")}`
              : undefined;

            return {
              id: String(record.id),
              date: record.eventDate,
              time,
              title: record.title,
              caseName: record.caseId
                ? (caseTitleById.get(record.caseId) ?? "")
                : "",
              dDay: formatDDay(record.dDay),
              urgent: record.dDay >= 0 && record.dDay <= 3,
            };
          }),
        );
      })
      .catch(() => {
        // keep the placeholder empty schedule when the API call fails
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const selectedDayEvents = events.filter(
    (event) => event.date === toDateKey(selectedDate),
  );

  return (
    <div className="flex flex-col gap-6">
      <ScheduleHeader />
      <ScheduleNoticeBanner />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
        <ScheduleCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          events={events}
        />

        <div className="flex flex-col gap-6">
          <DaySchedulePanel
            selectedDate={selectedDate}
            events={selectedDayEvents}
            onCreated={() => setRefreshKey((prev) => prev + 1)}
          />
          <UpcomingSchedules events={events} />
        </div>
      </div>
    </div>
  );
}

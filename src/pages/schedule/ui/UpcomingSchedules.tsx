import MoreIcon from "@/assets/icons/schedule/more-icon.svg?react";
import type { ScheduleEvent } from "../data/mockSchedule";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function formatEventDate(event: ScheduleEvent) {
  const [year, month, day] = event.date.split("-");
  const weekday = WEEKDAY_LABELS[new Date(event.date).getDay()];
  const datePart = `${year}. ${Number(month)}. ${Number(day)}. (${weekday})`;
  return event.time ? `${datePart} ${event.time}` : datePart;
}

type UpcomingSchedulesProps = {
  events: ScheduleEvent[];
};

export default function UpcomingSchedules({ events }: UpcomingSchedulesProps) {
  return (
    <section className="flex flex-col gap-3 rounded-[20px] border border-gray-200 bg-white p-5">
      <h2 className="text-base font-bold text-gray-900">다가오는 일정</h2>

      {events.length === 0 ? (
        <div className="rounded-xl bg-gray-50 px-4 py-4 text-center text-sm text-gray-400">
          아직 등록된 사건 일정이 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start gap-2.5">
              <span
                className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
                  event.urgent ? "bg-red-300" : "bg-blue-400"
                }`}
              />

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {event.title}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                      event.urgent
                        ? "bg-red-50 text-red-400"
                        : "bg-blue-50 text-blue-400"
                    }`}
                  >
                    {event.dDay}
                  </span>
                </div>
                <p className="truncate text-xs text-gray-400">
                  {formatEventDate(event)} · {event.caseName}
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 text-gray-300 hover:text-gray-500"
              >
                <MoreIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

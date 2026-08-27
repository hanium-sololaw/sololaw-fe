import { useState } from "react";
import ArrowLeftIcon from "@/assets/icons/schedule/arrow-left-icon.svg?react";
import ArrowRightIcon from "@/assets/icons/schedule/arrow-right-icon.svg?react";
import type { ScheduleEvent } from "../data/mockSchedule";
import { toDateKey } from "../utils";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getCalendarCells(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(year, month, index - firstWeekday + 1);
    return { date, inMonth: date.getMonth() === month };
  });
}

type ScheduleCalendarProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  events: ScheduleEvent[];
};

export default function ScheduleCalendar({
  selectedDate,
  onSelectDate,
  events,
}: ScheduleCalendarProps) {
  const [viewDate, setViewDate] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const cells = getCalendarCells(viewDate);
  const todayKey = toDateKey(new Date());
  const selectedKey = toDateKey(selectedDate);

  const goToPrevMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const goToNextMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
        </h2>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goToPrevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-50"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-50"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            className={`pb-3 text-center text-sm font-semibold ${
              index === 0
                ? "text-red-400"
                : index === 6
                  ? "text-blue-400"
                  : "text-gray-900"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map(({ date, inMonth }) => {
          const key = toDateKey(date);
          const isSelected = inMonth && key === selectedKey;
          const isToday = key === todayKey;
          const weekday = date.getDay();
          const dayEvents = inMonth
            ? events.filter((event) => event.date === key)
            : [];

          return (
            <button
              key={key}
              type="button"
              disabled={!inMonth}
              onClick={() => onSelectDate(date)}
              className={`flex min-h-26 flex-col items-start gap-1 self-stretch rounded-xl p-1.5 text-left ${
                isSelected ? "bg-blue-50" : inMonth ? "hover:bg-gray-50" : ""
              }`}
            >
              {inMonth && (
                <>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      isToday
                        ? "bg-blue-300 text-white font-bold"
                        : weekday === 0
                          ? "text-red-400"
                          : weekday === 6
                            ? "text-blue-400"
                            : "text-gray-700"
                    }`}
                  >
                    {date.getDate()}
                  </span>

                  {dayEvents.length > 0 && (
                    <div className="flex w-full flex-col gap-0.5">
                      {dayEvents.slice(0, 1).map((event) => (
                        <span
                          key={event.id}
                          className={`flex w-full items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] font-medium ${
                            event.urgent
                              ? "bg-red-50 text-red-500"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 shrink-0 rounded-full ${
                              event.urgent ? "bg-red-400" : "bg-blue-400"
                            }`}
                          />
                          <span className="truncate">{event.title}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

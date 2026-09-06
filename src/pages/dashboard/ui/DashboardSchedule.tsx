import { useEffect, useState } from "react";
import ProgressIcon from "@/assets/dashboard/progress-bar.svg?react";
import InProgressIcon from "@/assets/dashboard/in-progress-bar.svg?react";
import ClockIcon from "@/assets/icons/dashboard/clock-icon.svg?react";
import CheckIcon from "@/assets/icons/dashboard/check-icon.svg?react";
import { getSchedules } from "@/pages/schedule/api/getSchedules";
import { formatMonthDay } from "@/pages/schedule/lib/scheduleMapping";
import { getAllTodos } from "@/pages/case-management/api/getAllTodos";

type WeekDay = {
  day: string;
  date: string;
  active?: boolean;
};

type ScheduleItem = {
  id: string;
  title: string;
  date: string;
  active?: boolean;
};

type CompletedTask = {
  id: string;
  title: string;
};

const WEEKDAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentWeek(): WeekDay[] {
  const today = new Date();
  const todayKey = toDateKey(today);
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      day: WEEKDAY_LABELS[index],
      date: String(date.getDate()),
      active: toDateKey(date) === todayKey,
    };
  });
}

export default function DashboardSchedule() {
  const [weekDays] = useState<WeekDay[]>(() => getCurrentWeek());
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);

  useEffect(() => {
    let cancelled = false;
    const todayKey = toDateKey(new Date());

    getSchedules({ from: todayKey })
      .then((records) => {
        if (cancelled) return;

        const upcoming = [...records]
          .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
          .slice(0, 3)
          .map((record, index) => ({
            id: String(record.id),
            title: record.title,
            date: formatMonthDay(record.eventDate),
            active: index === 0,
          }));

        setSchedules(upcoming);
      })
      .catch(() => {
        // keep the placeholder (empty) schedule list when the API call fails
      });

    getAllTodos({ isDone: true })
      .then((todos) => {
        if (cancelled) return;

        setCompletedTasks(
          todos.slice(0, 5).map((todo) => ({
            id: String(todo.id),
            title: todo.title,
          })),
        );
      })
      .catch(() => {
        // keep the placeholder (empty) completed-task list when the API call fails
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border border-gray-200
        bg-white
        pt-6.5
        px-4.25
        pb-25
        w-75
        shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)]
      "
    >
      {/* 하단 그라데이션 */}
      <div
        className="
          pointer-events-none
          absolute
          left-8
          right-8
          bottom-4
          h-24
          rounded-[28px]
          bg-[linear-gradient(180deg,transparent_0%,#F6FAFF_35%,#E8F2FF_100%)]
          blur-2xl
          opacity-70
        "
      />

      <div className="relative z-10">
        <div className="flex flex-col gap-2.5 px-2">
          <p className="text-sm text-gray-700">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">
            다가오는 일정
          </h2>
        </div>

        <div className="mt-6.5 grid grid-cols-7">
          {weekDays.map((item) => (
            <div
              key={item.date}
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <span
                className={`text-sm ${
                  item.active ? "text-blue-500" : "text-gray-600"
                }`}
              >
                {item.day}
              </span>

              <div className="flex flex-col items-center gap-[0.79px]">
                <span
                  className={`text-base font-semibold ${
                    item.active ? "text-blue-500" : "text-gray-900"
                  }`}
                >
                  {item.date}
                </span>

                <span
                  className={`h-1.25 w-1.25 rounded-full ${
                    item.active ? "bg-blue-500" : "bg-transparent"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 타임라인 */}
        <div className="mt-6.5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {schedules.length === 0 ? (
              <p className="py-4 text-center text-sm text-gray-400">
                다가오는 일정이 없어요
              </p>
            ) : (
              schedules.map((item) => {
                const TimelineIcon = item.active
                  ? InProgressIcon
                  : ProgressIcon;

                return (
                  <div key={item.id} className="flex items-center gap-2.75">
                    <TimelineIcon />

                    <div
                      className={`
                      relative
                      flex-1
                      overflow-hidden
                      rounded-[20px]
                      w-60
                      pl-3.75
                      ${
                        item.active
                          ? "bg-blue-400 text-white pt-3.5 pb-4.5"
                          : "bg-gray-100 text-gray-900 py-2 h-15"
                      }
                    `}
                    >
                      {!item.active && (
                        <div
                          className="
                          pointer-events-none
                          absolute
                          top-0
                          right-0
                          z-20
                          h-full
                          w-16
                          bg-[linear-gradient(90deg,rgba(243,244,246,0)_60%,#ffffff_100%)]
                        "
                        />
                      )}

                      <div className="relative z-10 flex flex-col">
                        <div className="flex items-center gap-3">
                          {!item.active && <ClockIcon />}
                          <p className="text-base font-bold">{item.title}</p>
                        </div>

                        <p
                          className={`
                          text-xs
                          ${item.active ? "text-gray-100" : "text-gray-700 pl-7"}
                        `}
                        >
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="h-px w-full bg-gray-200" />
        </div>

        {/* 완료된 작업 */}
        <div className="mt-2.5 flex flex-col gap-3.5">
          <h3 className="text-lg font-semibold text-gray-900">완료된 작업</h3>

          <div className="flex flex-col gap-3">
            {completedTasks.length === 0 ? (
              <p className="text-sm text-gray-400">완료된 작업이 없어요</p>
            ) : (
              completedTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4">
                  <CheckIcon />

                  <p className="text-base text-gray-700">{task.title}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

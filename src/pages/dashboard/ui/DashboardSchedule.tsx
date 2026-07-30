import ProgressIcon from "@/assets/dashboard/progress_bar.svg?react";
import InProgressIcon from "@/assets/dashboard/in_progress_bar.svg?react";
import ClockIcon from "@/assets/dashboard/clock_icon.svg?react";
import CheckIcon from "@/assets/dashboard/check_icon.svg?react";

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

const weekDays: WeekDay[] = [
  { day: "월", date: "18" },
  { day: "화", date: "19" },
  { day: "수", date: "20", active: true },
  { day: "목", date: "21" },
  { day: "금", date: "22" },
  { day: "토", date: "23" },
  { day: "일", date: "24" },
];

const schedules: ScheduleItem[] = [
  {
    id: "submit",
    title: "소장 제출 기한",
    date: "2026-05-17",
  },
  {
    id: "evidence",
    title: "증거 자료 정리",
    date: "2026-05-18",
  },
  {
    id: "brief",
    title: "준비 서면 작성",
    date: "2026-05-20",
    active: true,
  },
];

const completedTasks: CompletedTask[] = [
  {
    id: "evidence-submit",
    title: "증거자료 수집",
  },
  {
    id: "case-organize",
    title: "사건 정리",
  },
];

export default function DashboardSchedule() {
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
          <p className="text-sm font-medium text-gray-700">May 20, 2026</p>
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
                className={`text-sm font-medium ${
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
            {schedules.map((item) => {
              const TimelineIcon = item.active ? InProgressIcon : ProgressIcon;

              return (
                <div key={item.id} className="flex items-center gap-2.75">
                  <TimelineIcon className="shrink-0" />

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
                        {!item.active && <ClockIcon className="shrink-0" />}
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
            })}
          </div>

          <div className="h-px w-full bg-gray-200" />
        </div>

        {/* 완료된 작업 */}
        <div className="mt-2.5 flex flex-col gap-3.5">
          <h3 className="text-lg font-semibold text-gray-900">완료된 작업</h3>

          <div className="flex flex-col gap-3">
            {completedTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4">
                <CheckIcon />

                <p className="text-base font-medium text-gray-700">
                  {task.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

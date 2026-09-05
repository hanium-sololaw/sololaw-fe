import { Link } from "react-router-dom";
import type { UpcomingScheduleItem } from "../data/mockCaseDetail";

type UpcomingScheduleCardProps = {
  schedules: UpcomingScheduleItem[];
};

export default function UpcomingScheduleCard({
  schedules,
}: UpcomingScheduleCardProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">다가오는 일정</h2>
        <span className="text-sm font-semibold text-gray-400">
          {schedules.length}건
        </span>
      </div>

      {schedules.length === 0 ? (
        <p className="text-sm text-gray-400">예정된 일정이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {schedules.map((item) => (
            <li key={item.id} className="flex items-center gap-2.5">
              <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-500">
                {item.dDay}
              </span>
              <span className="truncate text-sm text-gray-700">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/schedule"
        className="self-start text-sm font-semibold text-blue-500 hover:text-blue-600"
      >
        준비사항 전체 →
      </Link>
    </section>
  );
}

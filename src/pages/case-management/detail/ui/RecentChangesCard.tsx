import type { ActivityLogItem } from "../model";

type RecentChangesCardProps = {
  activityLog: ActivityLogItem[];
};

export default function RecentChangesCard({
  activityLog,
}: RecentChangesCardProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">최근 변화</h2>
        <span className="text-xs text-gray-400">자동 기록</span>
      </div>

      {activityLog.length === 0 ? (
        <p className="py-4 text-center text-sm text-gray-400">
          아직 기록된 변화가 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {activityLog.map((item) => (
            <li key={item.id} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />

              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {item.title}
                </p>
                <p className="truncate text-xs text-gray-400">
                  {item.description}
                </p>
                <p className="text-xs text-gray-300">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

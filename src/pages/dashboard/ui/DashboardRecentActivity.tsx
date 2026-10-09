type RecentActivity = {
  id: string;
  title: string;
  description: string;
};

const recentActivities: RecentActivity[] = [
  {
    id: "cost",
    title: "소송비용 산출서 확인완료 (D-2)",
    description: "인지대 등 비용 산출 완료",
  },
  {
    id: "evidence",
    title: "증거 목록서 작성 완료 (D-7)",
    description: "주요증거 정리완료",
  },
  {
    id: "brief",
    title: "준비서면 제출 기한 안내 (D-7)",
    description: "변론 전 필수 서류 안내",
  },
];

export default function DashboardRecentActivity() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border border-gray-200
        bg-white
        p-6
        shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-8
          right-8
          bottom-3
          h-16
          rounded-[28px]
          bg-[linear-gradient(180deg,transparent_0%,#F6FAFF_35%,#E8F2FF_100%)]
          blur-2xl
          opacity-70
        "
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">최근 활동</h2>

          <button
            type="button"
            className="
      text-sm
      text-blue-400"
          >
            전체보기 →
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" />

              <div className="flex flex-col gap-0.75">
                <p className="text-base text-gray-800">
                  {activity.title}
                </p>

                <p className="text-sm font-normal text-gray-400">
                  {activity.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

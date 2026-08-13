import DocumentIcon from "@/assets/icons/mypage/document-icon.svg?react";
import DataIcon from "@/assets/icons/mypage/folder-icon.svg?react";
import CalendarIcon from "@/assets/icons/mypage/calendar-icon.svg?react";
import { myProfile } from "../data/mockMyPage";

const statItems = [
  {
    icon: DocumentIcon,
    value: myProfile.stats.documents,
    label: "생성한 문서",
  },
  { icon: DataIcon, value: myProfile.stats.evidence, label: "등록한 증거" },
  {
    icon: CalendarIcon,
    value: myProfile.stats.schedules,
    label: "등록한 일정",
  },
];

export default function ProfileCard() {
  return (
    <section className="flex flex-col items-center gap-4 rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-19 w-19 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-500">
            {myProfile.name.slice(0, 1)}
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="text-lg leading-[1.6] font-bold text-gray-900">
                {myProfile.name}
              </span>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500">
                {myProfile.plan}
              </span>
            </div>
            <p className="text-sm leading-[1.6] font-medium text-gray-500">
              {myProfile.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
        >
          프로필 수정
        </button>
      </div>

      <div className="mt-1.25 grid w-full grid-cols-3 gap-2">
        {statItems.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <Icon />
            <span className="text-lg font-bold text-gray-900">{value}건</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

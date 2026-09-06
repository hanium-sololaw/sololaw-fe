import { Link } from "react-router-dom";
import CheckIcon from "@/assets/icons/mypage/check-active-icon.svg?react";
import type { ChecklistItem } from "../model";

type PetitionChecklistCardProps = {
  items: ChecklistItem[];
};

export default function PetitionChecklistCard({
  items,
}: PetitionChecklistCardProps) {
  const doneCount = items.filter((item) => item.done).length;

  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">소장에 필요한 것</h2>
        <span className="text-sm font-semibold text-gray-400">
          {doneCount}/{items.length}
        </span>
      </div>

      <p className="text-xs text-gray-400">등록된 사건 정보 기준입니다. 사실관계는 소장에서 확인해 주세요.</p>
      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 ${
              item.done
                ? "border-blue-100 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            {item.done ? (
              <CheckIcon className="h-4 w-4 shrink-0 text-blue-500" />
            ) : (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">
                {item.done === null ? "?" : "—"}
              </span>
            )}
            <span
              className={`text-sm font-semibold ${
                item.done ? "text-blue-700" : "text-gray-700"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <Link to="/document/complaint"
        className="self-start text-sm font-semibold text-blue-500 hover:text-blue-600"
      >
        소장 이어서 쓰기 →
      </Link>
    </section>
  );
}

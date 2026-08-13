import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";
import { accountSettingItems } from "../data/mockMyPage";

export default function AccountSettings() {
  return (
    <section className="flex flex-col gap-5 rounded-[20px] border border-gray-200 bg-white px-5 pt-5 pb-3">
      <h2 className="text-lg font-semibold text-gray-900">계정 설정</h2>

      <div className="flex flex-col divide-y divide-gray-100">
        {accountSettingItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="flex items-center justify-between px-2 py-3.5 text-left"
          >
            <span className="text-sm font-medium text-gray-700">
              {item.label}
            </span>

            <ChevronRightIcon />
          </button>
        ))}
      </div>
    </section>
  );
}

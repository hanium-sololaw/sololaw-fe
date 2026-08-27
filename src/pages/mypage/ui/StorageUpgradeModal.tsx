import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import CheckIcon from "@/assets/icons/mypage/check-icon.svg?react";
import CheckActiveIcon from "@/assets/icons/mypage/check-active-icon.svg?react";
import { storagePlans } from "../data/mockMyPage";

type StorageUpgradeModalProps = {
  onClose: () => void;
};

export default function StorageUpgradeModal({
  onClose,
}: StorageUpgradeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-[1000px] flex-col gap-4.5 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-gray-700">
              저장공간 늘리기
            </h2>
            <p className="text-sm text-gray-500">
              기본 500MB에서 시작하며, 필요한 만큼 증빙자료 보관 용량을 늘릴 수
              있어요.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-3">
          {storagePlans.map((plan) =>
            plan.highlighted ? (
              <div
                key={plan.id}
                className="flex flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[inset_0_6px_6px_-2px_rgba(35,101,255,0.15),inset_0_-20px_20px_-6px_rgba(255,255,255,0.40),inset_0_-40px_10px_-8px_rgba(0,77,255,0.50),inset_0_-80px_60px_-25px_#144CCD]"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-400">
                      {plan.title}
                    </span>
                    {plan.badge && (
                      <span className="rounded-full bg-blue-300 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="border-b border-blue-100 pb-3">
                    <span className="text-[28px] font-bold text-blue-400">
                      {plan.capacity}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm leading-[1.6] font-medium text-gray-500">
                    {plan.description}
                  </p>

                  <ul className="flex flex-col gap-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm font-medium text-blue-300"
                      >
                        <CheckActiveIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-700">
                    {plan.price}
                  </span>

                  <button
                    type="button"
                    className="w-full rounded-[10px] bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    {plan.actionLabel}
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={plan.id}
                className="flex flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[inset_0_6px_6px_-2px_rgba(101,106,118,0.15),inset_0_-20px_20px_-6px_rgba(255,255,255,0.49),inset_0_-40px_100px_-8px_rgba(212,212,212,0.40),inset_0_-80px_60px_-25px_#FFF]"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-600">
                      {plan.title}
                    </span>
                    {plan.badge && (
                      <span className="text-xs font-base text-blue-300">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-[28px] font-bold text-gray-900">
                      {plan.capacity}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm leading-[1.6] font-medium text-gray-500">
                    {plan.description}
                  </p>

                  <ul className="flex flex-col gap-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500"
                      >
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-700">
                    {plan.price}
                  </span>

                  <button
                    type="button"
                    disabled={plan.current}
                    className={`w-full rounded-[10px] py-3 text-sm font-bold ${
                      plan.current
                        ? "bg-gray-100 text-gray-500"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {plan.actionLabel}
                  </button>
                </div>
              </div>
            ),
          )}
        </div>

        <p className="text-start font-normal text-sm text-gray-400">
          언제든 해지 가능 · 부가세(VAT표시) 가격은 부가세 포함 기준이며 결제와
          해지는 Stripe에서 안전하게 처리됩니다.
          <br />
          구독 해지 후 사용량이 500MB를 넘으면 기존 파일은 유지되지만 새 파일을
          올릴 수 없습니다.
        </p>
      </div>
    </div>
  );
}

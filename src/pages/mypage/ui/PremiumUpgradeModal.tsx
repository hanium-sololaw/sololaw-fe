import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import CheckIcon from "@/assets/icons/mypage/check-icon.svg?react";

type PremiumUpgradeModalProps = {
  onClose: () => void;
};

const freeFeatures = [
  "유사 판례 상위 5건",
  "아카이브 저장공간 2GB 제공",
  "기본 판례·법령 검색",
  "일정·증거 관리",
];

const premiumFeatures = [
  "유사 판례 무제한 + AI 상세 분석",
  "아카이브 저장공간 30GB 제공",
  "전자소송 연동 제출",
  "판례 원문·인용 무제한",
  "우선 고객 지원",
];

export default function PremiumUpgradeModal({
  onClose,
}: PremiumUpgradeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-gray-700">
              프리미엄으로 전환
            </h2>
            <p className="text-sm text-gray-500">
              유사 판례 무제한 분석과 무제한 문서 생성을 이용하세요.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="grid grid-cols-1 items-center gap-3.5 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-[14px] border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-gray-600">무료</span>

              <div className="flex items-end gap-1 border-b border-gray-100 pb-3">
                <span className="text-[28px] font-bold text-gray-900">₩0</span>
                <span className="pb-1 text-sm text-gray-500">/월</span>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {freeFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm font-medium text-gray-800"
                >
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              disabled
              className="w-full rounded-[10px] bg-gray-100 py-3 text-sm font-bold text-gray-500"
            >
              현재 이용 중
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[inset_0_6px_6px_-2px_rgba(35,101,255,0.15),inset_0_-20px_20px_-6px_rgba(255,255,255,0.40),inset_0_-40px_10px_-8px_rgba(0,77,255,0.50),inset_0_-80px_60px_-25px_#144CCD]">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-400">
                  프리미엄
                </span>
                <span className="rounded-full bg-blue-300 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  추천
                </span>
              </div>

              <div className="flex items-end gap-1 border-b border-blue-400 pb-3">
                <span className="text-[28px] font-bold text-blue-400">
                  ₩9,900
                </span>
                <span className="pb-1 text-sm text-blue-200">/월</span>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {premiumFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500"
                >
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="w-full rounded-[10px] bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              프리미엄 시작하기
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          언제든 해지 가능 · 부가세(VAT) 포함 · 결제 즉시 적용
        </p>
      </div>
    </div>
  );
}

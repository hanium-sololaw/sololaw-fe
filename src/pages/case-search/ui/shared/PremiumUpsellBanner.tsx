import Icon from "@/shared/ui/Icon";
import LockIcon from "@/assets/icons/case-search/lock-icon.svg?react";
import CrownIcon from "@/assets/icons/case-search/crown-icon.svg?react";
import { useModal } from "@/shared/hooks/useModal";
import PremiumUpgradeModal from "@/pages/mypage/ui/PremiumUpgradeModal";

type PremiumUpsellBannerProps = {
  remainingCount: number;
};

export default function PremiumUpsellBanner({ remainingCount }: PremiumUpsellBannerProps) {
  const premiumModal = useModal();

  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl border border-blue-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <Icon icon={LockIcon} size={22} className="text-blue-400" />
          <div>
            <p className="font-semibold text-blue-400">유사 판례 {remainingCount}건이 더 있어요</p>
            <p className="text-sm text-gray-400">관련성 보통</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={premiumModal.open}
            className="flex items-center gap-1.5 rounded-xl border border-[#C9E2FF] bg-[rgba(232,243,255,0.34)] px-[18px] py-3 text-sm font-semibold text-blue-400"
          >
            <Icon icon={CrownIcon} size={15} />
            프리미엄으로 전체 보기 →
          </button>
          <p className="text-xs text-gray-400">월 9,900원 · 언제든 해지</p>
        </div>
      </div>

      {premiumModal.isOpen && <PremiumUpgradeModal onClose={premiumModal.close} />}
    </>
  );
}

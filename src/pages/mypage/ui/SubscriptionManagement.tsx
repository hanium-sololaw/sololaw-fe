import { useModal } from "@/shared/hooks/useModal";
import { subscriptionItems } from "../data/mockMyPage";
import PremiumUpgradeModal from "./PremiumUpgradeModal";
import StorageUpgradeModal from "./StorageUpgradeModal";

export default function SubscriptionManagement() {
  const premiumModal = useModal();
  const storageModal = useModal();

  const handleAction = (id: string) => {
    if (id === "caseSearch") {
      premiumModal.open();
    } else if (id === "storage") {
      storageModal.open();
    }
  };

  return (
    <section className="flex flex-col gap-5 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-900">구독 관리</h2>
        <p className="text-sm text-gray-500">
          저장공간과 판례검색 이용권은 서로 별도로 결제·해지됩니다.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {subscriptionItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {item.title}
                </span>
                <span className="text-xs font-semibold text-blue-400">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>

            <button
              type="button"
              onClick={() => handleAction(item.id)}
              className="shrink-0 rounded-lg bg-gray-100 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
            >
              {item.actionLabel}
            </button>
          </div>
        ))}
      </div>

      {premiumModal.isOpen && (
        <PremiumUpgradeModal onClose={premiumModal.close} />
      )}
      {storageModal.isOpen && (
        <StorageUpgradeModal onClose={storageModal.close} />
      )}
    </section>
  );
}

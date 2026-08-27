import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";
import { useModal } from "@/shared/hooks/useModal";
import { accountSettingItems } from "../data/mockMyPage";
import ChangePasswordModal from "./ChangePasswordModal";
import TermsModal from "./TermsModal";
import PrivacyModal from "./PrivacyModal";

export default function AccountSettings() {
  const navigate = useNavigate();
  const passwordModal = useModal();
  const termsModal = useModal();
  const privacyModal = useModal();

  const handleClick = (id: string) => {
    if (id === "password") {
      passwordModal.open();
    } else if (id === "notification") {
      navigate("/mypage/notifications");
    } else if (id === "terms") {
      termsModal.open();
    } else if (id === "privacy") {
      privacyModal.open();
    }
  };

  return (
    <section className="flex flex-col gap-5 rounded-[20px] border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-gray-900">계정 설정</h2>

      <div className="flex flex-col gap-4">
        {accountSettingItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            className="flex items-center justify-between gap-3 text-left"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-gray-900">
                {item.label}
              </span>
              <span className="text-sm text-gray-500">
                {item.description}
              </span>
            </div>

            <ChevronRightIcon className="shrink-0" />
          </button>
        ))}
      </div>

      {passwordModal.isOpen && (
        <ChangePasswordModal onClose={passwordModal.close} />
      )}
      {termsModal.isOpen && <TermsModal onClose={termsModal.close} />}
      {privacyModal.isOpen && (
        <PrivacyModal onClose={privacyModal.close} />
      )}
    </section>
  );
}

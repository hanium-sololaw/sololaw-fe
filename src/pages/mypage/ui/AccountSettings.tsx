import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";
import { useModal } from "@/shared/hooks/useModal";
import { accountSettingItems } from "../data/mockMyPage";
import ChangePasswordModal from "./ChangePasswordModal";

export default function AccountSettings() {
  const navigate = useNavigate();
  const passwordModal = useModal();

  const handleClick = (id: string) => {
    if (id === "password") {
      passwordModal.open();
    } else if (id === "notification") {
      navigate("/mypage/notifications");
    }
  };

  return (
    <section className="flex flex-col gap-5 rounded-[20px] border border-gray-200 bg-white px-5 pt-5 pb-3">
      <h2 className="text-lg font-semibold text-gray-900">계정 설정</h2>

      <div className="flex flex-col divide-y divide-gray-100">
        {accountSettingItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            className="flex items-center justify-between px-2 py-3.5 text-left"
          >
            <span className="text-sm font-medium text-gray-700">
              {item.label}
            </span>

            <ChevronRightIcon />
          </button>
        ))}
      </div>

      {passwordModal.isOpen && (
        <ChangePasswordModal onClose={passwordModal.close} />
      )}
    </section>
  );
}

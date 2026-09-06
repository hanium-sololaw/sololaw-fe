import { useState } from "react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import { updateMyPassword } from "../api/updateMyPassword";

type ChangePasswordModalProps = {
  onClose: () => void;
};

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export default function ChangePasswordModal({
  onClose,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!currentPassword) {
      setError("현재 비밀번호를 입력해주세요.");
      return;
    }
    if (!PASSWORD_RULE.test(newPassword)) {
      setError("새 비밀번호는 8자 이상, 영문+숫자 조합이어야 해요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않아요.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await updateMyPassword({ currentPassword, newPassword });
      onClose();
    } catch {
      setError("비밀번호를 변경하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-modal className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">비밀번호 변경</h2>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="현재 비밀번호"
            className="w-full rounded-[10px] border border-gray-200 px-4 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-500 focus:border-blue-400"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="새 비밀번호 (8자 이상, 영문+숫자 조합)"
            className="w-full rounded-[10px] border border-gray-200 px-4 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-500 focus:border-blue-400"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="새 비밀번호 확인"
            className="w-full rounded-[10px] border border-gray-200 px-4 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-500 focus:border-blue-400"
          />
        </div>

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] border border-gray-300 px-4.5 py-2.5 text-sm font-semibold text-gray-700"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-[10px] bg-blue-300 px-4.5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isSubmitting ? "변경하는 중..." : "변경하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

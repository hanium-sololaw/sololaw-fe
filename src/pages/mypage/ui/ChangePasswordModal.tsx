import { useState } from "react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";

type ChangePasswordModalProps = {
  onClose: () => void;
};

export default function ChangePasswordModal({
  onClose,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
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
            placeholder="새 비밀번호 (6자 이상)"
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
            className="rounded-[10px] bg-blue-300 px-4.5 py-2.5 text-sm font-semibold text-white"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import CheckCircleIcon from "@/assets/icons/case-search/check-icon.svg?react";
import TermsModal from "@/pages/mypage/ui/TermsModal";
import { useModal } from "@/shared/hooks/useModal";

const notices = [
  <>
    본 서비스가 생성하는 문서·정보는 법률 자문이 아니라{" "}
    <span className="text-blue-400">참고용 초안</span>입니다.
  </>,
  <>
    최종 판단과 책임은 이용자 본인에게 있으며, 제출 전{" "}
    <span className="text-blue-400">반드시 검토·수정</span>해야 합니다.
  </>,
  <>관할 법원·제출 기한 등 중요한 사항은 반드시 직접 확인하세요.</>,
  <span className="text-blue-400">
    복잡하거나 중요한 사안은 변호사 등 전문가 상담하세요.
  </span>,
];

type DashboardNoticeModalProps = {
  onAgree: () => void;
};

export default function DashboardNoticeModal({
  onAgree,
}: DashboardNoticeModalProps) {
  const [checked, setChecked] = useState(false);
  const termsModal = useModal();

  return (
    <div
      data-modal
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-notice-title"
        className="flex w-full max-w-[574px] flex-col gap-6 rounded-2xl bg-white p-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            id="dashboard-notice-title"
            className="text-2xl font-bold text-blue-400"
          >
            시작하기 전에 꼭 확인하세요
          </h2>
          <p className="text-sm text-gray-500">
            나홀로법에는 변호사의{" "}
            <span className="font-medium text-blue-500">
              법률 자문을 대체하지 않는 자기소송 지원 도구
            </span>
            입니다.
          </p>
        </div>

        <ul className="flex flex-col gap-4 rounded-xl bg-gray-50 px-5 py-5">
          {notices.map((notice, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <CheckCircleIcon className="shrink-0" />
              <p>{notice}</p>
            </li>
          ))}
        </ul>

        <label className="flex cursor-pointer items-center gap-2.5 text-base font-semibold text-gray-800">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="peer sr-only"
          />
          <span className="flex h-5.5 w-5.5 items-center justify-center rounded-md bg-blue-50 text-white peer-checked:bg-blue-400 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-200">
            {checked && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7.25L5.75 10L11 4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          위 내용을 모두 이해했으며 이에 동의합니다.
        </label>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={termsModal.open}
            className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm text-gray-600 hover:bg-gray-50"
          >
            이용 범위 보기
          </button>

          <button
            type="button"
            disabled={!checked}
            onClick={onAgree}
            className="rounded-lg bg-blue-400 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-200"
          >
            동의하고 시작하기
          </button>
        </div>
      </div>

      {termsModal.isOpen && <TermsModal onClose={termsModal.close} />}
    </div>
  );
}

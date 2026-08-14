import UploadIcon from "@/assets/icons/schedule/upload-icon.svg?react";

export default function ScheduleHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          일정 관리
        </h1>
        <p className="text-sm text-gray-500">
          내 사건의 실제 기한과 법원 통지서 일정을 한곳에서 관리하세요.
        </p>
      </div>

      <button
        type="button"
        className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-400 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white hover:bg-blue-500"
      >
        <UploadIcon />
        법원 통지서 업로드
      </button>
    </div>
  );
}

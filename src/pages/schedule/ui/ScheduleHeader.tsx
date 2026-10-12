import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import UploadIcon from "@/assets/icons/schedule/upload-icon.svg?react";
import CourtNoticeUploadModal from "./CourtNoticeUploadModal";

type ScheduleHeaderProps = {
  onCreated: () => void;
};

export default function ScheduleHeader({ onCreated }: ScheduleHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  // ?upload=court-notice (e.g. from the notification settings notice) opens the upload modal on arrival
  const [isUploadOpen, setIsUploadOpen] = useState(
    searchParams.get("upload") === "court-notice",
  );

  const closeUpload = () => {
    setIsUploadOpen(false);
    if (searchParams.has("upload")) {
      const next = new URLSearchParams(searchParams);
      next.delete("upload");
      setSearchParams(next, { replace: true });
    }
  };

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
        onClick={() => setIsUploadOpen(true)}
        className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-300 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white hover:bg-blue-500"
      >
        <UploadIcon />
        법원 통지서 업로드
      </button>

      {isUploadOpen && (
        <CourtNoticeUploadModal onClose={closeUpload} onCreated={onCreated} />
      )}
    </div>
  );
}

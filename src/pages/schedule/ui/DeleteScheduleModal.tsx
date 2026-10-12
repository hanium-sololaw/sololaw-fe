import { useState } from "react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import { deleteSchedule } from "../api/deleteSchedule";
import type { ScheduleEvent } from "../data/mockSchedule";

type DeleteScheduleModalProps = {
  event: ScheduleEvent;
  onClose: () => void;
  onDeleted: () => void;
};

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${year}. ${Number(month)}. ${Number(day)}.`;
}

export default function DeleteScheduleModal({
  event,
  onClose,
  onDeleted,
}: DeleteScheduleModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      await deleteSchedule(Number(event.id));
      onDeleted();
    } catch {
      setError("일정을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.");
      setIsDeleting(false);
    }
  };

  return (
    <div data-modal className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-schedule-title"
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2
              id="delete-schedule-title"
              className="text-xl font-bold text-gray-900"
            >
              일정을 삭제할까요?
            </h2>
            <p className="text-sm text-gray-500">
              삭제하면 달력과 다가오는 일정에서 함께 사라집니다.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-1 rounded-xl bg-gray-50 px-4 py-3">
          <p className="text-sm font-semibold text-gray-900">{event.title}</p>
          <p className="text-xs text-gray-500">
            {[formatDate(event.date), event.caseName].filter(Boolean).join(" · ")}
          </p>
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
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-[10px] border border-red-400 px-4.5 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-60"
          >
            {isDeleting ? "삭제하는 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}

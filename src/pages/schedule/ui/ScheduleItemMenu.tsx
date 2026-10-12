import { useEffect, useRef, useState } from "react";
import MoreIcon from "@/assets/icons/schedule/more-icon.svg?react";
import type { ScheduleEvent } from "../data/mockSchedule";
import AddScheduleModal from "./AddScheduleModal";
import DeleteScheduleModal from "./DeleteScheduleModal";

type ScheduleItemMenuProps = {
  event: ScheduleEvent;
  onChanged: () => void;
};

/** "…" button with 수정/삭제, plus the modals those open. */
export default function ScheduleItemMenu({
  event,
  onChanged,
}: ScheduleItemMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<"edit" | "delete" | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (mouseEvent: MouseEvent) => {
      if (ref.current && !ref.current.contains(mouseEvent.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const openModal = (next: "edit" | "delete") => {
    setIsOpen(false);
    setModal(next);
  };

  const handleDone = () => {
    setModal(null);
    onChanged();
  };

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label="일정 메뉴"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-md p-0.5 hover:bg-gray-100 hover:text-gray-500 ${
          isOpen ? "bg-gray-100 text-gray-500" : "text-gray-300"
        }`}
      >
        <MoreIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-1 flex w-36 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-lg">
          <button
            type="button"
            onClick={() => openModal("edit")}
            disabled={!event.record}
            className="rounded-lg px-3 py-2.5 text-left text-sm text-gray-800 hover:bg-gray-50 disabled:text-gray-300"
          >
            수정
          </button>
          <div className="mx-2 border-t border-gray-100" />
          <button
            type="button"
            onClick={() => openModal("delete")}
            className="rounded-lg px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-50"
          >
            삭제
          </button>
        </div>
      )}

      {modal === "edit" && event.record && (
        <AddScheduleModal
          selectedDate={new Date(event.date)}
          schedule={event.record}
          onClose={() => setModal(null)}
          onCreated={handleDone}
        />
      )}

      {modal === "delete" && (
        <DeleteScheduleModal
          event={event}
          onClose={() => setModal(null)}
          onDeleted={handleDone}
        />
      )}
    </div>
  );
}

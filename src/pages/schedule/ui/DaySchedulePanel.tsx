import AddIcon from "@/assets/icons/schedule/add-icon.svg?react";
import CalendarIcon from "@/assets/icons/mypage/calendar-icon.svg?react";
import { useModal } from "@/shared/hooks/useModal";
import type { ScheduleEvent } from "../data/mockSchedule";
import AddScheduleModal from "./AddScheduleModal";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

type DaySchedulePanelProps = {
  selectedDate: Date;
  events: ScheduleEvent[];
};

export default function DaySchedulePanel({
  selectedDate,
  events,
}: DaySchedulePanelProps) {
  const addModal = useModal();

  const label = `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${
    WEEKDAY_LABELS[selectedDate.getDay()]
  }요일`;

  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-gray-900">{label}</h2>

        <button
          type="button"
          onClick={addModal.open}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-500 hover:bg-blue-100"
        >
          <AddIcon />
          일정 추가
        </button>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <CalendarIcon className="h-6 w-6 text-gray-300" />
          <p className="text-sm text-gray-400">등록된 일정이 없습니다</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-gray-100 px-4 py-3"
            >
              <p className="text-sm font-semibold text-gray-900">
                {event.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {addModal.isOpen && (
        <AddScheduleModal
          selectedDate={selectedDate}
          onClose={addModal.close}
        />
      )}
    </section>
  );
}

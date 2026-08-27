import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import CheckButtonIcon from "@/assets/icons/mypage/check-button.svg?react";
import ChevronDownIcon from "@/assets/icons/home/arrow-bottom.svg?react";
import CalendarIcon from "@/assets/icons/case-search/date-icon.svg?react";
import ClockIcon from "@/assets/icons/schedule/clock-icon.svg?react";
import { mockLawsuits } from "@/pages/guide/data/mockLawsuits";
import { toDateKey } from "../utils";

type AddScheduleModalProps = {
  selectedDate: Date;
  onClose: () => void;
};

const eventTypes = ["변론기일", "제출기한", "서류 준비", "상담", "기타"];
const notifyTimings = ["당일", "1일 전", "3일 전", "7일 전"];

function useOutsideClick(onOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOutside]);

  return ref;
}

type SelectFieldProps = {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  openUp?: boolean;
};

function SelectField({
  value,
  placeholder,
  options,
  onChange,
  openUp = false,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm outline-none focus:border-blue-400"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 max-h-56 w-full overflow-y-auto rounded-[14px] border border-gray-200 bg-white shadow-lg ${
            openUp ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function getCalendarCells(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(year, month, index - firstWeekday + 1);
    return { date, inMonth: date.getMonth() === month };
  });
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

type DateFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

function DateField({ value, onChange }: DateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() =>
    value ? new Date(value) : new Date(),
  );
  const ref = useOutsideClick(() => setIsOpen(false));

  const cells = getCalendarCells(viewDate);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm outline-none focus:border-blue-400"
      >
        <CalendarIcon className="h-4 w-4 shrink-0" />
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || "연도. 월. 일."}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900">
              {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setViewDate(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                  )
                }
                className="text-gray-400"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() =>
                  setViewDate(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                  )
                }
                className="text-gray-400"
              >
                ↓
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-y-2 text-center">
            {WEEKDAYS.map((day) => (
              <span key={day} className="text-xs font-medium text-gray-400">
                {day}
              </span>
            ))}

            {cells.map(({ date, inMonth }) => {
              const key = toDateKey(date);
              const isSelected = key === value;

              return (
                <button
                  key={key}
                  type="button"
                  disabled={!inMonth}
                  onClick={() => {
                    onChange(key);
                    setIsOpen(false);
                  }}
                  className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    isSelected
                      ? "bg-blue-400 font-semibold text-white"
                      : inMonth
                        ? "text-gray-900"
                        : "text-gray-200"
                  }`}
                >
                  {inMonth ? date.getDate() : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AddScheduleModal({
  selectedDate,
  onClose,
}: AddScheduleModalProps) {
  const [caseTitle, setCaseTitle] = useState("");
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState(toDateKey(selectedDate));
  const [time, setTime] = useState("");
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [notifyTiming, setNotifyTiming] = useState("1일 전");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">일정 추가</h2>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">사건</label>
          <SelectField
            value={caseTitle}
            placeholder="선택하세요"
            options={mockLawsuits.map((lawsuit) => lawsuit.title)}
            onChange={setCaseTitle}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">일정 제목</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="일정 제목을 입력하세요"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">일정 유형</label>
          <SelectField
            value={eventType}
            placeholder="선택하세요"
            options={eventTypes}
            onChange={setEventType}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">날짜</label>
            <DateField value={date} onChange={setDate} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              시간 <span className="font-medium text-gray-500">(선택)</span>
            </label>
            <div className="relative flex items-center">
              <ClockIcon className="pointer-events-none absolute left-4 h-4 w-4" />
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-10 text-sm text-gray-800 outline-none focus:border-blue-400 [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={() => setNotifyEnabled((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                notifyEnabled
                  ? "border-blue-400 bg-blue-400"
                  : "border-blue-50 bg-blue-50"
              }`}
            >
              {notifyEnabled && <CheckButtonIcon className="h-3.5 w-3.5" />}
            </span>
            <span className="text-sm font-semibold text-gray-800">
              알림 설정
            </span>
          </button>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800">
              알림 시간{" "}
              <span className="font-normal text-gray-400">(선택)</span>
            </label>
            <SelectField
              value={notifyTiming}
              placeholder="선택하세요"
              options={notifyTimings}
              onChange={setNotifyTiming}
              openUp
            />
          </div>
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
            onClick={onClose}
            className="rounded-[10px] bg-blue-400 px-4.5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            일정 추가하기
          </button>
        </div>
      </div>
    </div>
  );
}

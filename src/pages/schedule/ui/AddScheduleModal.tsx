import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import CheckButtonIcon from "@/assets/icons/mypage/check-button.svg?react";
import ChevronDownIcon from "@/assets/icons/home/arrow-bottom.svg?react";
import ClockIcon from "@/assets/icons/schedule/clock-icon.svg?react";
import DateField from "@/shared/ui/DateField";
import { listMyCases } from "@/shared/api/cases";
import { createSchedule } from "../api/createSchedule";
import { updateSchedule } from "../api/updateSchedule";
import type { ScheduleRecord } from "../api/types";
import {
  labelByValue,
  reminderValueByLabel,
  scheduleTypeByLabel,
} from "../lib/scheduleMapping";
import { toDateKey } from "../utils";

type AddScheduleModalProps = {
  selectedDate: Date;
  onClose: () => void;
  onCreated: () => void;
  /** when given, the modal edits this schedule instead of creating one */
  schedule?: ScheduleRecord;
};

const eventTypes = Object.keys(scheduleTypeByLabel);
const notifyTimings = Object.keys(reminderValueByLabel);

function toTimeInput(schedule?: ScheduleRecord): string {
  if (!schedule?.eventTime) return "";
  const { hour, minute } = schedule.eventTime;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

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
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm outline-none focus:border-blue-300"
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

type CaseOption = {
  id: number;
  title: string;
};

export default function AddScheduleModal({
  selectedDate,
  onClose,
  onCreated,
  schedule,
}: AddScheduleModalProps) {
  const isEdit = Boolean(schedule);
  const [caseOptions, setCaseOptions] = useState<CaseOption[]>([]);
  const [caseTitle, setCaseTitle] = useState("");
  const [title, setTitle] = useState(schedule?.title ?? "");
  const [eventType, setEventType] = useState(
    labelByValue(scheduleTypeByLabel, schedule?.scheduleType),
  );
  const [date, setDate] = useState(
    schedule?.eventDate ?? toDateKey(selectedDate),
  );
  const [time, setTime] = useState(toTimeInput(schedule));
  const [notifyEnabled, setNotifyEnabled] = useState(
    schedule?.reminderEnabled ?? false,
  );
  const [notifyTiming, setNotifyTiming] = useState(
    labelByValue(reminderValueByLabel, schedule?.reminderValue) || "1일 전",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const scheduleCaseId = schedule?.caseId;

  useEffect(() => {
    listMyCases({ size: 200 })
      .then((page) => {
        const options = page.content.map((item) => ({
          id: item.id,
          title: item.title,
        }));
        setCaseOptions(options);
        const current = options.find((item) => item.id === scheduleCaseId);
        if (current) setCaseTitle(current.title);
      })
      .catch(() => {
        // leave the case selector empty when the API call fails
      });
  }, [scheduleCaseId]);

  const handleSubmit = async () => {
    if (!title.trim() || !eventType || !date) {
      setSubmitError("일정 제목, 유형, 날짜는 필수예요.");
      return;
    }

    const selectedCase = caseOptions.find((item) => item.title === caseTitle);
    const [hour, minute] = time ? time.split(":").map(Number) : [];

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const body = {
        title: title.trim(),
        scheduleType: scheduleTypeByLabel[eventType],
        eventDate: date,
        eventTime:
          hour !== undefined && minute !== undefined
            ? { hour, minute, second: 0, nano: 0 }
            : undefined,
        reminderEnabled: notifyEnabled,
        reminderValue: notifyEnabled
          ? reminderValueByLabel[notifyTiming]
          : undefined,
        reminderUnit: notifyEnabled ? "DAY" : undefined,
      };

      if (schedule) {
        await updateSchedule(schedule.id, body);
      } else {
        await createSchedule({ ...body, caseId: selectedCase?.id });
      }
      onCreated();
    } catch {
      setSubmitError(
        `일정을 ${isEdit ? "수정" : "추가"}하지 못했어요. 잠시 후 다시 시도해주세요.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-modal className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? "일정 수정" : "일정 추가"}
            </h2>
            {isEdit && (
              <p className="text-sm text-gray-500">
                바뀐 내용은 선택한 사건의 일정에 바로 반영됩니다.
              </p>
            )}
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">
            사건{" "}
            <span className="font-medium text-gray-400">
              {isEdit ? "(수정 불가)" : "(선택)"}
            </span>
          </label>
          {isEdit ? (
            // the update API has no caseId, so the case is shown read-only
            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
              {caseTitle || "사건 없음"}
            </div>
          ) : (
            <SelectField
              value={caseTitle}
              placeholder="선택하세요"
              options={caseOptions.map((item) => item.title)}
              onChange={setCaseTitle}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">일정 제목</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="일정 제목을 입력하세요"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-300"
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
                className="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-10 text-sm text-gray-800 outline-none focus:border-blue-300 [&::-webkit-calendar-picker-indicator]:opacity-0"
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
                  ? "border-blue-300 bg-blue-300"
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

        {submitError && (
          <p className="text-xs font-medium text-red-500">{submitError}</p>
        )}

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
            className="rounded-[10px] bg-blue-300 px-4.5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {isSubmitting
              ? isEdit
                ? "수정하는 중..."
                : "추가하는 중..."
              : isEdit
                ? "수정하기"
                : "일정 추가하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

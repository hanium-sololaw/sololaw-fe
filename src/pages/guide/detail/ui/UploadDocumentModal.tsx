import { useRef, useState } from "react";

import DocumentIcon from "@/assets/icons/shared/document-icon.svg?react";
import CalendarIcon from "@/assets/icons/case-search/date-icon.svg?react";
import ChevronDownIcon from "@/assets/icons/home/arrow-bottom.svg?react";
import AboutIcon from "@/assets/icons/case-search/about-icon.svg?react";
import type { SubmittedDocument } from "../data/mockGuideDetail";

type UploadDocumentModalProps = {
  caseTitle: string;
  documents: SubmittedDocument[];
  onClose: () => void;
};

type DocumentTypeSelectProps = {
  options: SubmittedDocument[];
  value: string;
  onChange: (id: string) => void;
};

function DocumentTypeSelect({
  options,
  value,
  onChange,
}: DocumentTypeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((option) => option.id === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-[10px] border border-gray-200 p-6 text-left text-sm text-gray-800 outline-none focus:border-blue-400"
      >
        <span>{selected?.title}</span>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-lg">
          {options.map((option) => {
            const isSelected = option.id === value;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-6 py-5 text-left text-sm font-medium ${
                  isSelected
                    ? "bg-blue-50 text-blue-500"
                    : "bg-white text-gray-900"
                }`}
              >
                {option.title}
                {option.submitted && " (제출완료)"}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCalendarCells(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(year, month, index - firstWeekday + 1);
    return { date, inMonth: date.getMonth() === month };
  });
}

type DeadlineDatePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

function DeadlineDatePicker({ value, onChange }: DeadlineDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() =>
    value ? new Date(value) : new Date(),
  );

  const cells = getCalendarCells(viewDate);

  const goToPrevMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const goToNextMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm outline-none focus:border-blue-400"
      >
        <CalendarIcon className="h-4 w-4 shrink-0 text-gray-400" />
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || "날짜 선택"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-base font-semibold text-gray-900">
              {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
              <ChevronDownIcon className="h-3 w-3 text-gray-400" />
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrevMonth}
                className="text-gray-400"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={goToNextMonth}
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
                  onClick={() => {
                    onChange(key);
                    setIsOpen(false);
                  }}
                  className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    isSelected
                      ? "bg-blue-500 font-semibold text-white"
                      : inMonth
                        ? "text-gray-900"
                        : "text-gray-300"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm font-medium text-blue-500">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
            >
              삭제
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                onChange(toDateKey(today));
                setViewDate(today);
                setIsOpen(false);
              }}
            >
              오늘
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const notices = [
  "서류는 법원 제출용으로 원본과 동일해야 합니다",
  "제출 기한을 반드시 확인하세요",
  "서명 및 날인이 필요한 서류는 완료 후 업로드하세요",
];

export default function UploadDocumentModal({
  caseTitle,
  documents,
  onClose,
}: UploadDocumentModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [documentTypeId, setDocumentTypeId] = useState("");
  const [deadline, setDeadline] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="scrollbar-none flex max-h-[90vh] w-full max-w-200 flex-col gap-5 overflow-y-auto rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">서류 업로드</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400"
          >
            &times;
          </button>
        </div>

        <p className="rounded-full bg-blue-50 px-4 py-3 text-sm font-medium text-blue-300">
          <span className="font-bold">{caseTitle}</span>에 대한 서류를
          업로드합니다.
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">
            서류 종류
          </label>
          <DocumentTypeSelect
            options={documents}
            value={documentTypeId}
            onChange={setDocumentTypeId}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">
            파일 업로드
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-[14px] border border-gray-200 bg-gray-50 py-10 text-center"
          >
            <DocumentIcon className="h-12 w-12 text-gray-500" />
            <span className="text-base text-gray-600">
              {fileName ?? "파일을 드래그하거나 클릭하여 업로드"}
            </span>
            <span className="text-sm text-gray-500">PDF, DOCX (최대 10MB)</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(event) =>
              setFileName(event.target.files?.[0]?.name ?? null)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">
            제출 기한
          </label>
          <DeadlineDatePicker value={deadline} onChange={setDeadline} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">
            메모 (선택사항)
          </label>
          <textarea
            rows={3}
            placeholder="서류에 대한 추가 메모를 입력하세요"
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-blue-50 p-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-blue-700">
            <AboutIcon className="h-4 w-4" />
            주의사항
          </p>
          <ul className="flex flex-col gap-1 pl-1">
            {notices.map((notice) => (
              <li
                key={notice}
                className="flex items-start gap-2 text-sm text-blue-600"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                {notice}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-500"
          >
            취소
          </button>
          <button
            type="button"
            className="rounded-[10px] bg-blue-50 border border-blue-100 px-6 py-3 text-sm font-semibold text-blue-400"
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  );
}

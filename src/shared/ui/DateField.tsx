import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import CalendarIcon from "@/assets/icons/case-search/date-icon.svg?react";

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
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(year, month, index - firstWeekday + 1);
    return { date, inMonth: date.getMonth() === month };
  });
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const defaultTriggerClassName =
  "flex w-full items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm outline-none focus:border-blue-400";

type DateFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  triggerClassName?: string;
  valueTextClassName?: string;
  placeholderTextClassName?: string;
  openUp?: boolean;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconPosition?: "left" | "right";
};

export default function DateField({
  value,
  onChange,
  placeholder = "연도. 월. 일.",
  triggerClassName = defaultTriggerClassName,
  valueTextClassName = "text-gray-800",
  placeholderTextClassName = "text-gray-400",
  openUp = false,
  icon: Icon = CalendarIcon,
  iconPosition = "left",
}: DateFieldProps) {
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
        className={triggerClassName}
      >
        {iconPosition === "left" && <Icon className="h-4 w-4 shrink-0" />}
        <span className={value ? valueTextClassName : placeholderTextClassName}>
          {value || placeholder}
        </span>
        {iconPosition === "right" && <Icon className="h-4 w-4 shrink-0" />}
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg ${
            openUp ? "bottom-full mb-2" : "mt-2"
          }`}
        >
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

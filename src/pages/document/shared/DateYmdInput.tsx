import { useState } from "react";
import Icon from "@/shared/ui/Icon";
import ChevronRightIcon from "@/assets/icons/document/chevron-right-icon.svg?react";

const selectCls =
  "appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-2 pr-6 text-sm text-gray-800 outline-none transition focus:border-blue-400";

function Chevron() {
  return (
    <Icon
      icon={ChevronRightIcon}
      size={12}
      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-400"
    />
  );
}
const yearCls =
  "w-20 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-center text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400";

const pad2 = (n: number) => String(n).padStart(2, "0");
const MONTHS = Array.from({ length: 12 }, (_, i) => pad2(i + 1));
const DAYS = Array.from({ length: 31 }, (_, i) => pad2(i + 1));

type DateParts = { y: string; mo: string; d: string };

function parseParts(value: string): DateParts {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? { y: match[1], mo: match[2], d: match[3] } : { y: "", mo: "", d: "" };
}

function compose(parts: DateParts): string {
  return parts.y.length === 4 && parts.mo && parts.d ? `${parts.y}-${parts.mo}-${parts.d}` : "";
}

type DateYmdInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DateYmdInput({ value, onChange }: DateYmdInputProps) {
  const [local, setLocal] = useState<DateParts>(() => parseParts(value));
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setLocal(parseParts(value));
  }

  const update = (next: DateParts) => {
    setLocal(next);
    setPrevValue(compose(next));
    onChange(compose(next));
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <input
        inputMode="numeric"
        maxLength={4}
        placeholder="YYYY"
        value={local.y}
        onChange={(e) => update({ ...local, y: e.target.value.replace(/[^0-9]/g, "").slice(0, 4) })}
        className={yearCls}
      />
      <span className="text-sm text-gray-400">년</span>
      <div className="relative">
        <select value={local.mo} onChange={(e) => update({ ...local, mo: e.target.value })} className={selectCls}>
          <option value="">월</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {Number(m)}
            </option>
          ))}
        </select>
        <Chevron />
      </div>
      <span className="text-sm text-gray-400">월</span>
      <div className="relative">
        <select value={local.d} onChange={(e) => update({ ...local, d: e.target.value })} className={selectCls}>
          <option value="">일</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {Number(d)}
            </option>
          ))}
        </select>
        <Chevron />
      </div>
      <span className="text-sm text-gray-400">일</span>
    </div>
  );
}

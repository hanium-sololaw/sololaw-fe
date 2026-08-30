import { useState } from "react";
import Icon from "@/shared/ui/Icon";
import ChevronRightIcon from "@/assets/icons/document/chevron-right-icon.svg?react";
import { COURT_GROUPS } from "./courts";

const selectCls =
  "w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-gray-800 outline-none transition focus:border-blue-400";

const regionOf = (court: string) => COURT_GROUPS.find((group) => group.courts.includes(court))?.region ?? "";

function Chevron() {
  return (
    <Icon
      icon={ChevronRightIcon}
      size={14}
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-gray-400"
    />
  );
}

type CourtSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CourtSelect({ value, onChange }: CourtSelectProps) {
  const [region, setRegion] = useState(() => regionOf(value));
  const courts = COURT_GROUPS.find((group) => group.region === region)?.courts ?? [];

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div className="relative">
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            onChange("");
          }}
          className={selectCls}
        >
          <option value="">지역 선택</option>
          {COURT_GROUPS.map((group) => (
            <option key={group.region} value={group.region}>
              {group.region}
            </option>
          ))}
        </select>
        <Chevron />
      </div>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!region}
          className={`${selectCls} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400`}
        >
          <option value="">{region ? "법원 선택" : "지역을 먼저 선택해주세요"}</option>
          {courts.map((court) => (
            <option key={court} value={court}>
              {court}
            </option>
          ))}
        </select>
        <Chevron />
      </div>
    </div>
  );
}

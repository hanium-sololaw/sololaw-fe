import HomeIcon from "@/assets/icons/case-search/home-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import type { MyCase } from "../data/myCases";

type SelectedCaseBarProps = {
  caseItem: MyCase;
  onChange: () => void;
};

export default function SelectedCaseBar({
  caseItem,
  onChange,
}: SelectedCaseBarProps) {
  return (
    <section className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Icon icon={HomeIcon} size={16} />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm text-gray-400">분석 기준 사건</p>
          <p className="font-semibold text-gray-900">
            {caseItem.title} · {caseItem.caseNumber}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChange}
        className="shrink-0 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
      >
        변경
      </button>
    </section>
  );
}

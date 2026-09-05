import HomeIcon from "@/assets/icons/case-search/home-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import type { Case } from "@/shared/api/cases";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

type SelectedCaseBarProps = {
  caseItem: Case;
};

export default function SelectedCaseBar({ caseItem }: SelectedCaseBarProps) {
  const editCase = useCaseSearchStore((state) => state.editCase);
  const deleteSelectedCase = useCaseSearchStore((state) => state.deleteSelectedCase);

  const handleDelete = () => {
    if (!window.confirm(`"${caseItem.title}" 사건을 삭제할까요? 당사자·절차 단계·할 일도 함께 삭제됩니다.`)) return;
    void deleteSelectedCase();
  };

  return (
    <section className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Icon icon={HomeIcon} size={16} />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-sm text-gray-500">분석 기준 사건</p>
          <p className="truncate font-semibold text-gray-900">
            {caseItem.title} · {caseItem.caseNumber}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={editCase}
          className="rounded-[8px] px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-500"
        >
          변경
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-[8px] px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-500"
        >
          삭제
        </button>
      </div>
    </section>
  );
}

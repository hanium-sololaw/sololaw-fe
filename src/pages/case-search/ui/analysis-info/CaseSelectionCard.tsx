import Dropdown from "@/shared/ui/Dropdown";
import type { Case, CaseType } from "@/shared/api/cases";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

const CASE_TYPE_LABEL: Record<CaseType, string> = {
  LOAN: "대여금",
  DEPOSIT: "임대차보증금",
  WAGE: "임금",
  TORT: "손해배상",
  EVICTION: "명도",
};

function CaseOption({ item }: { item: Case }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-sm font-semibold text-gray-700">{item.title}</p>
      <p className="text-xs font-medium text-gray-400">
        {item.caseNumber} · {CASE_TYPE_LABEL[item.caseType]}
      </p>
    </div>
  );
}

export default function CaseSelectionCard() {
  const cases = useCaseSearchStore((state) => state.myCases);
  const selectedId = useCaseSearchStore((state) => state.selectedCaseId);
  const onSelect = useCaseSearchStore((state) => state.selectCase);
  const onConfirm = useCaseSearchStore((state) => state.confirmCase);

  const findCase = (id: number) => cases.find((item) => item.id === id)!;

  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-blue-50 text-base font-semibold text-blue-300">
            1
          </span>
          분석할 내 사건 선택
        </h2>
        <span className="rounded-xl bg-blue-50 px-3 py-1 text-[13px] font-semibold text-blue-500">
          AI 분석
        </span>
      </div>

      {selectedId !== null && (
        <Dropdown<number>
          value={selectedId}
          options={cases.map((item) => item.id)}
          onChange={onSelect}
          renderValue={(id) => <CaseOption item={findCase(id)} />}
          renderOption={(id) => <CaseOption item={findCase(id)} />}
          placeholder="사건을 선택해주세요"
          triggerClassName="rounded-[10px] px-4 py-2.5"
        />
      )}

      <p className="text-xs font-medium tracking-[-0.3px] text-gray-400">
        선택한 사건의 쟁점을 분석해 관련도 높은 판례와 승소율(표본)을
        보여드려요.
      </p>

      <button
        type="button"
        onClick={onConfirm}
        className="flex w-full items-center justify-center gap-1 rounded-lg bg-blue-300 px-5 py-3 text-sm font-semibold text-gray-50"
      >
        선택 완료
        <svg
          className="h-4 w-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3l5 5-5 5" />
        </svg>
      </button>
    </section>
  );
}

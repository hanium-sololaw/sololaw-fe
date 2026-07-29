import { myCases } from "../data/myCases";

type CaseSelectionCardProps = {
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirm: () => void;
};

export default function CaseSelectionCard({
  selectedId,
  onSelect,
  onConfirm,
}: CaseSelectionCardProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-8">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-500">
            1
          </span>
          분석할 내 사건 선택
        </h2>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-500">
          AI 분석
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {myCases.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left ${
                selected
                  ? "border-2 border-dashed border-blue-400 bg-blue-50/50"
                  : "border-gray-200"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected ? "border-blue-400" : "border-gray-300"
                }`}
              >
                {selected && (
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                )}
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-400">
                  {item.caseNumber} · {item.type}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-400">
        선택한 사건의 쟁점을 분석해 관련도 높은 판례와 승소율(표본)을
        보여드려요.
      </p>

      <button
        type="button"
        onClick={onConfirm}
        className="w-full rounded-xl bg-blue-400 py-3.5 text-base font-medium text-white"
      >
        선택 완료
      </button>
    </section>
  );
}

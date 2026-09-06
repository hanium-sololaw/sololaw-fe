import { inputCls } from "../../shared/formStyles";
import { emptyCitedPrecedent, type CitedPrecedent } from "../lib/types";

type PrecedentsStepProps = {
  precedents: CitedPrecedent[];
  onChange: (precedents: CitedPrecedent[]) => void;
};

export default function PrecedentsStep({ precedents, onChange }: PrecedentsStepProps) {
  const update = (index: number, key: "caseNo" | "summary", value: string) =>
    onChange(precedents.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
  const add = () => onChange([...precedents, emptyCitedPrecedent()]);
  const remove = (index: number) => onChange(precedents.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">인용할 판례 (선택)</span>
        <button
          type="button"
          onClick={add}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
        >
          + 판례 추가
        </button>
      </div>

      {precedents.length === 0 && (
        <p className="mt-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-400">
          인용할 판례가 있으면 추가해주세요. 없어도 신청서를 완성할 수 있어요.
        </p>
      )}

      {precedents.map((precedent, index) => (
        <div key={precedent.id} className="mt-2 flex flex-col gap-2 rounded-xl border border-gray-200 p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-500">판례 {index + 1}</span>
            <button type="button" onClick={() => remove(index)} className="text-xs text-gray-400 hover:text-red-500">
              삭제
            </button>
          </div>
          <input
            className={inputCls}
            placeholder="예: 대법원 2026. 5. 8. 선고 2025다220329 판결"
            value={precedent.caseNo}
            onChange={(e) => update(index, "caseNo", e.target.value)}
          />
          <textarea
            rows={2}
            className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
            placeholder="이 판례가 무엇을 판단했는지 한두 문장으로 요약해주세요."
            value={precedent.summary}
            onChange={(e) => update(index, "summary", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

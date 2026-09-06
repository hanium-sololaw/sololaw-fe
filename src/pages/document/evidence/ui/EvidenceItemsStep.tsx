import DateYmdInput from "../../shared/DateYmdInput";
import { inputCls, labelClsMuted as labelCls } from "../../shared/formStyles";
import { emptyEvidenceItem, type EvidenceItem, type EvidenceListForm, type OriginalType } from "../lib/types";
import { evidenceNoLabel, PREFIX } from "../lib/buildDoc";

const ORIGINAL_OPTIONS: { value: OriginalType; label: string }[] = [
  { value: "copy", label: "사본" },
  { value: "original", label: "원본" },
];

type EvidenceItemsStepProps = {
  form: EvidenceListForm;
  onChange: <K extends keyof EvidenceListForm>(key: K, value: EvidenceListForm[K]) => void;
};

export default function EvidenceItemsStep({ form, onChange }: EvidenceItemsStepProps) {
  const prefix = PREFIX[form.submitterRole];
  const startNo = Number(form.evidenceStartNo) || 1;

  const update = <K extends keyof EvidenceItem>(index: number, key: K, value: EvidenceItem[K]) =>
    onChange(
      "items",
      form.items.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  const add = () => onChange("items", [...form.items, emptyEvidenceItem()]);
  const remove = (index: number) => onChange("items", form.items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">증거를 추가해주세요</h3>
        <p className="mt-1 text-sm text-gray-500">추가한 순서대로 호증 번호가 매겨져요. 순서는 다음 단계에서 다시 바꿀 수 있어요.</p>
      </div>

      <div className="flex flex-col gap-3">
        {form.items.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-500">
                {evidenceNoLabel(prefix, startNo, index, item)}
              </span>
              {form.items.length > 1 && (
                <button type="button" onClick={() => remove(index)} className="text-xs text-gray-400 hover:text-red-500">
                  삭제
                </button>
              )}
            </div>

            <label className="block">
              <span className={labelCls}>서증명</span>
              <input
                className={inputCls}
                placeholder="예: 임대차계약서"
                value={item.name}
                onChange={(e) => update(index, "name", e.target.value)}
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className={labelCls}>작성자</span>
                <input className={inputCls} value={item.author} onChange={(e) => update(index, "author", e.target.value)} />
              </label>
              <label className="block">
                <span className={labelCls}>작성일</span>
                <DateYmdInput value={item.date} onChange={(v) => update(index, "date", v)} />
              </label>
            </div>

            <label className="block">
              <span className={labelCls}>이 자료로 뭘 증명하려는 거예요 (선택)</span>
              <input
                className={inputCls}
                placeholder="비워두면 서증명을 바탕으로 AI가 제안해요"
                value={item.purpose}
                onChange={(e) => update(index, "purpose", e.target.value)}
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <span className={labelCls}>원본 여부</span>
                <div className="flex gap-2">
                  {ORIGINAL_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => update(index, "originalType", option.value)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        item.originalType === option.value
                          ? "border-blue-300 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="block">
                <span className={labelCls}>가지번호 (선택)</span>
                <input
                  className={inputCls}
                  placeholder="예: 2 → …호증의 2"
                  value={item.branchNo}
                  onChange={(e) => update(index, "branchNo", e.target.value.replace(/[^0-9]/g, ""))}
                />
              </label>
            </div>

            <label className="block">
              <span className={labelCls}>비고 (선택)</span>
              <input
                className={inputCls}
                placeholder="예: 제3자의 전화번호가 포함되어 있어 해당 부분을 가림 처리하였습니다."
                value={item.note}
                onChange={(e) => update(index, "note", e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="self-start rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
      >
        + 증거 추가
      </button>
    </div>
  );
}

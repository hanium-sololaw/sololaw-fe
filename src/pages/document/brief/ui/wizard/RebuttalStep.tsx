import { fieldCls, fieldLabelCls, fieldTextareaCls } from "../../../ui/shared/formStyles";
import StepHeader from "../../../ui/shared/StepHeader";
import { emptyRebuttalPoint, type BriefForm } from "../../lib/types";
import type { FormChangeHandler } from "../../../shared/formTypes";
import { removeAt, updateAt } from "../../../shared/listUtils";

type RebuttalStepProps = {
  form: BriefForm;
  onChange: FormChangeHandler<BriefForm>;
};

export default function RebuttalStep({ form, onChange }: RebuttalStepProps) {
  const update = (index: number, key: "claim" | "rebuttal" | "evidenceRef" | "precedentRef", value: string) =>
    onChange("rebuttalPoints", updateAt(form.rebuttalPoints, index, { [key]: value }));
  const add = () => onChange("rebuttalPoints", [...form.rebuttalPoints, emptyRebuttalPoint()]);
  const remove = (index: number) => onChange("rebuttalPoints", removeAt(form.rebuttalPoints, index));

  return (
    <div className="flex flex-col gap-5">
      <StepHeader
        index={4}
        title="어떤 부분을 반박하나요?"
        remaining={form.rebuttalPoints.some((p) => p.claim.trim() && p.rebuttal.trim()) ? 0 : 1}
        description="쟁점 하나랑 한 묶음으로 적으면 그대로 준비서면의 항목이 됩니다."
      />

      <div className="flex flex-col gap-3">
        {form.rebuttalPoints.map((point, index) => (
          <div key={point.id} className="flex flex-col gap-3 rounded-[10px] border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-300">쟁점 {index + 1}</span>
              {form.rebuttalPoints.length > 1 && (
                <button type="button" onClick={() => remove(index)} className="text-xs text-gray-400 hover:text-red-500">
                  삭제
                </button>
              )}
            </div>

            <label className="block">
              <span className={fieldLabelCls}>상대방은 뭐라고 하나요</span>
              {form.defenses.length > 0 && (
                <div className="mb-1.5 flex flex-wrap gap-1.5">
                  {form.defenses.map((defense) => (
                    <button
                      key={defense}
                      type="button"
                      onClick={() => update(index, "claim", defense)}
                      className="rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-500 hover:border-blue-300 hover:text-blue-500"
                    >
                      {defense}
                    </button>
                  ))}
                </div>
              )}
              <input
                className={fieldCls}
                value={point.claim}
                onChange={(e) => update(index, "claim", e.target.value)}
              />
            </label>

            <label className="block">
              <span className={fieldLabelCls}>어디가 사실과 다른가요</span>
              <textarea
                rows={3}
                className={fieldTextareaCls}
                value={point.rebuttal}
                onChange={(e) => update(index, "rebuttal", e.target.value)}
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className={fieldLabelCls}>무엇으로 보여줄 수 있나요 (선택)</span>
                <input
                  className={fieldCls}
                  placeholder="예: 갑 제7호증 목적물 인도 확인서"
                  value={point.evidenceRef}
                  onChange={(e) => update(index, "evidenceRef", e.target.value)}
                />
              </label>
              <label className="block">
                <span className={fieldLabelCls}>인용 판례 (선택)</span>
                <input
                  className={fieldCls}
                  value={point.precedentRef}
                  onChange={(e) => update(index, "precedentRef", e.target.value)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="self-start rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
      >
        + 쟁점 추가
      </button>

      <label className="block">
        <span className={fieldLabelCls}>재판부에 마지막으로 강조하고 싶은 것 (선택)</span>
        <textarea
          rows={4}
          className={fieldTextareaCls}
          placeholder="비워두면 관례적인 문구로 맺어드려요."
          value={form.myArgument}
          onChange={(e) => onChange("myArgument", e.target.value)}
        />
      </label>
    </div>
  );
}

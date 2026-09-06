import { inputCls, labelClsMuted as labelCls } from "../../shared/formStyles";
import { emptyRebuttalPoint, type BriefForm } from "../lib/types";

type RebuttalStepProps = {
  form: BriefForm;
  onChange: <K extends keyof BriefForm>(key: K, value: BriefForm[K]) => void;
};

export default function RebuttalStep({ form, onChange }: RebuttalStepProps) {
  const update = (index: number, key: "claim" | "rebuttal" | "evidenceRef" | "precedentRef", value: string) =>
    onChange(
      "rebuttalPoints",
      form.rebuttalPoints.map((point, i) => (i === index ? { ...point, [key]: value } : point)),
    );
  const add = () => onChange("rebuttalPoints", [...form.rebuttalPoints, emptyRebuttalPoint()]);
  const remove = (index: number) => onChange("rebuttalPoints", form.rebuttalPoints.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">어떤 부분을 반박하나요</h3>
        <p className="mt-1 text-sm text-gray-500">쟁점 하나가 반박 포인트 한 묶음이 돼요.</p>
      </div>

      <div className="flex flex-col gap-3">
        {form.rebuttalPoints.map((point, index) => (
          <div key={point.id} className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-500">쟁점 {index + 1}</span>
              {form.rebuttalPoints.length > 1 && (
                <button type="button" onClick={() => remove(index)} className="text-xs text-gray-400 hover:text-red-500">
                  삭제
                </button>
              )}
            </div>

            <label className="block">
              <span className={labelCls}>상대방은 뭐라고 하나요</span>
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
                className={inputCls}
                value={point.claim}
                onChange={(e) => update(index, "claim", e.target.value)}
              />
            </label>

            <label className="block">
              <span className={labelCls}>어디가 사실과 다른가요</span>
              <textarea
                rows={3}
                className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
                value={point.rebuttal}
                onChange={(e) => update(index, "rebuttal", e.target.value)}
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className={labelCls}>무엇으로 보여줄 수 있나요 (선택)</span>
                <input
                  className={inputCls}
                  placeholder="예: 갑 제7호증 목적물 인도 확인서"
                  value={point.evidenceRef}
                  onChange={(e) => update(index, "evidenceRef", e.target.value)}
                />
              </label>
              <label className="block">
                <span className={labelCls}>인용 판례 (선택)</span>
                <input
                  className={inputCls}
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
        <span className="mb-1.5 block text-sm font-medium text-gray-700">재판부에 마지막으로 강조하고 싶은 것 (선택)</span>
        <textarea
          rows={4}
          className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
          placeholder="비워두면 관례적인 문구로 맺어드려요."
          value={form.myArgument}
          onChange={(e) => onChange("myArgument", e.target.value)}
        />
      </label>
    </div>
  );
}

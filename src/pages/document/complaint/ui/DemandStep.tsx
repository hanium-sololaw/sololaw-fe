import DateYmdInput from "../../shared/DateYmdInput";
import { inputCls, labelCls } from "../../shared/formStyles";
import type { ComplaintForm, DemandMethod } from "../lib/types";

const DEMAND_METHOD_OPTIONS: { value: DemandMethod; label: string }[] = [
  { value: "certified_mail", label: "내용증명을 보냈어요" },
  { value: "message", label: "문자·카카오톡으로 요구했어요" },
  { value: "verbal", label: "전화·구두로만 요구했어요" },
  { value: "none", label: "요구한 적 없어요" },
];

type DemandStepProps = {
  form: ComplaintForm;
  onChange: <K extends keyof ComplaintForm>(key: K, value: ComplaintForm[K]) => void;
};

export default function DemandStep({ form, onChange }: DemandStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">돌려받은 돈과 독촉 내용</h3>
        <p className="mt-1 text-sm text-gray-500">지연손해금 기산일을 정확히 계산하기 위해 필요해요.</p>
      </div>

      <div>
        <span className={labelCls}>일부라도 돌려받으셨나요?</span>
        <div className="flex gap-2">
          {[
            { value: false, label: "한 푼도 못 받았어요" },
            { value: true, label: "일부 받았어요" },
          ].map((option) => (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => onChange("partialRepaid", option.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                form.partialRepaid === option.value
                  ? "border-blue-300 bg-blue-50 text-blue-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className={labelCls}>반환 요구를 어떤 방법으로 하셨나요?</span>
        <div className="flex flex-wrap gap-2">
          {DEMAND_METHOD_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange("demandMethod", option.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                form.demandMethod === option.value
                  ? "border-blue-300 bg-blue-50 text-blue-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {form.demandMethod !== "none" && (
        <label className="block">
          <span className={labelCls}>요구한 날 (최고일)</span>
          <DateYmdInput value={form.demandDate} onChange={(v) => onChange("demandDate", v)} />
        </label>
      )}

      <label className="block">
        <span className={labelCls}>피고는 뭐라고 했고 지금 어떤 상태인가요?</span>
        <textarea
          rows={5}
          className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
          placeholder="예) 두 달만 기다려 달라고 했는데 아직도 갚지 않고 있습니다."
          value={form.responseText}
          onChange={(e) => onChange("responseText", e.target.value)}
        />
      </label>
    </div>
  );
}

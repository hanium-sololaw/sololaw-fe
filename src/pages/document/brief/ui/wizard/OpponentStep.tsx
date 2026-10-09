import DateYmdInput from "../../../ui/shared/DateYmdInput";
import { fieldCls, fieldHintCls, fieldLabelCls, fieldTextareaCls } from "../../../ui/shared/formStyles";
import RequiredMark from "../../../ui/shared/RequiredMark";
import StepHeader from "../../../ui/shared/StepHeader";
import { DEFENSE_OPTIONS, type BriefForm } from "../../lib/types";
import type { FormChangeHandler } from "../../../shared/formTypes";

type OpponentStepProps = {
  form: BriefForm;
  onChange: FormChangeHandler<BriefForm>;
};

export default function OpponentStep({ form, onChange }: OpponentStepProps) {
  const toggleDefense = (option: string) => {
    const next = form.defenses.includes(option)
      ? form.defenses.filter((item) => item !== option)
      : [...form.defenses, option];
    onChange("defenses", next);
  };

  const remaining = [form.opponentDocDate, form.opponentClaim.trim(), form.defenses.length > 0 ? "ok" : ""].filter(
    (v) => !v,
  ).length;

  return (
    <div className="flex flex-col gap-5">
      <StepHeader
        index={2}
        title="상대방은 뭐라고 했나요?"
        remaining={remaining}
        description="상대방이 제출한 서면 내용을 정리해주세요."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={fieldLabelCls}>상대방이 낸 서면</span>
          <input
            className={fieldCls}
            placeholder="예: 답변서, 준비서면(1), 증거설명서"
            value={form.opponentDocType}
            onChange={(e) => onChange("opponentDocType", e.target.value)}
          />
        </label>
        <div className="block">
          <span className={fieldLabelCls}>
            받은 날 (도달일) <RequiredMark />
          </span>
          <DateYmdInput value={form.opponentDocDate} onChange={(v) => onChange("opponentDocDate", v)} />
        </div>
      </div>

      <label className="block">
        <span className={fieldLabelCls}>
          상대방이 뭐라고 주장하던가요? <RequiredMark />
        </span>
        <textarea
          rows={5}
          className={fieldTextareaCls}
          placeholder="읽은 대로 적어주세요."
          value={form.opponentClaim}
          onChange={(e) => onChange("opponentClaim", e.target.value)}
        />
      </label>

      <div>
        <span className={fieldLabelCls}>
          상대방이 든 항변을 골라주세요 <RequiredMark />
        </span>
        <div className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {DEFENSE_OPTIONS.map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={form.defenses.includes(option)}
                onChange={() => toggleDefense(option)}
                className="h-4 w-4 shrink-0 accent-blue-300"
              />
              {option}
            </label>
          ))}
        </div>
        <span className={fieldHintCls}>해당하는 것을 모두 골라주세요.</span>
      </div>

      <label className="block">
        <span className={fieldLabelCls}>상대방이 인정한 부분 (선택)</span>
        <textarea
          rows={3}
          className={fieldTextareaCls}
          placeholder="예: 보증금 1,000만원을 받은 사실은 인정합니다."
          value={form.undisputedFacts}
          onChange={(e) => onChange("undisputedFacts", e.target.value)}
        />
        <span className={fieldHintCls}>문장을 잘 쓰지 않아도 괜찮아요. 실제 있었던 일을 평소 말투로 적어주세요.</span>
      </label>
    </div>
  );
}

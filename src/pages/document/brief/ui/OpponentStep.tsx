import DateYmdInput from "../../shared/DateYmdInput";
import { DEFENSE_OPTIONS, type BriefForm } from "../lib/types";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400";
const labelCls = "mb-1.5 block text-sm font-medium text-gray-700";

type OpponentStepProps = {
  form: BriefForm;
  onChange: <K extends keyof BriefForm>(key: K, value: BriefForm[K]) => void;
};

export default function OpponentStep({ form, onChange }: OpponentStepProps) {
  const toggleDefense = (option: string) => {
    const next = form.defenses.includes(option)
      ? form.defenses.filter((item) => item !== option)
      : [...form.defenses, option];
    onChange("defenses", next);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">상대방은 뭐라고 했나요</h3>
        <p className="mt-1 text-sm text-gray-500">상대방이 제출한 서면 내용을 정리해주세요.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>상대방이 낸 서면 (선택)</span>
          <input
            className={inputCls}
            placeholder="예: 답변서, 준비서면(1), 증거설명서"
            value={form.opponentDocType}
            onChange={(e) => onChange("opponentDocType", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={labelCls}>받은 날 (도달일)</span>
          <DateYmdInput value={form.opponentDocDate} onChange={(v) => onChange("opponentDocDate", v)} />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>상대방이 뭐라고 주장하던가요</span>
        <textarea
          rows={5}
          className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
          placeholder="읽은 대로 적어주세요."
          value={form.opponentClaim}
          onChange={(e) => onChange("opponentClaim", e.target.value)}
        />
      </label>

      <div>
        <span className={labelCls}>상대방이 든 항변 (해당하는 것 모두)</span>
        <div className="flex flex-wrap gap-2">
          {DEFENSE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleDefense(option)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                form.defenses.includes(option)
                  ? "border-blue-300 bg-blue-50 text-blue-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className={labelCls}>상대방이 인정한 부분 (선택)</span>
        <textarea
          rows={3}
          className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
          placeholder="예: 보증금 1,000만원을 받은 사실은 인정합니다."
          value={form.undisputedFacts}
          onChange={(e) => onChange("undisputedFacts", e.target.value)}
        />
      </label>
    </div>
  );
}

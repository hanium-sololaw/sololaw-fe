import DateYmdInput from "../../shared/DateYmdInput";
import type { ComplaintType } from "../lib/complaintTypes";
import type { ComplaintForm } from "../lib/types";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400";
const labelCls = "mb-1.5 block text-sm font-medium text-gray-700";

type FactsStepProps = {
  type: ComplaintType;
  form: ComplaintForm;
  onChange: <K extends keyof ComplaintForm>(key: K, value: ComplaintForm[K]) => void;
};

export default function FactsStep({ type, form, onChange }: FactsStepProps) {
  const setFact = (key: string, value: string) => onChange("facts", { ...form.facts, [key]: value });
  const toggleCheck = (key: string, option: string) => {
    const current = form.facts[key] ? form.facts[key].split(" / ") : [];
    const next = current.includes(option) ? current.filter((v) => v !== option) : [...current, option];
    setFact(key, next.join(" / "));
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">사실관계</h3>
        <p className="mt-1 text-sm text-gray-500">{type.title}에 필요한 세부 내용을 입력해주세요.</p>
      </div>

      {type.factFields.map((field) => {
        const value = form.facts[field.key] ?? "";
        return (
          <label key={field.key} className="block">
            <span className={labelCls}>{field.key}</span>
            {field.kind === "text" && (
              <input
                className={inputCls}
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => setFact(field.key, e.target.value)}
              />
            )}
            {field.kind === "date" && <DateYmdInput value={value} onChange={(v) => setFact(field.key, v)} />}
            {field.kind === "money" && (
              <div className="relative">
                <input
                  className={`${inputCls} pr-8`}
                  inputMode="numeric"
                  placeholder="0"
                  value={value ? Number(value).toLocaleString("ko-KR") : ""}
                  onChange={(e) => setFact(field.key, e.target.value.replace(/[^0-9]/g, ""))}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">원</span>
              </div>
            )}
            {field.kind === "select" && (
              <div className="flex flex-wrap gap-2">
                {field.options?.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFact(field.key, option)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      value === option
                        ? "border-blue-300 bg-blue-50 text-blue-600"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {field.kind === "checks" && (
              <div className="flex flex-wrap gap-2">
                {field.options?.map((option) => {
                  const checked = value.split(" / ").includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleCheck(field.key, option)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        checked
                          ? "border-blue-300 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          </label>
        );
      })}

      <label className="block">
        <span className={labelCls}>{type.causePrompt.question}</span>
        <textarea
          rows={6}
          className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
          placeholder={type.causePrompt.placeholder}
          value={form.causeText}
          onChange={(e) => onChange("causeText", e.target.value)}
        />
        <span className="mt-1.5 block text-xs text-gray-400">
          문장을 다듬지 않아도 괜찮아요. AI가 소장 문체로 정리해드립니다.
        </span>
      </label>
    </div>
  );
}

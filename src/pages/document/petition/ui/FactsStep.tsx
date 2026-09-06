import DateYmdInput from "../../shared/DateYmdInput";
import { inputCls, labelCls } from "../../shared/formStyles";
import type { FactField } from "../lib/types";

type FactsStepProps = {
  title: string;
  subtitle: string;
  fields: FactField[];
  values: Record<string, string>;
  onChangeValue: (key: string, value: string) => void;
  notice?: string;
};

export default function FactsStep({ title, subtitle, fields, values, onChangeValue, notice }: FactsStepProps) {
  const toggleCheck = (key: string, option: string) => {
    const current = values[key] ? values[key].split(" / ") : [];
    const next = current.includes(option) ? current.filter((v) => v !== option) : [...current, option];
    onChangeValue(key, next.join(" / "));
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      {notice && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-700">
          {notice}
        </p>
      )}

      {fields.map((field) => {
        const value = values[field.key] ?? "";
        return (
          <label key={field.key} className="block">
            <span className={labelCls}>{field.key}</span>
            {field.kind === "text" && (
              <input
                className={inputCls}
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => onChangeValue(field.key, e.target.value)}
              />
            )}
            {field.kind === "date" && <DateYmdInput value={value} onChange={(v) => onChangeValue(field.key, v)} />}
            {field.kind === "money" && (
              <div className="relative">
                <input
                  className={`${inputCls} pr-8`}
                  inputMode="numeric"
                  placeholder="0"
                  value={value ? Number(value).toLocaleString("ko-KR") : ""}
                  onChange={(e) => onChangeValue(field.key, e.target.value.replace(/[^0-9]/g, ""))}
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
                    onClick={() => onChangeValue(field.key, option)}
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
    </div>
  );
}

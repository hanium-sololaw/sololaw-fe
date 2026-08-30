import CourtSelect from "../../shared/CourtSelect";
import type { ClaimType, ComplaintForm, ValuationType } from "../lib/types";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400";
const labelCls = "mb-1.5 block text-sm font-medium text-gray-700";

const CLAIM_TYPE_OPTIONS: { value: ClaimType; label: string }[] = [
  { value: "property", label: "재산권상 청구" },
  { value: "non_property", label: "비재산권상 청구" },
];

const VALUATION_TYPE_OPTIONS: { value: ValuationType; label: string }[] = [
  { value: "amount", label: "금액" },
  { value: "land_value", label: "토지 등의 평가액" },
  { value: "uncalculable", label: "소가 산출 불가" },
];

function Pills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            value === option.value
              ? "border-blue-300 bg-blue-50 text-blue-600"
              : "border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

type CourtClaimStepProps = {
  form: ComplaintForm;
  onChange: <K extends keyof ComplaintForm>(key: K, value: ComplaintForm[K]) => void;
};

export default function CourtClaimStep({ form, onChange }: CourtClaimStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">어느 법원에 얼마를 청구하나요</h3>
        <p className="mt-1 text-sm text-gray-500">소장을 낼 법원과 청구 금액을 입력해주세요.</p>
      </div>

      <label className="block">
        <span className={labelCls}>소장을 낼 법원</span>
        <CourtSelect value={form.court} onChange={(v) => onChange("court", v)} />
      </label>

      <div>
        <span className={labelCls}>청구구분</span>
        <Pills options={CLAIM_TYPE_OPTIONS} value={form.claimType} onChange={(value) => onChange("claimType", value)} />
      </div>

      <div>
        <span className={labelCls}>소가구분</span>
        <Pills
          options={VALUATION_TYPE_OPTIONS}
          value={form.valuationType}
          onChange={(value) => onChange("valuationType", value)}
        />
      </div>

      {form.valuationType !== "uncalculable" && (
        <>
          <label className="block">
            <span className={labelCls}>청구 금액</span>
            <div className="relative">
              <input
                className={`${inputCls} pr-8`}
                inputMode="numeric"
                placeholder="10,000,000"
                value={form.claimAmount ? Number(form.claimAmount).toLocaleString("ko-KR") : ""}
                onChange={(e) => onChange("claimAmount", e.target.value.replace(/[^0-9]/g, ""))}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">원</span>
            </div>
          </label>

          <label className="block">
            <span className={labelCls}>소송목적의 값 (선택)</span>
            <div className="relative">
              <input
                className={`${inputCls} pr-8`}
                inputMode="numeric"
                placeholder="비워두면 청구 금액과 같아요"
                value={form.objectValue ? Number(form.objectValue).toLocaleString("ko-KR") : ""}
                onChange={(e) => onChange("objectValue", e.target.value.replace(/[^0-9]/g, ""))}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">원</span>
            </div>
          </label>
        </>
      )}

      <p className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-xs leading-relaxed text-gray-500">
        인지액·송달료 등 접수 비용은 이 단계에서 계산하지 않아요. 문서 생성 화면의 소송비용 계산기를 따로 이용해주세요.
      </p>
    </div>
  );
}

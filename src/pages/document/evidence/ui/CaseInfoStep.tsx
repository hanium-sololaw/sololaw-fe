import CourtSelect from "../../shared/CourtSelect";
import { inputCls, labelCls } from "../../shared/formStyles";
import { PREFIX } from "../lib/buildDoc";
import type { EvidenceListForm, EvidenceSubmitterRole } from "../lib/types";

const ROLE_OPTIONS: { value: EvidenceSubmitterRole; label: string }[] = [
  { value: "plaintiff", label: "원고" },
  { value: "defendant", label: "피고" },
  { value: "intervenor", label: "참가인" },
];

type CaseInfoStepProps = {
  form: EvidenceListForm;
  onChange: <K extends keyof EvidenceListForm>(key: K, value: EvidenceListForm[K]) => void;
};

export default function CaseInfoStep({ form, onChange }: CaseInfoStepProps) {
  const prefix = PREFIX[form.submitterRole];
  const startNo = Number(form.evidenceStartNo) || 1;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">어떤 사건의 증거목록인가요</h3>
        <p className="mt-1 text-sm text-gray-500">법원에서는 이 문서를 「증거설명서」라고 불러요.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>법원</span>
          <CourtSelect value={form.court} onChange={(v) => onChange("court", v)} />
        </label>
        <label className="block">
          <span className={labelCls}>재판부 (선택)</span>
          <input
            className={inputCls}
            placeholder="예: 제12민사단독"
            value={form.panel}
            onChange={(e) => onChange("panel", e.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>사건번호</span>
        <input
          className={inputCls}
          placeholder="예: 2024가소445566 대여금 반환 청구 (소액)"
          value={form.caseNo}
          onChange={(e) => onChange("caseNo", e.target.value)}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>원고</span>
          <input className={inputCls} value={form.plaintiff} onChange={(e) => onChange("plaintiff", e.target.value)} />
        </label>
        <label className="block">
          <span className={labelCls}>피고</span>
          <input className={inputCls} value={form.defendant} onChange={(e) => onChange("defendant", e.target.value)} />
        </label>
      </div>

      <div>
        <span className={labelCls}>증거 번호 체계</span>
        <div className="flex gap-2">
          {ROLE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange("submitterRole", option.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                form.submitterRole === option.value
                  ? "border-blue-300 bg-blue-50 text-blue-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {option.label} ({PREFIX[option.value]})
            </button>
          ))}
        </div>
      </div>

      <label className="block max-w-[220px]">
        <span className={labelCls}>시작 호증 번호</span>
        <input
          type="number"
          min={1}
          className={inputCls}
          value={form.evidenceStartNo}
          onChange={(e) => onChange("evidenceStartNo", e.target.value)}
        />
        <span className="mt-1.5 block text-xs text-gray-400">
          이 사건에서 {prefix} 제{Math.max(1, startNo - 1)}호증까지 이미 냈다면 {startNo}을 입력해주세요.
        </span>
      </label>
    </div>
  );
}

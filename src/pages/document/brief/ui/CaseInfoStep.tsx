import CourtSelect from "../../shared/CourtSelect";
import DateYmdInput from "../../shared/DateYmdInput";
import { inputCls, labelCls } from "../../shared/formStyles";
import { STAGE_OPTIONS, type BriefForm, type SubmitterRole } from "../lib/types";

const ROLE_OPTIONS: { value: SubmitterRole; label: string }[] = [
  { value: "plaintiff", label: "원고" },
  { value: "defendant", label: "피고" },
];

type CaseInfoStepProps = {
  form: BriefForm;
  onChange: <K extends keyof BriefForm>(key: K, value: BriefForm[K]) => void;
};

export default function CaseInfoStep({ form, onChange }: CaseInfoStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">어떤 사건의 준비서면인가요</h3>
        <p className="mt-1 text-sm text-gray-500">사건 정보와 준비서면 회차를 입력해주세요.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>법원</span>
          <CourtSelect value={form.court} onChange={(v) => onChange("court", v)} />
        </label>
        <label className="block">
          <span className={labelCls}>재판부 (있으면)</span>
          <input
            className={inputCls}
            placeholder="예: 제12민사단독"
            value={form.panel}
            onChange={(e) => onChange("panel", e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>사건번호</span>
          <input
            className={inputCls}
            placeholder="예: 2024가단123456"
            value={form.caseNo}
            onChange={(e) => onChange("caseNo", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={labelCls}>사건명 (선택)</span>
          <input
            className={inputCls}
            placeholder="예: 임대차보증금"
            value={form.caseName}
            onChange={(e) => onChange("caseName", e.target.value)}
          />
        </label>
      </div>

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
        <span className={labelCls}>나는 어느 쪽인가요</span>
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
              {option.label}
            </button>
          ))}
        </div>
        <span className="mt-1.5 block text-xs text-gray-400">
          {form.submitterRole === "plaintiff" ? "증거는 갑 제N호증으로 매겨져요." : "증거는 을 제N호증으로 매겨져요."}
        </span>
      </div>

      <label className="block">
        <span className={labelCls}>준비서면 회차</span>
        <input
          className={inputCls}
          placeholder="예: 준비서면(2)"
          value={form.briefNo}
          onChange={(e) => onChange("briefNo", e.target.value)}
        />
      </label>

      <div>
        <span className={labelCls}>지금 소송이 어느 단계인가요</span>
        <div className="flex flex-wrap gap-2">
          {STAGE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange("stage", option)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                form.stage === option
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
        <span className={labelCls}>제출 기한 / 다음 변론기일 (선택)</span>
        <DateYmdInput value={form.hearingDate} onChange={(v) => onChange("hearingDate", v)} />
      </label>

      <label className="block">
        <span className={labelCls}>대리인을 선임했나요 (선택)</span>
        <input
          className={inputCls}
          placeholder="예: 변호사 이영희"
          value={form.agent}
          onChange={(e) => onChange("agent", e.target.value)}
        />
      </label>
    </div>
  );
}

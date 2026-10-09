import CourtSelect from "../../../ui/shared/CourtSelect";
import DateYmdInput from "../../../ui/shared/DateYmdInput";
import { fieldCls, fieldHintCls, fieldLabelCls } from "../../../ui/shared/formStyles";
import RequiredMark from "../../../ui/shared/RequiredMark";
import StepHeader from "../../../ui/shared/StepHeader";
import { STAGE_OPTIONS, type BriefForm, type SubmitterRole } from "../../lib/types";
import type { FormChangeHandler } from "../../../shared/formTypes";

const ROLE_OPTIONS: { value: SubmitterRole; label: string }[] = [
  { value: "plaintiff", label: "원고" },
  { value: "defendant", label: "피고" },
];

const RadioDot = ({ checked }: { checked: boolean }) => (
  <span
    className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
      checked ? "border-blue-300 bg-blue-300" : "border-gray-200 bg-white"
    }`}
  >
    {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
  </span>
);

type CaseInfoStepProps = {
  form: BriefForm;
  onChange: FormChangeHandler<BriefForm>;
  loadedCaseTitle?: string | null;
};

export default function CaseInfoStep({ form, onChange, loadedCaseTitle }: CaseInfoStepProps) {
  const remaining = [form.court, form.caseNo, form.plaintiff, form.defendant].filter((value) => !value.trim()).length;

  return (
    <div className="flex flex-col gap-5">
      <StepHeader
        index={1}
        title="어떤 사건의 준비서면인가요?"
        remaining={remaining}
        description="이미 작성한 소장이 있으면 불러와서 당사자·사건 정보를 그대로 씁니다."
      />

      {loadedCaseTitle && (
        <div className="rounded-lg bg-blue-50 px-4 py-2.5 text-blue-300">
          <p className="text-sm font-semibold">✓ 사건 정보를 불러왔어요</p>
          <p className="mt-0.5 text-xs">「{loadedCaseTitle}」의 법원·사건번호·원고·피고를 자동으로 채웠습니다.</p>
        </div>
      )}

      <div>
        <span className={fieldLabelCls}>
          법원 <RequiredMark />
        </span>
        <CourtSelect
          key={loadedCaseTitle ? "loaded" : "manual"}
          value={form.court}
          onChange={(value) => onChange("court", value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={fieldLabelCls}>
            사건번호 <RequiredMark />
          </span>
          <input
            className={fieldCls}
            placeholder="예: 2024가단123456"
            value={form.caseNo}
            onChange={(e) => onChange("caseNo", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={fieldLabelCls}>
            사건명 <RequiredMark />
          </span>
          <input
            className={fieldCls}
            placeholder="예: 대여금 반환 청구 (소액)"
            value={form.caseName}
            onChange={(e) => onChange("caseName", e.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className={fieldLabelCls}>
          재판부 <span className="text-xs font-normal text-gray-400">(있으면)</span>
        </span>
        <input
          className={fieldCls}
          placeholder="예: 제12민사단독/제3민사부"
          value={form.panel}
          onChange={(e) => onChange("panel", e.target.value)}
        />
        <span className={fieldHintCls}>
          법원에서 받은 기일통지서나 전자소송 사건 화면에 적혀 있어요. 모르면 비워두셔도 됩니다.
        </span>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={fieldLabelCls}>
            원고 <RequiredMark />
          </span>
          <input className={fieldCls} value={form.plaintiff} onChange={(e) => onChange("plaintiff", e.target.value)} />
        </label>
        <label className="block">
          <span className={fieldLabelCls}>
            피고 <RequiredMark />
          </span>
          <input className={fieldCls} value={form.defendant} onChange={(e) => onChange("defendant", e.target.value)} />
        </label>
      </div>

      <div>
        <span className={fieldLabelCls}>
          나는 어느 쪽인가요? <RequiredMark />
        </span>
        <div className="flex gap-2">
          {ROLE_OPTIONS.map((option) => {
            const checked = form.submitterRole === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange("submitterRole", option.value)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  checked ? "border-blue-300 bg-blue-50 text-blue-500" : "border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                <RadioDot checked={checked} />
                {option.label}
              </button>
            );
          })}
        </div>
        <span className={fieldHintCls}>
          {form.submitterRole === "plaintiff" ? "증거는 갑 제N호증으로 매겨져요." : "증거는 을 제N호증으로 매겨져요."}
        </span>
      </div>

      <label className="block">
        <span className={fieldLabelCls}>
          대리인 <span className="text-xs font-normal text-gray-400">(있으면)</span>
        </span>
        <input
          className={fieldCls}
          placeholder="변호사 000"
          value={form.agent}
          onChange={(e) => onChange("agent", e.target.value)}
        />
        <span className={fieldHintCls}>준비서면 기재사항이에요. 본인이 직접 하면 비워두세요.</span>
      </label>

      <div>
        <span className={fieldLabelCls}>
          지금 소송이 어느 단계인가요? <RequiredMark />
        </span>
        <div className="flex flex-col gap-2.5">
          {STAGE_OPTIONS.map((option) => {
            const checked = form.stage === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange("stage", option)}
                className={`flex items-center gap-2 text-left text-sm font-medium ${checked ? "text-blue-500" : "text-gray-500"}`}
              >
                <RadioDot checked={checked} />
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={fieldLabelCls}>준비서면 회차</span>
          <input
            className={fieldCls}
            placeholder="예 : 준비서면(1)"
            value={form.briefNo}
            onChange={(e) => onChange("briefNo", e.target.value)}
          />
        </label>
        <div className="block">
          <span className={fieldLabelCls}>제출 기한 / 다음 변론기일</span>
          <DateYmdInput value={form.hearingDate} onChange={(value) => onChange("hearingDate", value)} />
        </div>
      </div>

      <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-400">
        상대방이 변론기일에 나오지 않으면,{" "}
        <b className="font-medium underline">준비서면에 적어 두지 않은 내용은 그날 말할 수 없어요.</b> 하고 싶은 말은 미리
        다 적어 두세요. (민사소송법 제276조)
      </p>
    </div>
  );
}

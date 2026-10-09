import AddressSearchField from "../../../ui/shared/AddressSearchField";
import CourtSelect from "../../../ui/shared/CourtSelect";
import { fieldCls, fieldLabelCls } from "../../../ui/shared/formStyles";
import type { PetitionType } from "../../lib/petitionTypes";
import type { Party, PetitionForm } from "../../lib/types";
import type { FormChangeHandler } from "../../../shared/formTypes";
import { digitsOnly, formatNumber } from "../../../shared/numberFormat";

function PartyFields({ label, party, onChange }: { label: string; party: Party; onChange: (party: Party) => void }) {
  const update = <K extends keyof Party>(key: K, value: Party[K]) => onChange({ ...party, [key]: value });

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4">
      <span className="text-xs font-bold text-blue-500">{label}</span>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={fieldLabelCls}>이름 / 상호</span>
          <input className={fieldCls} value={party.name} onChange={(e) => update("name", e.target.value)} />
        </label>
        <label className="block">
          <span className={fieldLabelCls}>연락처 (선택)</span>
          <input className={fieldCls} placeholder="010-0000-0000" value={party.phone} onChange={(e) => update("phone", e.target.value)} />
        </label>
      </div>

      <label className="block">
        <span className={fieldLabelCls}>주소</span>
        <AddressSearchField value={party.address} onChange={(v) => update("address", v)} />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={fieldLabelCls}>이메일 (선택)</span>
          <input className={fieldCls} value={party.email} onChange={(e) => update("email", e.target.value)} />
        </label>
        <label className="block">
          <span className={fieldLabelCls}>주민등록번호 (선택)</span>
          <input
            className={fieldCls}
            placeholder="법원 제출본에만 표시돼요"
            value={party.residentId}
            onChange={(e) => update("residentId", e.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className={fieldLabelCls}>법인 대표자 / 법정대리인 (해당 시)</span>
        <input
          className={fieldCls}
          placeholder="예: 대표이사 김철수"
          value={party.representative}
          onChange={(e) => update("representative", e.target.value)}
        />
      </label>
    </div>
  );
}

type PartyStepProps = {
  type: PetitionType;
  form: PetitionForm;
  onChange: FormChangeHandler<PetitionForm>;
};

export default function PartyStep({ type, form, onChange }: PartyStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">당사자 정보</h3>
        <p className="mt-1 text-sm text-gray-500">신청할 법원과 당사자 정보를 입력해주세요.</p>
      </div>

      <label className="block">
        <span className={fieldLabelCls}>신청할 법원</span>
        <CourtSelect value={form.court} onChange={(v) => onChange("court", v)} />
      </label>

      {(type.hasCaseNo || type.hasCaseName) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {type.hasCaseNo && (
            <label className="block">
              <span className={fieldLabelCls}>사건번호 (있으면)</span>
              <input className={fieldCls} value={form.caseNo} onChange={(e) => onChange("caseNo", e.target.value)} />
            </label>
          )}
          {type.hasCaseName && (
            <label className="block">
              <span className={fieldLabelCls}>사건명 (선택)</span>
              <input className={fieldCls} value={form.caseName} onChange={(e) => onChange("caseName", e.target.value)} />
            </label>
          )}
        </div>
      )}

      {type.hasClaimAmount && (
        <label className="block">
          <span className={fieldLabelCls}>청구·집행 금액</span>
          <div className="relative">
            <input
              className={`${fieldCls} pr-8`}
              inputMode="numeric"
              placeholder="10,000,000"
              value={formatNumber(form.claimAmount)}
              onChange={(e) => onChange("claimAmount", digitsOnly(e.target.value))}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">원</span>
          </div>
        </label>
      )}

      <PartyFields label={type.applicantLabel} party={form.applicant} onChange={(v) => onChange("applicant", v)} />
      {type.respondentLabel && (
        <PartyFields label={type.respondentLabel} party={form.respondent} onChange={(v) => onChange("respondent", v)} />
      )}
    </div>
  );
}

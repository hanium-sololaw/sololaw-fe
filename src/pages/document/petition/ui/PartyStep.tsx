import AddressSearchField from "../../shared/AddressSearchField";
import CourtSelect from "../../shared/CourtSelect";
import type { PetitionType } from "../lib/petitionTypes";
import type { Party, PetitionForm } from "../lib/types";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400";
const labelCls = "mb-1.5 block text-xs font-medium text-gray-500";

function PartyFields({ label, party, onChange }: { label: string; party: Party; onChange: (party: Party) => void }) {
  const update = <K extends keyof Party>(key: K, value: Party[K]) => onChange({ ...party, [key]: value });

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4">
      <span className="text-xs font-bold text-blue-500">{label}</span>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>이름 / 상호</span>
          <input className={inputCls} value={party.name} onChange={(e) => update("name", e.target.value)} />
        </label>
        <label className="block">
          <span className={labelCls}>연락처 (선택)</span>
          <input className={inputCls} placeholder="010-0000-0000" value={party.phone} onChange={(e) => update("phone", e.target.value)} />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>주소</span>
        <AddressSearchField value={party.address} onChange={(v) => update("address", v)} />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>이메일 (선택)</span>
          <input className={inputCls} value={party.email} onChange={(e) => update("email", e.target.value)} />
        </label>
        <label className="block">
          <span className={labelCls}>주민등록번호 (선택)</span>
          <input
            className={inputCls}
            placeholder="법원 제출본에만 표시돼요"
            value={party.residentId}
            onChange={(e) => update("residentId", e.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>법인 대표자 / 법정대리인 (해당 시)</span>
        <input
          className={inputCls}
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
  onChange: <K extends keyof PetitionForm>(key: K, value: PetitionForm[K]) => void;
};

export default function PartyStep({ type, form, onChange }: PartyStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">당사자 정보</h3>
        <p className="mt-1 text-sm text-gray-500">신청할 법원과 당사자 정보를 입력해주세요.</p>
      </div>

      <label className="block">
        <span className={labelCls}>신청할 법원</span>
        <CourtSelect value={form.court} onChange={(v) => onChange("court", v)} />
      </label>

      {(type.hasCaseNo || type.hasCaseName) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {type.hasCaseNo && (
            <label className="block">
              <span className={labelCls}>사건번호 (있으면)</span>
              <input className={inputCls} value={form.caseNo} onChange={(e) => onChange("caseNo", e.target.value)} />
            </label>
          )}
          {type.hasCaseName && (
            <label className="block">
              <span className={labelCls}>사건명 (선택)</span>
              <input className={inputCls} value={form.caseName} onChange={(e) => onChange("caseName", e.target.value)} />
            </label>
          )}
        </div>
      )}

      {type.hasClaimAmount && (
        <label className="block">
          <span className={labelCls}>청구·집행 금액</span>
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
      )}

      <PartyFields label={type.applicantLabel} party={form.applicant} onChange={(v) => onChange("applicant", v)} />
      {type.respondentLabel && (
        <PartyFields label={type.respondentLabel} party={form.respondent} onChange={(v) => onChange("respondent", v)} />
      )}
    </div>
  );
}

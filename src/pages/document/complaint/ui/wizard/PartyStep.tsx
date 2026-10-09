import Icon from "@/shared/ui/Icon";
import ChevronRightIcon from "@/assets/icons/document/chevron-right-icon.svg?react";
import AddressSearchField from "../../../ui/shared/AddressSearchField";
import { fieldCls, fieldLabelCls } from "../../../ui/shared/formStyles";
import RequiredMark from "../../../ui/shared/RequiredMark";
import StepHeader from "../../../ui/shared/StepHeader";
import { emptyParty, type ComplaintForm, type Party } from "../../lib/types";
import type { FormChangeHandler } from "../../../shared/formTypes";
import { removeAt, updateAt } from "../../../shared/listUtils";

const SUMMARY_RESET = "flex cursor-pointer list-none items-center [&::-webkit-details-marker]:hidden";

type PartyGroupProps = {
  title: string;
  hint: string;
  parties: Party[];
  onChange: (parties: Party[]) => void;
};

function PartyGroup({ title, hint, parties, onChange }: PartyGroupProps) {
  const updateParty = (index: number, key: keyof Party, value: string) =>
    onChange(updateAt(parties, index, { [key]: value }));
  const addParty = () => onChange([...parties, emptyParty()]);
  const removeParty = (index: number) => onChange(removeAt(parties, index));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
          <p className="text-xs text-gray-500">{hint}</p>
        </div>
        <button
          type="button"
          onClick={addParty}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
        >
          + 공동소송인 추가
        </button>
      </div>

      {parties.map((party, index) => {
        const update = (key: keyof Party, value: string) => updateParty(index, key, value);
        return (
          <div key={party.id} className="flex flex-col gap-5">
            {parties.length > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-300">
                  {title} {index + 1}
                </span>
                <button type="button" onClick={() => removeParty(index)} className="text-xs text-gray-400 hover:text-red-500">
                  삭제
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="block">
                  <span className={fieldLabelCls}>
                    이름/상호 <RequiredMark />
                  </span>
                  <input
                    className={fieldCls}
                    placeholder="홍길동"
                    value={party.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className={fieldLabelCls}>주민등록번호</span>
                  <input
                    className={fieldCls}
                    placeholder="750101-1234567"
                    value={party.residentId}
                    onChange={(e) => update("residentId", e.target.value)}
                  />
                </label>
              </div>
              <p className="text-xs leading-[1.25] tracking-[-0.3px] text-gray-400">
                주민등록번호는 법이 요구하는 기재사항이 아니어서 비워 두어도 됩니다. 다만 개인 상대 소송이라면 나중에
                강제집행을 위해 주민등록상 주소·주민번호 확인이 필요해집니다.
              </p>
            </div>

            <div>
              <span className={fieldLabelCls}>
                주소 <RequiredMark />
              </span>
              <AddressSearchField value={party.address} onChange={(value) => update("address", value)} />
            </div>

            <div className="flex flex-col gap-2">
              <details
                className="group rounded-lg border border-blue-200 bg-blue-50 px-2 pb-2"
                open={!!(party.serviceAddress || party.fax)}
              >
                <summary
                  className={`${SUMMARY_RESET} gap-1 py-2 text-sm text-blue-300 group-open:mb-4 group-open:border-b group-open:border-blue-100`}
                >
                  <Icon icon={ChevronRightIcon} size={20} className="rotate-90 transition-transform group-open:-rotate-90" />
                  송달받을 주소가 따로 있거나, 팩스를 쓰시나요?
                </summary>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <span className={fieldLabelCls}>송달주소</span>
                    <AddressSearchField
                      value={party.serviceAddress}
                      onChange={(value) => update("serviceAddress", value)}
                      placeholder="선택하세요"
                    />
                  </div>
                  <label className="block">
                    <span className={fieldLabelCls}>팩스번호</span>
                    <input
                      className={fieldCls}
                      placeholder="없으면 비워두세요"
                      value={party.fax}
                      onChange={(e) => update("fax", e.target.value)}
                    />
                  </label>
                </div>
              </details>

              <details className="group rounded-lg border border-gray-300 bg-white p-2" open={!!party.representative}>
                <summary className={`${SUMMARY_RESET} justify-between text-sm text-gray-700`}>
                  <span className="flex items-center gap-1">
                    <Icon icon={ChevronRightIcon} size={20} className="transition-transform group-open:rotate-90" />
                    법인이거나 미성년자인가요?
                  </span>
                  <span className="px-2 text-xs font-semibold text-gray-300">해당하면 펼치기</span>
                </summary>
                <label className="mt-3 block px-1 pb-1">
                  <span className={fieldLabelCls}>법인 대표자 / 법정대리인</span>
                  <input
                    className={fieldCls}
                    placeholder="예: 대표이사 김철수"
                    value={party.representative}
                    onChange={(e) => update("representative", e.target.value)}
                  />
                </label>
              </details>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type PartyStepProps = {
  form: ComplaintForm;
  onChange: FormChangeHandler<ComplaintForm>;
};

export default function PartyStep({ form, onChange }: PartyStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        index={2}
        title="누가 누구에게 청구하나요?"
        description="공동소송이면 원고나 피고를 여러 명 추가할 수 있어요."
      />

      <PartyGroup
        title="원고"
        hint="돈을 받을 사람 · 나"
        parties={form.plaintiffs}
        onChange={(parties) => onChange("plaintiffs", parties)}
      />
      <PartyGroup
        title="피고"
        hint="돈을 줘야 할 사람"
        parties={form.defendants}
        onChange={(parties) => onChange("defendants", parties)}
      />
    </div>
  );
}

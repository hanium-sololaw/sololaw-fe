import AddressSearchField from "../../shared/AddressSearchField";
import { emptyParty, type ComplaintForm, type Party } from "../lib/types";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400";
const labelCls = "mb-1.5 block text-xs font-medium text-gray-500";

type PartyGroupProps = {
  title: string;
  hint: string;
  parties: Party[];
  onChange: (parties: Party[]) => void;
};

function PartyGroup({ title, hint, parties, onChange }: PartyGroupProps) {
  const update = (index: number, key: keyof Party, value: string) =>
    onChange(parties.map((party, i) => (i === index ? { ...party, [key]: value } : party)));
  const add = () => onChange([...parties, emptyParty()]);
  const remove = (index: number) => onChange(parties.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500">{hint}</p>
        </div>
        <button
          type="button"
          onClick={add}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
        >
          + 공동소송인 추가
        </button>
      </div>

      {parties.map((party, index) => (
        <div key={party.id} className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-500">{title} {index + 1}</span>
            {parties.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                삭제
              </button>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>이름 / 상호</span>
              <input
                className={inputCls}
                value={party.name}
                onChange={(e) => update(index, "name", e.target.value)}
              />
            </label>
            <label className="block">
              <span className={labelCls}>주민등록번호 (선택)</span>
              <input
                className={inputCls}
                placeholder="소장에 표시할 때만 입력"
                value={party.residentId}
                onChange={(e) => update(index, "residentId", e.target.value)}
              />
            </label>
          </div>

          <label className="block">
            <span className={labelCls}>주소</span>
            <AddressSearchField value={party.address} onChange={(v) => update(index, "address", v)} />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>송달받을 주소 (다를 때만)</span>
              <AddressSearchField value={party.serviceAddress} onChange={(v) => update(index, "serviceAddress", v)} />
            </label>
            <label className="block">
              <span className={labelCls}>팩스 (선택)</span>
              <input
                className={inputCls}
                placeholder="02-1234-5678"
                value={party.fax}
                onChange={(e) => update(index, "fax", e.target.value)}
              />
            </label>
          </div>

          <label className="block">
            <span className={labelCls}>법인 대표자 / 법정대리인 (해당 시)</span>
            <input
              className={inputCls}
              placeholder="예: 대표이사 김철수"
              value={party.representative}
              onChange={(e) => update(index, "representative", e.target.value)}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

type PartyStepProps = {
  form: ComplaintForm;
  onChange: <K extends keyof ComplaintForm>(key: K, value: ComplaintForm[K]) => void;
};

export default function PartyStep({ form, onChange }: PartyStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">누가 누구에게 청구하나요</h3>
        <p className="mt-1 text-sm text-gray-500">공동소송이면 원고나 피고를 여러 명 추가할 수 있어요.</p>
      </div>

      <PartyGroup title="원고" hint="청구하는 사람" parties={form.plaintiffs} onChange={(v) => onChange("plaintiffs", v)} />
      <PartyGroup title="피고" hint="청구받는 사람" parties={form.defendants} onChange={(v) => onChange("defendants", v)} />
    </div>
  );
}

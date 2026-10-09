import type { ReactNode } from "react";
import Modal from "@/pages/document/ui/shared/Modal";
import Dropdown from "@/shared/ui/Dropdown";
import type { CaseType } from "@/shared/api/cases";
import { CASE_TYPES, CASE_TYPE_LABEL } from "../../data/caseTypes";
import { useCreateCaseForm } from "../../hooks/useCreateCaseForm";

const INPUT_CLS = "rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-300";
const CASE_TYPE_OPTIONS: (CaseType | "")[] = ["", ...CASE_TYPES];

const caseTypeLabel = (value: CaseType | "") => (value === "" ? "선택 안 함" : CASE_TYPE_LABEL[value]);

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-2">
    <p className="text-sm text-gray-700">{label}</p>
    {children}
  </div>
);

type CreateCaseModalProps = {
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateCaseModal({ onClose, onCreated }: CreateCaseModalProps) {
  const { values, setValue, canSubmit, submitting, error, submit } = useCreateCaseForm(onCreated, onClose);

  return (
    <Modal title="새 사건 만들기" onClose={onClose} maxWidthClassName="max-w-md">
      <div className="flex flex-col gap-4">
        <Field label="사건 제목 *">
          <input
            value={values.title}
            onChange={(e) => setValue("title", e.target.value)}
            placeholder="예: 대여금 반환 청구"
            className={INPUT_CLS}
          />
        </Field>

        <Field label="상대방 이름 *">
          <input
            value={values.opponentName}
            onChange={(e) => setValue("opponentName", e.target.value)}
            placeholder="예: 김철수"
            className={INPUT_CLS}
          />
        </Field>

        <Field label="사건 유형 (선택)">
          <Dropdown<CaseType | "">
            value={values.caseType}
            options={CASE_TYPE_OPTIONS}
            onChange={(value) => setValue("caseType", value)}
            placeholder="사건 유형을 선택해주세요"
            renderValue={(value) => <p className="text-gray-800">{caseTypeLabel(value)}</p>}
            renderOption={(value) => <p className="text-gray-800">{caseTypeLabel(value)}</p>}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="청구 금액 (선택)">
            <input
              type="number"
              min={0}
              value={values.claimAmount}
              onChange={(e) => setValue("claimAmount", e.target.value)}
              placeholder="0"
              className={INPUT_CLS}
            />
          </Field>
          <Field label="법원 (선택)">
            <input
              value={values.court}
              onChange={(e) => setValue("court", e.target.value)}
              placeholder="예: 서울중앙지방법원"
              className={INPUT_CLS}
            />
          </Field>
        </div>

        <Field label="사건번호 (선택)">
          <input
            value={values.caseNumber}
            onChange={(e) => setValue("caseNumber", e.target.value)}
            placeholder="예: 2024가단12345"
            className={INPUT_CLS}
          />
        </Field>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className="rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:bg-blue-200"
        >
          {submitting ? "생성 중..." : "사건 생성"}
        </button>
      </div>
    </Modal>
  );
}

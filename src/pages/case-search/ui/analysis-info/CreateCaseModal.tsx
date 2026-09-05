import { useState } from "react";
import Modal from "@/pages/document/shared/Modal";
import Dropdown from "@/shared/ui/Dropdown";
import { createCase, type CaseType } from "@/shared/api/cases";

const CASE_TYPE_OPTIONS: { value: CaseType; label: string }[] = [
  { value: "LOAN", label: "대여금" },
  { value: "DEPOSIT", label: "임대차보증금" },
  { value: "WAGE", label: "임금" },
  { value: "TORT", label: "손해배상" },
  { value: "EVICTION", label: "명도" },
];

type CreateCaseModalProps = {
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateCaseModal({ onClose, onCreated }: CreateCaseModalProps) {
  const [title, setTitle] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [caseType, setCaseType] = useState<CaseType | null>(null);
  const [claimAmount, setClaimAmount] = useState("");
  const [court, setCourt] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = title.trim() !== "" && opponentName.trim() !== "" && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      await createCase({
        title: title.trim(),
        opponentName: opponentName.trim(),
        caseType: caseType ?? undefined,
        claimAmount: claimAmount ? Number(claimAmount) : undefined,
        court: court.trim() || undefined,
        caseNumber: caseNumber.trim() || undefined,
      });
      onCreated();
      onClose();
    } catch {
      setError("사건 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setSubmitting(false);
    }
  };

  return (
    <Modal title="새 사건 만들기" onClose={onClose} maxWidthClassName="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">사건 제목 *</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 대여금 반환 청구"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">상대방 이름 *</p>
          <input
            value={opponentName}
            onChange={(e) => setOpponentName(e.target.value)}
            placeholder="예: 김철수"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">사건 유형 (선택)</p>
          <Dropdown<CaseType | "">
            value={caseType ?? ""}
            options={["", ...CASE_TYPE_OPTIONS.map((opt) => opt.value)] as (CaseType | "")[]}
            onChange={(value) => setCaseType(value === "" ? null : value)}
            placeholder="사건 유형을 선택해주세요"
            renderValue={(value) => (
              <p className="text-gray-800">
                {value === "" ? "선택 안 함" : CASE_TYPE_OPTIONS.find((opt) => opt.value === value)?.label}
              </p>
            )}
            renderOption={(value) => (
              <p className="text-gray-800">
                {value === "" ? "선택 안 함" : CASE_TYPE_OPTIONS.find((opt) => opt.value === value)?.label}
              </p>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-700">청구 금액 (선택)</p>
            <input
              type="number"
              min={0}
              value={claimAmount}
              onChange={(e) => setClaimAmount(e.target.value)}
              placeholder="0"
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-700">법원 (선택)</p>
            <input
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              placeholder="예: 서울중앙지방법원"
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">사건번호 (선택)</p>
          <input
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            placeholder="예: 2024가단12345"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:bg-blue-200"
        >
          {submitting ? "생성 중..." : "사건 생성"}
        </button>
      </div>
    </Modal>
  );
}

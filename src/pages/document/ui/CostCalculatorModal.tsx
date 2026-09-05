import { useEffect, useState } from "react";
import Dropdown from "@/shared/ui/Dropdown";
import Modal from "../shared/Modal";
import {
  calculateLitigationCost,
  type FilingMethod,
  type LitigationCostResult,
  type LitigationInstance,
} from "../shared/calculateLitigationCost";

type CaseCategory = "single" | "collegiate";

const INSTANCE_OPTIONS: { value: LitigationInstance; label: string; hint: string }[] = [
  { value: "FIRST", label: "1심 (소장)", hint: "항소장은 1.5배, 상고장은 2배 (인지법 제3조)" },
  { value: "APPEAL", label: "2심 (항소장)", hint: "항소장은 1.5배, 상고장은 2배 (인지법 제3조)" },
  { value: "SUPREME", label: "3심 (상고장)", hint: "항소장은 1.5배, 상고장은 2배 (인지법 제3조)" },
];

const CATEGORY_OPTIONS: { value: CaseCategory; label: string; hint: string }[] = [
  { value: "single", label: "단독사건", hint: "소가 3,000만원 초과 5억원 이하" },
  { value: "collegiate", label: "합의사건", hint: "소가 5억원 초과" },
];

const DEBOUNCE_MS = 400;

function formatWon(value: number): string {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

function labelOf<T extends string>(options: { value: T; label: string }[], value: T): string {
  return options.find((opt) => opt.value === value)?.label ?? value;
}

type CostCalculatorModalProps = {
  onClose: () => void;
};

export default function CostCalculatorModal({ onClose }: CostCalculatorModalProps) {
  const [claimAmount, setClaimAmount] = useState(0);
  const [caseCategory, setCaseCategory] = useState<CaseCategory>("single");
  const [instance, setInstance] = useState<LitigationInstance>("FIRST");
  const [plaintiffCount, setPlaintiffCount] = useState(1);
  const [defendantCount, setDefendantCount] = useState(1);
  const [filingMethod, setFilingMethod] = useState<FilingMethod>("ELECTRONIC");
  const [showAttorneyFee, setShowAttorneyFee] = useState(false);
  const [result, setResult] = useState<LitigationCostResult | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (claimAmount <= 0) {
        setResult(null);
        return;
      }
      calculateLitigationCost({ claimAmount, plaintiffCount, defendantCount, filingMethod, instance })
        .then(setResult)
        .catch(() => setResult(null));
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [claimAmount, plaintiffCount, defendantCount, filingMethod, instance]);

  return (
    <Modal title="소송 비용 계산기" onClose={onClose} maxWidthClassName="max-w-xl">
      <p className="-mt-3 text-sm text-gray-500">
        청구금액·당사자 수·제출 방법을 넣으면 실제로 낼 금액을 계산합니다.
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-700">청구 금액 (소송목적의 값)</p>
        <div className="flex items-center rounded-xl border border-gray-200 px-4 py-3">
          <input
            type="number"
            min={0}
            value={claimAmount || ""}
            onChange={(e) => setClaimAmount(Number(e.target.value) || 0)}
            placeholder="0"
            className="w-full outline-none placeholder:text-gray-300"
          />
          <span className="text-sm text-gray-400">원</span>
        </div>
        <p className="text-xs text-gray-400">
          원금에 이자·지연손해금을 더하지 않은 금액입니다. 소가는 민사소송법 제26조에 따라 정합니다.
          {result?.isSmallClaim && " (소액사건에 해당합니다)"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">사건 종류</p>
          <Dropdown<CaseCategory>
            value={caseCategory}
            options={CATEGORY_OPTIONS.map((opt) => opt.value)}
            onChange={setCaseCategory}
            renderValue={(value) => <p className="text-gray-800">{labelOf(CATEGORY_OPTIONS, value)}</p>}
            renderOption={(value) => <p className="text-gray-800">{labelOf(CATEGORY_OPTIONS, value)}</p>}
          />
          <p className="text-xs text-gray-400">
            {CATEGORY_OPTIONS.find((opt) => opt.value === caseCategory)?.hint}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">심급</p>
          <Dropdown<LitigationInstance>
            value={instance}
            options={INSTANCE_OPTIONS.map((opt) => opt.value)}
            onChange={setInstance}
            renderValue={(value) => <p className="text-gray-800">{labelOf(INSTANCE_OPTIONS, value)}</p>}
            renderOption={(value) => <p className="text-gray-800">{labelOf(INSTANCE_OPTIONS, value)}</p>}
          />
          <p className="text-xs text-gray-400">
            {INSTANCE_OPTIONS.find((opt) => opt.value === instance)?.hint}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-700">당사자 수</p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">원고</span>
          <input
            type="number"
            min={1}
            value={plaintiffCount}
            onChange={(e) => setPlaintiffCount(Math.max(1, Number(e.target.value) || 1))}
            className="w-20 rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none"
          />
          <span className="text-sm text-gray-600">명</span>

          <span className="ml-4 text-sm text-gray-600">피고</span>
          <input
            type="number"
            min={1}
            value={defendantCount}
            onChange={(e) => setDefendantCount(Math.max(1, Number(e.target.value) || 1))}
            className="w-20 rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none"
          />
          <span className="text-sm text-gray-600">명</span>
        </div>
        <p className="text-xs text-gray-400">
          송달료는 원고·피고를 합한 인원수로 계산합니다. 인지액은 인원수와 무관합니다.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setFilingMethod((prev) => (prev === "ELECTRONIC" ? "PAPER" : "ELECTRONIC"))}
        className={`flex flex-col items-start gap-1 rounded-xl border px-4 py-3.5 text-left transition-colors ${
          filingMethod === "ELECTRONIC" ? "border-blue-300 bg-blue-50" : "border-gray-200"
        }`}
      >
        <span
          className={`flex items-center gap-2 text-sm font-semibold ${
            filingMethod === "ELECTRONIC" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white ${
              filingMethod === "ELECTRONIC" ? "bg-blue-500" : "border-2 border-gray-300"
            }`}
          >
            {filingMethod === "ELECTRONIC" ? "✓" : ""}
          </span>
          전자소송으로 제출
        </span>
        <span className="text-xs text-gray-500">
          전자문서로 내면 인지액이 10분의 9로 줄어듭니다 (민사소송 등 인지법 제16조).
        </span>
      </button>

      <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4">
        <p className="text-sm font-bold text-gray-900">비용 납부 안내</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">예상 인지대</span>
          <span className="font-semibold text-gray-900">{result ? formatWon(result.stampFee) : "-"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">예상 송달료</span>
          <span className="font-semibold text-gray-900">
            {result ? `${formatWon(result.deliveryFee)} (당사자 ${result.partyCount}인)` : "-"}
          </span>
        </div>
        {showAttorneyFee && result && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">변호사보수 인정액</span>
            <span className="font-semibold text-gray-900">{formatWon(result.attorneyFeeCap)}</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <span className="text-sm font-bold text-gray-900">합계 (본인 납부)</span>
          <span className="text-lg font-bold text-blue-500">{result ? formatWon(result.totalCost) : "-"}</span>
        </div>
      </div>

      {result && showAttorneyFee && (
        <div className="rounded-xl bg-blue-50 px-4 py-3.5 text-xs leading-relaxed text-blue-700">
          변호사보수 인정액({formatWon(result.attorneyFeeCap)})은 패소 시 상대방에게 부담할 수 있는 법정
          인정액입니다. 실제 지출 보수와 별개로, 소송비용 확정 절차에서 산정됩니다.
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowAttorneyFee((prev) => !prev)}
        className="flex items-start gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-left"
      >
        <span
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
            showAttorneyFee ? "border-blue-500" : "border-gray-300"
          }`}
        >
          {showAttorneyFee && <span className="h-2 w-2 rounded-full bg-blue-500" />}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-gray-900">변호사보수 인정액도 계산</span>
          <span className="text-xs text-gray-500">
            이기면 패소자에게 물릴 수 있는 변호사보수의 한도입니다. 지금 내는 돈이 아닙니다.
          </span>
        </span>
      </button>

      <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-500">
        <p className="font-semibold text-gray-700">송달료는 추정값입니다.</p>
        <p>{result?.disclaimer || "참고용 계산이며 실제 납부는 법원 또는 전자소송포털에서 합니다."}</p>
        <div className="flex flex-wrap gap-3 pt-1 text-gray-400">
          <span>전자소송포털</span>
          <span>민사소송 등 인지법</span>
          <span>변호사 보수 산입 규칙</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="self-end rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
      >
        확인
      </button>
    </Modal>
  );
}

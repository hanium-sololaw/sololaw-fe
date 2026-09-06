import { useEffect, useState } from "react";
import { calculateLitigationCost, type LitigationCostResult } from "../../shared/calculateLitigationCost";
import type { ComplaintDoc } from "../lib/buildDoc";
import type { ComplaintForm } from "../lib/types";
import ComplaintPaper from "./ComplaintPaper";
import FeeComparisonCard from "./efiling/FeeComparisonCard";
import InputHelperCard from "./efiling/InputHelperCard";
import SubmissionChecklist from "./efiling/SubmissionChecklist";

type EFilingGuideViewProps = {
  doc: ComplaintDoc;
  form: ComplaintForm;
  typeTitle: string;
  onEdit: () => void;
  onBack: () => void;
};

export default function EFilingGuideView({ doc, form, typeTitle, onEdit, onBack }: EFilingGuideViewProps) {
  const claimValue = Number(form.objectValue) || 0;
  const plaintiffCount = form.plaintiffs.length || 1;
  const defendantCount = form.defendants.length || 1;

  const [electronicCost, setElectronicCost] = useState<LitigationCostResult | null>(null);
  const [paperCost, setPaperCost] = useState<LitigationCostResult | null>(null);

  useEffect(() => {
    if (claimValue <= 0) return;
    let cancelled = false;
    const base = { claimAmount: claimValue, plaintiffCount, defendantCount, instance: "FIRST" as const };
    Promise.all([
      calculateLitigationCost({ ...base, filingMethod: "ELECTRONIC" }),
      calculateLitigationCost({ ...base, filingMethod: "PAPER" }),
    ])
      .then(([electronic, paper]) => {
        if (cancelled) return;
        setElectronicCost(electronic);
        setPaperCost(paper);
      })
      .catch(() => {
        if (cancelled) return;
        setElectronicCost(null);
        setPaperCost(null);
      });
    return () => {
      cancelled = true;
    };
  }, [claimValue, plaintiffCount, defendantCount]);

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        ← 작성화면으로 돌아가기
      </button>

      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold text-gray-900">소장 제출하기</h1>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500">{typeTitle}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">완성한 소장을 어디에, 어떻게 내는지 안내해 드려요.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="font-bold text-gray-900">법원 접수 정보</h2>
            <p className="mt-0.5 text-xs text-gray-400">상태 변경이 아니라 법원에서 확인한 정보만 기록합니다.</p>
          </div>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">현재 작성 중</span>
        </div>
        <p className="mt-4 rounded-xl bg-gray-50 p-3.5 text-sm leading-relaxed text-gray-600">
          <b className="font-semibold text-gray-900">사건번호는 접수해야 나옵니다.</b> 법원이 부여하는 번호라 저희는 조회할 수
          없어요. 접수하고 나면 전자소송은 「나의전자소송」에서, 종이 제출은 접수증에서 확인해 여기 적어 주세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5">
          <FeeComparisonCard electronicCost={electronicCost} paperCost={paperCost} />
          <InputHelperCard doc={doc} form={form} claimValue={claimValue} onEdit={onEdit} />
        </div>

        <div className="flex flex-col gap-5">
          <SubmissionChecklist doc={doc} form={form} onEdit={onEdit} />

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="font-bold text-gray-900">준비물</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>공동인증서 또는 간편인증 수단</li>
              <li>증거 파일 (PDF·JPG, 건당 10MB 이내)</li>
              <li>인지대·송달료 결제 수단</li>
              <li>피고 주소 자료 (모르면 접수 후 보정)</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-400 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              소장 PDF 저장 · 인쇄
            </button>
            <p className="mt-2 text-center text-xs text-gray-400">12pt · 줄간격 200% · A4로 조판된 종이 제출용 완성본이에요</p>
          </div>

          <p className="text-xs leading-relaxed text-gray-400">
            나홀로법에는 소장을 접수하거나 비용을 받지 않습니다. 접수와 납부는 법원 또는 전자소송포털에서 직접 하셔야 해요.
          </p>
        </div>
      </div>

      <div className="print-area hidden px-6 py-8 print:block sm:px-12 sm:py-12">
        <ComplaintPaper doc={doc} />
      </div>
    </div>
  );
}

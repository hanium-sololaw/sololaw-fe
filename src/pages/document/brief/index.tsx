import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loadDraft, saveDraft } from "./lib/draft";
import { generateBrief } from "./lib/generate";
import { emptyBriefForm } from "./lib/types";
import type { BriefForm } from "./lib/types";
import CaseInfoStep from "./ui/CaseInfoStep";
import DoneView from "./ui/DoneView";
import EvidenceStep from "./ui/EvidenceStep";
import OpponentStep from "./ui/OpponentStep";
import RebuttalStep from "./ui/RebuttalStep";
import GenerateNotice from "../shared/GenerateNotice";
import { useDocGeneration } from "../shared/useDocGeneration";
import WizardLayout from "../shared/WizardLayout";

type Phase = "writing" | "generating" | "ready" | "done";

const STEP_TITLES = ["사건 정보", "상대방 주장", "증거·판례", "반박"];

export default function BriefWizardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId") ? Number(searchParams.get("caseId")) : null;
  const [draft] = useState(() => loadDraft());

  const [phase, setPhase] = useState<Phase>("writing");
  const [form, setForm] = useState<BriefForm>(draft?.form ?? emptyBriefForm);
  const [stepIndex, setStepIndex] = useState(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { doc, error, setError } = useDocGeneration(
    phase,
    setPhase,
    (signal) => generateBrief(form, caseId, signal),
    "준비서면 생성에 실패했습니다.",
  );

  const updateField = <K extends keyof BriefForm>(key: K, value: BriefForm[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveDraft(next);
    }, 600);
  };

  if (phase === "done" && doc) {
    return <DoneView doc={doc} onEdit={() => setPhase("writing")} onExit={() => navigate("/document")} />;
  }

  const steps = STEP_TITLES.map((title, index) => ({ title, done: index < stepIndex }));
  const isLastStep = stepIndex === steps.length - 1;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <button
          type="button"
          onClick={() => navigate("/document")}
          className="mb-3 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          ← 문서 유형 선택으로
        </button>
        <h1 className="text-2xl font-bold text-gray-900">준비서면 작성</h1>
        <p className="mt-1 text-sm text-gray-500">상대방 서면에 대응하는 내용을 단계별로 입력하면 AI가 준비서면으로 정리합니다.</p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs leading-relaxed text-red-500">
          {error} 잠시 후 다시 시도해주세요.
        </p>
      )}

      <WizardLayout
        badge="준비서면 작성"
        steps={steps}
        activeIndex={stepIndex}
        onSelectStep={setStepIndex}
        onPrev={() => (stepIndex > 0 ? setStepIndex(stepIndex - 1) : navigate("/document"))}
        onNext={() => {
          if (isLastStep) {
            setError(null);
            setPhase("generating");
          } else {
            setStepIndex(stepIndex + 1);
          }
        }}
        nextLabel="준비서면 생성하기"
        isLastStep={isLastStep}
      >
        {stepIndex === 0 && <CaseInfoStep form={form} onChange={updateField} />}
        {stepIndex === 1 && <OpponentStep form={form} onChange={updateField} />}
        {stepIndex === 2 && <EvidenceStep form={form} onChange={updateField} />}
        {stepIndex === 3 && <RebuttalStep form={form} onChange={updateField} />}
      </WizardLayout>

      {phase === "generating" && <GenerateNotice done={false} label="준비서면" />}
      {phase === "ready" && <GenerateNotice done label="준비서면" />}
    </div>
  );
}

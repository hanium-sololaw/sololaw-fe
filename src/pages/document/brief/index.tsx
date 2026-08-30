import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildBriefDoc } from "./lib/buildDoc";
import { loadDraft, saveDraft, savedAgo } from "./lib/draft";
import { emptyBriefForm } from "./lib/types";
import type { BriefForm } from "./lib/types";
import CaseInfoStep from "./ui/CaseInfoStep";
import DoneView from "./ui/DoneView";
import EvidenceStep from "./ui/EvidenceStep";
import OpponentStep from "./ui/OpponentStep";
import RebuttalStep from "./ui/RebuttalStep";
import GenerateNotice from "../shared/GenerateNotice";
import WizardLayout from "../shared/WizardLayout";

type Phase = "writing" | "generating" | "ready" | "done";

const STEP_TITLES = ["사건 정보", "상대방 주장", "증거·판례", "반박"];

export default function BriefWizardPage() {
  const navigate = useNavigate();
  const [draft] = useState(() => loadDraft());

  const [phase, setPhase] = useState<Phase>("writing");
  const [form, setForm] = useState<BriefForm>(draft?.form ?? emptyBriefForm);
  const [stepIndex, setStepIndex] = useState(0);
  const [savedAt, setSavedAt] = useState<number | null>(draft?.savedAt ?? null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase !== "generating") return undefined;
    const timer = setTimeout(() => setPhase("ready"), 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "ready") return undefined;
    const timer = setTimeout(() => setPhase("done"), 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  const updateField = <K extends keyof BriefForm>(key: K, value: BriefForm[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (saveDraft(next)) setSavedAt(Date.now());
    }, 600);
  };

  if (phase === "done") {
    const doc = buildBriefDoc(form);
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

      <WizardLayout
        badge="준비서면 작성"
        steps={steps}
        activeIndex={stepIndex}
        onSelectStep={setStepIndex}
        savedLabel={savedAt ? `${savedAgo(savedAt)} 저장됨` : ""}
        onPrev={() => (stepIndex > 0 ? setStepIndex(stepIndex - 1) : navigate("/document"))}
        onNext={() => (isLastStep ? setPhase("generating") : setStepIndex(stepIndex + 1))}
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

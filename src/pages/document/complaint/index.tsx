import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { findComplaintType } from "./lib/complaintTypes";
import { loadDraft, saveDraft } from "./lib/draft";
import { generateComplaint } from "./lib/generate";
import { emptyComplaintForm } from "./lib/types";
import type { ComplaintForm, ComplaintTypeId } from "./lib/types";
import AttachmentsStep from "./ui/AttachmentsStep";
import CourtClaimStep from "./ui/CourtClaimStep";
import DemandStep from "./ui/DemandStep";
import DoneView from "./ui/DoneView";
import EFilingGuideView from "./ui/EFilingGuideView";
import FactsStep from "./ui/FactsStep";
import GenerateNotice from "../shared/GenerateNotice";
import PartyStep from "./ui/PartyStep";
import TypeStep from "./ui/TypeStep";
import { useDocGeneration } from "../shared/useDocGeneration";
import WizardLayout from "../shared/WizardLayout";

type Phase = "type" | "writing" | "generating" | "ready" | "done" | "efiling";

const STEP_TITLES = ["법원·청구금액", "당사자 정보", "사실관계", "독촉 내역", "증빙 자료"];

export default function ComplaintWizardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId") ? Number(searchParams.get("caseId")) : null;
  const [draft] = useState(() => loadDraft());

  const [phase, setPhase] = useState<Phase>(draft ? "writing" : "type");
  const [typeId, setTypeId] = useState<ComplaintTypeId>(draft?.typeId ?? "loan");
  const [form, setForm] = useState<ComplaintForm>(draft?.form ?? emptyComplaintForm);
  const [stepIndex, setStepIndex] = useState(0);

  const type = findComplaintType(typeId);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { doc, error, setError } = useDocGeneration(
    phase,
    setPhase,
    (signal) => generateComplaint(type, form, caseId, signal),
    "소장 생성에 실패했습니다.",
  );

  const updateField = <K extends keyof ComplaintForm>(key: K, value: ComplaintForm[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveDraft(typeId, next);
    }, 600);
  };

  if (phase === "type") {
    return (
      <TypeStep
        onPick={(id, situation) => {
          setTypeId(id);
          setForm({ ...emptyComplaintForm, situation });
          setPhase("writing");
        }}
        onBack={() => navigate("/document")}
      />
    );
  }

  if (phase === "efiling" && doc) {
    return (
      <EFilingGuideView
        doc={doc}
        form={form}
        typeTitle={type.title}
        onEdit={() => setPhase("writing")}
        onBack={() => setPhase("done")}
      />
    );
  }

  if (phase === "done" && doc) {
    return (
      <DoneView
        doc={doc}
        onEdit={() => setPhase("writing")}
        onExit={() => navigate("/document")}
        onSubmitGuide={() => setPhase("efiling")}
      />
    );
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
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold text-gray-900">소장 작성</h1>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500">{type.title}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">단계별로 입력하면 AI가 소장 문서로 정리합니다.</p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs leading-relaxed text-red-500">
          {error} 잠시 후 다시 시도해주세요.
        </p>
      )}

      <WizardLayout
        badge="소장 작성"
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
        nextLabel="소장 생성하기"
        isLastStep={isLastStep}
      >
        {stepIndex === 0 && <CourtClaimStep form={form} onChange={updateField} />}
        {stepIndex === 1 && <PartyStep form={form} onChange={updateField} />}
        {stepIndex === 2 && <FactsStep type={type} form={form} onChange={updateField} />}
        {stepIndex === 3 && <DemandStep form={form} onChange={updateField} />}
        {stepIndex === 4 && <AttachmentsStep type={type} form={form} onChange={updateField} />}
      </WizardLayout>

      {phase === "generating" && <GenerateNotice done={false} label="소장" />}
      {phase === "ready" && <GenerateNotice done label="소장" />}
    </div>
  );
}

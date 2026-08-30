import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildComplaintDoc } from "./lib/buildDoc";
import { findComplaintType } from "./lib/complaintTypes";
import { loadDraft, saveDraft, savedAgo } from "./lib/draft";
import { emptyComplaintForm } from "./lib/types";
import type { ComplaintForm, ComplaintTypeId } from "./lib/types";
import AttachmentsStep from "./ui/AttachmentsStep";
import CourtClaimStep from "./ui/CourtClaimStep";
import DemandStep from "./ui/DemandStep";
import DoneView from "./ui/DoneView";
import FactsStep from "./ui/FactsStep";
import GenerateNotice from "../shared/GenerateNotice";
import PartyStep from "./ui/PartyStep";
import TypeStep from "./ui/TypeStep";
import WizardLayout from "../shared/WizardLayout";

type Phase = "type" | "writing" | "generating" | "ready" | "done";

const STEP_TITLES = ["법원·청구금액", "당사자 정보", "사실관계", "독촉 내역", "증빙 자료"];

export default function ComplaintWizardPage() {
  const navigate = useNavigate();
  const [draft] = useState(() => loadDraft());

  const [phase, setPhase] = useState<Phase>(draft ? "writing" : "type");
  const [typeId, setTypeId] = useState<ComplaintTypeId>(draft?.typeId ?? "loan");
  const [form, setForm] = useState<ComplaintForm>(draft?.form ?? emptyComplaintForm);
  const [stepIndex, setStepIndex] = useState(0);
  const [savedAt, setSavedAt] = useState<number | null>(draft?.savedAt ?? null);

  const type = findComplaintType(typeId);
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

  const updateField = <K extends keyof ComplaintForm>(key: K, value: ComplaintForm[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (saveDraft(typeId, next)) setSavedAt(Date.now());
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

  if (phase === "done") {
    const doc = buildComplaintDoc(type, form);
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
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold text-gray-900">소장 작성</h1>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500">{type.title}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">단계별로 입력하면 AI가 소장 문서로 정리합니다.</p>
      </div>

      <WizardLayout
        badge="소장 작성"
        steps={steps}
        activeIndex={stepIndex}
        onSelectStep={setStepIndex}
        savedLabel={savedAt ? `${savedAgo(savedAt)} 저장됨` : ""}
        onPrev={() => (stepIndex > 0 ? setStepIndex(stepIndex - 1) : navigate("/document"))}
        onNext={() => (isLastStep ? setPhase("generating") : setStepIndex(stepIndex + 1))}
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

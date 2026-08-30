import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildPetitionDoc } from "./lib/buildDoc";
import { loadDraft, saveDraft, savedAgo } from "./lib/draft";
import { findPetitionType } from "./lib/petitionTypes";
import { emptyPetitionForm } from "./lib/types";
import type { PetitionForm, PetitionTypeId } from "./lib/types";
import AttachmentsStep from "./ui/AttachmentsStep";
import DoneView from "./ui/DoneView";
import FactsStep from "./ui/FactsStep";
import NarrativeStep from "./ui/NarrativeStep";
import PartyStep from "./ui/PartyStep";
import PrecedentsStep from "./ui/PrecedentsStep";
import TypeStep from "./ui/TypeStep";
import GenerateNotice from "../shared/GenerateNotice";
import WizardLayout from "../shared/WizardLayout";

type Phase = "type" | "writing" | "generating" | "ready" | "done";

export default function PetitionWizardPage() {
  const navigate = useNavigate();
  const [draft] = useState(() => loadDraft());

  const [phase, setPhase] = useState<Phase>(draft ? "writing" : "type");
  const [typeId, setTypeId] = useState<PetitionTypeId>(draft?.typeId ?? "payment");
  const [form, setForm] = useState<PetitionForm>(draft?.form ?? emptyPetitionForm);
  const [stepIndex, setStepIndex] = useState(0);
  const [savedAt, setSavedAt] = useState<number | null>(draft?.savedAt ?? null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const type = findPetitionType(typeId);

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

  const updateField = <K extends keyof PetitionForm>(key: K, value: PetitionForm[K]) => {
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
        onPick={(id) => {
          setTypeId(id);
          setForm(emptyPetitionForm);
          setStepIndex(0);
          setPhase("writing");
        }}
        onBack={() => navigate("/document")}
      />
    );
  }

  if (phase === "done") {
    const doc = buildPetitionDoc(type, form);
    return <DoneView doc={doc} onEdit={() => setPhase("writing")} onExit={() => navigate("/document")} />;
  }

  const steps = type.steps.map((step, index) => ({ title: step.title, done: index < stepIndex }));
  const isLastStep = stepIndex === steps.length - 1;
  const activeStep = type.steps[stepIndex];

  const statementFields = activeStep.factKeys
    ? type.statementFields.filter((field) => activeStep.factKeys?.includes(field.key))
    : type.statementFields;

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
          <h1 className="text-2xl font-bold text-gray-900">신청서 작성</h1>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500">{type.title}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">단계별로 입력하면 AI가 신청서로 정리합니다.</p>
      </div>

      <WizardLayout
        badge="신청서 작성"
        steps={steps}
        activeIndex={stepIndex}
        onSelectStep={setStepIndex}
        savedLabel={savedAt ? `${savedAgo(savedAt)} 저장됨` : ""}
        onPrev={() => (stepIndex > 0 ? setStepIndex(stepIndex - 1) : navigate("/document"))}
        onNext={() => (isLastStep ? setPhase("generating") : setStepIndex(stepIndex + 1))}
        nextLabel="신청서 생성하기"
        isLastStep={isLastStep}
      >
        {activeStep.kind === "party" && <PartyStep type={type} form={form} onChange={updateField} />}

        {activeStep.kind === "facts" && (
          <FactsStep
            title={activeStep.title}
            subtitle={`${type.title}에 필요한 세부 내용을 입력해주세요.`}
            fields={type.factFields}
            values={form.facts}
            onChangeValue={(key, value) => updateField("facts", { ...form.facts, [key]: value })}
          />
        )}

        {activeStep.kind === "statement" && (
          <FactsStep
            title={activeStep.title}
            subtitle="법원 양식이 정한 8가지 질문이에요. 빠짐없이 답해주세요."
            fields={statementFields}
            values={form.statement}
            onChangeValue={(key, value) => updateField("statement", { ...form.statement, [key]: value })}
            notice={activeStep.notice}
          />
        )}

        {activeStep.kind === "narrative" && (
          <NarrativeStep
            question={type.narrativePrompt.question}
            placeholder={type.narrativePrompt.placeholder}
            value={form.narrative}
            onChange={(value) => updateField("narrative", value)}
          />
        )}

        {activeStep.kind === "attachments" && (
          <AttachmentsStep
            options={type.attachmentOptions}
            selected={form.attachments}
            onChange={(value) => updateField("attachments", value)}
          />
        )}

        {activeStep.kind === "narrativeAttachments" && (
          <div className="flex flex-col gap-6">
            <NarrativeStep
              question={type.narrativePrompt.question}
              placeholder={type.narrativePrompt.placeholder}
              value={form.narrative}
              onChange={(value) => updateField("narrative", value)}
            />
            <AttachmentsStep
              options={type.attachmentOptions}
              selected={form.attachments}
              onChange={(value) => updateField("attachments", value)}
            />
          </div>
        )}

        {activeStep.kind === "narrativePrecedents" && (
          <div className="flex flex-col gap-6">
            <NarrativeStep
              question={type.narrativePrompt.question}
              placeholder={type.narrativePrompt.placeholder}
              value={form.narrative}
              onChange={(value) => updateField("narrative", value)}
            />
            <PrecedentsStep precedents={form.citedPrecedents} onChange={(value) => updateField("citedPrecedents", value)} />
          </div>
        )}
      </WizardLayout>

      {phase === "generating" && <GenerateNotice done={false} label={type.title} />}
      {phase === "ready" && <GenerateNotice done label={type.title} />}
    </div>
  );
}

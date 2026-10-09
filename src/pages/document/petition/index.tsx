import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WizardPage from "../ui/shared/WizardPage";
import { useDocumentWizard } from "../shared/useDocumentWizard";
import { loadDraft, saveDraft } from "./lib/draft";
import { generatePetition } from "./lib/generate";
import { findPetitionType } from "./lib/petitionTypes";
import { emptyPetitionForm } from "./lib/types";
import type { PetitionTypeId } from "./lib/types";
import AttachmentsStep from "./ui/wizard/AttachmentsStep";
import FactsStep from "./ui/wizard/FactsStep";
import NarrativeStep from "./ui/wizard/NarrativeStep";
import PartyStep from "./ui/wizard/PartyStep";
import PrecedentsStep from "./ui/wizard/PrecedentsStep";
import TypeStep from "./ui/wizard/TypeStep";

export default function PetitionWizardPage() {
  const navigate = useNavigate();
  const [typeId, setTypeId] = useState<PetitionTypeId>("payment");
  const type = findPetitionType(typeId);

  const wizard = useDocumentWizard({
    initialForm: emptyPetitionForm,
    initialPhase: "type",
    stepCount: type.steps.length,
    saveDraft: (form) => saveDraft(typeId, form),
    generate: (form, caseId, signal) => generatePetition(type, form, caseId, signal),
    errorMessage: "신청서 생성에 실패했습니다.",
    donePath: "/document/petition/done",
    doneState: (doc) => ({ doc }),
  });
  const { form, updateField, stepIndex } = wizard;

  const pickType = (id: PetitionTypeId) => {
    setTypeId(id);
    wizard.setForm(loadDraft(id)?.form ?? emptyPetitionForm);
    wizard.setStepIndex(0);
    wizard.setPhase("writing");
  };

  if (wizard.phase === "type") return <TypeStep onPick={pickType} onBack={() => navigate("/document")} />;

  const step = type.steps[stepIndex];
  const statementFields = step.factKeys
    ? type.statementFields.filter((field) => step.factKeys?.includes(field.key))
    : type.statementFields;

  const narrative = (
    <NarrativeStep
      question={type.narrativePrompt.question}
      placeholder={type.narrativePrompt.placeholder}
      value={form.narrative}
      onChange={(value) => updateField("narrative", value)}
    />
  );
  const attachments = (
    <AttachmentsStep
      options={type.attachmentOptions}
      selected={form.attachments}
      onChange={(value) => updateField("attachments", value)}
    />
  );

  return (
    <WizardPage
      wizard={wizard}
      title="신청서 작성"
      current={type.title}
      subtitle="단계별로 입력하면 AI가 신청서로 정리합니다."
      stepTitles={type.steps.map((item) => item.title)}
      nextLabel="신청서 생성하기"
      noticeLabel={type.title}
      onBack={() => wizard.setPhase("type")}
    >
      {step.kind === "party" && <PartyStep type={type} form={form} onChange={updateField} />}

      {step.kind === "facts" && (
        <FactsStep
          title={step.title}
          subtitle={`${type.title}에 필요한 세부 내용을 입력해주세요.`}
          fields={type.factFields}
          values={form.facts}
          onChangeValue={(key, value) => updateField("facts", { ...form.facts, [key]: value })}
        />
      )}

      {step.kind === "statement" && (
        <FactsStep
          title={step.title}
          subtitle="법원 양식이 정한 8가지 질문이에요. 빠짐없이 답해주세요."
          fields={statementFields}
          values={form.statement}
          onChangeValue={(key, value) => updateField("statement", { ...form.statement, [key]: value })}
          notice={step.notice}
        />
      )}

      {step.kind === "narrative" && narrative}
      {step.kind === "attachments" && attachments}

      {step.kind === "narrativeAttachments" && (
        <div className="flex flex-col gap-6">
          {narrative}
          {attachments}
        </div>
      )}

      {step.kind === "narrativePrecedents" && (
        <div className="flex flex-col gap-6">
          {narrative}
          <PrecedentsStep precedents={form.citedPrecedents} onChange={(value) => updateField("citedPrecedents", value)} />
        </div>
      )}
    </WizardPage>
  );
}

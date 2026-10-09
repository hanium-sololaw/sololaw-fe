import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WizardPage from "../ui/shared/WizardPage";
import { useDocumentWizard } from "../shared/useDocumentWizard";
import { findComplaintType } from "./lib/complaintTypes";
import { loadDraft, saveDraft } from "./lib/draft";
import { generateComplaint } from "./lib/generate";
import { emptyComplaintForm } from "./lib/types";
import type { ComplaintTypeId } from "./lib/types";
import AttachmentsStep from "./ui/wizard/AttachmentsStep";
import ComplaintTips from "./ui/wizard/ComplaintTips";
import CourtClaimStep from "./ui/wizard/CourtClaimStep";
import DemandStep from "./ui/wizard/DemandStep";
import FactsStep from "./ui/wizard/FactsStep";
import PartyStep from "./ui/wizard/PartyStep";
import TypeStep from "./ui/wizard/TypeStep";

const STEP_TITLES = ["법원·청구금액", "당사자 정보", "사실관계", "독촉 내역", "증빙 자료"];

export default function ComplaintWizardPage() {
  const navigate = useNavigate();
  const [typeId, setTypeId] = useState<ComplaintTypeId>("loan");
  const type = findComplaintType(typeId);

  const wizard = useDocumentWizard({
    initialForm: emptyComplaintForm,
    initialPhase: "type",
    stepCount: STEP_TITLES.length,
    saveDraft: (form) => saveDraft(typeId, form),
    generate: (form, caseId, signal) => generateComplaint(type, form, caseId, signal),
    errorMessage: "소장 생성에 실패했습니다.",
    donePath: "/document/complaint/done",
    doneState: (doc, form) => ({ doc, form, typeTitle: type.title }),
  });
  const { form, updateField, stepIndex } = wizard;

  const pickType = (id: ComplaintTypeId, situation: string) => {
    setTypeId(id);
    wizard.setForm({ ...(loadDraft(id)?.form ?? emptyComplaintForm), situation });
    wizard.setPhase("writing");
  };

  if (wizard.phase === "type") return <TypeStep onPick={pickType} onBack={() => navigate("/document")} />;

  return (
    <WizardPage
      wizard={wizard}
      title="소장 작성"
      current={type.title}
      stepTitles={STEP_TITLES}
      nextLabel="소장 생성하기"
      noticeLabel="소장"
      onBack={() => wizard.setPhase("type")}
      sideContent={<ComplaintTips />}
    >
      {stepIndex === 0 && <CourtClaimStep form={form} onChange={updateField} />}
      {stepIndex === 1 && <PartyStep form={form} onChange={updateField} />}
      {stepIndex === 2 && <FactsStep type={type} form={form} onChange={updateField} />}
      {stepIndex === 3 && <DemandStep form={form} onChange={updateField} />}
      {stepIndex === 4 && <AttachmentsStep type={type} form={form} onChange={updateField} />}
    </WizardPage>
  );
}

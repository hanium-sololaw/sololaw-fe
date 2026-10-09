import { useNavigate } from "react-router-dom";
import WizardPage from "../ui/shared/WizardPage";
import { useDocumentWizard } from "../shared/useDocumentWizard";
import { loadDraft, saveDraft } from "./lib/draft";
import { generateBrief } from "./lib/generate";
import { emptyBriefForm } from "./lib/types";
import { useCaseAutofill } from "./lib/useCaseAutofill";
import BriefTips from "./ui/wizard/BriefTips";
import CaseInfoStep from "./ui/wizard/CaseInfoStep";
import EvidenceStep from "./ui/wizard/EvidenceStep";
import OpponentStep from "./ui/wizard/OpponentStep";
import RebuttalStep from "./ui/wizard/RebuttalStep";

const STEP_TITLES = [
  "어떤 사건의 준비서면인가요?",
  "상대방은 뭐라고 했나요?",
  "증거 · 판례 첨부",
  "어떤 부분을 반박하나요?",
];

export default function BriefWizardPage() {
  const navigate = useNavigate();
  const wizard = useDocumentWizard({
    initialForm: () => loadDraft()?.form ?? emptyBriefForm,
    initialPhase: "writing",
    stepCount: STEP_TITLES.length,
    saveDraft,
    generate: generateBrief,
    errorMessage: "준비서면 생성에 실패했습니다.",
    donePath: "/document/brief/done",
    doneState: (doc) => ({ doc }),
  });
  const { form, updateField, stepIndex, caseId } = wizard;
  const loadedCaseTitle = useCaseAutofill(caseId, wizard.setForm);

  return (
    <WizardPage
      wizard={wizard}
      title="준비서면 작성"
      current={form.briefNo || "준비서면(1)"}
      subtitle="상대방의 말을 평소 말로 정리하면 AI가 쟁점별 준비서면으로 작성합니다."
      stepTitles={STEP_TITLES}
      nextLabel="준비서면 생성하기"
      noticeLabel="준비서면"
      onBack={() => navigate("/document")}
      sideContent={<BriefTips stepIndex={stepIndex} stepTitle={STEP_TITLES[stepIndex]} />}
    >
      {stepIndex === 0 && <CaseInfoStep form={form} onChange={updateField} loadedCaseTitle={loadedCaseTitle} />}
      {stepIndex === 1 && <OpponentStep form={form} onChange={updateField} />}
      {stepIndex === 2 && <EvidenceStep form={form} onChange={updateField} caseId={caseId} />}
      {stepIndex === 3 && <RebuttalStep form={form} onChange={updateField} />}
    </WizardPage>
  );
}

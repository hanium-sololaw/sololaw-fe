import { useNavigate } from "react-router-dom";
import WizardPage from "../ui/shared/WizardPage";
import { useDocumentWizard } from "../shared/useDocumentWizard";
import { loadDraft, saveDraft } from "./lib/draft";
import { generateEvidenceList } from "./lib/generate";
import { emptyEvidenceListForm } from "./lib/types";
import CaseInfoStep from "./ui/wizard/CaseInfoStep";
import EvidenceItemsStep from "./ui/wizard/EvidenceItemsStep";
import ReviewStep from "./ui/wizard/ReviewStep";

const STEP_TITLES = ["사건 정보", "증거 추가", "순서 확인"];

export default function EvidenceListWizardPage() {
  const navigate = useNavigate();
  const wizard = useDocumentWizard({
    initialForm: () => loadDraft()?.form ?? emptyEvidenceListForm,
    initialPhase: "writing",
    stepCount: STEP_TITLES.length,
    saveDraft,
    generate: generateEvidenceList,
    errorMessage: "증거목록 생성에 실패했습니다.",
    donePath: "/document/evidence/done",
    doneState: (doc) => ({ doc }),
  });
  const { form, updateField, stepIndex } = wizard;

  return (
    <WizardPage
      wizard={wizard}
      title="증거목록 작성"
      subtitle="가지고 있는 증거를 추가하면 AI가 증거설명서로 정리합니다."
      stepTitles={STEP_TITLES}
      nextLabel="증거목록 생성하기"
      noticeLabel="증거목록"
      onBack={() => navigate("/document")}
    >
      {stepIndex === 0 && <CaseInfoStep form={form} onChange={updateField} />}
      {stepIndex === 1 && <EvidenceItemsStep form={form} onChange={updateField} />}
      {stepIndex === 2 && <ReviewStep form={form} onChange={updateField} />}
    </WizardPage>
  );
}

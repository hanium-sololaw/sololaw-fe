import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@/assets/icons/schedule/arrow-left-icon.svg?react";
import LoanProcedureSteps from "./ui/LoanProcedureSteps";
import LoanDeadlineCard from "./ui/LoanDeadlineCard";
import LoanPreparationCard from "./ui/LoanPreparationCard";
import LoanToolsCard from "./ui/LoanToolsCard";
import {
  loanCaseSummary,
  loanProcedureSteps,
  loanHelperNote,
  loanStepDetails,
  type LoanProcedureStep,
  type LoanStepDetail,
} from "./data/mockLoanGuideDetail";
import { caseGuideDetails } from "./data/mockCaseGuideDetails";

const defaultTools: LoanStepDetail["tools"] = [
  { label: "증빙자료 올리러 가기", to: "/evidence" },
  { label: "비슷한 판례 찾아보기", to: "/case" },
];

type CaseGuideDetailPageProps = {
  caseId: string;
};

function getCaseData(caseId: string): {
  title: string;
  steps: LoanProcedureStep[];
  stepDetails: Record<string, LoanStepDetail>;
} {
  if (caseId === "1") {
    return {
      title: loanCaseSummary.title,
      steps: loanProcedureSteps,
      stepDetails: loanStepDetails,
    };
  }

  return (
    caseGuideDetails[caseId] ?? {
      title: loanCaseSummary.title,
      steps: loanProcedureSteps,
      stepDetails: loanStepDetails,
    }
  );
}

export default function CaseGuideDetailPage({
  caseId,
}: CaseGuideDetailPageProps) {
  const navigate = useNavigate();
  const { title, steps, stepDetails } = getCaseData(caseId);
  const [activeStepId, setActiveStepId] = useState(steps[0].id);

  const activeStep =
    steps.find((step) => step.id === activeStepId) ?? steps[0];

  const detail: LoanStepDetail = stepDetails[activeStepId] ?? {
    deadline: {
      type: "notice",
      heading: "이 단계 안내는 준비 중이에요.",
      body: activeStep.description,
    },
    preparationItems: activeStep.items,
    tools: defaultTools,
  };

  useEffect(() => {
    const breadcrumb =
      activeStep.breadcrumbLabel ?? `${title} - ${activeStep.title}`;
    document.title = `소송 절차 안내 / ${breadcrumb}`;
  }, [title, activeStep.breadcrumbLabel, activeStep.title]);

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => navigate("/guide")}
        className="flex w-fit items-center gap-1 text-sm font-medium text-gray-500"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        사건 다시 고르기
      </button>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          소송 절차 안내
        </h1>
        <p className="text-base text-gray-500">
          지금 어느 단계에 있고, 그 단계에서 무엇을 해야 하는지 보여줍니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <LoanProcedureSteps
          steps={steps}
          activeStepId={activeStepId}
          onSelect={setActiveStepId}
        />

        <div className="flex flex-col gap-6">
          <LoanDeadlineCard
            key={activeStepId}
            deadline={detail.deadline}
            helperNote={loanHelperNote}
          />
          <LoanPreparationCard items={detail.preparationItems} />
          <LoanToolsCard
            tools={detail.tools}
            secondaryLink={detail.secondaryLink}
          />
        </div>
      </div>
    </div>
  );
}

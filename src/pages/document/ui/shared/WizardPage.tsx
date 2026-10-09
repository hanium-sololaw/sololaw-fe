import type { ReactNode } from "react";
import Icon from "@/shared/ui/Icon";
import ChevronLeftIcon from "@/assets/icons/document/chevron-left-icon.svg?react";
import ChevronRightIcon from "@/assets/icons/document/chevron-right-icon.svg?react";
import GenerateNotice from "./GenerateNotice";
import WizardLayout from "./WizardLayout";
import type { WizardPhase } from "../../shared/useDocumentWizard";

type WizardPageHeaderProps = {
  title: string;
  current?: string;
  subtitle?: string;
  onBack: () => void;
};

function WizardPageHeader({ title, current, subtitle, onBack }: WizardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2.5 self-start text-[13px] font-medium text-gray-400 hover:text-gray-600"
      >
        <Icon icon={ChevronLeftIcon} size={20} />
        이전으로 돌아가기
      </button>

      <div>
        <h1 className="flex items-center gap-2.5 px-2 text-2xl font-semibold tracking-[-0.48px] text-gray-500">
          {title}
          {current && (
            <>
              <Icon icon={ChevronRightIcon} size={24} />
              <span className="text-blue-400 underline">{current}</span>
            </>
          )}
        </h1>
        {subtitle && <p className="mt-1 px-2 text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

type WizardControls = {
  phase: WizardPhase;
  error: string | null;
  stepIndex: number;
  setStepIndex: (index: number) => void;
  isLastStep: boolean;
  next: () => void;
  prev: () => void;
};

type WizardPageProps = {
  wizard: WizardControls;
  title: string;
  current?: string;
  subtitle?: string;
  stepTitles: string[];
  nextLabel: string;
  noticeLabel: string;
  onBack: () => void;
  sideContent?: ReactNode;
  children: ReactNode;
};

export default function WizardPage({
  wizard,
  title,
  current,
  subtitle,
  stepTitles,
  nextLabel,
  noticeLabel,
  onBack,
  sideContent,
  children,
}: WizardPageProps) {
  const steps = stepTitles.map((stepTitle, index) => ({ title: stepTitle, done: index < wizard.stepIndex }));

  return (
    <div className="flex flex-col gap-5">
      <WizardPageHeader title={title} current={current} subtitle={subtitle} onBack={onBack} />

      {wizard.error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs leading-relaxed text-red-500">
          {wizard.error} 잠시 후 다시 시도해주세요.
        </p>
      )}

      <WizardLayout
        badge={title}
        steps={steps}
        activeIndex={wizard.stepIndex}
        onSelectStep={wizard.setStepIndex}
        onPrev={wizard.prev}
        onNext={wizard.next}
        nextLabel={nextLabel}
        isLastStep={wizard.isLastStep}
        sideContent={sideContent}
      >
        {children}
      </WizardLayout>

      {wizard.phase === "generating" && <GenerateNotice done={false} label={noticeLabel} />}
      {wizard.phase === "ready" && <GenerateNotice done label={noticeLabel} />}
    </div>
  );
}

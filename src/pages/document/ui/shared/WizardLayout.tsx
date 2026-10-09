import type { ReactNode } from "react";
import Icon from "@/shared/ui/Icon";
import ChevronRightIcon from "@/assets/icons/document/chevron-right-icon.svg?react";

export type WizardStepNavItem = {
  title: string;
  done: boolean;
};

type WizardSidebarProps = {
  badge: string;
  steps: WizardStepNavItem[];
  activeIndex: number;
  onSelectStep: (index: number) => void;
};

function WizardSidebar({ badge, steps, activeIndex, onSelectStep }: WizardSidebarProps) {
  const progress = ((activeIndex + 1) / steps.length) * 100;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-[0_1px_1.5px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between px-1 text-xs text-gray-400">
        <p>{badge}</p>
        <p>
          {activeIndex + 1}/{steps.length}
        </p>
      </div>
      <div className="mx-1 mt-1.5 mb-2 h-2 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-blue-300 transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>
      <nav className="flex flex-col gap-0.5 border-t border-gray-100 pt-2">
        {steps.map((step, index) => {
          const active = index === activeIndex;
          const numberTone = active ? "bg-blue-50 text-blue-300" : step.done ? "bg-gray-50 text-blue-300" : "bg-gray-50 text-gray-300";
          return (
            <button
              key={step.title}
              type="button"
              onClick={() => onSelectStep(index)}
              className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${
                active ? "bg-blue-50 text-blue-300" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded text-base font-semibold ${numberTone}`}>
                {index + 1}
              </span>
              {step.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

type WizardLayoutProps = {
  badge: string;
  steps: WizardStepNavItem[];
  activeIndex: number;
  onSelectStep: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  isLastStep: boolean;
  sideContent?: ReactNode;
  children: ReactNode;
};

export default function WizardLayout({
  badge,
  steps,
  activeIndex,
  onSelectStep,
  onPrev,
  onNext,
  nextLabel,
  nextDisabled,
  isLastStep,
  sideContent,
  children,
}: WizardLayoutProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-[264px]">
        <WizardSidebar badge={badge} steps={steps} activeIndex={activeIndex} onSelectStep={onSelectStep} />
        {sideContent}
      </aside>

      <div className="min-w-0 flex-1 rounded-[14px] bg-white">
        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>

        <div className="sticky bottom-0 flex flex-wrap items-center gap-2 rounded-t-[20px] bg-white px-5 py-2.5 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-50"
            >
              이전
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className="flex items-center gap-1 rounded-lg bg-blue-300 py-2 pr-2 pl-4 text-sm font-semibold text-gray-50 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLastStep ? nextLabel : "다음 단계"}
              <Icon icon={ChevronRightIcon} size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

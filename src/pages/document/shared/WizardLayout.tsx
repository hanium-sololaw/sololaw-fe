import type { ReactNode } from "react";

export type WizardStepNavItem = {
  title: string;
  done: boolean;
};

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
  children,
}: WizardLayoutProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <aside className="w-full shrink-0 lg:w-56">
        <div className="rounded-2xl border border-gray-200 bg-white p-3">
          <p className="px-2 pb-2 text-xs font-semibold text-gray-400">{badge}</p>
          <nav className="flex flex-col gap-1">
            {steps.map((step, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => onSelectStep(index)}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                    active ? "bg-blue-50 font-semibold text-blue-500" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md text-[11px] font-bold ${
                      active ? "bg-blue-400 text-white" : step.done ? "bg-blue-50 text-blue-400" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {step.title}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white">
        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>

        <div className="sticky bottom-0 flex flex-wrap items-center gap-2 rounded-b-2xl border-t border-gray-100 bg-white/95 px-5 py-3 backdrop-blur-sm">
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              이전
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className="rounded-xl bg-blue-400 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLastStep ? nextLabel : "다음 단계"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

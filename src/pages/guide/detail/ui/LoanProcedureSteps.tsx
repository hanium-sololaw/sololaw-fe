import { useLayoutEffect, useRef, useState } from "react";
import CheckActiveIcon from "@/assets/icons/mypage/check-active-icon.svg?react";
import StepActiveIcon from "@/assets/icons/lawsuit/step-active-icon.svg?react";
import StepDoneIcon from "@/assets/icons/lawsuit/step-done-icon.svg?react";
import StepIcon from "@/assets/icons/lawsuit/step-icon.svg?react";
import type { LoanProcedureStep } from "../data/mockLoanGuideDetail";

type LoanProcedureStepsProps = {
  steps: LoanProcedureStep[];
  activeStepId: string;
  onSelect: (stepId: string) => void;
};

export default function LoanProcedureSteps({
  steps,
  activeStepId,
  onSelect,
}: LoanProcedureStepsProps) {
  const activeIndex = steps.findIndex((step) => step.id === activeStepId);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [contentHeights, setContentHeights] = useState<number[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      setContentHeights(
        contentRefs.current.map((node) => node?.offsetHeight ?? 0),
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [steps, activeStepId]);

  return (
    <section className="rounded-[20px] border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">소송 진행 단계</h2>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        지금 어디인지와 각 단계에서 할 일을 함께 봅니다
      </p>

      <div className="flex flex-col gap-2">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isDone = index < activeIndex;
          const isCurrent = index === activeIndex;
          const barHeight = contentHeights[index];

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelect(step.id)}
              className="flex gap-4 text-left"
            >
              <div className="flex flex-col items-center gap-1.75">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center">
                  {isDone ? (
                    <StepDoneIcon />
                  ) : isCurrent ? (
                    <StepActiveIcon />
                  ) : (
                    <StepIcon />
                  )}
                </span>
                {!isLast && (
                  <span
                    className={`w-0.5 rounded-lg ${
                      isCurrent || isDone ? "" : "bg-gray-200"
                    }`}
                    style={{
                      height: barHeight ? `${barHeight}px` : undefined,
                      background: isCurrent
                        ? "linear-gradient(180deg, var(--color-blue-100) 0%, var(--color-gray-300) 100%)"
                        : isDone
                          ? "var(--color-blue-300)"
                          : undefined,
                    }}
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-lg leading-[160%] font-semibold ${
                      isCurrent
                        ? "text-blue-300"
                        : isDone
                          ? "text-gray-900"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  {isDone && <CheckActiveIcon className="h-4 w-4 shrink-0" />}
                  {step.typeTag && (
                    <span className="text-sm font-normal text-gray-400">
                      ({step.typeTag})
                    </span>
                  )}
                  {isCurrent && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs leading-[160%] font-semibold text-blue-500">
                      지금은 여기!
                    </span>
                  )}
                  {isCurrent && step.progressTag && (
                    <span className="text-sm font-normal text-gray-400">
                      {step.progressTag}
                    </span>
                  )}
                  {isDone && step.doneDate && (
                    <span className="text-sm text-gray-400">
                      {step.doneDate}
                    </span>
                  )}
                </div>
                <div
                  ref={(node) => {
                    contentRefs.current[index] = node;
                  }}
                >
                  <p className="mt-1 text-sm text-gray-500">
                    {step.description}
                  </p>
                  <ul className="mt-2.5 flex flex-col gap-1.5">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-base leading-[160%] font-medium text-gray-700"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-gray-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

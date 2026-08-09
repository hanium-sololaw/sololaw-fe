import CheckIcon from "@/assets/lawsuit/check-yellow-icon.svg?react";
import ClockIcon from "@/assets/lawsuit/clock-blue-icon.svg?react";
import type { ProcedureStep } from "../data/mockGuideDetail";

type ProcedureTimelineProps = {
  steps: ProcedureStep[];
};

const lineStyle: Record<ProcedureStep["status"], string> = {
  done: "bg-amber-300",
  active: "bg-blue-200",
  pending: "bg-gray-200",
};

export default function ProcedureTimeline({ steps }: ProcedureTimelineProps) {
  return (
    <section className="rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-900">소송 진행 단계</h2>
      </div>

      <div className="flex flex-col gap-8">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = step.status === "active";

          return (
            <div
              key={step.id}
              className={`flex gap-4 ${
                isActive
                  ? "rounded-lg border border-dashed border-blue-400 p-4"
                  : ""
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                  {step.status === "done" && <CheckIcon className="h-6 w-6" />}
                  {step.status === "active" && (
                    <ClockIcon className="h-6 w-6" />
                  )}
                  {step.status === "pending" && (
                    <span className="h-4 w-4 rounded-full border-2 border-gray-300 bg-white" />
                  )}
                </span>
                {!isLast && (
                  <span className={`w-0.5 flex-1 ${lineStyle[step.status]}`} />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      {step.date ? (
                        <span
                          className={
                            isActive
                              ? "rounded-full bg-blue-100 px-2.5 py-1 text-sm leading-5 font-medium text-blue-500"
                              : "rounded-full bg-gray-100 px-2.5 py-1 text-sm leading-[1.6] font-medium text-gray-500"
                          }
                        >
                          {step.date}
                        </span>
                      ) : step.status === "done" ? (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-sm leading-[1.6] font-medium text-gray-500">
                          완료
                        </span>
                      ) : null}
                    </div>

                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {step.note && (
                  <div className="mt-3 rounded-xl border border-blue-200 px-4 py-3">
                    <p className="text-sm font-semibold text-blue-600">
                      현재 진행 중인 단계입니다
                    </p>
                    <p className="text-sm text-blue-500">{step.note}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

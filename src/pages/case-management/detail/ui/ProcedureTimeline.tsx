import type { ProcedureStage, ProcedureStageId } from "../data/mockCaseDetail";

type ProcedureTimelineProps = {
  stages: ProcedureStage[];
  currentStageId: ProcedureStageId;
  filedAt: string;
  petitionProgress: number;
  onSelectStage: (stageId: ProcedureStageId) => void;
};

export default function ProcedureTimeline({
  stages,
  currentStageId,
  filedAt,
  petitionProgress,
  onSelectStage,
}: ProcedureTimelineProps) {
  const currentIndex = stages.findIndex((stage) => stage.id === currentStageId);

  const subLabel = (stage: ProcedureStage) => {
    if (stage.id === "dispute") return stage.date;
    if (stage.id === "filed") return filedAt;
    if (stage.id === "petition") return `${petitionProgress}%`;
    return "";
  };

  return (
    <section className="flex flex-col gap-8 rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="relative mx-8 h-20">
        <div className="absolute top-3 right-0 left-0 h-0.5 bg-gray-200" />
        <div
          className="absolute top-3 left-0 h-0.5 bg-blue-400 transition-all"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
        />

        {stages.map((stage, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const left = `${(index / (stages.length - 1)) * 100}%`;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectStage(stage.id)}
              className="absolute top-0 flex w-16 -translate-x-1/2 flex-col items-center gap-1.5 sm:w-20"
              style={{ left }}
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-white ${
                  isDone || isCurrent ? "bg-blue-400" : "bg-gray-300"
                } ${isCurrent ? "scale-125" : ""}`}
              />
              <span
                className={`text-center text-xs leading-tight font-semibold sm:text-sm ${
                  isCurrent
                    ? "text-blue-500"
                    : isDone
                      ? "text-gray-900"
                      : "text-gray-400"
                }`}
              >
                {stage.label}
              </span>
              <span className="h-4 text-center text-[11px] text-gray-400">
                {subLabel(stage)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400">
          현재 단계를 누르면 그 앞은 완료, 뒤는 예정으로 정리됩니다. 법원
          진행은 직접 옮겨 주세요.
        </p>
        <span className="shrink-0 self-start rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500 sm:self-auto">
          시작 지점: 분쟁이 막 생겼어요
        </span>
      </div>
    </section>
  );
}

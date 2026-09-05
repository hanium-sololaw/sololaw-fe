import FolderImage from "@/assets/lawsuit/folder-image.svg?react";
import { caseStatusStyle, type CaseSummary } from "../data/mockCases";

type CaseCardProps = CaseSummary & {
  onClick?: () => void;
};

export default function CaseCard({
  title,
  court,
  caseNumber,
  status,
  currentStage,
  nextTodo,
  petitionTitle,
  petitionProgress,
  remainingTasks,
  documentCount,
  evidenceCount,
  updatedAt,
  onClick,
}: CaseCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-95 w-full flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-[#F2F4F6] text-left hover:border-blue-200"
    >
      <div className="flex flex-col gap-1 px-6 pt-4">
        <h3 className="text-xl leading-[1.4] font-bold text-gray-700">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-600">
          {court} <span className="mx-1 text-gray-300">|</span>
          {caseNumber}
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <FolderImage className="h-auto w-60" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 rounded-b-[20px] bg-[rgba(242,244,246,0.68)] px-6 pt-5 pb-6 backdrop-blur-md">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-xs font-semibold text-blue-500">
              {currentStage}
            </p>
            <p className="truncate text-sm text-gray-700">{nextTodo}</p>
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${caseStatusStyle[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">
              {petitionTitle}
            </span>
            <span className="text-sm font-bold text-blue-500">
              {petitionProgress}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/70">
            <div
              className="h-full rounded-full bg-blue-400"
              style={{ width: `${petitionProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
          <span className="truncate">
            남은 준비 {remainingTasks} · 문서 {documentCount} · 증빙{" "}
            {evidenceCount}
          </span>
          <span className="shrink-0">{updatedAt}</span>
        </div>
      </div>
    </button>
  );
}

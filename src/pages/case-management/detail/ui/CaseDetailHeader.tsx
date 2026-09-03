import { Link } from "react-router-dom";
import TrashIcon from "@/assets/icons/shared/trash-icon.svg?react";
import type { ApiCaseStatus } from "../../api/types";
import { caseStatusMeta } from "../../lib/caseDisplay";

const statusOptions = Object.keys(caseStatusMeta) as ApiCaseStatus[];

type CaseDetailHeaderProps = {
  title: string;
  status: ApiCaseStatus;
  caseNumber: string;
  court: string;
  lastActivity: string;
  currentStageLabel: string;
  petitionTitle: string;
  petitionProgress: number;
  remainingTasksToFile: number;
  onStatusChange: (status: ApiCaseStatus) => void;
  onDelete: () => void;
};

export default function CaseDetailHeader({
  title,
  status,
  caseNumber,
  court,
  lastActivity,
  currentStageLabel,
  petitionTitle,
  petitionProgress,
  remainingTasksToFile,
  onStatusChange,
  onDelete,
}: CaseDetailHeaderProps) {
  const statusMeta = caseStatusMeta[status];

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/case-management"
        className="flex w-fit items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12.6667L5.33333 8L10 3.33333"
            stroke="currentColor"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        사건 목록으로
      </Link>

      <div className="flex flex-col gap-6 rounded-[20px] border border-gray-200 bg-white p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-8 w-1 shrink-0 rounded-full bg-blue-400" />
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusMeta.style}`}
              >
                {statusMeta.label}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {caseNumber} · {court} · {lastActivity}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 lg:gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">현재 단계</span>
            <span className="text-lg font-bold text-gray-900">
              {currentStageLabel}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{petitionTitle}</span>
              <span className="text-lg font-bold text-gray-900">
                {petitionProgress}%
              </span>
            </div>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-400"
                style={{ width: `${petitionProgress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">접수까지 남은 작업</span>
            <span className="text-lg font-bold text-red-500">
              {remainingTasksToFile}건
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">사건 상태 직접 관리</span>
            <select
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value as ApiCaseStatus)
              }
              className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm font-semibold text-gray-800 outline-none focus:border-blue-400"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {caseStatusMeta[option].label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onDelete}
            aria-label="사건 삭제"
            className="text-gray-300 hover:text-red-400"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

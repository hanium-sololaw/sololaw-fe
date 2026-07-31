import { useRef, useState } from "react";
import Icon from "@/shared/ui/Icon";
import BuildingIcon from "@/assets/icons/case-search/building-icon.svg?react";
import PaperTextIcon from "@/assets/icons/case-search/paper-text-icon.svg?react";
import DateIcon from "@/assets/icons/case-search/date-icon.svg?react";
import StarSolidIcon from "@/assets/icons/case-search/star-solid-icon.svg?react";
import ArrowUpRightIcon from "@/assets/icons/shared/tabler-arrow-up.svg?react";
import PaperIcon from "@/assets/icons/case-search/paper-icon.svg?react";
import CopyIcon from "@/assets/icons/case-search/copy-icon.svg?react";
import StarLineIcon from "@/assets/icons/case-search/star-line-icon.svg?react";
import CheckIcon from "@/assets/icons/case-search/check-icon.svg?react";
import { outcomeStyles, type CaseOutcome } from "../../data/mockCases";

type CaseResultCardProps = {
  title: string;
  outcome: CaseOutcome;
  court: string;
  caseNumber?: string;
  date: string;
  relevance: "높음" | "보통";
  summary: string;
  relatedLaws?: string[];
  isCited?: boolean;
  saved: boolean;
  onToggleSave: () => void;
};

const ACTIVE_STYLE =
  "rounded-[10px] border border-blue-200 bg-blue-50 text-blue-500";
const DEFAULT_STYLE = "rounded-lg border border-gray-200 text-gray-600";

export default function CaseResultCard({
  title,
  outcome,
  court,
  caseNumber,
  date,
  relevance,
  summary,
  relatedLaws,
  isCited = false,
  saved,
  onToggleSave,
}: CaseResultCardProps) {
  const [cited, setCited] = useState(isCited);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2 font-semibold text-gray-900">
          {title}
          <span
            className={`shrink-0 rounded-xl px-3 py-1 text-xs font-semibold ${outcomeStyles[outcome]}`}
          >
            {outcome}
          </span>
        </p>
        <a
          href="#"
          className="flex shrink-0 items-center text-sm text-gray-500"
        >
          원문보기
          <Icon icon={ArrowUpRightIcon} size={20} />
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <p className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-gray-500">
          <span className="flex items-center gap-1">
            <Icon icon={BuildingIcon} size={14} />
            {court}
          </span>
          {caseNumber && (
            <span className="flex items-center gap-1">
              <Icon icon={PaperTextIcon} size={14} />
              {caseNumber}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Icon icon={DateIcon} size={14} />
            {date}
          </span>
        </p>
        <span className="flex items-center gap-1 rounded-xl text-xs font-semibold text-yellow-500">
          <Icon icon={StarSolidIcon} size={14} />
          관련성 {relevance}
        </span>
      </div>

      {relatedLaws && relatedLaws.length > 0 ? (
        <div className="flex flex-col gap-1">
          <div className="rounded-lg bg-gray-50 px-3.5 py-3">
            <p className="text-xs font-semibold text-gray-500 pb-1">
              핵심 요지
            </p>
            <p className="text-sm text-gray-600">{summary}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-gray-50 px-3.5 py-3">
          <p className="text-sm text-gray-600">{summary}</p>
        </div>
      )}

      {relatedLaws && relatedLaws.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <p className="text-xs font-semibold text-gray-700">관련 법령</p>
          {relatedLaws.map((law) => (
            <span
              key={law}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
            >
              {law}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        {cited ? (
          <button
            type="button"
            onClick={() => setCited(false)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold ${ACTIVE_STYLE}`}
          >
            <Icon icon={CheckIcon} size={14} />
            인용됨
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCited(true)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Icon icon={PaperIcon} size={14} className="text-white" />내 문서에
            인용
          </button>
        )}
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold ${
            copied ? ACTIVE_STYLE : DEFAULT_STYLE
          }`}
        >
          <Icon icon={copied ? CheckIcon : CopyIcon} size={13} />
          {copied ? "복사됨" : "복사"}
        </button>
        <button
          type="button"
          onClick={onToggleSave}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold ${
            saved ? ACTIVE_STYLE : DEFAULT_STYLE
          }`}
        >
          <Icon icon={StarLineIcon} size={13} />
          저장
        </button>
      </div>
    </div>
  );
}

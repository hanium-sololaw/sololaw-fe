import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";

type FilingInfoBarProps = {
  caseNumber: string;
  filedAt: string;
};

export default function FilingInfoBar({
  caseNumber,
  filedAt,
}: FilingInfoBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[20px] border border-gray-200 bg-white px-6 py-4">
      <span className="text-sm font-semibold text-gray-700">
        진행 표시 · 접수 정보
      </span>
      <span className="flex items-center gap-1.5 text-sm text-gray-500">
        {caseNumber} · {filedAt} 접수
        <ChevronRightIcon />
      </span>
    </div>
  );
}

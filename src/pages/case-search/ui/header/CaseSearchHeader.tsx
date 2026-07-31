import DocumentIcon from "@/assets/icons/shared/document-icon.svg?react";

type CaseSearchHeaderProps = {
  citationCount: number;
  onOpenCitationList: () => void;
};

export default function CaseSearchHeader({
  citationCount,
  onOpenCitationList,
}: CaseSearchHeaderProps) {
  const hasCitations = citationCount > 0;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          판례·법령 검색
        </h1>
        <p className="text-base text-gray-500">
          AI가 관련 판례와 법령을 분석하여 핵심 내용을 제공합니다
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenCitationList}
        className={`flex items-center gap-2 self-start rounded-xl border px-4 py-2.5 text-sm ${
          hasCitations
            ? "border-blue-200 bg-blue-50 text-blue-500"
            : "border-gray-200 bg-white text-gray-700"
        }`}
      >
        <DocumentIcon
          className={`h-4 w-4 ${hasCitations ? "text-blue-500" : "text-gray-500"}`}
        />
        내 인용 목록 {citationCount}
      </button>
    </div>
  );
}

import DocumentIcon from "@/assets/icons/shared/document-icon.svg?react";

type CaseSearchHeaderProps = {
  citationCount: number;
};

export default function CaseSearchHeader({
  citationCount,
}: CaseSearchHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900">판례·법령 검색</h1>
        <p className="text-base text-gray-500">
          AI가 관련 판례와 법령을 분석하여 핵심 내용을 제공합니다
        </p>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700"
      >
        <DocumentIcon className="h-4 w-4 text-gray-500" />내 인용 목록 {citationCount}
      </button>
    </div>
  );
}

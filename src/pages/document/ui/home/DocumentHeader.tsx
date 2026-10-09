export type DocumentSource = "case" | "none";

type DocumentHeaderProps = {
  activeSource: DocumentSource;
  onChangeSource: (source: DocumentSource) => void;
  selectedCase?: { title: string; caseNumber: string };
};

export default function DocumentHeader({
  activeSource,
  onChangeSource,
  selectedCase,
}: DocumentHeaderProps) {
  const showCase = activeSource === "case" && !!selectedCase;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          법률 문서 작성 도우미
        </h1>
        <p className="text-base text-gray-500">
          필요한 정보를 입력하면 AI가 자동으로 법률 문서를 작성합니다
        </p>
      </div>

      <div className="flex items-center gap-4 self-start rounded-[10px] border border-gray-200 bg-white px-6 py-3 text-sm sm:text-base">
        {showCase && (
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate font-semibold text-gray-800">{selectedCase.title}</p>
            <p className="text-xs text-gray-400 sm:text-sm">{selectedCase.caseNumber}</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => onChangeSource("case")}
          className={
            activeSource === "case"
              ? "font-semibold text-blue-500"
              : "text-gray-300"
          }
        >
          {showCase ? "사건 바꾸기" : "사건 선택하기"}
        </button>

        <span className="h-4 w-px bg-gray-200" />

        <button
          type="button"
          onClick={() => onChangeSource("none")}
          className={
            activeSource === "none"
              ? "font-semibold text-blue-500"
              : "text-gray-300"
          }
        >
          사건 없이 둘러보기
        </button>
      </div>
    </div>
  );
}

export default function KeywordDisclaimerCard() {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-blue-50 py-2 pr-4 pl-2">
      <p className="flex items-center text-sm leading-[1.6] font-semibold text-blue-300">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 5v6M10 14.5h.01" />
        </svg>
        검색 결과는 참고 자료입니다
      </p>
      <p className="pl-2 text-xs leading-[1.6] font-medium text-blue-300">
        공개된 일부 판례·법령을 대상으로 하며, 승소 가능성이나 통계는
        제공하지 않습니다. 검색 결과가 전체 판례를 대표하지 않으니, 구체적
        적용은 반드시 직접·전문가 검토가 필요합니다.
      </p>
    </div>
  );
}

export default function CaseAnalysisLoading() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
        <p className="mt-2 font-semibold text-blue-500">
          AI가 유사 판례를 분석하고 있어요
        </p>
        <p className="text-sm text-gray-400">
          선택한 사건의 쟁점을 추출해 관련 판례를 찾는 중입니다...
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-14 animate-pulse rounded-full bg-gray-100" />
            </div>
            <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-gray-100" />
            <div className="flex gap-2 pt-1">
              <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-100" />
              <div className="h-6 w-14 animate-pulse rounded-lg bg-gray-100" />
              <div className="h-6 w-14 animate-pulse rounded-lg bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type CaseSummaryBarProps = {
  category: string;
  title: string;
  court: string;
  caseNumber: string;
  progress: number;
};

export default function CaseSummaryBar({
  category,
  title,
  court,
  caseNumber,
  progress,
}: CaseSummaryBarProps) {
  return (
    <section className="flex items-center justify-between rounded-[20px] bg-white px-8 py-6">
      <div className="flex flex-col gap-1">
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-[13px] leading-[1.6] font-semibold text-blue-500">
          {category}
        </span>
        <h1 className="text-2xl leading-[1.6] font-bold text-gray-900">
          {title}
        </h1>
        <p className="text-base leading-[1.6] font-medium text-gray-600">
          {court} <span className="mx-1 text-gray-300">|</span>
          {caseNumber}
        </p>
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-sm leading-5 font-semibold text-blue-500">
          진행률
        </span>
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-blue-50">
            <div
              className="h-full rounded-full bg-blue-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-blue-500">
            {progress}%
          </span>
        </div>
      </div>
    </section>
  );
}

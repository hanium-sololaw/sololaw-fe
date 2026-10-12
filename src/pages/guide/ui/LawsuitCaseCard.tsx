import PaperStack from "@/shared/ui/PaperStack";

type LawsuitCaseCardProps = {
  title: string;
  court: string;
  caseNumber: string;
  lastUpdatedAt?: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function LawsuitCaseCard({
  title,
  court,
  caseNumber,
  lastUpdatedAt,
  selected = false,
  onClick,
}: LawsuitCaseCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      // hover animation mirrors the document type cards (document/ui/home/DocumentTypeSelector)
      className="group relative flex h-77.5 flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white text-left shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)] transition-colors duration-300 hover:border-blue-200 hover:bg-blue-50"
    >
      <div className="flex flex-col px-6 pt-3.5">
        <h3 className="text-2xl leading-[1.6] font-semibold text-gray-700 transition-colors duration-300 group-hover:text-blue-400">
          {title}
        </h3>
        <p className="text-[15.162px] leading-[21.659px] font-medium text-gray-600 transition-colors duration-300 group-hover:text-blue-400">
          {court} <span className="mx-1 text-gray-300">|</span>
          {caseNumber}
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center pb-8">
        <PaperStack className="w-56.5" />
      </div>

      <div className="absolute inset-x-0 bottom-0 inline-flex h-22.5 items-center rounded-b-[20px] bg-[rgba(242,244,246,0.68)] p-7.5 backdrop-blur-md transition-colors duration-300 group-hover:bg-[rgba(198,225,255,0.34)]">
        <p className="text-lg leading-[1.6] font-normal tracking-[-0.36px] text-gray-400">
          {lastUpdatedAt ? `마지막 업데이트: ${lastUpdatedAt}` : " "}
        </p>
      </div>
    </button>
  );
}

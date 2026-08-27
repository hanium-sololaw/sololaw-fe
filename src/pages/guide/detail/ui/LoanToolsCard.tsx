import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";
import type { LoanToolLink } from "../data/mockLoanGuideDetail";

type LoanToolsCardProps = {
  tools: LoanToolLink[];
  secondaryLink?: LoanToolLink;
};

export default function LoanToolsCard({
  tools,
  secondaryLink,
}: LoanToolsCardProps) {
  const navigate = useNavigate();

  return (
    <section className="rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <span className="flex aspect-square h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-center text-base leading-7 font-semibold text-blue-300">
          3
        </span>
        <h2 className="text-base font-semibold text-gray-900">도구</h2>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            onClick={() => tool.to && navigate(tool.to)}
            className="flex h-10.5 w-full items-center justify-center gap-4 rounded-lg border-[0.7px] border-gray-300 bg-white px-6 py-2 text-center text-base leading-[160%] font-medium text-gray-700 hover:bg-gray-50"
          >
            {tool.label}
          </button>
        ))}
      </div>

      {secondaryLink && (
        <button
          type="button"
          onClick={() => secondaryLink.to && navigate(secondaryLink.to)}
          className="mt-3 flex w-full items-center justify-between text-sm font-medium text-gray-500"
        >
          {secondaryLink.label}
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}
    </section>
  );
}

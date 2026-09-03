import { Link } from "react-router-dom";
import JudgeIcon from "@/assets/icons/shared/judge-icon.svg?react";
import type { RelatedCaseItem } from "../data/mockCaseDetail";

type RelatedCasesCardProps = {
  cases: RelatedCaseItem[];
};

export default function RelatedCasesCard({ cases }: RelatedCasesCardProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-base font-bold text-gray-900">
          <JudgeIcon className="h-4 w-4 text-gray-500" />
          관련 판례
        </h2>
        <span className="text-sm font-semibold text-gray-400">
          {cases.length}건
        </span>
      </div>

      <ul className="flex flex-col gap-2.5">
        {cases.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-2 rounded-xl border border-gray-100 px-3.5 py-2.5"
          >
            <span className="truncate text-sm font-semibold text-gray-800">
              {item.title}
            </span>
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {item.badge}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/case"
        className="self-start text-sm font-semibold text-blue-500 hover:text-blue-600"
      >
        판례 더 찾아보기 →
      </Link>
    </section>
  );
}

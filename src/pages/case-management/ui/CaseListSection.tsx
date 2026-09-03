import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { mockCases } from "../data/mockCases";
import CaseCard from "./CaseCard";
import NewCaseTile from "./NewCaseTile";

type SortOrder = "recent" | "urgent";

type CaseListSectionProps = {
  onCreateCase: () => void;
};

export default function CaseListSection({
  onCreateCase,
}: CaseListSectionProps) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");

  const sortedCases = useMemo(() => {
    if (sortOrder === "recent") return mockCases;

    return [...mockCases].sort(
      (a, b) =>
        b.remainingTasks - a.remainingTasks ||
        a.petitionProgress - b.petitionProgress,
    );
  }, [sortOrder]);

  return (
    <section className="flex flex-col gap-6 rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-900">
            내 사건 {mockCases.length}건
          </h2>
          <p className="text-sm text-gray-500">
            사건을 열어 다음 준비사항부터 이어서 하세요.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-full bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setSortOrder("recent")}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              sortOrder === "recent"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            최근 작업순
          </button>
          <button
            type="button"
            onClick={() => setSortOrder("urgent")}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              sortOrder === "urgent"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            급한 순
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NewCaseTile onClick={onCreateCase} />

        {sortedCases.map((item) => (
          <CaseCard
            key={item.id}
            {...item}
            onClick={() => navigate(`/case-management/${item.id}`)}
          />
        ))}
      </div>
    </section>
  );
}

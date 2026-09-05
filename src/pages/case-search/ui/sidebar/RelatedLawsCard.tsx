import BookIcon from "@/assets/icons/shared/book-icon.svg?react";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

export default function RelatedLawsCard() {
  const activeTab = useCaseSearchStore((state) => state.activeTab);
  const statutes = useCaseSearchStore((state) =>
    activeTab === "keyword" ? state.keywordStatutes : state.statutes,
  );
  const error = useCaseSearchStore((state) =>
    activeTab === "keyword" ? state.searchError : state.analyzeError,
  );

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
        <BookIcon className="h-4 w-4 text-gray-900" />
        관련 법령
      </h2>

      {error ? (
        <p className="text-sm text-red-400">검색에 실패해 관련 법령을 불러오지 못했어요.</p>
      ) : statutes.length === 0 ? (
        <p className="text-sm text-gray-400">검색하면 관련 법령이 여기에 표시돼요.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {statutes.map((law) => (
            <div key={law.name} className="rounded-xl border border-gray-200 p-3.5">
              <p className="font-semibold text-gray-900 mb-1">
                {law.name}
                {law.title ? ` (${law.title})` : ""}
              </p>
              <p className="text-sm text-gray-500 font-sm">관련 판례 중 {law.count}건에서 인용됐어요</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

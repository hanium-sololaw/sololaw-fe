import ShineIcon from "@/assets/icons/case-search/shine-line-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import { mockCases } from "../data/mockCases";
import { useCaseSearchStore } from "../store/useCaseSearchStore";

export default function CaseResultPanel() {
  const hasAnalyzed = useCaseSearchStore((state) => state.hasAnalyzed);

  if (!hasAnalyzed) {
    return (
      <section className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white px-8 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Icon icon={ShineIcon} size={28} />
        </div>
        <p className="text-lg font-semibold text-gray-900 mt-1">
          아직 분석 전이에요
        </p>
        <p className="text-sm text-gray-500">
          위 정보를 확인하고 [이 정보로 유사 판례 분석]을 누르면 관련 판례와
          통계가 여기에 표시됩니다.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        유사 판례 {mockCases.length}건
      </h2>

      {mockCases.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-1.5 rounded-xl border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-semibold text-gray-900">{item.title}</p>
            <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-500">
              관련도 {item.relevance}%
            </span>
          </div>
          <p className="text-sm text-gray-400">{item.court}</p>
          <p className="text-sm text-gray-600">{item.summary}</p>
        </div>
      ))}
    </section>
  );
}

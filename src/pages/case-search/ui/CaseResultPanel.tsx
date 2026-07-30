import ShineIcon from "@/assets/icons/case-search/shine-icon.svg?react";
import Icon from "@/shared/ui/Icon";

type MockCase = {
  id: string;
  court: string;
  title: string;
  summary: string;
  relevance: number;
};

const mockCases: MockCase[] = [
  {
    id: "1",
    court: "대법원 2019.6.13. 선고 2018다215020 판결",
    title: "임대차 종료 후 임차인의 원상회복의무 범위",
    summary:
      "임차인의 원상회복의무는 임차 목적물을 인도받을 당시의 상태로 되돌리는 것을 원칙으로 하며, 통상의 사용에 따른 손모는 포함되지 않는다고 판시.",
    relevance: 92,
  },
  {
    id: "2",
    court: "서울중앙지방법원 2021.3.10. 선고 2020가단123456 판결",
    title: "보증금 반환 지연에 따른 임대인의 책임",
    summary:
      "임대차 종료 후 임대인이 정당한 사유 없이 보증금 반환을 지체한 경우, 지연손해금 지급 의무가 있다고 판시.",
    relevance: 85,
  },
  {
    id: "3",
    court: "대법원 2017.5.30. 선고 2016다211620 판결",
    title: "원상회복비용과 보증금 상계의 요건",
    summary:
      "임대인이 원상회복비용을 보증금에서 공제하려면 그 비용의 구체적 내역과 발생 근거를 증명해야 한다고 판시.",
    relevance: 78,
  },
];

export default function CaseResultPanel({
  hasAnalyzed,
}: {
  hasAnalyzed: boolean;
}) {
  if (!hasAnalyzed) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white px-8 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Icon icon={ShineIcon} size={28} />
        </div>
        <p className="text-lg font-semibold text-gray-800">
          아직 분석 전이에요
        </p>
        <p className="text-sm text-gray-400">
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

import type { LitigationCostResult } from "../../../shared/calculateLitigationCost";

type FeeComparisonCardProps = {
  electronicCost: LitigationCostResult | null;
  paperCost: LitigationCostResult | null;
};

function feeSummary(cost: LitigationCostResult | null) {
  if (!cost) return "소가를 입력하면 계산돼요";
  return `인지대 ${cost.stampFee.toLocaleString("ko-KR")} + 송달료 ${cost.deliveryFee.toLocaleString("ko-KR")}`;
}

export default function FeeComparisonCard({ electronicCost, paperCost }: FeeComparisonCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="font-bold text-gray-900">얼마가 드나요?</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">전자소송</span>
            <span className="rounded-full bg-blue-400 px-2 py-0.5 text-[11px] font-semibold text-white">추천</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {electronicCost ? electronicCost.totalCost.toLocaleString("ko-KR") : "-"}
            <span className="ml-0.5 text-base font-semibold">원</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">{feeSummary(electronicCost)}</p>
          <div className="mt-3 space-y-1 border-t border-blue-100 pt-3 text-xs text-gray-500">
            <p>인지액 10% 할인</p>
            <p>24시간 접수 · 포털에서 바로 결제</p>
            <p>공동인증서 서명 — 날인·간인 불필요</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <span className="font-semibold text-gray-900">종이 제출</span>
          <p className="mt-2 text-2xl font-bold text-gray-400">
            {paperCost ? paperCost.totalCost.toLocaleString("ko-KR") : "-"}
            <span className="ml-0.5 text-base font-semibold">원</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">{feeSummary(paperCost)}</p>
          <div className="mt-3 space-y-1 border-t border-gray-100 pt-3 text-xs text-gray-500">
            <p>법원 민원실 방문 또는 우편</p>
            <p>인지·송달료는 은행 납부 후 영수증 첨부</p>
            <p>원본 1부 + 피고 수만큼 부본, 서명·날인·간인</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        {electronicCost?.disclaimer ||
          paperCost?.disclaimer ||
          "접수 시점 기준에 따라 달라질 수 있는 참고 계산이에요. 실제 납부는 법원·포털에서 확인하세요."}
      </p>
    </div>
  );
}

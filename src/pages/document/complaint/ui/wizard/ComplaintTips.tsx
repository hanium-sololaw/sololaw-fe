import TipsCard from "../../../ui/shared/TipsCard";

const TIPS = [
  "**판례**보다 실제로 있었던 일과 이를 보여주는 자료가 중요합니다.",
  "**AI는** 답변 밖의 사실을 덧붙이지 않고, 입력한 내용을 소장 형식으로만 정리해요.",
  "**날짜와 금액**은 기억에 의존하지 말고 계약서·이체내역을 보고 적어 주세요.",
  "**마지막 화면에서 금액·날짜·사실관계를 직접 확인한 뒤 내세요.**",
];

export default function ComplaintTips() {
  return <TipsCard title="소장은 이렇게 씁니다" tips={TIPS} />;
}

export type QuickLinkId = "calculator" | "guide" | "template" | "recommend";

export type QuickLink = {
  id: QuickLinkId;
  title: string;
  description: string;
};

export const quickLinks: QuickLink[] = [
  {
    id: "calculator",
    title: "소송 비용 계산기",
    description: "청구 금액에 따른 인지대와 송달료를 자동으로 계산합니다.",
  },
  {
    id: "guide",
    title: "소송 절차 안내",
    description: "소장 제출 전 필수 준비사항과 체크리스트를 확인하세요.",
  },
  {
    id: "template",
    title: "템플릿 보기",
    description: "각 문서 유형의 기본 템플릿을 미리 확인할 수 있습니다.",
  },
  {
    id: "recommend",
    title: "AI 맞춤 추천",
    description: "현재 진행 중인 소송에 필요한 문서를 AI가 추천해드립니다.",
  },
];

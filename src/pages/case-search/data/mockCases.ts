export type CaseOutcome = "원고 승소" | "원고 일부승소";

export type MockCase = {
  id: string;
  title: string;
  outcome: CaseOutcome;
  court: string;
  caseNumber: string;
  date: string;
  relevance: "높음" | "보통";
  summary: string;
};

export const outcomeStyles: Record<CaseOutcome, string> = {
  "원고 승소": "bg-blue-50 text-blue-500",
  "원고 일부승소": "bg-blue-50 text-blue-500",
};

export const mockCases: MockCase[] = [
  {
    id: "1",
    title: "임대차보증금반환청구",
    outcome: "원고 승소",
    court: "대법원",
    caseNumber: "2022다123456",
    date: "2023.05.15",
    relevance: "높음",
    summary:
      "임대차계약 종료 후 임대인이 보증금 반환을 거부한 사건에서, 임차인의 명도와 보증금 반환 동시이행 관계임을 확인.",
  },
  {
    id: "2",
    title: "보증금 반환청구권과 필요비상환청구권의 동시이행",
    outcome: "원고 일부승소",
    court: "대법원",
    caseNumber: "2021다456789",
    date: "2022.11.30",
    relevance: "높음",
    summary:
      "임대인이 필요비 상환청구권의 존재를 주장하더라도, 그 금액이 확정되지 않은 경우 보증금 전액 반환을 거부할 수 없다.",
  },
  {
    id: "3",
    title: "임대차보증금 반환 및 지연손해금 청구",
    outcome: "원고 일부승소",
    court: "서울고등법원",
    caseNumber: "2023나987654",
    date: "2023.08.22",
    relevance: "높음",
    summary:
      "보증금 반환과 더불어 지연손해금(연 12%)을 함께 인정. 명도 완료 시점부터 지연손해 기산.",
  },
  {
    id: "4",
    title: "원상회복비용 공제 항변의 한계",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    caseNumber: "2023가단556677",
    date: "2023.09.12",
    relevance: "보통",
    summary:
      "원상회복 비용이 객관적으로 확정되지 않은 이상 보증금 공제 항변은 받아들여지지 않는다.",
  },
  {
    id: "5",
    title: "소액임대차 보증금 반환 청구",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    caseNumber: "2023가소321456",
    date: "2024.01.10",
    relevance: "보통",
    summary:
      "소액사건심판법에 의해 이행권고결정으로 신속하게 보증금 반환이 인용된 사건.",
  },
];

export const lockedCaseCount = 18;

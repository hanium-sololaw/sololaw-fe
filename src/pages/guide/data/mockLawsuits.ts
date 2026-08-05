export type LawsuitSummary = {
  id: string;
  title: string;
  court: string;
  caseNumber: string;
  lastUpdatedAt?: string;
};

export const mockLawsuits: LawsuitSummary[] = [
  {
    id: "1",
    title: "임대차 보증금 반환 청구",
    court: "서울중앙지방법원",
    caseNumber: "2024가단 123456",
    lastUpdatedAt: "2026-03-05",
  },
  {
    id: "2",
    title: "임대차 보증금 반환 청구",
    court: "서울중앙지방법원",
    caseNumber: "2024가단 123456",
    lastUpdatedAt: "2026-03-05",
  },
  {
    id: "3",
    title: "임대차 보증금 반환 청구",
    court: "서울중앙지방법원",
    caseNumber: "2024가단 123456",
  },
  {
    id: "4",
    title: "임대차 보증금 반환 청구",
    court: "서울중앙지방법원",
    caseNumber: "2024가단 123456",
  },
  {
    id: "5",
    title: "임대차 보증금 반환 청구",
    court: "서울중앙지방법원",
    caseNumber: "2024가단 123456",
  },
];

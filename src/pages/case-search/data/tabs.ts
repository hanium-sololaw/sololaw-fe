export type CaseSearchTab = "similar" | "keyword";

export const tabs: { id: CaseSearchTab; label: string }[] = [
  { id: "similar", label: "내 사건과 비슷한 판례" },
  { id: "keyword", label: "키워드로 판례 검색" },
];

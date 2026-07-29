export type MyCase = {
  id: string;
  title: string;
  caseNumber: string;
  type: string;
};

export const myCases: MyCase[] = [
  {
    id: "1",
    title: "임대차 보증금 반환 청구",
    caseNumber: "2024가단123456",
    type: "민사",
  },
  {
    id: "2",
    title: "근로계약 위반 손해배상",
    caseNumber: "2024가단998877",
    type: "민사",
  },
  {
    id: "3",
    title: "대여금 반환 청구 (소액)",
    caseNumber: "2024가소445566",
    type: "민사",
  },
];

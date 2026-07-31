import type { CaseOutcome } from "./mockCases";

export const categoryFilters = [
  "민사",
  "형사",
  "행정",
  "가사",
  "대법원",
  "하급심",
  "최근 3년",
] as const;

export type CategoryFilter = (typeof categoryFilters)[number];

export const suggestedKeywords = ["명예훼손 위자료", "합의금", "모욕죄"];

export const autocompleteKeywords = [
  "임대차 보증금 반환",
  "임대차 계약 해지",
  "임대차 갱신요구권",
  "동시이행 항변",
  "원상회복 비용",
  "권리금 회수",
  "차임 연체",
  "차임 증액",
  "전대차 승낙",
  "유익비 상환청구",
  "임차권등기명령",
  "우선변제권",
  "재산분할 임대차보증금",
  "명예훼손 위자료",
  "합의금",
  "모욕죄",
  "교통사고 손해배상",
  "사기죄",
  "계약금 반환",
  "폭행치상",
  "영업정지처분 취소",
  "이혼 위자료",
];

export type CaseCategory = "민사" | "형사" | "행정" | "가사";

export type KeywordCaseResult = {
  id: string;
  title: string;
  outcome: CaseOutcome;
  category: CaseCategory;
  court: string;
  caseNumber: string;
  date: string;
  relevance: "높음" | "보통";
  summary: string;
  relatedLaws: string[];
};

export function matchesCategoryFilter(
  item: KeywordCaseResult,
  filter: CategoryFilter | null,
) {
  switch (filter) {
    case null:
      return true;
    case "대법원":
      return item.court === "대법원";
    case "하급심":
      return item.court !== "대법원";
    case "최근 3년":
      return Number(item.date.slice(0, 4)) >= 2023;
    default:
      return item.category === filter;
  }
}

export function matchesQuery(item: KeywordCaseResult, query: string) {
  const keyword = query.trim();
  if (keyword === "") return true;

  return (
    item.title.includes(keyword) ||
    item.summary.includes(keyword) ||
    item.relatedLaws.some((law) => law.includes(keyword))
  );
}

export const keywordSearchResults: KeywordCaseResult[] = [
  {
    id: "1",
    category: "민사",
    title: "임대차보증금반환청구",
    outcome: "원고 승소",
    court: "대법원",
    date: "2023.06.15",
    caseNumber: "2022다123456",
    relevance: "높음",
    summary:
      "임대차계약 종료 후 임대인이 정당한 사유 없이 임차인의 목적물 명도와는 별개로 동시이행 관계에 있는 보증금 반환을 지체할 수 없다고 확인한 사례.",
    relatedLaws: ["민법 제618조", "주택임대차보호법 제3조의2"],
  },
  {
    id: "2",
    category: "민사",
    title: "보증금 반환청구권과 필요비상환청구권의 동시이행",
    outcome: "원고 일부승소",
    court: "대법원",
    date: "2022.11.30",
    caseNumber: "2021다456789",
    relevance: "높음",
    summary:
      "임대인이 필요비 상환청구권의 존재를 주장하더라도, 그 금액이 확정되지 않은 이상 보증금 전액 반환을 거부할 수 없다고 판시한 사례.",
    relatedLaws: ["민법 제626조"],
  },
  {
    id: "3",
    category: "민사",
    title: "임대차보증금 반환 및 지연손해금 청구",
    outcome: "원고 일부승소",
    court: "서울고등법원",
    date: "2023.08.22",
    caseNumber: "2023나987654",
    relevance: "높음",
    summary:
      "명도 완료 시점부터 연 12%의 지연손해금을 함께 인정한 사례.",
    relatedLaws: ["소송촉진 등에 관한 특례법 제3조"],
  },
  {
    id: "4",
    category: "민사",
    title: "원상회복비용 공제 항변의 한계",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2023.09.12",
    caseNumber: "2023가단556677",
    relevance: "보통",
    summary:
      "명도 완료 시점부터 연 12%의 지연손해금을 함께 인정한 사례.",
    relatedLaws: ["소송촉진 등에 관한 특례법 제3조"],
  },
  {
    id: "5",
    category: "민사",
    title: "소액임대차 보증금 반환 청구",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2024.01.10",
    caseNumber: "2023가소321456",
    relevance: "보통",
    summary:
      "소액사건심판법에 따른 이행권고결정으로 보증금 반환이 신속히 인용된 사례.",
    relatedLaws: ["소액사건심판법 제5조의3"],
  },
  {
    id: "6",
    category: "민사",
    title: "임차권등기명령과 보증금 반환의 관계",
    outcome: "원고 승소",
    court: "대법원",
    date: "2022.04.14",
    caseNumber: "2021다789012",
    relevance: "높음",
    summary:
      "임차권등기가 마쳐진 이상 임차인이 목적물을 미리 인도하더라도 대항력이 유지된다고 판시한 사례.",
    relatedLaws: ["주택임대차보호법 제3조의3"],
  },
  {
    id: "7",
    category: "민사",
    title: "임대인의 수선의무 불이행에 따른 손해배상",
    outcome: "원고 일부승소",
    court: "서울중앙지방법원",
    date: "2023.02.09",
    caseNumber: "2022가단345678",
    relevance: "보통",
    summary:
      "임대인이 상당한 기간 내 수선의무를 이행하지 않은 경우 임차인의 손해배상청구를 일부 인정한 사례.",
    relatedLaws: ["민법 제623조"],
  },
  {
    id: "8",
    category: "민사",
    title: "묵시적 갱신 후 계약 해지 통지의 효력",
    outcome: "원고 승소",
    court: "대법원",
    date: "2021.10.28",
    caseNumber: "2020다234567",
    relevance: "높음",
    summary:
      "묵시적 갱신이 이루어진 임대차계약에서 임차인의 해지통지 후 3개월이 경과하면 계약이 종료된다고 확인한 사례.",
    relatedLaws: ["주택임대차보호법 제6조의2"],
  },
  {
    id: "9",
    category: "민사",
    title: "전세보증금 반환채권 양도의 대항요건",
    outcome: "원고 일부승소",
    court: "서울고등법원",
    date: "2022.07.19",
    caseNumber: "2021나345678",
    relevance: "보통",
    summary:
      "보증금 반환채권을 양도받은 자가 임대인에게 대항하려면 확정일자 있는 통지·승낙이 필요하다고 판시한 사례.",
    relatedLaws: ["민법 제450조"],
  },
  {
    id: "10",
    category: "민사",
    title: "임대차 목적물 훼손에 대한 원상회복 범위",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2023.05.03",
    caseNumber: "2022가단456789",
    relevance: "보통",
    summary:
      "통상적인 사용에 따른 손모는 원상회복 범위에서 제외된다고 확인한 사례.",
    relatedLaws: ["민법 제615조"],
  },
  {
    id: "11",
    category: "민사",
    title: "임대인 변경 시 보증금반환의무의 승계",
    outcome: "원고 승소",
    court: "대법원",
    date: "2020.12.10",
    caseNumber: "2019다345678",
    relevance: "높음",
    summary:
      "임대주택이 양도된 경우 양수인이 임대인 지위와 함께 보증금반환의무를 승계한다고 판시한 사례.",
    relatedLaws: ["주택임대차보호법 제3조"],
  },
  {
    id: "12",
    category: "민사",
    title: "상가임대차 권리금 회수기회 방해로 인한 손해배상",
    outcome: "원고 일부승소",
    court: "서울고등법원",
    date: "2023.11.21",
    caseNumber: "2022나456789",
    relevance: "높음",
    summary:
      "임대인이 정당한 사유 없이 신규임차인과의 계약체결을 거절해 권리금 회수를 방해했다고 인정한 사례.",
    relatedLaws: ["상가건물 임대차보호법 제10조의4"],
  },
  {
    id: "13",
    category: "민사",
    title: "보증금 감액과 차임 연체의 상계",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2022.09.06",
    caseNumber: "2021가단567890",
    relevance: "보통",
    summary:
      "연체차임은 보증금에서 당연히 공제되며 별도 의사표시가 필요하지 않다고 확인한 사례.",
    relatedLaws: ["민법 제492조"],
  },
  {
    id: "14",
    category: "민사",
    title: "임대차 종료 후 부당이득반환청구",
    outcome: "원고 일부승소",
    court: "서울중앙지방법원",
    date: "2021.06.17",
    caseNumber: "2020가단678901",
    relevance: "보통",
    summary:
      "임대차 종료 후에도 목적물을 계속 점유·사용한 임차인에게 차임 상당의 부당이득 반환의무가 있다고 판시한 사례.",
    relatedLaws: ["민법 제741조"],
  },
  {
    id: "15",
    category: "민사",
    title: "동시이행항변권 행사와 이행지체 책임",
    outcome: "원고 승소",
    court: "대법원",
    date: "2019.08.22",
    caseNumber: "2018다456789",
    relevance: "높음",
    summary:
      "동시이행관계에 있는 채무자는 상대방이 이행을 제공할 때까지 이행지체 책임을 지지 않는다고 확인한 사례.",
    relatedLaws: ["민법 제536조"],
  },
  {
    id: "16",
    category: "민사",
    title: "임대차계약 갱신요구권 행사 기간의 기산점",
    outcome: "원고 승소",
    court: "서울고등법원",
    date: "2023.03.30",
    caseNumber: "2022나567890",
    relevance: "보통",
    summary:
      "갱신요구권은 임대차기간 만료 전 6개월부터 2개월 전까지 행사할 수 있다고 판시한 사례.",
    relatedLaws: ["주택임대차보호법 제6조의3"],
  },
  {
    id: "17",
    category: "민사",
    title: "차임증액청구의 한계와 형평의 원칙",
    outcome: "원고 일부승소",
    court: "서울중앙지방법원",
    date: "2022.02.11",
    caseNumber: "2021가단789012",
    relevance: "보통",
    summary:
      "약정한 증액비율을 초과하는 차임증액청구는 형평에 반해 일부만 인정된다고 판시한 사례.",
    relatedLaws: ["주택임대차보호법 제7조"],
  },
  {
    id: "18",
    category: "민사",
    title: "임차인의 유익비상환청구권 성립 요건",
    outcome: "원고 승소",
    court: "대법원",
    date: "2020.05.14",
    caseNumber: "2019다567890",
    relevance: "보통",
    summary:
      "목적물의 객관적 가치를 증가시킨 비용에 한해 유익비상환청구권이 인정된다고 확인한 사례.",
    relatedLaws: ["민법 제626조"],
  },
  {
    id: "19",
    category: "민사",
    title: "보증금반환채무 지체와 지연손해금 기산일",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2023.07.25",
    caseNumber: "2022가단890123",
    relevance: "높음",
    summary:
      "임차인이 목적물을 인도한 다음 날부터 지연손해금이 기산된다고 판시한 사례.",
    relatedLaws: ["민법 제387조"],
  },
  {
    id: "20",
    category: "민사",
    title: "전대차 승낙과 임대인의 동시이행항변",
    outcome: "원고 일부승소",
    court: "서울고등법원",
    date: "2021.12.03",
    caseNumber: "2020나678901",
    relevance: "보통",
    summary:
      "임대인의 승낙을 받은 전대차의 경우 전차인도 임대인에게 직접 목적물반환을 구할 수 있다고 판시한 사례.",
    relatedLaws: ["민법 제630조"],
  },
  {
    id: "21",
    category: "민사",
    title: "임대차 목적물의 하자로 인한 계약해지",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2022.10.19",
    caseNumber: "2021가단901234",
    relevance: "보통",
    summary:
      "임차 목적물이 계약의 목적을 달성할 수 없을 정도로 훼손된 경우 임차인이 즉시 해지할 수 있다고 확인한 사례.",
    relatedLaws: ["민법 제627조"],
  },
  {
    id: "22",
    category: "민사",
    title: "우선변제권과 배당요구의 종기",
    outcome: "원고 승소",
    court: "대법원",
    date: "2019.11.07",
    caseNumber: "2018다678901",
    relevance: "높음",
    summary:
      "배당요구의 종기까지 배당요구를 하지 않은 임차인은 우선변제권을 행사할 수 없다고 판시한 사례.",
    relatedLaws: ["주택임대차보호법 제3조의2"],
  },
  {
    id: "23",
    category: "민사",
    title: "임대인의 소유권 상실과 보증금반환의무",
    outcome: "원고 일부승소",
    court: "서울고등법원",
    date: "2023.01.16",
    caseNumber: "2022나789012",
    relevance: "보통",
    summary:
      "임대인이 목적물 소유권을 상실하더라도 임대차계약상 보증금반환의무는 소멸하지 않는다고 판시한 사례.",
    relatedLaws: ["민법 제618조"],
  },
  {
    id: "24",
    category: "민사",
    title: "계약갱신 거절과 실거주 사유의 증명책임",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2023.04.27",
    caseNumber: "2022가단012345",
    relevance: "높음",
    summary:
      "실거주를 이유로 갱신을 거절하는 임대인에게 그 사유에 대한 증명책임이 있다고 확인한 사례.",
    relatedLaws: ["주택임대차보호법 제6조의3"],
  },
  {
    id: "25",
    category: "민사",
    title: "임대차보증금 반환채권에 대한 가압류의 효력",
    outcome: "원고 일부승소",
    court: "서울고등법원",
    date: "2020.09.02",
    caseNumber: "2019나890123",
    relevance: "보통",
    summary:
      "보증금반환채권이 가압류된 경우 임대인은 임차인에게 직접 지급할 수 없고 공탁으로 채무를 면할 수 있다고 판시한 사례.",
    relatedLaws: ["민사집행법 제296조"],
  },
  {
    id: "26",
    category: "형사",
    title: "임대인의 주거침입 및 재물손괴 사건",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2023.03.14",
    caseNumber: "2022고단1234",
    relevance: "보통",
    summary:
      "임대인이 임차인의 동의 없이 문을 강제로 열고 짐을 반출한 행위에 대해 주거침입죄 및 재물손괴죄를 인정한 사례.",
    relatedLaws: ["형법 제319조", "형법 제366조"],
  },
  {
    id: "27",
    category: "행정",
    title: "임대주택 등록말소처분 취소청구",
    outcome: "원고 일부승소",
    court: "서울행정법원",
    date: "2022.06.09",
    caseNumber: "2021구합12345",
    relevance: "보통",
    summary:
      "임대의무기간 위반을 이유로 한 등록말소처분이 재량권을 일탈·남용했다고 일부 인정한 사례.",
    relatedLaws: ["민간임대주택에 관한 특별법 제6조"],
  },
  {
    id: "28",
    category: "가사",
    title: "이혼에 따른 임대차보증금반환채권의 재산분할",
    outcome: "원고 일부승소",
    court: "서울가정법원",
    date: "2023.10.05",
    caseNumber: "2022드단12345",
    relevance: "보통",
    summary:
      "혼인 중 형성된 임대차보증금반환채권을 부부 공동재산으로 보아 재산분할 대상에 포함한 사례.",
    relatedLaws: ["민법 제839조의2"],
  },
  {
    id: "29",
    category: "형사",
    title: "임대인 명예훼손 위자료 청구 병합사건",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2023.05.19",
    caseNumber: "2022고단5678",
    relevance: "높음",
    summary:
      "임대인이 관리사무소 게시판에 임차인을 비방하는 글을 게시한 행위에 명예훼손을 인정하고 위자료 지급을 명한 사례.",
    relatedLaws: ["형법 제307조", "민법 제751조"],
  },
  {
    id: "30",
    category: "형사",
    title: "모욕죄 성립과 합의금 산정 기준",
    outcome: "원고 일부승소",
    court: "서울북부지방법원",
    date: "2022.08.30",
    caseNumber: "2021고단9012",
    relevance: "보통",
    summary:
      "임대차 분쟁 중 발생한 모욕 발언에 대해 모욕죄를 인정하되, 합의금 지급 정황을 참작해 형을 감경한 사례.",
    relatedLaws: ["형법 제311조"],
  },
  {
    id: "31",
    category: "행정",
    title: "전월세신고 미이행에 따른 과태료 부과처분 취소",
    outcome: "원고 승소",
    court: "서울행정법원",
    date: "2023.12.01",
    caseNumber: "2022구합23456",
    relevance: "보통",
    summary:
      "신고 지연에 정당한 사유가 인정되어 과태료 부과처분이 취소된 사례.",
    relatedLaws: ["부동산 거래신고 등에 관한 법률 제6조의2"],
  },
  {
    id: "32",
    category: "가사",
    title: "사실혼 해소와 임대차보증금 기여분 인정",
    outcome: "원고 일부승소",
    court: "서울가정법원",
    date: "2021.09.14",
    caseNumber: "2020드단23456",
    relevance: "보통",
    summary:
      "사실혼 관계 해소 시 임대차보증금 형성에 대한 기여분을 인정해 청산의무를 확인한 사례.",
    relatedLaws: ["민법 제839조의2"],
  },
  {
    id: "33",
    category: "민사",
    title: "교통사고 손해배상청구",
    outcome: "원고 일부승소",
    court: "대법원",
    date: "2024.02.20",
    caseNumber: "2023다345678",
    relevance: "높음",
    summary:
      "가해자의 과실비율을 70%로 인정하고 치료비 및 위자료 배상을 명한 사례.",
    relatedLaws: ["민법 제750조", "자동차손해배상 보장법 제3조"],
  },
  {
    id: "34",
    category: "형사",
    title: "사기죄 성립과 편취 금액 산정",
    outcome: "원고 승소",
    court: "서울중앙지방법원",
    date: "2024.03.05",
    caseNumber: "2023고단2345",
    relevance: "높음",
    summary:
      "투자금 명목으로 금원을 편취한 행위에 대해 사기죄를 인정하고 편취액 전액을 인정한 사례.",
    relatedLaws: ["형법 제347조"],
  },
  {
    id: "35",
    category: "민사",
    title: "매매계약 해제와 계약금 반환청구",
    outcome: "원고 승소",
    court: "서울고등법원",
    date: "2022.05.16",
    caseNumber: "2021나567890",
    relevance: "보통",
    summary:
      "매도인의 채무불이행을 이유로 계약이 해제되어 계약금 반환 및 위약금 지급을 명한 사례.",
    relatedLaws: ["민법 제565조"],
  },
  {
    id: "36",
    category: "형사",
    title: "폭행치상과 형사합의금 산정 기준",
    outcome: "원고 일부승소",
    court: "서울북부지방법원",
    date: "2023.07.11",
    caseNumber: "2022고단6789",
    relevance: "보통",
    summary:
      "우발적 폭행으로 상해를 입힌 사안에서 합의금 지급 및 반성 정도를 참작해 형을 감경한 사례.",
    relatedLaws: ["형법 제262조"],
  },
  {
    id: "37",
    category: "행정",
    title: "영업정지처분 취소청구",
    outcome: "원고 승소",
    court: "서울행정법원",
    date: "2024.01.18",
    caseNumber: "2023구합34567",
    relevance: "보통",
    summary:
      "위반행위의 정도에 비해 영업정지 기간이 지나치게 길어 재량권을 일탈·남용했다고 인정한 사례.",
    relatedLaws: ["행정절차법 제21조"],
  },
  {
    id: "38",
    category: "가사",
    title: "이혼 위자료 및 재산분할청구",
    outcome: "원고 일부승소",
    court: "서울가정법원",
    date: "2024.04.02",
    caseNumber: "2023드단34567",
    relevance: "높음",
    summary:
      "혼인파탄의 주된 책임이 상대방에게 있다고 인정해 위자료와 재산분할을 함께 명한 사례.",
    relatedLaws: ["민법 제840조", "민법 제839조의2"],
  },
];

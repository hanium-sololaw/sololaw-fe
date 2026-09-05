import type { ApplicationType, FactField, PetitionTypeId } from "./types";

export type PetitionStepKind =
  | "party"
  | "facts"
  | "narrative"
  | "attachments"
  | "narrativeAttachments"
  | "narrativePrecedents"
  | "statement";

export type PetitionStep = {
  title: string;
  kind: PetitionStepKind;
  factKeys?: string[];
  notice?: string;
};

export type PetitionType = {
  id: PetitionTypeId;
  applicationType: ApplicationType;
  title: string;
  description: string;
  applicantLabel: string;
  respondentLabel: string | null;
  hasCaseNo: boolean;
  hasCaseName: boolean;
  hasClaimAmount: boolean;
  factFields: FactField[];
  statementFields: FactField[];
  narrativePrompt: { question: string; placeholder: string };
  attachmentOptions: string[];
  hasCitedPrecedents: boolean;
  hasAnnex: boolean;
  includeNarrativeSection: boolean;
  sectionHeadings: {
    facts: string;
    narrative: string;
  };
  steps: PetitionStep[];
};

const STATEMENT_FIELDS: FactField[] = [
  { key: "채무자가 청구채권을 인정하나", kind: "select", options: ["인정하고 있어요", "다투고 있어요", "아직 모르겠어요"] },
  { key: "채무자 의사 확인 시기·방법", kind: "text", placeholder: "예) 2026. 5. 3. 내용증명 발송 후 전화 통화" },
  { key: "다른 채권 유무", kind: "select", options: ["없어요", "있어요"] },
  { key: "신청 금액 적정성", kind: "select", options: ["예", "아니오"] },
  { key: "채무자 법인 영업 여부", kind: "select", options: ["채무자가 법인이 아니에요", "영업 중이에요", "영업하지 않는 것 같아요"] },
  { key: "본안소송 제기 여부", kind: "select", options: ["아직 없어요", "냈어요"] },
  { key: "최근 5년 보전처분 신청", kind: "select", options: ["없어요", "있어요"] },
  { key: "중복 보전처분", kind: "select", options: ["없어요", "있어요"] },
];

export const petitionTypes: PetitionType[] = [
  {
    id: "payment",
    applicationType: "payment_order",
    title: "지급명령신청서",
    description: "돈을 갚지 않는 상대방에게 법원의 지급명령을 받고 싶을 때",
    applicantLabel: "채권자",
    respondentLabel: "채무자",
    hasCaseNo: false,
    hasCaseName: false,
    hasClaimAmount: true,
    factFields: [
      { key: "청구 종류", kind: "select", options: ["대여금", "물품대금", "용역대금", "임대료·관리비", "기타"] },
      { key: "채권 발생일", kind: "date" },
      { key: "변제기", kind: "date" },
      { key: "이자·지연손해금", kind: "select", options: ["청구함", "청구 안 함"] },
    ],
    statementFields: [],
    narrativePrompt: {
      question: "무슨 돈이고, 왜 못 받고 있나요?",
      placeholder: "예) 2023년 5월에 빌려준 돈인데 갚기로 한 날이 지나도 안 갚고 연락도 잘 안 받습니다.",
    },
    attachmentOptions: ["차용증·계약서", "계좌이체 내역", "내용증명 우편물"],
    hasCitedPrecedents: false,
    hasAnnex: false,
    includeNarrativeSection: true,
    sectionHeadings: { facts: "청구 종류", narrative: "신청이유" },
    steps: [
      { title: "당사자 정보", kind: "party" },
      { title: "청구 내용", kind: "facts" },
      { title: "신청 사유", kind: "narrative" },
      { title: "첨부 자료", kind: "attachments" },
    ],
  },
  {
    id: "aid",
    applicationType: "litigation_aid",
    title: "소송구조신청서",
    description: "인지대·송달료 낼 형편이 안 될 때 법원에 비용 지원을 요청",
    applicantLabel: "신청인",
    respondentLabel: null,
    hasCaseNo: true,
    hasCaseName: true,
    hasClaimAmount: false,
    factFields: [
      { key: "지금 어느 단계", kind: "select", options: ["소 제기 전 (같이 낼 예정)", "이미 소송이 진행 중"] },
      { key: "구조받을 비용", kind: "checks", options: ["인지대", "송달료"] },
      { key: "해당 사항", kind: "select", options: ["기초생활수급자", "차상위계층", "한부모가족", "해당 없음"] },
      { key: "월 평균 소득", kind: "money" },
      { key: "부양가족 수", kind: "text", placeholder: "예) 2명" },
      { key: "보유 재산", kind: "money" },
      { key: "채무 총액", kind: "money" },
      { key: "주거 형태", kind: "select", options: ["자가", "전세", "월세", "기타"] },
    ],
    statementFields: [],
    narrativePrompt: {
      question: "지금 형편이 어떤가요?",
      placeholder: "예) 2026년 6월 퇴사 후 소득이 없고, 월세와 생활비를 감당하기 어렵습니다.",
    },
    attachmentOptions: ["소득금액증명원", "건강보험료 납부확인서", "통장 거래내역", "지방세 세목별 과세증명서"],
    hasCitedPrecedents: false,
    hasAnnex: false,
    includeNarrativeSection: true,
    sectionHeadings: { facts: "당사자", narrative: "신청이유" },
    steps: [
      { title: "신청인 정보", kind: "party" },
      { title: "형편·비용", kind: "facts" },
      { title: "신청 사유·첨부 자료", kind: "narrativeAttachments" },
    ],
  },
  {
    id: "leasereg",
    applicationType: "lease_registration",
    title: "임차권등기명령신청서",
    description: "이사는 해야 하는데 보증금을 못 받았을 때 대항력을 유지",
    applicantLabel: "신청인",
    respondentLabel: "피신청인",
    hasCaseNo: false,
    hasCaseName: false,
    hasClaimAmount: false,
    factFields: [
      { key: "임대차 종류", kind: "select", options: ["주택", "상가"] },
      { key: "계약체결일", kind: "date" },
      { key: "점유 시작일", kind: "date" },
      { key: "전입신고일", kind: "date" },
      { key: "확정일자", kind: "date" },
      { key: "임차보증금액", kind: "money" },
      { key: "차임", kind: "money" },
      { key: "임차 부분", kind: "text", placeholder: "예) 전부" },
      { key: "임대차가 어떻게 끝났나", kind: "select", options: ["기간 만료", "해지통고로 종료", "묵시적 갱신 후 해지"] },
      { key: "임대차 종료일", kind: "date" },
      { key: "지금도 살고 있나", kind: "select", options: ["아직 살고 있어요", "이미 나왔어요"] },
      { key: "부동산의 표시", kind: "text", placeholder: "등기사항증명서에 적힌 그대로 입력해주세요" },
    ],
    statementFields: [],
    narrativePrompt: {
      question: "보증금을 왜 못 받고 있나요?",
      placeholder: "예) 계약이 끝난 뒤에도 새 세입자가 구해지면 주겠다는 말만 반복하고 있습니다.",
    },
    attachmentOptions: ["임대차계약서", "주민등록등본(전입신고 확인)", "확정일자 부여 현황", "보증금 미반환 내용증명"],
    hasCitedPrecedents: true,
    hasAnnex: true,
    includeNarrativeSection: true,
    sectionHeadings: { facts: "당사자", narrative: "신청이유" },
    steps: [
      { title: "당사자 정보", kind: "party" },
      { title: "임대차 정보", kind: "facts" },
      { title: "신청 사유·관련 판례", kind: "narrativePrecedents" },
      { title: "첨부 자료", kind: "attachments" },
    ],
  },
  {
    id: "enforcement",
    applicationType: "enforcement",
    title: "강제집행신청서",
    description: "판결이나 지급명령이 확정됐는데도 상대방이 이행하지 않을 때",
    applicantLabel: "채권자",
    respondentLabel: "채무자",
    hasCaseNo: true,
    hasCaseName: false,
    hasClaimAmount: true,
    factFields: [
      { key: "집행권원 종류", kind: "select", options: ["확정판결", "지급명령", "조정조서·화해조서", "공정증서"] },
      { key: "확정일", kind: "date" },
      { key: "집행문", kind: "select", options: ["받았어요", "아직이에요"] },
      { key: "집행 방법", kind: "select", options: ["유체동산 압류", "채권 압류 및 추심", "부동산 강제경매", "건물 인도집행"] },
      { key: "집행할 목적물", kind: "text", placeholder: "예) 채무자가 주식회사 대한물류로부터 매월 지급받는 급여채권 중 압류 가능한 금액" },
      { key: "임의 이행 요구", kind: "select", options: ["요구했어요", "안 했어요"] },
    ],
    statementFields: [],
    narrativePrompt: {
      question: "집행을 신청하게 된 경위를 적어주세요.",
      placeholder: "예) 판결이 확정되었는데도 채무자가 임의로 이행하지 않아 강제집행을 신청합니다.",
    },
    attachmentOptions: ["집행권원 정본", "송달증명원", "확정증명원", "위임장"],
    hasCitedPrecedents: false,
    hasAnnex: false,
    includeNarrativeSection: false,
    sectionHeadings: { facts: "집행권원", narrative: "신청이유" },
    steps: [
      { title: "당사자 정보", kind: "party" },
      { title: "집행 정보", kind: "facts" },
      { title: "신청 사유", kind: "narrative" },
      { title: "첨부 자료", kind: "attachments" },
    ],
  },
  {
    id: "seizure",
    applicationType: "provisional_seizure",
    title: "가압류신청서",
    description: "본안소송 전에 상대방 재산을 미리 묶어두고 싶을 때",
    applicantLabel: "채권자",
    respondentLabel: "채무자",
    hasCaseNo: false,
    hasCaseName: false,
    hasClaimAmount: true,
    factFields: [
      { key: "채권 발생일", kind: "date" },
      { key: "청구채권 종류", kind: "text", placeholder: "예) 대여금" },
      { key: "가압류할 목적물", kind: "text", placeholder: "예) 채무자 소유 서울특별시 강남구 …" },
      { key: "담보 방법", kind: "text", placeholder: "예) 공탁보증보험증권" },
      { key: "보전의 필요성", kind: "text", placeholder: "예) 채무자가 부동산을 처분하려 한다는 말을 들었어요" },
    ],
    statementFields: STATEMENT_FIELDS,
    narrativePrompt: {
      question: "보전이 필요한 사정을 조금 더 구체적으로 적어주세요.",
      placeholder: "예) 채무자가 유일한 재산인 부동산을 처분하려 한다는 이야기를 최근 들었습니다.",
    },
    attachmentOptions: ["차용증·계약서", "계좌이체 내역", "부동산 등기사항증명서", "담보 관련 서류"],
    hasCitedPrecedents: false,
    hasAnnex: false,
    includeNarrativeSection: true,
    sectionHeadings: { facts: "청구채권의 표시", narrative: "신청이유" },
    steps: [
      { title: "당사자 정보", kind: "party" },
      { title: "청구채권·목적물", kind: "facts" },
      { title: "신청 사유", kind: "narrative" },
      { title: "첨부 자료", kind: "attachments" },
      {
        title: "가압류신청 진술서 (1/2)",
        kind: "statement",
        factKeys: STATEMENT_FIELDS.slice(0, 4).map((f) => f.key),
        notice:
          "이 진술서는 재판예규(재민 2003-4)가 정한 법원 양식입니다. 허위로 적거나 빠뜨리면 보정할 기회 없이 신청이 기각될 수 있어요.",
      },
      {
        title: "가압류신청 진술서 (2/2)",
        kind: "statement",
        factKeys: STATEMENT_FIELDS.slice(4).map((f) => f.key),
      },
    ],
  },
];

export function findPetitionType(id: PetitionTypeId): PetitionType {
  return petitionTypes.find((type) => type.id === id) ?? petitionTypes[0];
}

import type { LoanProcedureStep, LoanStepDetail } from "./mockLoanGuideDetail";

export type CaseGuideData = {
  title: string;
  steps: LoanProcedureStep[];
  stepDetails: Record<string, LoanStepDetail>;
};

const courtFilingStep: LoanProcedureStep = {
  id: "court-filing",
  title: "법원 접수",
  description: "관할 법원에 소장을 내고 사건번호를 받는 단계예요.",
  items: [
    "인지대·송달료 납부",
    "전자소송 입력 또는 종이 제출",
    "접수 후 사건번호를 사건관리에 적어 두기",
  ],
};

const verdictStep: LoanProcedureStep = {
  id: "verdict",
  title: "판결",
  breadcrumbLabel: "공통",
  description: "선고를 받고, 확정되면 집행으로 이어집니다.",
  items: ["판결문 수령", "항소 여부 판단", "확정 후 강제집행 신청"],
};

export const caseGuideDetails: Record<string, CaseGuideData> = {
  "2": {
    title: "건물명도 청구",
    steps: [
      {
        id: "dispute",
        title: "분쟁 발생",
        description: "다툼이 생긴 시점이에요. 소송보다 먼저 자료를 모아 둬요.",
        items: [
          "임대차계약서·명도 관련 자료 확보",
          "연체·계약위반 내역 기록 남기기",
          "계약 종료(해지) 사유와 시점 확인",
        ],
      },
      {
        id: "content-certification",
        title: "내용증명",
        typeTag: "선택",
        description: "내용증명으로 퇴거·명도를 최고하는 단계예요. 상황에 따라 생략할 수도 있어요.",
        items: ["내용증명으로 퇴거 요청", "배달증명 보관", "협의 가능성 우선 검토"],
      },
      {
        id: "petition-draft",
        title: "소장 작성",
        description: "청구취지·청구원인·증거를 갖춘 소장을 만드는 단계예요.",
        items: [
          "임대차계약 종료 사유 정리",
          "점유 현황 및 증거 정리",
          "연체 차임·손해금 계산",
        ],
      },
      courtFilingStep,
      {
        id: "hearing",
        title: "변론",
        description: "상대방이 점유 권원을 주장하는 경우가 많은 단계예요.",
        items: [
          "상대방 주장에 대한 반박 준비",
          "점유 현황 증거 보완",
          "필요시 강제집행(명도집행) 절차도 함께 검토",
        ],
      },
      verdictStep,
    ],
    stepDetails: {},
  },
  "3": {
    title: "손해배상 청구",
    steps: [
      {
        id: "dispute",
        title: "분쟁 발생",
        description: "다툼이 생긴 시점이에요. 소송보다 먼저 자료를 모아 둬요.",
        items: [
          "사고·손해 발생 경위 기록",
          "피해 사진·영상 등 증거 확보",
          "손해액 산정 자료 모으기",
        ],
      },
      {
        id: "content-certification",
        title: "내용증명",
        typeTag: "선택",
        description: "내용증명으로 손해배상을 청구하는 단계예요.",
        items: ["내용증명으로 배상 요구", "배달증명 보관", "협의·합의 가능성 우선 검토"],
      },
      {
        id: "petition-draft",
        title: "소장 작성",
        description: "청구취지·청구원인·증거를 갖춘 소장을 만드는 단계예요.",
        items: ["손해 항목별 금액 정리", "과실 비율 관련 자료 정리", "증거 목록 작성"],
      },
      courtFilingStep,
      {
        id: "hearing",
        title: "변론",
        description: "상대방이 과실·손해액을 다투는 경우가 많은 단계예요.",
        items: [
          "과실 비율에 대한 반박 준비",
          "손해액 산정 근거 보완",
          "감정·전문가 의견 필요 여부 검토",
        ],
      },
      verdictStep,
    ],
    stepDetails: {},
  },
  "4": {
    title: "임금체불(임금·퇴직금) 청구",
    steps: [
      {
        id: "dispute",
        title: "분쟁 발생",
        description: "다툼이 생긴 시점이에요. 소송보다 먼저 자료를 모아 둬요.",
        items: [
          "근로계약서·급여명세서 확보",
          "미지급 임금·퇴직금 내역 정리",
          "재직 기간 및 근무 기록 확인",
        ],
      },
      {
        id: "content-certification",
        title: "내용증명",
        typeTag: "선택",
        description:
          "내용증명으로 체불 임금 지급을 최고하는 단계예요. 소액이면 진정·신고가 더 빠를 수 있어요.",
        items: ["내용증명으로 지급 최고", "배달증명 보관", "고용노동부 진정도 함께 검토"],
      },
      {
        id: "petition-draft",
        title: "소장 작성",
        description: "청구취지·청구원인·증거를 갖춘 소장을 만드는 단계예요.",
        items: [
          "미지급 임금·퇴직금 항목별 계산",
          "근로 기간 및 급여 내역 정리",
          "증거 목록 작성",
        ],
      },
      courtFilingStep,
      {
        id: "hearing",
        title: "변론",
        description: "사용자가 지급 여부·금액을 다투는 경우가 많은 단계예요.",
        items: [
          "체불 금액 산정 근거 보완",
          "근로 사실 증명 자료 준비",
          "지연이자 계산 확인",
        ],
      },
      verdictStep,
    ],
    stepDetails: {},
  },
  "5": {
    title: "임대차 보증금 반환 청구",
    steps: [
      {
        id: "dispute",
        title: "분쟁 발생",
        description: "다툼이 생긴 시점이에요. 소송보다 먼저 자료를 모아 둬요.",
        items: [
          "임대차계약서·보증금 지급 내역 확보",
          "계약 종료(해지) 사유와 시점 확인",
          "원상회복·공제 관련 자료 정리",
        ],
      },
      {
        id: "content-certification",
        title: "내용증명",
        typeTag: "선택",
        description:
          "내용증명으로 보증금 반환을 최고하는 단계예요. 소액이면 지급명령이 더 빠를 수 있어요.",
        items: ["내용증명으로 반환 요청", "배달증명 보관", "지급명령(독촉)으로 갈지 판단"],
      },
      {
        id: "petition-draft",
        title: "소장 작성",
        description: "청구취지·청구원인·증거를 갖춘 소장을 만드는 단계예요.",
        items: [
          "보증금·공제 내역 정리",
          "계약 종료일과 반환 지연 기간 정리",
          "증거 목록 작성",
        ],
      },
      courtFilingStep,
      {
        id: "hearing",
        title: "변론",
        description: "임대인이 공제·원상회복 비용을 다투는 경우가 많은 단계예요.",
        items: [
          "공제 항목에 대한 반박 준비",
          "원상회복 비용 근거 확인",
          "지연이자 계산 확인",
        ],
      },
      verdictStep,
    ],
    stepDetails: {},
  },
};

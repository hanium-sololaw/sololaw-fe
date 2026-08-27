import type {
  LoanDeadlineItem,
  LoanProcedureStep,
  LoanStepDetail,
  LoanToolLink,
} from "./mockLoanGuideDetail";

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

const courtFilingDetail: LoanStepDetail = {
  deadline: {
    type: "deadline",
    items: [
      {
        title: "보정명령 이행",
        roleBadge: "원고",
        periodLabel: "보정명령을 송달받은 날부터",
        period: "7일",
        noteTag: "법원이 정한 기간 (보통 7~14일)",
        description: "기간은 명령서에 적힌 것을 따르세요. 넘기면 소장이 각하될 수 있어요.",
      },
    ],
  },
  preparationItems: [
    "소장 정본 1부 + 부본 (피고 수만큼)",
    "증거 사본 (피고 수 + 1부)",
    "인지·송달료 납부 영수증",
  ],
  tools: [{ label: "소송 비용 계산기" }],
  secondaryLink: { label: "기일 · 기한 등록하기", to: "/schedule" },
};

const standardHearingDeadlineItems: LoanDeadlineItem[] = [
  {
    title: "답변서 제출",
    roleBadge: "피고",
    periodLabel: "소장 부본을 송달받은 날부터",
    period: "30일",
    noteTag: "민사소송법 제256조 제1항",
    description:
      "피고가 30일 안에 답변서를 내지 않으면 변론 없이 판결이 날 수 있어요(같은 법 제257조).",
  },
  {
    title: "준비서면 제출",
    roleBadge: "양쪽",
    periodLabel: "변론기일부터",
    period: "7일 전까지",
    noteTag: "재판장이 정한 기한 (민사소송법 제280조)",
    description: "상대방이 준비할 시간을 두고 미리 냅니다.",
  },
];

const standardHearingPreparationItems = [
  "상대방 답변서·준비서면",
  "반박할 증거",
  "준비서면 (상대방 수 + 1부)",
];

const standardHearingTools: LoanToolLink[] = [
  { label: "문서 생성으로 가기", to: "/document" },
  { label: "증빙자료 올리러 가기", to: "/evidence" },
];

const standardHearingSecondaryLink: LoanToolLink = {
  label: "비슷한 판례 찾아보기",
  to: "/case",
};

const standardHearingDetail: LoanStepDetail = {
  deadline: { type: "deadline", items: standardHearingDeadlineItems },
  preparationItems: standardHearingPreparationItems,
  tools: standardHearingTools,
  secondaryLink: standardHearingSecondaryLink,
};

const standardVerdictAppealItem: LoanDeadlineItem = {
  title: "항소",
  roleBadge: "패소한 쪽",
  periodLabel: "판결이 확정된 뒤",
  period: "2주",
  noteTag: "민사소송법 제396조 제1항 (불변기간)",
  description: "2주가 지나면 판결이 확정돼 더 다툴 수 없어요.",
};

const standardVerdictPreparationItems = [
  "판결정본",
  "송달증명원·확정증명원",
  "(강제집행 시) 집행문",
];

const standardVerdictTools: LoanToolLink[] = [
  { label: "기일 · 기한 등록하기", to: "/schedule" },
];

const standardVerdictDetail: LoanStepDetail = {
  deadline: { type: "deadline", items: [standardVerdictAppealItem] },
  preparationItems: standardVerdictPreparationItems,
  tools: standardVerdictTools,
};

export const caseGuideDetails: Record<string, CaseGuideData> = {
  "2": {
    title: "건물명도 청구",
    steps: [
      {
        id: "dispute",
        title: "분쟁 발생",
        doneDate: "2023. 7. 15.",
        description: "차임 연체가 쌓인 시점이에요. 해지 사유가 되는지부터 확인하세요.",
        items: [
          "연체 차임을 월별로 정리",
          "해지 사유가 되는 연체 기수인지 확인",
          "등기부로 소유 관계 확인",
        ],
      },
      {
        id: "content-certification",
        title: "내용증명",
        typeTag: "선택",
        description: "해지를 통고해야 명도를 구할 수 있어요. 통고가 도달한 날이 중요합니다.",
        items: [
          "계약 해지 통고 (내용증명 권장)",
          "배달증명으로 도달일 확보",
          "점유이전금지가처분 신청 검토",
        ],
      },
      {
        id: "petition-draft",
        title: "소장 작성",
        progressTag: "27%",
        description: "판결 주문에 그대로 들어가므로 부동산의 표시를 등기부대로 적어야 해요.",
        items: [
          "부동산의 표시를 등기부 기재대로 옮기기",
          "소가 산정 (목적물 가액 기준)",
          "연체 차임 청구를 함께 할지 결정",
        ],
      },
      courtFilingStep,
      {
        id: "hearing",
        title: "변론",
        description: "해지의 적법성과 점유 관계를 다투는 단계예요.",
        items: [
          "해지 통고 도달 사실 입증",
          "점유자가 바뀌었는지 확인",
          "연체 차임 정산 내역 정리",
        ],
      },
      {
        id: "verdict",
        title: "판결",
        breadcrumbLabel: "공통",
        description: "선고를 받고, 확정되면 집행으로 이어집니다.",
        items: [
          "판결문 수령",
          "항소 여부 판단 — 송달 다음 날부터 2주",
          "집행문 받아 인도집행 신청",
        ],
      },
    ],
    stepDetails: {
      dispute: {
        deadline: {
          type: "deadline",
          items: [
            {
              title: "해지 가능한 연체 기수",
              roleBadge: "임대인",
              periodLabel: "차임 연체액이",
              period: "조건으로 정해짐",
              noteTag: "주택 2기 — 민법 제640조 / 상가 3기 — 상가임대차보호법 제10조의8",
              description:
                "연체액의 합계가 그 기수의 '차임'에 이르러야 합니다. 연속으로 밀릴 필요는 없어요.",
            },
          ],
        },
        preparationItems: [
          "임대차계약서",
          "차임 연체 내역",
          "등기사항전부증명서 (소유 확인)",
          "해지 통고 내용증명·배달증명",
        ],
        tools: [
          { label: "증빙자료 올리러 가기", to: "/evidence" },
          { label: "비슷한 판례 찾아보기", to: "/case" },
        ],
      },
      "content-certification": {
        deadline: {
          type: "deadline",
          items: [
            {
              title: "회신 기한 (내가 정하는 기간)",
              roleBadge: "상대방",
              periodLabel: "내용증명이 도달한 날부터",
              period: "14일",
              noteTag: "법으로 정해진 기한은 아님",
              description: "보통 7~14일을 줍니다. 이 기간이 지나면 소 제기를 준비하세요.",
            },
          ],
        },
        preparationItems: [
          "계약 해지 통고 내용증명 3부",
          "배달증명 영수증",
          "점유이전금지가처분 신청 검토",
        ],
        tools: [
          { label: "일정 등록하기", to: "/schedule" },
          { label: "소송 비용 계산기" },
        ],
        secondaryLink: { label: "증빙자료 올리러 가기", to: "/evidence" },
      },
      "petition-draft": {
        deadline: {
          type: "notice",
          heading: "이 단계에는 법으로 정해진 기한이 없어요.",
          body: "다만 청구권은 시효로 사라지지 않게 미루지 마세요.",
        },
        preparationItems: [
          "부동산의 표시 (등기부 기재대로)",
          "계약서·연체내역·해지통고 (갑호증)",
          "소가 산정 근거 (목적물 가액)",
          "인지대·송달료",
        ],
        tools: [
          { label: "소장 작성하러 가기", to: "/document" },
          { label: "소송 비용 계산기" },
        ],
      },
      "court-filing": courtFilingDetail,
      hearing: standardHearingDetail,
      verdict: {
        deadline: {
          type: "deadline",
          items: [
            {
              title: "인도집행 신청",
              roleBadge: "채권자",
              periodLabel: "판결서를 송달받은 날부터",
              period: "조건으로 정해짐",
              noteTag: "기한 제한은 없으나 늦어질수록 회수가 어려워집니다",
              description:
                "상대방이 스스로 나가지 않으면 별도로 강제집행(인도집행)을 신청해야 합니다.",
            },
            standardVerdictAppealItem,
          ],
        },
        preparationItems: [
          "판결정본",
          "송달증명원·확정증명원",
          "집행문",
          "(인도집행 시) 집행비용 예납",
        ],
        tools: standardVerdictTools,
      },
    },
  },
  "3": {
    title: "손해배상 청구",
    steps: [
      {
        id: "dispute",
        title: "분쟁 발생",
        doneDate: "2026. 1. 19.",
        description: "손해가 발생한 시점이에요. 시간이 지나면 증거 확보가 어려워집니다.",
        items: [
          "사고 자료·진단서 즉시 확보",
          "해지 사유가 되는 연체 기수인지 확인",
          "3년 시효 기산일(안 날) 확인",
        ],
      },
      {
        id: "content-certification",
        title: "내용증명",
        typeTag: "선택",
        description: "보험사와 협의 중이라면 제시액과 실제 손해액을 먼저 비교하세요.",
        items: [
          "보험사 제시액과 실제 손해액 비교",
          "합의 시도 기록 남기기",
          "내용증명 발송",
        ],
      },
      {
        id: "petition-draft",
        title: "소장 작성",
        progressTag: "0%",
        description: "청구취지·청구원인·증거를 갖춘 소장을 만드는 단계예요.",
        items: [
          "적극손해·일실수입·위자료를 나눠 계산",
          "과실비율에 대한 입장 정리",
          "신체감정이 필요한지 판단",
        ],
      },
      courtFilingStep,
      {
        id: "hearing",
        title: "변론",
        description: "과실비율과 손해액 산정을 두고 다투는 단계예요.",
        items: [
          "과실비율 반박 준비",
          "신체감정 촉탁 신청 검토",
          "일실수입 산정 근거 보강",
        ],
      },
      {
        id: "verdict",
        title: "판결",
        breadcrumbLabel: "공통",
        description: "선고를 받고, 확정되면 집행으로 이어집니다.",
        items: [
          "판결문 수령",
          "항소 여부 판단 — 송달 다음 날부터 2주",
          "집행문 받아 강제집행 신청",
        ],
      },
    ],
    stepDetails: {
      dispute: {
        deadline: {
          type: "deadline",
          items: [
            {
              title: "손해배상청구권 소멸시효 (단기)",
              roleBadge: "피해자",
              periodLabel: "손해와 가해자를 안 날부터",
              period: "3년",
              noteTag: "민법 제766조 제1항",
              description: "치료가 이어지는 동안에도 시효는 진행합니다.",
            },
            {
              title: "손해배상청구권 소멸시효 (장기)",
              roleBadge: "피해자",
              periodLabel: "불법행위를 한 날부터",
              period: "10년",
              noteTag: "민법 제766조 제2항",
              description: "둘 중 먼저 오는 기간이 지나면 청구할 수 없습니다.",
            },
          ],
        },
        preparationItems: [
          "사고사실확인원·사고 경위서",
          "진단서·치료비 영수증",
          "사진·블랙박스 영상",
          "휴업손해 입증자료 (급여명세서 등)",
        ],
        tools: [
          { label: "증빙자료 올리러 가기", to: "/evidence" },
          { label: "비슷한 판례 찾아보기", to: "/case" },
        ],
      },
      "content-certification": {
        deadline: {
          type: "deadline",
          items: [
            {
              title: "회신 기한 (내가 정하는 기간)",
              roleBadge: "상대방",
              periodLabel: "내용증명이 도달한 날부터",
              period: "14일",
              noteTag: "법으로 정해진 기한은 아님",
              description: "보통 7~14일을 줍니다. 이 기간이 지나면 소 제기를 준비하세요.",
            },
          ],
        },
        preparationItems: [
          "보험사 제시액과 산정 근거",
          "합의 시도 기록",
          "내용증명 3부 + 배달증명",
        ],
        tools: [
          { label: "일정 등록하기", to: "/schedule" },
          { label: "소송 비용 계산기" },
        ],
        secondaryLink: { label: "증빙자료 올리러 가기", to: "/evidence" },
      },
      "petition-draft": {
        deadline: {
          type: "notice",
          heading: "이 단계에는 법으로 정해진 기한이 없어요.",
          body: "다만 청구권은 시효로 사라지지 않게 미루지 마세요.",
        },
        preparationItems: [
          "당사자 인적사항",
          "진단서·영수증·사고자료 (갑호증)",
          "적극손해·일실수입·위자료 계산 내역",
          "인지대·송달료",
        ],
        tools: [
          { label: "소장 작성하러 가기", to: "/document" },
          { label: "소송 비용 계산기" },
        ],
      },
      "court-filing": courtFilingDetail,
      hearing: standardHearingDetail,
      verdict: standardVerdictDetail,
    },
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

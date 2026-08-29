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
        doneDate: "2023. 9. 4.",
        description: "체불이 확인된 시점이에요. 임금채권은 3년으로 짧으니 서두르세요.",
        items: [
          "근로계약서·급여내역 확보",
          "고용노동부 진정 접수 검토",
          "임금채권 3년 시효 확인",
        ],
      },
      {
        id: "content-certification",
        title: "내용증명",
        typeTag: "선택",
        description:
          "고용노동부 진정을 먼저 넣는 경우가 많아요. 체불금품 확인원이 강력한 증거가 됩니다.",
        items: ["고용노동부 진정 접수", "체불금품 확인원 발급받기", "내용증명 발송"],
      },
      {
        id: "petition-draft",
        title: "소장 작성",
        progressTag: "40%",
        description: "청구취지·청구원인·증거를 갖춘 소장을 만드는 단계예요.",
        items: [
          "미지급 항목별로 나눠 계산 (임금·연장근로·퇴직금)",
          "사용자가 법인이면 법인등기부 확인",
          "근로자 수에 따른 법 적용 확인",
        ],
      },
      courtFilingStep,
      {
        id: "hearing",
        title: "변론",
        description: "근로시간과 지급액을 두고 다투는 단계예요.",
        items: [
          "근태기록으로 연장근로 입증",
          "사용자의 상계 항변 검토",
          "체불금품 확인원 제출",
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
          "확정 후 강제집행 신청",
        ],
      },
    ],
    stepDetails: {
      dispute: {
        deadline: {
          type: "deadline",
          items: [
            {
              title: "사용자의 금품청산 의무",
              roleBadge: "사용자",
              periodLabel: "퇴직 등 지급 사유가 발생한 때",
              period: "14일",
              noteTag: "근로기준법 제36조",
              description:
                "14일이 지나도록 지급하지 않으면 체불입니다. 합의로 기일을 연장할 수는 있어요.",
            },
            {
              title: "임금채권 소멸시효",
              roleBadge: "근로자",
              periodLabel: "임금 지급일부터",
              period: "3년",
              noteTag: "근로기준법 제49조",
              description:
                "퇴직금도 3년입니다(근로자퇴직급여 보장법 제10조). 다른 채권보다 훨씬 짧으니 주의하세요.",
            },
          ],
        },
        preparationItems: [
          "근로계약서",
          "급여명세서·급여 이체내역",
          "근태기록·출퇴근 기록",
          "사내 메신저 등 업무 지시 내역",
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
              noteTag: "법으로 정해진 기간은 아님",
              description: "보통 7~14일을 줍니다. 이 기간이 지나면 소 제기를 준비하세요.",
            },
          ],
        },
        preparationItems: [
          "고용노동부 진정 접수증·처리결과",
          "체불금품 확인원",
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
          "당사자 인적사항 (법인이면 법인등기부)",
          "근로계약서·급여내역 (갑호증)",
          "미지급 항목별 계산 내역",
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
  "5": {
    title: "임대차 보증금 반환 청구",
    steps: [
      {
        id: "dispute",
        title: "분쟁 발생",
        description: "다툼이 생긴 시점이에요. 소송보다 먼저 자료를 모아 둡니다.",
        items: [
          "임대차계약서·입금증 확보",
          "목적물 인도 당시 상태 사진 촬영",
          "임차권등기명령을 낼지 판단",
        ],
      },
      {
        id: "content-certification",
        title: "내용증명",
        typeTag: "선택",
        description: "소송 전에 상대방에게 이행을 요구하는 단계예요. 꼭 거쳐야 하는 건 아닙니다.",
        items: [
          "내용증명으로 보증금 반환 최고",
          "배달증명 보관",
          "임차권등기 완료 여부 확인",
        ],
      },
      {
        id: "petition-draft",
        title: "소장 작성",
        progressTag: "40%",
        description: "청구취지·청구원인·증거를 갖춘 소장을 만드는 단계예요.",
        items: [
          "공제 주장에 대한 반박 정리",
          "목적물 인도일 특정 (지연손해금 기산일)",
          "원상회복 범위 다툼 준비",
        ],
      },
      courtFilingStep,
      {
        id: "hearing",
        title: "변론",
        description: "원상회복·공제 범위를 두고 다투는 단계예요.",
        items: [
          "임대인의 공제 주장 항목별 반박",
          "통상손모와 훼손을 구분해 정리",
          "견적서의 인과관계 다투기",
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
          "확정 후 강제집행 신청",
        ],
      },
    ],
    stepDetails: {
      dispute: {
        deadline: {
          type: "deadline",
          items: [
            {
              title: "임차권등기명령 신청",
              roleBadge: "임차인",
              periodLabel: "임대차가 끝난 뒤 — 이사하기 전 부터",
              period: "조건으로 정해짐",
              noteTag: "주택임대차보호법 제3조의3",
              description:
                "등기를 마치기 전에 이사하면 대항력과 우선변제권을 잃습니다. 날짜로 정해진 기한은 아니지만 순서가 중요합니다.",
            },
            {
              title: "보증금반환채권 소멸시효",
              roleBadge: "임차인",
              periodLabel: "임대차가 끝난 날부터",
              period: "10년",
              noteTag: "민법 제162조 제1항",
              description:
                "보증금반환채권 소멸시효 — 일부라도 변제받으면 시효가 새로 시작합니다. 입금내역을 꼭 보관하세요.",
            },
          ],
        },
        preparationItems: [
          "임대차계약서 원본",
          "보증금 입금증·이체내역",
          "목적물 인도 당시 사진",
          "전입세대확인서·확정일자",
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
              noteTag: "법으로 정해진 기간은 아님",
              description: "보통 7~14일을 줍니다. 이 기간이 지나면 소 제기를 준비하세요.",
            },
          ],
        },
        preparationItems: [
          "내용증명 3부 (임대인·우체국·본인)",
          "배달증명 영수증",
          "임차권등기명령 신청 검토",
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
          "임대차계약서·입금증·인도 사진 (갑호증)",
          "공제 주장에 대한 반박 자료",
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
};

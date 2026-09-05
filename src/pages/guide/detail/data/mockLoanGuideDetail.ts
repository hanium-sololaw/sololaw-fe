export type LoanProcedureStep = {
  id: string;
  title: string;
  typeTag?: string;
  progressTag?: string;
  doneDate?: string;
  breadcrumbLabel?: string;
  description: string;
  items: string[];
};

export const loanCaseSummary = {
  title: "대여금",
};

export const loanProcedureSteps: LoanProcedureStep[] = [
  {
    id: "dispute",
    title: "분쟁 발생",
    doneDate: "2026.03.01",
    description: "다툼이 생긴 시점이에요. 소송보다 먼저 자료를 모아 둬요.",
    items: [
      "차용증·이체내역 확보",
      "변제 독촉 기록 남기기",
      "소멸시효 10년이 얼마나 남았는지 확인",
    ],
  },
  {
    id: "content-certification",
    title: "내용증명",
    typeTag: "선택",
    description:
      "내용증명으로 변제를 최고하는 단계예요. 소액이면 지급명령이 더 빠를 수 있어요.",
    items: [
      "내용증명으로 변제 최고",
      "배달증명 보관 (도달일이 지연손해금 기산점이 돼요)",
      "지급명령(독촉)으로 갈지 판단",
    ],
  },
  {
    id: "petition-draft",
    title: "소장 작성",
    progressTag: "68%",
    description: "청구취지·청구원인·증거를 갖춘 소장을 만드는 단계예요.",
    items: [
      "원금·이자·지연손해금 나눠 계산",
      "변제기와 이율 약정 특정",
      "일부 변제액 공제 내역 정리",
    ],
  },
  {
    id: "court-filing",
    title: "법원 접수",
    description: "관할 법원에 소장을 내고 사건번호를 받는 단계예요.",
    items: [
      "인지대·송달료 납부",
      "전자소송 입력 또는 종이 제출",
      "접수 후 사건번호를 사건관리에 적어 두기",
    ],
  },
  {
    id: "hearing",
    title: "변론",
    description: "피고가 변제 항변을 하는 경우가 많은 단계예요.",
    items: [
      "변제 항변에 대한 반박 준비",
      "일부 변제금의 충당 순서 정리",
      "이자 계산 내역 다시 확인",
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
];

export type LoanToolLink = { label: string; to?: string };

export type LoanDeadlineItem = {
  title: string;
  roleBadge: string;
  periodLabel: string;
  period: string;
  noteTag: string;
  description: string;
};

export type LoanDeadlineInfo =
  | {
      type: "deadline";
      items: LoanDeadlineItem[];
    }
  | {
      type: "notice";
      heading: string;
      body: string;
    };

export type LoanStepDetail = {
  deadline: LoanDeadlineInfo;
  preparationItems: string[];
  tools: LoanToolLink[];
  secondaryLink?: LoanToolLink;
};

export const loanHelperNote =
  "송달일·기일은 법원이 정해 알려 줍니다. 저희가 조회할 수 없으니 통지서를 보고 직접 넣어 주세요.";

export const loanStepDetails: Record<string, LoanStepDetail> = {
  dispute: {
    deadline: {
      type: "deadline",
      items: [
        {
          title: "대여금 채권 소멸시효",
          roleBadge: "원고",
          periodLabel: "변제기가 지난 날로부터",
          period: "10년",
          noteTag: "민사소송법 제162조 제1항",
          description:
            "대여금 채권 소멸시효 — 일부라도 변제받으면 시효가 새로 시작합니다. 입금내역을 꼭 보관하세요.",
        },
      ],
    },
    preparationItems: [
      "차용증·금전소비대차계약서",
      "대여금 계좌이체 확인증",
      "변제 독촉 문자·카톡",
      "일부 변제가 있었다면 그 입금내역",
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
          roleBadge: "원고",
          periodLabel: "내용증명이 도달한 날부터",
          period: "14일",
          noteTag: "법으로 정해진 기간은 아님",
          description:
            "보통 7~14일을 줍니다. 이 기간이 지나면 소 제기를 준비하세요.",
        },
      ],
    },
    preparationItems: [
      "내용증명 3부 (상대방·우체국·본인)",
      "배달증명 영수증",
      "소액이면 지급명령(독촉)도 함께 검토",
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
      "차용증·이체확인증 (갑호증)",
      "변제기·이자 약정 정리",
      "인지대·송달료",
    ],
    tools: [
      { label: "소장 작성하러 가기", to: "/document" },
      { label: "소송 비용 계산기" },
    ],
  },
  "court-filing": {
    deadline: {
      type: "deadline",
      items: [
        {
          title: "보정명령 이행",
          roleBadge: "원고",
          periodLabel: "보정명령을 송달받은 날부터",
          period: "7일",
          noteTag: "법원이 정한 기간 (보통 7~14일)",
          description:
            "기간은 명령서에 적힌 것을 따르세요. 넘기면 소장이 각하될 수 있어요.",
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
  },
  hearing: {
    deadline: {
      type: "deadline",
      items: [
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
        {
          title: "지급명령 이의신청",
          roleBadge: "채무자",
          periodLabel: "지급명령을 송달받은 날부터",
          period: "2주",
          noteTag: "민사소송법 제470조 제1항 (불변기간)",
          description:
            "지급명령으로 갔다면 채무자가 2주 안에 이의하지 않으면 확정판결과 같은 효력이 생깁니다(제474조).",
        },
        {
          title: "이행권고결정 이의신청",
          roleBadge: "피고",
          periodLabel: "결정서 등본을 송달받은 날부터",
          period: "2주",
          noteTag: "소액사건심판법 제5조의4 제1항 (불변기간)",
          description: "소액사건이면 변론 없이 이행권고결정이 먼저 날 수 있어요.",
        },
      ],
    },
    preparationItems: [
      "상대방 답변서·준비서면",
      "반박할 증거",
      "준비서면 (상대방 수 + 1부)",
    ],
    tools: [
      { label: "문서 생성으로 가기", to: "/document" },
      { label: "증빙자료 올리러 가기", to: "/evidence" },
    ],
    secondaryLink: { label: "비슷한 판례 찾아보기", to: "/case" },
  },
  verdict: {
    deadline: {
      type: "deadline",
      items: [
        {
          title: "항소",
          roleBadge: "패소한 쪽",
          periodLabel: "판결서를 송달받은 날부터",
          period: "2주",
          noteTag: "민사소송법 제396조 제1항 (불변기간)",
          description: "2주가 지나면 판결이 확정돼 더 다툴 수 없어요.",
        },
      ],
    },
    preparationItems: ["판결정본", "송달증명원·확정증명원", "(강제집행 시) 집행문"],
    tools: [{ label: "기일 · 기한 등록하기", to: "/schedule" }],
  },
};

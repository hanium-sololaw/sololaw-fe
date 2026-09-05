import type { GuideSituation } from "./complaintGuide";
import type { ComplaintTypeId, LawsuitType } from "./types";

export type FactFieldKind = "text" | "date" | "money" | "select" | "checks";

export type FactField = {
  key: string;
  kind: FactFieldKind;
  options?: string[];
  placeholder?: string;
};

export type ComplaintType = {
  id: ComplaintTypeId;
  lawsuitType: LawsuitType;
  title: string;
  shortTitle: string;
  description: string;
  situations: GuideSituation[];
  tips: string[];
  factFields: FactField[];
  causePrompt: { question: string; placeholder: string };
  attachmentOptions: string[];
};

export const complaintTypes: ComplaintType[] = [
  {
    id: "loan",
    lawsuitType: "loan_return",
    title: "대여금 반환",
    shortTitle: "대여금",
    description: "빌려준 돈을 갚지 않았을 때",
    situations: [
      {
        id: "none",
        label: "아직 아무 조치도 안했어요",
        hint: "지금은 소장보다 내용증명을 먼저 보내는 게 비용과 시간 면에서 유리할 수 있어요.\n내용증명으로 대여금 반환을 요청한 뒤에도 응답이 없으면 소장으로 넘어가면 돼요.",
      },
      {
        id: "no-response",
        label: "내용증명을 보냈는데 응답이 없어요",
        hint: "내용증명에도 응답이 없다면 소장을 작성해 소송으로 진행할 차례예요.\n내용증명 발송일과 수령 여부를 함께 준비해두면 좋아요.",
      },
      {
        id: "objection",
        label: "지급명령에 이의신청이 들어왔어요",
        hint: "이의신청이 들어오면 지급명령은 자동으로 소송 절차(소장)로 전환돼요.\n기존에 제출한 자료를 바탕으로 소장을 준비하면 절차가 빨라져요.",
      },
      {
        id: "limitation",
        label: "소멸시효가 다가오고 있어요",
        hint: "소멸시효가 얼마 남지 않았다면 시효를 중단시키기 위해 서둘러 소장을 접수하는 게 안전해요.\n민사채권의 소멸시효는 원칙적으로 10년이에요.",
      },
    ],
    tips: [
      "차용증이 없어도 계좌이체 내역이나 문자 대화로 대여 사실을 증명할 수 있어요.",
      "청구금액이 3,000만원 이하면 소액사건으로 절차를 간단히 진행할 수 있어요.",
    ],
    factFields: [
      { key: "빌려주기로 약속한 날", kind: "date" },
      { key: "처음 빌려준 총액", kind: "money" },
      { key: "실제로 돈을 건넨 날", kind: "text", placeholder: "예) 약속한 날 바로 · 2026-02-03" },
      { key: "교부 방법", kind: "select", options: ["계좌이체", "현금 교부", "수표 교부", "그 밖의 방법"] },
      { key: "횟수", kind: "select", options: ["한 번에 전부", "여러 번 나눠서"] },
      { key: "변제기", kind: "text", placeholder: "예) 2026-05-01 · 정하지 않았다면 '정하지 않음'" },
      { key: "이자 약정", kind: "text", placeholder: "예) 약정함 (연 5%) · 약정이 없으면 '약정 없음'" },
    ],
    causePrompt: {
      question: "피고와 어떤 사이이고, 왜 돈을 빌려줬나요?",
      placeholder: "예) 대학 동창인데 가게 보증금이 급하다고 해서 빌려줬습니다. 가게 계약이 끝나면 바로 갚겠다고 했습니다.",
    },
    attachmentOptions: [
      "차용증",
      "계좌이체 내역",
      "문자 메시지·카카오톡 대화내역",
      "내용증명 우편물",
      "녹취록",
      "지급명령 결정문",
    ],
  },
  {
    id: "deposit",
    lawsuitType: "deposit_return",
    title: "임대차보증금 반환",
    shortTitle: "임대차보증금",
    description: "전세금이나 보증금을 돌려받지 못했을 때",
    situations: [
      {
        id: "none",
        label: "계약이 끝났는데 보증금을 못 받았어요",
        hint: "지금은 소장보다 내용증명(보증금 반환 요청)을 먼저 보내는 게 비용과 시간 면에서 유리할 수 있어요.\n내용증명 발송 후에도 반환이 없으면 소장으로 넘어가면 돼요.",
      },
      {
        id: "no-response",
        label: "내용증명을 보냈는데 응답이 없어요",
        hint: "내용증명에도 응답이 없다면 임차권등기명령과 함께 소장을 준비할 차례예요.\n이사 전에 임차권등기를 마쳐두면 대항력과 우선변제권을 유지할 수 있어요.",
      },
      {
        id: "lease-registered",
        label: "임차권등기명령을 신청했어요",
        hint: "임차권등기가 완료됐다면 이사를 하더라도 대항력을 유지한 채 소장을 진행할 수 있어요.\n등기 완료일과 신청서 사본을 함께 준비해두세요.",
      },
      {
        id: "limitation",
        label: "소멸시효가 다가오고 있어요",
        hint: "보증금 반환채권의 소멸시효는 원칙적으로 10년이지만, 방치하지 말고 미리 준비하는 게 안전해요.",
      },
    ],
    tips: [
      "확정일자와 전입신고를 유지해야 우선변제권이 인정돼요.",
      "청구금액이 3,000만원 이하면 소액사건으로 절차를 간단히 진행할 수 있어요.",
    ],
    factFields: [
      { key: "임대차 종류", kind: "select", options: ["주택", "상가"] },
      { key: "임차목적물 주소", kind: "text", placeholder: "예) 서울 관악구 봉천로 3 101호" },
      { key: "계약체결일", kind: "date" },
      { key: "보증금액", kind: "money" },
      { key: "임대차 시작일", kind: "date" },
      { key: "보증금을 낸 날", kind: "date" },
      { key: "임대차 종료일", kind: "date" },
      { key: "계약이 어떻게 끝났나", kind: "select", options: ["기간 만료", "묵시적 갱신 후 해지통고", "합의 해지"] },
      { key: "목적물 인도", kind: "select", options: ["비워줬어요", "아직 살고 있어요"] },
      { key: "인도(이사 완료)일", kind: "date" },
      { key: "임차권등기명령", kind: "select", options: ["신청·완료", "안함"] },
      {
        key: "거부 이유",
        kind: "checks",
        options: [
          "원상회복 비용을 공제하겠다",
          "미납 차임·관리비를 공제하겠다",
          "새 임차인이 구해지면 주겠다",
          "연락이 닿지 않는다",
          "이유 없이 미루기만 한다",
        ],
      },
    ],
    causePrompt: {
      question: "임대인이 실제로 뭐라고 말했나요?",
      placeholder: "예) 계약이 끝난 뒤에도 새 세입자가 구해지면 주겠다는 말만 반복하고 있습니다.",
    },
    attachmentOptions: [
      "임대차계약서",
      "보증금 지급내역",
      "등기사항증명서",
      "내용증명 우편물",
      "문자 메시지·카카오톡 대화내역",
    ],
  },
  {
    id: "wage",
    lawsuitType: "wage_claim",
    title: "임금체불청구",
    shortTitle: "임금",
    description: "월급이나 퇴직금 등을 받지 못했을 때",
    situations: [
      {
        id: "none",
        label: "퇴사했는데 임금을 못 받았어요",
        hint: "지금은 소장보다 고용노동부에 임금체불 진정을 먼저 넣는 게 비용과 시간 면에서 유리할 수 있어요.\n진정 후에도 지급되지 않으면 소장으로 넘어가면 돼요.",
      },
      {
        id: "employed",
        label: "재직 중인데 임금이 밀렸어요",
        hint: "재직 중이라도 임금 체불이 계속되면 소장을 준비할 수 있어요.\n근로계약서와 급여명세서, 미지급 내역을 함께 정리해두세요.",
      },
      {
        id: "report-filed",
        label: "고용노동청에 진정을 접수했어요",
        hint: "진정 결과(체불금품확인원)가 나왔다면 이를 근거자료로 소장에 함께 제출하면 좋아요.\n진정이 아직 진행 중이라면 결과를 기다린 뒤 진행해도 괜찮아요.",
      },
      {
        id: "limitation",
        label: "소멸시효가 다가오고 있어요",
        hint: "임금채권의 소멸시효는 3년으로 비교적 짧아요. 시효가 임박했다면 서둘러 소장을 접수하는 게 안전해요.",
      },
    ],
    tips: [
      "고용노동부에 진정을 넣으면 체불금품확인원을 증빙 자료로 활용할 수 있어요.",
      "청구금액이 3,000만원 이하면 소액사건으로 절차를 간단히 진행할 수 있어요.",
    ],
    factFields: [
      { key: "못 받은 항목", kind: "checks", options: ["임금", "퇴직금", "연장근로수당", "주휴수당", "기타"] },
      { key: "항목 합계", kind: "money" },
      { key: "체불 기간", kind: "text", placeholder: "예) 2026년 3월과 4월치" },
      { key: "퇴직일", kind: "text", placeholder: "예) 2026-06-30 · 재직 중이면 '재직 중'" },
      { key: "계산 기준", kind: "text", placeholder: "예) 급여명세서에 적힌 금액으로 계산" },
      { key: "고용노동청 진정", kind: "select", options: ["진정 접수함", "안함"] },
      { key: "진정 접수번호", kind: "text", placeholder: "예) 2026-서울-12345 · 없으면 비워두세요" },
      { key: "체불금품확인원", kind: "select", options: ["발급받음", "발급받지 않음"] },
    ],
    causePrompt: {
      question: "어디서 누구의 지시를 받으며 일했나요? 각 금액은 어느 기간·어떤 기준으로 계산했나요?",
      placeholder: "예) 원고는 피고가 운영하는 물류센터에서 배차 담당으로 일했습니다. 2026년 6월 말 퇴사했는데 5월분 임금과 퇴직금을 받지 못했습니다.",
    },
    attachmentOptions: ["근로계약서", "급여명세서", "통장 거래내역", "체불금품확인원", "문자 메시지·카카오톡 대화내역"],
  },
  {
    id: "damage",
    lawsuitType: "damages",
    title: "손해 배상",
    shortTitle: "손해배상",
    description: "사고나 피해로 손해를 입었을 때",
    situations: [
      {
        id: "none",
        label: "아직 배상을 요구하지 않았어요",
        hint: "지금은 소장보다 내용증명(손해배상 청구)을 먼저 보내는 게 비용과 시간 면에서 유리할 수 있어요.\n내용증명으로 요청한 뒤에도 응답이 없으면 소장으로 넘어가면 돼요.",
      },
      {
        id: "refused",
        label: "상대방이 배상을 거부하고 있어요",
        hint: "상대방이 거부한다면 소장을 작성해 소송으로 진행할 차례예요.\n손해액을 뒷받침할 자료(견적서, 진단서 등)를 함께 준비해두세요.",
      },
      {
        id: "insurance",
        label: "보험사와 협의가 안 되고 있어요",
        hint: "보험사와 협의가 어렵다면 소송을 통해 손해액을 확정받는 것이 안전해요.\n보험사와 주고받은 협의 내역을 함께 준비해두세요.",
      },
      {
        id: "limitation",
        label: "소멸시효가 다가오고 있어요",
        hint: "불법행위로 인한 손해배상청구권은 손해와 가해자를 안 날로부터 3년, 불법행위일로부터 10년이 지나면 소멸돼요.",
      },
    ],
    tips: [
      "사고 현장 사진, 진단서, 견적서 등은 미리 확보해두는 게 좋아요.",
      "청구금액이 3,000만원 이하면 소액사건으로 절차를 간단히 진행할 수 있어요.",
    ],
    factFields: [
      { key: "사고(불법행위) 발생일", kind: "date" },
      {
        key: "생긴 손해",
        kind: "checks",
        options: ["치료비·수리비(적극손해)", "일하지 못한 손해(일실수입)", "위자료"],
      },
      { key: "손해액 합계", kind: "money" },
      { key: "원고 과실", kind: "select", options: ["없음", "일부 있음"] },
      {
        key: "계산에 사용한 자료",
        kind: "checks",
        options: [
          "진단서·소견서",
          "치료비 영수증",
          "수리비 견적서",
          "급여명세서·소득금액증명",
          "사고사실확인원",
          "보험사 지급내역",
        ],
      },
    ],
    causePrompt: {
      question: "상대방이 구체적으로 무엇을 했나요? 그 금액이 나오기까지 어떻게 계산했나요?",
      placeholder: "예) 피고가 원고 소유 차량을 손상시켰습니다. 수리비 견적과 치료비 영수증을 근거로 손해액을 계산했습니다.",
    },
    attachmentOptions: [
      "진단서·소견서",
      "치료비 영수증",
      "수리비 견적서",
      "급여명세서·소득금액증명",
      "사고사실확인원",
      "보험사 지급내역",
    ],
  },
  {
    id: "eviction",
    lawsuitType: "building_surrender",
    title: "건물명도 (미납월세·무단점거)",
    shortTitle: "건물명도",
    description: "월세 미납 및 무단점거로 비워달라고 할 때",
    situations: [
      {
        id: "unpaid-starting",
        label: "월세가 밀리기 시작했어요",
        hint: "차임 연체가 2기(2개월) 이상 쌓이면 계약을 해지하고 명도를 청구할 수 있어요.\n아직 해지를 통보하지 않았다면 내용증명으로 먼저 알리는 게 안전해요.",
      },
      {
        id: "notified",
        label: "해지 통보했는데 안 나가요",
        hint: "해지를 통보했는데도 나가지 않는다면 소장(명도소송)을 준비할 차례예요.\n점유이전금지가처분을 함께 검토하면 소송 중 임차인이 바뀌어도 대응할 수 있어요.",
      },
      {
        id: "expired",
        label: "계약기간이 끝났는데 안 나가요",
        hint: "계약 기간이 끝났다면 별도 해지 통보 없이도 명도를 청구할 수 있어요.\n계약 종료일과 갱신 거절 의사를 밝힌 시점을 정리해두세요.",
      },
      {
        id: "execution",
        label: "강제집행을 고려하고 있어요",
        hint: "강제집행은 명도소송의 승소 판결이 확정된 뒤에 진행할 수 있어요.\n지금 소장을 접수해야 강제집행까지 이어지는 절차를 시작할 수 있어요.",
      },
    ],
    tips: [
      "점유이전금지가처분을 함께 진행하면 명도 집행이 수월해져요.",
      "임대차계약서와 월세 미납 내역을 정리해두면 좋아요.",
    ],
    factFields: [
      { key: "부동산의 표시", kind: "text", placeholder: "등기사항증명서에 적힌 그대로 입력해주세요" },
      { key: "권원", kind: "select", options: ["원고소유", "원고가 소유자로부터 임대권한 받음"] },
      { key: "소유권을 취득한 날", kind: "date" },
      { key: "피고의 점유 상태", kind: "select", options: ["계속 거주중", "영업중", "비어있음"] },
      {
        key: "왜 비워달라고 하나",
        kind: "select",
        options: ["월세가 밀렸어요", "계약이 끝났는데 나가지 않아요", "계약없이 점유하고 있어요"],
      },
      { key: "임대차 종류", kind: "select", options: ["주택", "상가"] },
      { key: "계약한 날", kind: "date" },
      { key: "월세", kind: "money" },
      { key: "월세를 못 받은 첫 달", kind: "date" },
      { key: "밀린 개월 수", kind: "text", placeholder: "예) 6개월" },
      { key: "밀린 관리비·공과금", kind: "money" },
      { key: "월별 미납 내역", kind: "text", placeholder: "예) 2026.04. 150만원 / 2026.05. 150만원" },
      { key: "계약 해지를 알렸나", kind: "select", options: ["통고했어요", "아직이에요"] },
    ],
    causePrompt: {
      question: "비워달라고 하게 되기까지 피고와 어떤 일이 있었나요?",
      placeholder: "예) 2026년 4월분부터 월세를 받지 못했고, 여러 차례 요청해도 계속 미루기만 했습니다.",
    },
    attachmentOptions: [
      "임대차계약서",
      "등기사항증명서",
      "월세 미납내역",
      "내용증명 우편물",
      "문자 메시지·카카오톡 대화내역",
    ],
  },
];

export function findComplaintType(id: ComplaintTypeId): ComplaintType {
  return complaintTypes.find((type) => type.id === id) ?? complaintTypes[0];
}

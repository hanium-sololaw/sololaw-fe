export type ProcedureStepStatus = "done" | "active" | "pending";

export type ProcedureStep = {
  id: string;
  title: string;
  status: ProcedureStepStatus;
  date?: string;
  description: string;
  items: string[];
  note?: string;
};

export type ScheduleEvent = {
  id: string;
  title: string;
  date: string;
  location?: string;
};

export type SubmittedDocument = {
  id: string;
  title: string;
  submitted: boolean;
};

export const caseSummary = {
  category: "민사 소송",
  title: "임대차 보증금 반환 청구",
  court: "서울중앙지방법원",
  caseNumber: "2024가단 123456",
  progress: 60,
};

export const procedureSteps: ProcedureStep[] = [
  {
    id: "petition-submit",
    title: "소장 작성 및 제출",
    status: "done",
    description: "청구의 취지와 원인을 명확히 기재하여 관할 법원에 제출합니다.",
    items: ["소장 3부 작성 (법원용, 피고용, 본인용)", "인지액 및 송달료 납부", "증거자료 첨부"],
  },
  {
    id: "petition-review",
    title: "소장 심사",
    status: "done",
    date: "2026-03-05",
    description: "법원에서 소장의 형식과 내용을 심사합니다.",
    items: ["소장 보정 명령 가능", "통상 1-2주 소요"],
  },
  {
    id: "hearing-scheduled",
    title: "변론기일 지정",
    status: "active",
    date: "2026-03-15",
    description: "첫 번째 변론기일이 지정되고 통지됩니다.",
    items: ["변론기일통지서 수령", "피고에게 소장 부본 송달", "통상 소장 제출 후 1-2개월"],
    note: "변론기일 통지서를 확인하고 필요한 서류를 준비하세요.",
  },
  {
    id: "answer-submit",
    title: "답변서 제출",
    status: "pending",
    date: "2026-03-25",
    description: "피고가 소장에 대한 답변서를 제출합니다.",
    items: ["변론기일 7일 전까지 제출", "원고 주장에 대한 반박"],
  },
  {
    id: "hearing-proceed",
    title: "변론 진행",
    status: "pending",
    date: "2026-04-10",
    description: "법정에서 쟁점에 대한 변론이 진행됩니다.",
    items: ["증거 제출 및 증인 신문", "필요시 추가 변론기일 지정", "준비서면 제출"],
  },
];

export const upcomingSchedules: ScheduleEvent[] = [
  {
    id: "hearing-1",
    title: "제1회 변론기일",
    date: "2026-03-15",
    location: "서울중앙지방법원 327호 | 14:00",
  },
  {
    id: "answer-deadline",
    title: "답변서 제출 마감",
    date: "2026-03-25",
  },
  {
    id: "hearing-2",
    title: "제2회 변론기일",
    date: "2026-04-10",
    location: "서울중앙지방법원 327호 | 10:00",
  },
];

export const submittedDocuments: SubmittedDocument[] = [
  { id: "petition", title: "소장", submitted: true },
  { id: "party", title: "당사자 표시", submitted: true },
  { id: "evidence", title: "증거자료", submitted: true },
  { id: "brief", title: "준비서면", submitted: false },
  { id: "evidence-list", title: "증거목록", submitted: false },
];

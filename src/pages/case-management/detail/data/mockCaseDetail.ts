import type { CaseStatus } from "../../data/mockCases";

export type ProcedureStageId =
  | "dispute"
  | "notice"
  | "petition"
  | "filed"
  | "trial"
  | "verdict";

export type ProcedureStage = {
  id: ProcedureStageId;
  label: string;
  date?: string;
};

export const procedureStages: ProcedureStage[] = [
  { id: "dispute", label: "분쟁 발생", date: "2024. 1. 1." },
  { id: "notice", label: "내용증명" },
  { id: "petition", label: "소장 작성" },
  { id: "filed", label: "법원 접수" },
  { id: "trial", label: "변론" },
  { id: "verdict", label: "판결" },
];

export type TodoItem = {
  id: string;
  title: string;
  dueDate: string;
  done: boolean;
};

export type ActivityLogItem = {
  id: string;
  title: string;
  description: string;
  time: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
  pendingCount?: number;
};

export type DocumentItem = {
  id: string;
  category: string;
  title: string;
  progress: number;
};

export type RelatedCaseItem = {
  id: string;
  title: string;
  badge: string;
};

export type UpcomingScheduleItem = {
  id: string;
  dDay: string;
  title: string;
};

export type CaseDetail = {
  id: string;
  title: string;
  status: CaseStatus;
  caseNumber: string;
  court: string;
  lastActivity: string;
  currentStageId: ProcedureStageId;
  filedAt: string;
  petitionTitle: string;
  petitionProgress: number;
  remainingTasksToFile: number;
  nextDeadline: { dDay: string; date: string };
  todos: TodoItem[];
  stats: {
    documentCount: number;
    documentNote: string;
    evidenceCount: number;
    evidenceNote: string;
    scheduleCount: number;
    scheduleNote: string;
  };
  activityLog: ActivityLogItem[];
  petitionChecklist: ChecklistItem[];
  aiReviewNotes: string[];
  upcomingSchedules: UpcomingScheduleItem[];
  documents: DocumentItem[];
  evidenceCompleted: number;
  evidenceTotal: number;
  relatedCases: RelatedCaseItem[];
};

const defaultCaseDetail: CaseDetail = {
  id: "1",
  title: "임대차 보증금 반환 청구",
  status: "진행 중",
  caseNumber: "2024가단123456",
  court: "서울중앙지방법원",
  lastActivity: "최근 활동 2시간 전",
  currentStageId: "trial",
  filedAt: "2026. 5. 18.",
  petitionTitle: "소장 작성",
  petitionProgress: 79,
  remainingTasksToFile: 1,
  nextDeadline: { dDay: "D-3", date: "2026. 8. 17." },
  todos: [
    { id: "t1", title: "제1회 변론기일 참석", dueDate: "2026. 8. 17.", done: false },
    { id: "t2", title: "준비서면(2) 제출", dueDate: "2026. 8. 20.", done: false },
  ],
  stats: {
    documentCount: 4,
    documentNote: "임대차보증금 반환",
    evidenceCount: 6,
    evidenceNote: "입증취지 6/6건 작성",
    scheduleCount: 2,
    scheduleNote: "2026. 8. 17. · 제1회 변론기일 참석",
  },
  activityLog: [
    {
      id: "a1",
      title: "변론기일통지서에서 일정 등록",
      description: "8월 15일(토) 14:00 · 327호 법정",
      time: "5일 전",
    },
    {
      id: "a2",
      title: "준비서면(1) 제출 완료",
      description: "전자소송 제출",
      time: "12일 전",
    },
    {
      id: "a3",
      title: "갑 제4호증 개인정보 확인",
      description: "제3자 전화번호 가림 처리",
      time: "2026. 7. 29.",
    },
  ],
  petitionChecklist: [
    { id: "court", label: "관할 법원", done: true },
    { id: "amount", label: "청구 금액", done: true },
    { id: "plaintiff", label: "원고 정보", done: true },
    { id: "defendant", label: "피고 정보", done: true },
    { id: "facts", label: "사실관계", done: false, pendingCount: 2 },
    { id: "evidence", label: "입증자료", done: true },
  ],
  aiReviewNotes: ["사실관계에 빈칸이 2개 있습니다."],
  upcomingSchedules: [
    { id: "u1", dDay: "D-3", title: "제1회 변론기일 참석" },
    { id: "u2", dDay: "D-6", title: "준비서면(2) 제출" },
  ],
  documents: [
    { id: "d1", category: "소장", title: "임대차보증금 반환 소장", progress: 79 },
    {
      id: "d2",
      category: "준비서면",
      title: "준비서면(2) — 원상복구 범위",
      progress: 65,
    },
    {
      id: "d3",
      category: "증거목록",
      title: "증거목록 (갑 제1~6호증)",
      progress: 82,
    },
    {
      id: "d4",
      category: "준비서면",
      title: "준비서면(1) — 공제 주장 반박",
      progress: 100,
    },
  ],
  evidenceCompleted: 6,
  evidenceTotal: 6,
  relatedCases: [
    { id: "r1", title: "임대차보증금", badge: "대법원 판결" },
    { id: "r2", title: "임대차보증금", badge: "대법원 판결" },
  ],
};

const caseDetails: Record<string, CaseDetail> = {
  "1": defaultCaseDetail,
};

type CaseSummaryLike = {
  id: string;
  title: string;
  court: string;
  caseNumber: string;
  status: CaseStatus;
  petitionProgress: number;
  remainingTasks: number;
  documentCount: number;
  evidenceCount: number;
};

function buildFallbackDetail(summary: CaseSummaryLike): CaseDetail {
  return {
    ...defaultCaseDetail,
    id: summary.id,
    title: summary.title,
    status: summary.status,
    caseNumber: summary.caseNumber,
    court: summary.court,
    petitionProgress: summary.petitionProgress,
    remainingTasksToFile: summary.remainingTasks,
    stats: {
      ...defaultCaseDetail.stats,
      documentCount: summary.documentCount,
      documentNote: summary.title,
      evidenceCount: summary.evidenceCount,
    },
  };
}

export function getCaseDetail(
  id: string,
  fallbackSummary?: CaseSummaryLike,
): CaseDetail {
  const found = caseDetails[id];
  if (found) return found;
  if (fallbackSummary) return buildFallbackDetail(fallbackSummary);
  return defaultCaseDetail;
}

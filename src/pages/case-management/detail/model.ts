import type { CaseStatus } from "@/shared/api/cases";

export type ProcedureStageId = string;

export type ProcedureStage = {
  id: ProcedureStageId;
  label: string;
  date?: string;
  status?: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";
};



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


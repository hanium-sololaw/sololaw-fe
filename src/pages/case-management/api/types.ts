export type ApiCaseStatus =
  | "PREPARING"
  | "SUBMISSION_READY"
  | "FILED"
  | "IN_PROGRESS"
  | "CLOSED";

export type ApiCaseType = "LOAN" | "DEPOSIT" | "WAGE" | "TORT" | "EVICTION";

export type ApiStartingStage =
  | "DISPUTE"
  | "DEMAND_LETTER"
  | "COMPLAINT_DRAFT"
  | "COURT_FILED";

export type CaseRecord = {
  id: number;
  caseNumber: string;
  title: string;
  caseType: ApiCaseType;
  status: ApiCaseStatus;
  progressRate: number;
  court: string;
  claimAmount: number;
  openedAt: string;
  filingMethod: string;
  createdAt: string;
  modifiedAt: string;
};

export type ApiStageStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";

export type StageRecord = {
  id: number;
  stageOrder: number;
  name: string;
  status: ApiStageStatus;
  stageDate: string | null;
  description: string;
};

export type TodoRecord = {
  id: number;
  title: string;
  dueDate: string | null;
  isDone: boolean;
  createdAt: string;
  modifiedAt: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  code: number;
  errorCode: string;
  message: string;
  timestamp: string;
  data: T;
};

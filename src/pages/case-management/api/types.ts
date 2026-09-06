export type ApiStartingStage =
  | "DISPUTE"
  | "DEMAND_LETTER"
  | "COMPLAINT_DRAFT"
  | "COURT_FILED";

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

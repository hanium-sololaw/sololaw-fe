import type { CaseType } from "@/shared/api/cases";
import type { ApiStartingStage } from "../api/types";

export const caseTypeByLabel: Record<string, CaseType | undefined> = {
  "대여금": "LOAN",
  "임대차 보증금 반환": "DEPOSIT",
  "건물명도": "EVICTION",
  "손해배상": "TORT",
  "임금체불(임금·퇴직금)": "WAGE",
  "기타": undefined,
};

export const startingStageByProgressId: Record<string, ApiStartingStage> = {
  none: "DISPUTE",
  notice: "DEMAND_LETTER",
  preparing: "COMPLAINT_DRAFT",
  filed: "COURT_FILED",
};

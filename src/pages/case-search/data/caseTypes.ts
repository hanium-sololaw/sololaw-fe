import type { CaseType } from "@/shared/api/cases";

export const CASE_TYPE_LABEL: Record<CaseType, string> = {
  LOAN: "대여금",
  DEPOSIT: "임대차보증금",
  WAGE: "임금",
  TORT: "손해배상",
  EVICTION: "명도",
};

export const CASE_TYPES = Object.keys(CASE_TYPE_LABEL) as CaseType[];

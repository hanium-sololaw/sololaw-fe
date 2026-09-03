import type { ApiCaseStatus, ApiCaseType } from "../api/getCaseList";

export const caseStatusMeta: Record<
  ApiCaseStatus,
  { label: string; style: string }
> = {
  PREPARING: { label: "준비 중", style: "bg-yellow-50 text-yellow-600" },
  SUBMISSION_READY: {
    label: "제출 준비 완료",
    style: "bg-yellow-50 text-yellow-600",
  },
  FILED: { label: "접수 완료", style: "bg-blue-50 text-blue-500" },
  IN_PROGRESS: { label: "진행 중", style: "bg-blue-50 text-blue-500" },
  CLOSED: { label: "종료", style: "bg-gray-100 text-gray-500" },
};

export const caseTypeLabel: Record<ApiCaseType, string> = {
  LOAN: "대여금",
  DEPOSIT: "임대차 보증금 반환",
  WAGE: "임금체불",
  TORT: "손해배상",
  EVICTION: "건물명도",
};

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function formatAmount(amount: number): string {
  return `${amount.toLocaleString()}원`;
}

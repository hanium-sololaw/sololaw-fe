import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiCaseStatus, ApiCaseType, ApiEnvelope, CaseRecord } from "./types";

export type { ApiCaseStatus, ApiCaseType };
export type { CaseRecord as CaseListItem } from "./types";

export type CaseListPage = {
  content: CaseRecord[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

export type CaseListQuery = {
  status?: ApiCaseStatus;
  caseType?: ApiCaseType;
  page?: number;
  size?: number;
  sort?: string[];
};

export async function getCaseList(
  query: CaseListQuery = {},
): Promise<CaseListPage> {
  const { status, caseType, page = 0, size = 100, sort } = query;

  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (caseType) params.set("caseType", caseType);
  params.set("page", String(page));
  params.set("size", String(size));
  sort?.forEach((value) => params.append("sort", value));

  const response = await apiClient<ApiEnvelope<CaseListPage>>(
    `/api/cases?${params.toString()}`,
    withAuth({ method: "GET" }),
  );

  return response.data;
}

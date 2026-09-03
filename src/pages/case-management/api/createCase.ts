import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type {
  ApiCaseType,
  ApiEnvelope,
  ApiStartingStage,
  CaseRecord,
} from "./types";

export type { ApiStartingStage };

export type CreateCaseRequest = {
  title: string;
  caseType?: ApiCaseType;
  opponentName: string;
  claimAmount?: number;
  court?: string;
  caseNumber?: string;
  startingStage?: ApiStartingStage;
};

export async function createCase(
  body: CreateCaseRequest,
): Promise<CaseRecord> {
  const response = await apiClient<ApiEnvelope<CaseRecord>>(
    "/api/cases",
    withAuth({
      method: "POST",
      body: JSON.stringify(body),
    }),
  );

  return response.data;
}

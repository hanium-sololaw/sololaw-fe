import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope } from "./document";

export type GenerationJob = {
  id: number;
  documentId: number;
  status: string;
  progress: number;
  errorCode?: string;
  errorMessage?: string;
  failedAt?: string;
};

/** Fetches a generation job's log/history. GET /api/documents/jobs/{jobId}. */
export async function getGenerationJob(jobId: number): Promise<GenerationJob> {
  const response = await apiClient<ApiEnvelope<GenerationJob>>(`/api/documents/jobs/${jobId}`);
  return response.data;
}

import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, ScheduleEventTime, ScheduleType } from "./types";

export type CourtDocumentAnalysis = {
  success: boolean;
  message: string | null;
  documentType: string | null;
  caseNumber: string | null;
  caseName: string | null;
  matchedCaseId: number | null;
  scheduleType: ScheduleType | null;
  hearingDate: string | null;
  // Swagger shows a LocalTime object, but Jackson may serialize it as "HH:mm[:ss]"
  hearingTime: ScheduleEventTime | string | null;
  court: string | null;
  division: string | null;
  submissionDeadline: string | null;
  deadlineType: string | null;
};

/**
 * Uploads a court document (PDF/JPG/PNG) and lets the backend AI extract the case number, hearing
 * date or submission deadline, court and division. Nothing is saved — confirm with POST /api/schedules.
 * POST /api/schedules/court-document/analyze.
 */
export async function analyzeCourtDocument(
  file: File,
): Promise<CourtDocumentAnalysis> {
  const body = new FormData();
  body.append("file", file);

  const response = await apiClient<ApiEnvelope<CourtDocumentAnalysis>>(
    "/api/schedules/court-document/analyze",
    { method: "POST", body },
  );
  return response.data;
}

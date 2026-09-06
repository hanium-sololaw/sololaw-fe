import { apiClient, API_ROOT_URL } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope } from "@/shared/api/types";
import type { Material } from "./model";

export type PartyType = "GAP" | "EUL" | "BYEONG";
export type EvidenceStatus = "PENDING" | "NOT_SUBMITTED" | "SUBMITTED" | "NEEDS_SUPPLEMENT";
export type Evidence = {
  id: number; caseId: number; folderId: number | null; partyType: PartyType;
  exhibitNo: string; fileName: string; fileSize: number; fileType: string | null;
  status: EvidenceStatus; isLatest: boolean; proofPurpose: string | null;
  description: string | null; tags: string[]; submittedAt: string | null;
  deadline: string | null; uploadedAt: string; createdAt: string; modifiedAt: string;
};
export type EvidencePage = { content: Evidence[]; page: number; size: number; totalElements: number; totalPages: number; hasNext: boolean };
export type EvidenceMetadata = { exhibitNo?: string; proofPurpose?: string; description?: string; tags?: string[]; deadline?: string };
type FileMetadata = { fileName: string; fileUrl: string; fileSize: number; fileType?: string };
export const partyLabels: Record<PartyType, string> = { GAP: "갑", EUL: "을", BYEONG: "병" };
const toStatus: Record<EvidenceStatus, Material["status"]> = { PENDING: "SCHEDULED_TO_SUBMIT", NOT_SUBMITTED: "NOT_SUBMITTED", SUBMITTED: "SUBMITTED", NEEDS_SUPPLEMENT: "NEEDS_REVISION" };
export const evidenceStatus = (status: Material["status"]): EvidenceStatus => {
  switch (status) {
    case "SCHEDULED_TO_SUBMIT": return "PENDING";
    case "SUBMITTED": return "SUBMITTED";
    case "NEEDS_REVISION": return "NEEDS_SUPPLEMENT";
    case "NOT_SUBMITTED": return "NOT_SUBMITTED";
    default: throw new Error("지원하지 않는 증거 제출 상태입니다.");
  }
};
export function toMaterial(item: Evidence): Material {
  return { id: item.id, kind: "EVIDENCE", title: item.fileName, caseId: item.caseId,
    status: toStatus[item.status], isLatest: item.isLatest, createdAt: item.uploadedAt || item.createdAt,
    exhibit: item.exhibitNo, purpose: item.proofPurpose || "", size: item.fileSize < 1024 * 1024 ? `${Math.max(1, Math.round(item.fileSize / 1024))} KB` : `${(item.fileSize / (1024 * 1024)).toFixed(1)} MB`,
    deadline: item.deadline || undefined, submittedAt: item.submittedAt || undefined };
}
export async function listEvidence(params: { caseId?: number; status?: EvidenceStatus; partyType?: PartyType; isLatest?: boolean; page?: number; size?: number; sort?: string } = {}): Promise<EvidencePage> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return (await apiClient<ApiEnvelope<EvidencePage>>(`/api/evidence?${query}`)).data;
}
export async function loadEvidence(): Promise<Material[]> {
  const first = await listEvidence({ size: 100, sort: "createdAt,desc" });
  const items = [...first.content];
  for (let page = 1; page < first.totalPages; page++) items.push(...(await listEvidence({ size: 100, page, sort: "createdAt,desc" })).content);
  return items.map(toMaterial);
}
export async function getEvidence(id: number): Promise<Evidence> {
  return (await apiClient<ApiEnvelope<Evidence>>(`/api/evidence/${id}`)).data;
}
export async function updateEvidence(id: number, metadata: EvidenceMetadata): Promise<Evidence> {
  return (await apiClient<ApiEnvelope<Evidence>>(`/api/evidence/${id}`, { method: "PATCH", body: JSON.stringify(metadata) })).data;
}
export async function updateEvidenceStatus(id: number, status: EvidenceStatus): Promise<Evidence> {
  return (await apiClient<ApiEnvelope<Evidence>>(`/api/evidence/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) })).data;
}
export async function deleteEvidence(id: number): Promise<void> {
  await apiClient<ApiEnvelope<unknown>>(`/api/evidence/${id}`, { method: "DELETE" });
}
export async function nextExhibitNo(caseId: number, partyType: PartyType): Promise<number> {
  return (await apiClient<ApiEnvelope<number>>(`/api/cases/${caseId}/evidence/next-exhibit-no?partyType=${partyType}`)).data;
}
export async function uploadEvidenceFile(caseId: number, file: File): Promise<FileMetadata> {
  const contentType = file.type || "application/octet-stream";
  const { data } = await apiClient<ApiEnvelope<{ uploadUrl: string; key: string }>>("/api/evidence/upload-url", { method: "POST", body: JSON.stringify({ caseId, fileName: file.name, contentType, fileSize: file.size }) });
  // The presigned storage request must not carry application cookies or auth headers.
  const response = await fetch(data.uploadUrl, { method: "PUT", credentials: "omit", headers: { "Content-Type": contentType }, body: file });
  if (!response.ok) throw new Error(`파일 전송 실패: ${response.status}`);
  return { fileName: file.name, fileUrl: data.key, fileSize: file.size, fileType: contentType };
}
export async function createEvidence(caseId: number, request: FileMetadata & EvidenceMetadata & { partyType: PartyType }): Promise<Evidence> {
  return (await apiClient<ApiEnvelope<Evidence>>(`/api/cases/${caseId}/evidence`, { method: "POST", body: JSON.stringify(request) })).data;
}
export async function replaceEvidence(id: number, file: FileMetadata): Promise<Evidence> {
  return (await apiClient<ApiEnvelope<Evidence>>(`/api/evidence/${id}/replace`, { method: "POST", body: JSON.stringify(file) })).data;
}
export async function downloadEvidence(id: number, filename: string): Promise<void> {
  const response = await fetch(`${API_ROOT_URL}/api/evidence/${id}/download`, withAuth());
  if (!response.ok) throw new Error(`다운로드 실패: ${response.status}`);
  const url = URL.createObjectURL(await response.blob());
  const link = document.createElement("a");
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
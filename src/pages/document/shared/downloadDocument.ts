import { API_ROOT_URL } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";

/**
 * Downloads a document's file (GET /api/documents/{documentId}/download, which 302-redirects to
 * an S3 presigned URL — fetch follows this automatically). 404s if the document hasn't been
 * generated yet. Auth is a Bearer header, so a plain <a href> can't carry it; this fetches the
 * bytes and triggers the save via a temporary object URL instead.
 */
export async function downloadDocument(documentId: number, filename: string): Promise<void> {
  const response = await fetch(`${API_ROOT_URL}/api/documents/${documentId}/download`, withAuth());
  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

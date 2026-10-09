import { postSSE } from "@/shared/api/sse";
import { createDocumentDraft } from "./createDraft";
import { saveDocumentResult } from "./saveResult";
import type { DocType } from "./document";

type GenerationOptions<TBody> = {
  endpoint: string;
  body: TBody;
  signal?: AbortSignal;
  caseId: number | null;
  docType: DocType;
  applicationSubtype?: string;
  title: string;
  content: unknown;
};

type GenerationResponse<TSections> = {
  sections: TSections;
  raw_text: string;
};

/**
 * Generates a document through the RAG API. When the wizard was entered with a case, a draft is
 * created alongside and the result is saved to it; without a case nothing is persisted.
 */
export async function runGeneration<TSections, TBody>({
  endpoint,
  body,
  signal,
  caseId,
  docType,
  applicationSubtype,
  title,
  content,
}: GenerationOptions<TBody>): Promise<TSections> {
  const [draftId, { sections, raw_text }] = await Promise.all([
    caseId === null ? null : createDocumentDraft(caseId, { docType, applicationSubtype, title, content }).then((d) => d.id),
    postSSE<GenerationResponse<TSections>>(endpoint, body, undefined, signal),
  ]);
  if (draftId !== null) await saveDocumentResult(draftId, raw_text, sections);
  return sections;
}

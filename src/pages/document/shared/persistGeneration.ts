import { createDocumentDraft } from "./createDraft";
import { saveDocumentResult } from "./saveResult";
import type { DocType } from "./document";

type CreateDraftOptions = {
  caseId: number | null;
  docType: DocType;
  applicationSubtype?: string;
  title: string;
  content: unknown;
};

/**
 * Creates a document draft before generation when the wizard was entered with a real case
 * (caseId != null via "사건 선택하기"). Returns null when there's no case (case 없이 둘러보기),
 * meaning nothing gets persisted — generation still works, it just isn't saved to a case.
 */
export async function createDraftIfNeeded(options: CreateDraftOptions): Promise<number | null> {
  if (options.caseId === null) return null;
  const draft = await createDocumentDraft(options.caseId, {
    docType: options.docType,
    applicationSubtype: options.applicationSubtype,
    title: options.title,
    content: options.content,
  });
  return draft.id;
}

/** Saves the AI-generated result to the draft created by createDraftIfNeeded, if any. */
export async function saveResultIfNeeded(documentId: number | null, rawText: string, sections: unknown): Promise<void> {
  if (documentId === null) return;
  await saveDocumentResult(documentId, rawText, sections);
}

import { createDraftStore } from "../../shared/draftStore";
import type { EvidenceListForm } from "./types";

export const { saveDraft, loadDraft, clearDraft } = createDraftStore<EvidenceListForm>(
  "sololaw_evidence_list_draft_v1",
);

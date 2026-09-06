import { createTypedDraftStore } from "../../shared/draftStore";
import type { ComplaintForm, ComplaintTypeId } from "./types";

export const { saveDraft, loadDraft, clearDraft } = createTypedDraftStore<ComplaintTypeId, ComplaintForm>(
  "sololaw_complaint_draft_v2",
);

import { createTypedDraftStore } from "../../shared/draftStore";
import type { PetitionForm, PetitionTypeId } from "./types";

export const { saveDraft, loadDraft, clearDraft } = createTypedDraftStore<PetitionTypeId, PetitionForm>(
  "sololaw_petition_draft_v1",
);

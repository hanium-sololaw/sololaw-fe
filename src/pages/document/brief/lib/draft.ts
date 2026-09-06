import { createDraftStore } from "../../shared/draftStore";
import type { BriefForm } from "./types";

export const { saveDraft, loadDraft, clearDraft } = createDraftStore<BriefForm>("sololaw_brief_draft_v1");

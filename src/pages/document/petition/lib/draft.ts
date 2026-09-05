import type { PetitionForm, PetitionTypeId } from "./types";

const DRAFT_KEY = "sololaw_petition_draft_v1";

type PetitionDraft = {
  typeId: PetitionTypeId;
  form: PetitionForm;
  savedAt: number;
};

export function saveDraft(typeId: PetitionTypeId, form: PetitionForm): boolean {
  try {
    const draft: PetitionDraft = { typeId, form, savedAt: Date.now() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function loadDraft(): PetitionDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as PetitionDraft) : null;
  } catch {
    return null;
  }
}

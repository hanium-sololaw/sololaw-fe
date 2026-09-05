import type { ComplaintForm, ComplaintTypeId } from "./types";

const DRAFT_KEY = "sololaw_complaint_draft_v2";

type ComplaintDraft = {
  typeId: ComplaintTypeId;
  form: ComplaintForm;
  savedAt: number;
};

export function saveDraft(typeId: ComplaintTypeId, form: ComplaintForm): boolean {
  try {
    const draft: ComplaintDraft = { typeId, form, savedAt: Date.now() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function loadDraft(): ComplaintDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as ComplaintDraft) : null;
  } catch {
    return null;
  }
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

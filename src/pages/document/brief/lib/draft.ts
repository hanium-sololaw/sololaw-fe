import type { BriefForm } from "./types";

const DRAFT_KEY = "sololaw_brief_draft_v1";

type BriefDraft = {
  form: BriefForm;
  savedAt: number;
};

export function saveDraft(form: BriefForm): boolean {
  try {
    const draft: BriefDraft = { form, savedAt: Date.now() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function loadDraft(): BriefDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as BriefDraft) : null;
  } catch {
    return null;
  }
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

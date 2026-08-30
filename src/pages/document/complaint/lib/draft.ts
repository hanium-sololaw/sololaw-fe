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

export function savedAgo(savedAt: number): string {
  const seconds = Math.floor((Date.now() - savedAt) / 1000);
  if (seconds < 60) return "방금";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  return `${hours}시간 전`;
}

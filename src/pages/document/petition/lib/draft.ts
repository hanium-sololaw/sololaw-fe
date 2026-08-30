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

export function savedAgo(savedAt: number): string {
  const seconds = Math.floor((Date.now() - savedAt) / 1000);
  if (seconds < 60) return "방금";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  return `${hours}시간 전`;
}

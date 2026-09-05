import type { EvidenceListForm } from "./types";

const DRAFT_KEY = "sololaw_evidence_list_draft_v1";

type EvidenceListDraft = {
  form: EvidenceListForm;
  savedAt: number;
};

export function saveDraft(form: EvidenceListForm): boolean {
  try {
    const draft: EvidenceListDraft = { form, savedAt: Date.now() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function loadDraft(): EvidenceListDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as EvidenceListDraft) : null;
  } catch {
    return null;
  }
}

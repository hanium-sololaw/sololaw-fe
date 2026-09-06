type Draft<T> = { form: T; savedAt: number };
type TypedDraft<TypeId, T> = { typeId: TypeId; form: T; savedAt: number };

/** localStorage-backed draft for a single-form document type (no type variants), e.g. 준비서면·증거목록. */
export function createDraftStore<T>(key: string) {
  return {
    saveDraft(form: T): boolean {
      try {
        const draft: Draft<T> = { form, savedAt: Date.now() };
        localStorage.setItem(key, JSON.stringify(draft));
        return true;
      } catch {
        return false;
      }
    },
    loadDraft(): Draft<T> | null {
      try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as Draft<T>) : null;
      } catch {
        return null;
      }
    },
    clearDraft() {
      localStorage.removeItem(key);
    },
  };
}

/** localStorage-backed draft for a document type with multiple type variants, e.g. 소장·신청서. */
export function createTypedDraftStore<TypeId, T>(key: string) {
  return {
    saveDraft(typeId: TypeId, form: T): boolean {
      try {
        const draft: TypedDraft<TypeId, T> = { typeId, form, savedAt: Date.now() };
        localStorage.setItem(key, JSON.stringify(draft));
        return true;
      } catch {
        return false;
      }
    },
    loadDraft(): TypedDraft<TypeId, T> | null {
      try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as TypedDraft<TypeId, T>) : null;
      } catch {
        return null;
      }
    },
    clearDraft() {
      localStorage.removeItem(key);
    },
  };
}

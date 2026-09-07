type Draft<T> = { form: T; savedAt: number };

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
  };
}

/**
 * localStorage-backed draft for a document type with multiple type variants, e.g. 소장·신청서.
 * Keeps one draft slot per variant, keyed by typeId, so switching variants never leaks another
 * variant's data into the form — each variant remembers only its own last-edited content.
 */
export function createTypedDraftStore<TypeId extends string, T>(key: string) {
  function readMap(): Record<string, Draft<T>> {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as Record<string, Draft<T>>) : {};
    } catch {
      return {};
    }
  }

  return {
    saveDraft(typeId: TypeId, form: T): boolean {
      try {
        const map = readMap();
        map[typeId] = { form, savedAt: Date.now() };
        localStorage.setItem(key, JSON.stringify(map));
        return true;
      } catch {
        return false;
      }
    },
    loadDraft(typeId: TypeId): Draft<T> | null {
      return readMap()[typeId] ?? null;
    },
  };
}

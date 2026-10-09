type Draft<T> = { form: T; savedAt: number };

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

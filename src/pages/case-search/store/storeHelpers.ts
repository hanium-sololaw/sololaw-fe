export function toggleId(ids: Set<string>, id: string) {
  const next = new Set(ids);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}

export function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

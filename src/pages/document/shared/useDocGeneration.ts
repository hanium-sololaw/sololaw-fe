import { useEffect, useState } from "react";

const READY_DELAY_MS = 800;

/**
 * Shared "generating → ready → done" phase machine for the document wizards: calls `generate`
 * once `phase` becomes "generating", then holds on "ready" for a beat before the caller can
 * move to "done". On failure it reports `error` and sends the caller back to "writing".
 */
export function useDocGeneration<TDoc>(
  phase: string,
  setPhase: (phase: "writing" | "ready" | "done") => void,
  generate: (signal: AbortSignal) => Promise<TDoc>,
  fallbackErrorMessage: string,
) {
  const [doc, setDoc] = useState<TDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "generating") return undefined;
    let cancelled = false;
    const controller = new AbortController();
    generate(controller.signal)
      .then((result) => {
        if (cancelled) return;
        setDoc(result);
        setPhase("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : fallbackErrorMessage);
        setPhase("writing");
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== "ready") return undefined;
    const timer = setTimeout(() => setPhase("done"), READY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [phase, setPhase]);

  return { doc, error, setError };
}

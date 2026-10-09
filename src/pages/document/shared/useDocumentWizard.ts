import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export type WizardPhase = "type" | "writing" | "generating" | "ready";

const DRAFT_SAVE_DELAY_MS = 600;
const READY_DELAY_MS = 800;

type UseDocumentWizardOptions<TForm, TDoc> = {
  initialForm: TForm | (() => TForm);
  initialPhase: WizardPhase;
  stepCount: number;
  saveDraft: (form: TForm) => void;
  generate: (form: TForm, caseId: number | null, signal: AbortSignal) => Promise<TDoc>;
  errorMessage: string;
  donePath: string;
  doneState: (doc: TDoc, form: TForm) => unknown;
};

export function useDocumentWizard<TForm, TDoc>({
  initialForm,
  initialPhase,
  stepCount,
  saveDraft,
  generate,
  errorMessage,
  donePath,
  doneState,
}: UseDocumentWizardOptions<TForm, TDoc>) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseIdParam = searchParams.get("caseId");
  const caseId = caseIdParam ? Number(caseIdParam) : null;

  const [phase, setPhase] = useState<WizardPhase>(initialPhase);
  const [form, setForm] = useState<TForm>(initialForm);
  const [stepIndex, setStepIndex] = useState(0);
  const [doc, setDoc] = useState<TDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runGeneration = useEffectEvent((signal: AbortSignal) => generate(form, caseId, signal));
  const showResult = useEffectEvent(() => {
    if (doc) navigate(donePath, { state: doneState(doc, form) });
  });

  useEffect(() => {
    if (phase !== "generating") return undefined;
    let cancelled = false;
    const controller = new AbortController();

    runGeneration(controller.signal)
      .then((result) => {
        if (cancelled) return;
        setDoc(result);
        setPhase("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : errorMessage);
        setPhase("writing");
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [phase, errorMessage]);

  useEffect(() => {
    if (phase !== "ready") return undefined;
    const timer = setTimeout(showResult, READY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const updateField = <K extends keyof TForm>(key: K, value: TForm[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveDraft(next), DRAFT_SAVE_DELAY_MS);
  };

  const isLastStep = stepIndex === stepCount - 1;

  const next = () => {
    if (!isLastStep) return setStepIndex(stepIndex + 1);
    setError(null);
    setPhase("generating");
  };

  const prev = () => (stepIndex > 0 ? setStepIndex(stepIndex - 1) : navigate("/document"));

  return {
    caseId,
    phase,
    setPhase,
    form,
    setForm,
    updateField,
    stepIndex,
    setStepIndex,
    isLastStep,
    next,
    prev,
    error,
  };
}

import { useState } from "react";
import { createCase, type CaseType } from "@/shared/api/cases";

const emptyForm = {
  title: "",
  opponentName: "",
  caseType: "" as CaseType | "",
  claimAmount: "",
  court: "",
  caseNumber: "",
};

export type CreateCaseFormValues = typeof emptyForm;

export function useCreateCaseForm(onCreated: () => void, onClose: () => void) {
  const [values, setValues] = useState<CreateCaseFormValues>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const setValue = <K extends keyof CreateCaseFormValues>(key: K, value: CreateCaseFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const canSubmit = values.title.trim() !== "" && values.opponentName.trim() !== "" && !submitting;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      await createCase({
        title: values.title.trim(),
        opponentName: values.opponentName.trim(),
        caseType: values.caseType || undefined,
        claimAmount: values.claimAmount ? Number(values.claimAmount) : undefined,
        court: values.court.trim() || undefined,
        caseNumber: values.caseNumber.trim() || undefined,
      });
      onCreated();
      onClose();
    } catch {
      setError("사건 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setSubmitting(false);
    }
  };

  return { values, setValue, canSubmit, submitting, error, submit };
}

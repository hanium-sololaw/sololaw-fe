import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getCaseDetail } from "@/shared/api/cases";
import type { BriefForm } from "./types";

/** Fills only the empty form fields from the selected case and returns its title once loaded. */
export function useCaseAutofill(caseId: number | null, setForm: Dispatch<SetStateAction<BriefForm>>) {
  const [loadedCaseTitle, setLoadedCaseTitle] = useState<string | null>(null);

  useEffect(() => {
    if (caseId === null) return;
    let cancelled = false;

    getCaseDetail(caseId)
      .then((detail) => {
        if (cancelled) return;
        const partyName = (role: string) => detail.parties.find((party) => party.partyRole === role)?.name ?? "";
        setForm((prev) => ({
          ...prev,
          court: prev.court || detail.court || "",
          caseNo: prev.caseNo || detail.caseNumber || "",
          caseName: prev.caseName || detail.title || "",
          plaintiff: prev.plaintiff || partyName("PLAINTIFF"),
          defendant: prev.defendant || partyName("DEFENDANT"),
        }));
        setLoadedCaseTitle(detail.title);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [caseId, setForm]);

  return loadedCaseTitle;
}

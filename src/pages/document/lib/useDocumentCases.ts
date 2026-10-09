import { useCallback, useEffect, useState } from "react";
import { listMyCases, type Case } from "@/shared/api/cases";
import type { DocumentSource } from "../ui/home/DocumentHeader";

export function useDocumentCases(activeSource: DocumentSource) {
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  const loadCases = useCallback(
    () =>
      listMyCases()
        .then((result) => {
          setCases(result.content);
          return result.content;
        })
        .catch(() => {
          setCases([]);
          return [] as Case[];
        }),
    [],
  );

  useEffect(() => {
    if (activeSource !== "case") return;
    void loadCases().then((list) => setSelectedCaseId((prev) => prev ?? list[0]?.id ?? null));
  }, [activeSource, loadCases]);

  const selectNewlyCreatedCase = async () => {
    const knownIds = new Set(cases.map((item) => item.id));
    const list = await loadCases();
    const created = list.find((item) => !knownIds.has(item.id));
    if (created) setSelectedCaseId(created.id);
  };

  return {
    cases,
    selectedCaseId,
    selectedCase: cases.find((item) => item.id === selectedCaseId),
    setSelectedCaseId,
    selectNewlyCreatedCase,
  };
}

import { useEffect, useState } from "react";
import {
  calculateLitigationCost,
  type FilingMethod,
  type LitigationCostResult,
  type LitigationInstance,
} from "../shared/calculateLitigationCost";
export type CaseCategory = "single" | "collegiate";

const DEBOUNCE_MS = 400;

export function useCostCalculator() {
  const [claimAmount, setClaimAmount] = useState(0);
  const [caseCategory, setCaseCategory] = useState<CaseCategory>("single");
  const [instance, setInstance] = useState<LitigationInstance>("FIRST");
  const [plaintiffCount, setPlaintiffCount] = useState(1);
  const [defendantCount, setDefendantCount] = useState(1);
  const [filingMethod, setFilingMethod] = useState<FilingMethod>("ELECTRONIC");
  const [showAttorneyFee, setShowAttorneyFee] = useState(false);
  const [result, setResult] = useState<LitigationCostResult | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (claimAmount <= 0) {
        setResult(null);
        return;
      }
      calculateLitigationCost({ claimAmount, plaintiffCount, defendantCount, filingMethod, instance })
        .then(setResult)
        .catch(() => setResult(null));
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [claimAmount, plaintiffCount, defendantCount, filingMethod, instance]);

  return {
    claimAmount,
    setClaimAmount,
    caseCategory,
    setCaseCategory,
    instance,
    setInstance,
    plaintiffCount,
    setPlaintiffCount,
    defendantCount,
    setDefendantCount,
    isElectronic: filingMethod === "ELECTRONIC",
    toggleFilingMethod: () => setFilingMethod((prev) => (prev === "ELECTRONIC" ? "PAPER" : "ELECTRONIC")),
    showAttorneyFee,
    toggleAttorneyFee: () => setShowAttorneyFee((prev) => !prev),
    result,
  };
}

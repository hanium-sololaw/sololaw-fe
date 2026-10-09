import { useEffect, useState } from "react";
import { calculateLitigationCost, type LitigationCostResult } from "../../shared/calculateLitigationCost";

type FilingCosts = {
  electronicCost: LitigationCostResult | null;
  paperCost: LitigationCostResult | null;
};

const noCosts: FilingCosts = { electronicCost: null, paperCost: null };

export function useFilingCosts(claimValue: number, plaintiffCount: number, defendantCount: number): FilingCosts {
  const [costs, setCosts] = useState<FilingCosts>(noCosts);

  useEffect(() => {
    if (claimValue <= 0) return;
    let cancelled = false;
    const base = { claimAmount: claimValue, plaintiffCount, defendantCount, instance: "FIRST" as const };

    Promise.all([
      calculateLitigationCost({ ...base, filingMethod: "ELECTRONIC" }),
      calculateLitigationCost({ ...base, filingMethod: "PAPER" }),
    ])
      .then(([electronicCost, paperCost]) => !cancelled && setCosts({ electronicCost, paperCost }))
      .catch(() => !cancelled && setCosts(noCosts));

    return () => {
      cancelled = true;
    };
  }, [claimValue, plaintiffCount, defendantCount]);

  return costs;
}

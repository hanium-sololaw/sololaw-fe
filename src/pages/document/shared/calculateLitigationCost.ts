import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope } from "@/shared/api/types";

export type FilingMethod = "ELECTRONIC" | "PAPER";
export type LitigationInstance = "FIRST" | "APPEAL" | "SUPREME";

type CalculateCostRequest = {
  claimAmount: number;
  plaintiffCount: number;
  defendantCount: number;
  filingMethod: FilingMethod;
  instance: LitigationInstance;
};

export type LitigationCostResult = {
  claimAmount: number;
  isSmallClaim: boolean;
  isElectronicFiling: boolean;
  instance: LitigationInstance;
  stampFee: number;
  deliveryFee: number;
  totalCost: number;
  attorneyFeeCap: number;
  partyCount: number;
  deliveryCount: number;
  disclaimer: string;
};


/**
 * Calculates 인지대·송달료 (standalone — not tied to any saved case). POST
 * /api/litigation-costs/calculate.
 */
export async function calculateLitigationCost(request: CalculateCostRequest): Promise<LitigationCostResult> {
  const response = await apiClient<ApiEnvelope<LitigationCostResult>>("/api/litigation-costs/calculate", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response.data;
}

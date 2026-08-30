export type ComplaintTypeId = "loan" | "deposit" | "wage" | "damage" | "eviction";

export type LawsuitType =
  | "loan_return"
  | "deposit_return"
  | "wage_claim"
  | "damages"
  | "building_surrender";

export type ClaimType = "property" | "non_property";
export type ValuationType = "amount" | "land_value" | "uncalculable";
export type DemandMethod = "certified_mail" | "message" | "verbal" | "none";

export type Party = {
  id: string;
  name: string;
  address: string;
  residentId: string;
  serviceAddress: string;
  fax: string;
  representative: string;
};

export function emptyParty(): Party {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    address: "",
    residentId: "",
    serviceAddress: "",
    fax: "",
    representative: "",
  };
}

export type ComplaintForm = {
  // 1. 어느 법원에 얼마를 청구하나요
  court: string;
  claimType: ClaimType;
  valuationType: ValuationType;
  claimAmount: string;
  objectValue: string;
  // 2. 누가 누구에게 청구하나요
  plaintiffs: Party[];
  defendants: Party[];
  // 3~4. 유형별 사실관계
  situation: string;
  facts: Record<string, string>;
  causeText: string;
  // 5. 돌려받은 돈과 독촉 내용
  partialRepaid: boolean;
  demandMethod: DemandMethod;
  demandDate: string;
  responseText: string;
  // 6. 가지고 있는 자료
  attachments: string[];
};

export const emptyComplaintForm: ComplaintForm = {
  court: "",
  claimType: "property",
  valuationType: "amount",
  claimAmount: "",
  objectValue: "",
  plaintiffs: [emptyParty()],
  defendants: [emptyParty()],
  situation: "",
  facts: {},
  causeText: "",
  partialRepaid: false,
  demandMethod: "none",
  demandDate: "",
  responseText: "",
  attachments: [],
};

export type WizardStepId = "type" | "claim" | "party" | "facts" | "demand" | "attachments";

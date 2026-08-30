export type PetitionTypeId = "payment" | "aid" | "leasereg" | "enforcement" | "seizure";

export type ApplicationType =
  | "payment_order"
  | "litigation_aid"
  | "lease_registration"
  | "enforcement"
  | "provisional_seizure";

export type FactFieldKind = "text" | "date" | "money" | "select" | "checks";

export type FactField = {
  key: string;
  kind: FactFieldKind;
  options?: string[];
  placeholder?: string;
};

export type Party = {
  name: string;
  address: string;
  phone: string;
  email: string;
  residentId: string;
  representative: string;
  serviceAddress: string;
  fax: string;
};

export function emptyParty(): Party {
  return { name: "", address: "", phone: "", email: "", residentId: "", representative: "", serviceAddress: "", fax: "" };
}

export type CitedPrecedent = {
  id: string;
  caseNo: string;
  summary: string;
};

export function emptyCitedPrecedent(): CitedPrecedent {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, caseNo: "", summary: "" };
}

export type PetitionForm = {
  court: string;
  applicant: Party;
  respondent: Party;
  caseNo: string;
  caseName: string;
  claimAmount: string;
  facts: Record<string, string>;
  statement: Record<string, string>;
  narrative: string;
  attachments: string[];
  citedPrecedents: CitedPrecedent[];
};

export const emptyPetitionForm: PetitionForm = {
  court: "",
  applicant: emptyParty(),
  respondent: emptyParty(),
  caseNo: "",
  caseName: "",
  claimAmount: "",
  facts: {},
  statement: {},
  narrative: "",
  attachments: [],
  citedPrecedents: [],
};

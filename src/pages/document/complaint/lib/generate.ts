import { postSSE } from "@/shared/api/sse";
import { formatDate } from "@/shared/utils/formatDate";
import { toLines, toParagraphs } from "../../shared/text";
import { createDraftIfNeeded, saveResultIfNeeded } from "../../shared/persistGeneration";
import type { ComplaintDoc } from "./buildDoc";
import type { ComplaintType } from "./complaintTypes";
import type { ClaimType, ComplaintForm, DemandMethod, LawsuitType, Party, ValuationType } from "./types";

type ApiParty = {
  name: string;
  address: string;
  resident_id?: string;
  service_address?: string;
  fax?: string;
  representative?: string;
};

type GenerateRequest = {
  court: string;
  lawsuit_type: LawsuitType;
  claim_type: ClaimType;
  valuation_type: ValuationType;
  claim_amount?: number;
  object_value?: number;
  plaintiffs: ApiParty[];
  defendants: ApiParty[];
  facts: Record<string, string>;
  cause_text: string;
  partial_repaid: boolean;
  demand_method: DemandMethod;
  demand_date: string;
  response_text: string;
  attachments: string[];
  cited_precedents: { case_no: string; summary: string }[];
};

type GenerateSections = {
  case_name: string;
  object_value: string;
  parties: string;
  claim_purpose: string;
  claim_cause: string;
  evidence: string;
  attachments: string;
  court: string;
  annex: string;
};

type GenerateResponse = {
  sections: GenerateSections;
  raw_text: string;
};

function toApiParty(party: Party): ApiParty {
  const result: ApiParty = { name: party.name, address: party.address };
  if (party.residentId) result.resident_id = party.residentId;
  if (party.serviceAddress) result.service_address = party.serviceAddress;
  if (party.fax) result.fax = party.fax;
  if (party.representative) result.representative = party.representative;
  return result;
}

/** Calls the 소장 generation API and maps the response into the shape ComplaintPaper renders. */
export async function generateComplaint(
  type: ComplaintType,
  form: ComplaintForm,
  caseId: number | null,
  signal?: AbortSignal,
): Promise<ComplaintDoc> {
  const facts = { ...form.facts };
  if (form.situation) facts["자가진단 상황"] = form.situation;

  const body: GenerateRequest = {
    court: form.court,
    lawsuit_type: type.lawsuitType,
    claim_type: form.claimType,
    valuation_type: form.valuationType,
    claim_amount: form.claimAmount ? Number(form.claimAmount) : undefined,
    object_value: form.objectValue ? Number(form.objectValue) : undefined,
    plaintiffs: form.plaintiffs.map(toApiParty),
    defendants: form.defendants.map(toApiParty),
    facts,
    cause_text: form.causeText,
    partial_repaid: form.partialRepaid,
    demand_method: form.demandMethod,
    demand_date: form.demandDate,
    response_text: form.responseText,
    attachments: form.attachments,
    cited_precedents: [],
  };

  const documentId = await createDraftIfNeeded({ caseId, docType: "COMPLAINT", title: type.title, content: form });
  const { sections, raw_text } = await postSSE<GenerateResponse>(
    "/api/v1/documents/complaint/generate",
    body,
    undefined,
    signal,
  );
  await saveResultIfNeeded(documentId, raw_text, sections);

  return {
    caseName: sections.case_name,
    objectValue: sections.object_value,
    parties: toLines(sections.parties),
    claimPurpose: toLines(sections.claim_purpose),
    claimCause: toParagraphs(sections.claim_cause),
    evidence: toLines(sections.evidence),
    attachments: toLines(sections.attachments),
    court: sections.court,
    annex: sections.annex,
    date: formatDate(new Date()),
    plaintiffName: form.plaintiffs[0]?.name || "",
  };
}

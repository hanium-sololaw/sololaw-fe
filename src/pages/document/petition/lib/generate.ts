import { postSSE } from "@/shared/api/sse";
import { formatDate } from "@/shared/utils/formatDate";
import { toLines } from "../../shared/text";
import { createDraftIfNeeded, saveResultIfNeeded } from "../../shared/persistGeneration";
import type { PetitionDoc, PetitionSection } from "./buildDoc";
import type { PetitionType } from "./petitionTypes";
import type { ApplicationType, Party, PetitionForm } from "./types";

/** Section headings the API sends as separately-submitted documents, not part of the main petition body. */
const EXTRA_DOC_HEADINGS = new Set(["별지", "가압류신청 진술서"]);

type ApiParty = {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  resident_id?: string;
  representative?: string;
  service_address?: string;
  fax?: string;
};

type GenerateRequest = {
  application_type: ApplicationType;
  court: string;
  applicant: ApiParty;
  respondent?: ApiParty;
  case_no?: string;
  case_name?: string;
  claim_amount?: number;
  facts: Record<string, string>;
  narrative: string;
  attachments: string[];
  cited_precedents: { case_no: string; summary: string }[];
};

type GenerateResponse = {
  sections: Record<string, string>;
  raw_text: string;
};

function toApiParty(party: Party): ApiParty {
  const result: ApiParty = { name: party.name, address: party.address };
  if (party.phone) result.phone = party.phone;
  if (party.email) result.email = party.email;
  if (party.residentId) result.resident_id = party.residentId;
  if (party.representative) result.representative = party.representative;
  if (party.serviceAddress) result.service_address = party.serviceAddress;
  if (party.fax) result.fax = party.fax;
  return result;
}

/** Splits the API's ordered { heading: body } sections into the main body plus the optional separately-submitted document (별지 / 가압류신청 진술서). */
function splitSections(apiSections: Record<string, string>): { sections: PetitionSection[]; extraDoc: PetitionSection | null } {
  const sections: PetitionSection[] = [];
  let extraDoc: PetitionSection | null = null;
  for (const [heading, body] of Object.entries(apiSections)) {
    const section: PetitionSection = { heading, lines: toLines(body) };
    if (EXTRA_DOC_HEADINGS.has(heading)) extraDoc = section;
    else sections.push(section);
  }
  return { sections, extraDoc };
}

/** Calls the 신청서 generation API and maps the response into the shape PetitionPaper renders. */
export async function generatePetition(
  type: PetitionType,
  form: PetitionForm,
  caseId: number | null,
  signal?: AbortSignal,
): Promise<PetitionDoc> {
  const body: GenerateRequest = {
    application_type: type.applicationType,
    court: form.court,
    applicant: toApiParty(form.applicant),
    respondent: type.respondentLabel ? toApiParty(form.respondent) : undefined,
    case_no: type.hasCaseNo && form.caseNo ? form.caseNo : undefined,
    case_name: type.hasCaseName && form.caseName ? form.caseName : undefined,
    claim_amount: type.hasClaimAmount && form.claimAmount ? Number(form.claimAmount) : undefined,
    facts: { ...form.facts, ...form.statement },
    narrative: form.narrative,
    attachments: form.attachments,
    cited_precedents: form.citedPrecedents
      .filter((precedent) => precedent.caseNo && precedent.summary)
      .map((precedent) => ({ case_no: precedent.caseNo, summary: precedent.summary })),
  };

  const [documentId, { sections: apiSections, raw_text }] = await Promise.all([
    createDraftIfNeeded({
      caseId,
      docType: "APPLICATION",
      applicationSubtype: type.applicationType.toUpperCase(),
      title: type.title,
      content: form,
    }),
    postSSE<GenerateResponse>("/api/v1/documents/application/generate", body, undefined, signal),
  ]);
  await saveResultIfNeeded(documentId, raw_text, apiSections);
  const { sections, extraDoc } = splitSections(apiSections);

  return {
    title: type.title,
    sections,
    extraDoc,
    court: `${form.court || "[ 법원 ]"} 귀중`,
    date: formatDate(new Date()),
    applicantName: form.applicant.name,
  };
}

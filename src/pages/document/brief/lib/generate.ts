import { postSSE } from "@/shared/api/sse";
import { formatDate } from "@/shared/utils/formatDate";
import { toLines, toParagraphs } from "../../shared/text";
import { createDraftIfNeeded, saveResultIfNeeded } from "../../shared/persistGeneration";
import type { BriefDoc } from "./buildDoc";
import type { BriefForm, SubmitterRole } from "./types";

type ApiRebuttalPoint = {
  claim: string;
  rebuttal: string;
  evidence_ref?: string;
  precedent_ref?: string;
};

type ApiCitedPrecedent = {
  case_no: string;
  summary: string;
};

type GenerateRequest = {
  court: string;
  panel?: string;
  case_no: string;
  case_name?: string;
  plaintiff: string;
  defendant: string;
  submitter_role: SubmitterRole;
  brief_no?: string;
  stage?: string;
  hearing_date?: string;
  agent?: string;
  opponent_doc_type?: string;
  opponent_doc_date?: string;
  opponent_claim: string;
  defenses: string[];
  undisputed_facts?: string;
  evidence_start_no: number;
  new_evidence: string[];
  cited_precedents: ApiCitedPrecedent[];
  rebuttal_points: ApiRebuttalPoint[];
  my_argument?: string;
};

type GenerateSections = {
  title: string;
  case_info: string;
  opponent_summary: string;
  rebuttal: string;
  related_law: string;
  conclusion: string;
  evidence: string;
  attachments: string;
  court: string;
};

type GenerateResponse = {
  sections: GenerateSections;
  raw_text: string;
};

function toApiRebuttalPoint(point: BriefForm["rebuttalPoints"][number]): ApiRebuttalPoint {
  const result: ApiRebuttalPoint = { claim: point.claim, rebuttal: point.rebuttal };
  if (point.evidenceRef) result.evidence_ref = point.evidenceRef;
  if (point.precedentRef) result.precedent_ref = point.precedentRef;
  return result;
}

/** Calls the 준비서면 generation API and maps the response into the shape BriefPaper renders. */
export async function generateBrief(form: BriefForm, caseId: number | null, signal?: AbortSignal): Promise<BriefDoc> {
  const body: GenerateRequest = {
    court: form.court,
    panel: form.panel || undefined,
    case_no: form.caseNo,
    case_name: form.caseName || undefined,
    plaintiff: form.plaintiff,
    defendant: form.defendant,
    submitter_role: form.submitterRole,
    brief_no: form.briefNo || undefined,
    stage: form.stage || undefined,
    hearing_date: form.hearingDate || undefined,
    agent: form.agent || undefined,
    opponent_doc_type: form.opponentDocType || undefined,
    opponent_doc_date: form.opponentDocDate || undefined,
    opponent_claim: form.opponentClaim,
    defenses: form.defenses,
    undisputed_facts: form.undisputedFacts || undefined,
    evidence_start_no: Number(form.evidenceStartNo) || 1,
    new_evidence: form.newEvidence,
    cited_precedents: form.citedPrecedents
      .filter((precedent) => precedent.caseNo && precedent.summary)
      .map((precedent) => ({ case_no: precedent.caseNo, summary: precedent.summary })),
    rebuttal_points: form.rebuttalPoints
      .filter((point) => point.claim || point.rebuttal)
      .map(toApiRebuttalPoint),
    my_argument: form.myArgument || undefined,
  };

  const documentId = await createDraftIfNeeded({
    caseId,
    docType: "BRIEF",
    title: form.caseName || `${form.plaintiff} v ${form.defendant} 준비서면`,
    content: form,
  });
  const { sections, raw_text } = await postSSE<GenerateResponse>(
    "/api/v1/documents/brief/generate",
    body,
    undefined,
    signal,
  );
  await saveResultIfNeeded(documentId, raw_text, sections);

  return {
    title: sections.title,
    caseInfo: toLines(sections.case_info),
    opponentSummary: toParagraphs(sections.opponent_summary),
    rebuttal: toParagraphs(sections.rebuttal),
    relatedLaw: toLines(sections.related_law),
    conclusion: toParagraphs(sections.conclusion),
    evidence: toLines(sections.evidence),
    attachments: toLines(sections.attachments),
    court: sections.court,
    date: formatDate(new Date()),
    submitterName: form.submitterRole === "plaintiff" ? form.plaintiff : form.defendant,
  };
}

import { postSSE } from "@/shared/api/sse";
import { toLines } from "../../shared/text";
import { createDraftIfNeeded, saveResultIfNeeded } from "../../shared/persistGeneration";
import type { EvidenceListDoc, EvidenceRow } from "./buildDoc";
import type { EvidenceItem, EvidenceListForm, EvidenceSubmitterRole, OriginalType } from "./types";

type ApiEvidenceItem = {
  name: string;
  author?: string;
  date?: string;
  purpose?: string;
  original_type: OriginalType;
  branch_no?: string;
  note?: string;
};

type GenerateRequest = {
  court: string;
  panel?: string;
  case_no: string;
  plaintiff: string;
  defendant: string;
  submitter_role: EvidenceSubmitterRole;
  evidence_start_no: number;
  evidence_items: ApiEvidenceItem[];
};

type GenerateSections = {
  title: string;
  case_info: string;
  evidence_table: string;
  note: string;
  court: string;
};

type GenerateResponse = {
  sections: GenerateSections;
  raw_text: string;
};

function toApiEvidenceItem(item: EvidenceItem): ApiEvidenceItem {
  const result: ApiEvidenceItem = { name: item.name, original_type: item.originalType };
  if (item.author) result.author = item.author;
  if (item.date) result.date = item.date;
  if (item.purpose) result.purpose = item.purpose;
  if (item.branchNo) result.branch_no = item.branchNo;
  if (item.note) result.note = item.note;
  return result;
}

/** Parses the `| a | b | ... |` markdown table the API returns into row objects for EvidenceListPaper. */
function parseEvidenceTable(markdown: string): EvidenceRow[] {
  const lines = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|") && !/^\|[\s-:|]+\|$/.test(line));
  return lines.slice(1).map((line) => {
    const [no, name, purpose, originalLabel, author, date] = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    return { no, name, purpose, originalLabel, author, date };
  });
}

/** Calls the 증거목록 generation API and maps the response into the shape EvidenceListPaper renders. */
export async function generateEvidenceList(
  form: EvidenceListForm,
  caseId: number | null,
  signal?: AbortSignal,
): Promise<EvidenceListDoc> {
  const body: GenerateRequest = {
    court: form.court,
    panel: form.panel || undefined,
    case_no: form.caseNo,
    plaintiff: form.plaintiff,
    defendant: form.defendant,
    submitter_role: form.submitterRole,
    evidence_start_no: Number(form.evidenceStartNo) || 1,
    evidence_items: form.items.filter((item) => item.name.trim()).map(toApiEvidenceItem),
  };

  const [documentId, { sections, raw_text }] = await Promise.all([
    createDraftIfNeeded({
      caseId,
      docType: "EVIDENCE_LIST",
      title: form.caseNo ? `${form.caseNo} 증거목록` : "증거목록",
      content: form,
    }),
    postSSE<GenerateResponse>("/api/v1/documents/evidence-list/generate", body, undefined, signal),
  ]);
  await saveResultIfNeeded(documentId, raw_text, sections);

  return {
    title: sections.title,
    caseInfo: toLines(sections.case_info),
    rows: parseEvidenceTable(sections.evidence_table),
    evidenceTable: sections.evidence_table,
    note: toLines(sections.note),
    court: sections.court,
  };
}

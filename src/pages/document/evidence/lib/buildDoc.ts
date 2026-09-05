import type { EvidenceItem, EvidenceListForm, EvidenceSubmitterRole } from "./types";

export type EvidenceRow = {
  no: string;
  name: string;
  purpose: string;
  originalLabel: string;
  author: string;
  date: string;
};

export type EvidenceListDoc = {
  title: string;
  caseInfo: string[];
  rows: EvidenceRow[];
  evidenceTable: string;
  note: string[];
  court: string;
};

export const PREFIX: Record<EvidenceSubmitterRole, string> = { plaintiff: "갑", defendant: "을", intervenor: "병" };
const SUBMITTER_LABEL: Record<EvidenceSubmitterRole, string> = { plaintiff: "원고", defendant: "피고", intervenor: "참가인" };

const fmtDate = (value: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
};

export function evidenceNoLabel(prefix: string, startNo: number, index: number, item: EvidenceItem): string {
  const branch = item.branchNo.trim();
  return `${prefix} 제${startNo + index}호증${branch ? `의 ${branch}` : ""}`;
}

export function buildEvidenceListDoc(form: EvidenceListForm): EvidenceListDoc {
  const prefix = PREFIX[form.submitterRole];
  const submitterLabel = SUBMITTER_LABEL[form.submitterRole];
  const startNo = Number(form.evidenceStartNo) || 1;
  const items = form.items.filter((item) => item.name.trim());

  const rows: EvidenceRow[] = items.map((item, index) => ({
    no: evidenceNoLabel(prefix, startNo, index, item),
    name: item.name,
    purpose: item.purpose.trim() || "[입증취지 기재 필요]",
    originalLabel: item.originalType === "original" ? "원본" : "사본",
    author: item.author.trim() || "[작성자 기재 필요]",
    date: item.date ? fmtDate(item.date) : "[작성일 기재 필요]",
  }));

  const tableLines = [
    "| 호증번호 | 서증명 | 입증취지 | 원본 | 작성자 | 작성일 |",
    "|---|---|---|---|---|---|",
    ...rows.map((row) => `| ${row.no} | ${row.name} | ${row.purpose} | ${row.originalLabel} | ${row.author} | ${row.date} |`),
  ];

  const note = ["※ 각 호증은 원본을 소지하고 있으며, 필요 시 법원에 제출하겠습니다."];
  items.forEach((item, index) => {
    if (item.note.trim()) note.push(`※ ${evidenceNoLabel(prefix, startNo, index, item)}에는 ${item.note.trim()}`);
  });

  return {
    title: `${submitterLabel} 제출 ${prefix}호증`,
    caseInfo: [
      `사      건   ${form.caseNo || "[ 사건번호 ]"}`,
      `원      고   ${form.plaintiff || "[ 원고 ]"}`,
      `피      고   ${form.defendant || "[ 피고 ]"}`,
    ],
    rows,
    evidenceTable: tableLines.join("\n"),
    note,
    court: `${form.court || "[ 법원 ]"}${form.panel ? ` ${form.panel}` : ""} 귀중`,
  };
}

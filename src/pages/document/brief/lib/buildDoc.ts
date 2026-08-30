import type { BriefForm } from "./types";

export type BriefDoc = {
  title: string;
  caseInfo: string[];
  opponentSummary: string[];
  rebuttal: string[];
  relatedLaw: string[];
  conclusion: string[];
  evidence: string[];
  attachments: string[];
  court: string;
  date: string;
  submitterName: string;
};

const ORDINALS = ["가", "나", "다", "라", "마", "바", "사", "아", "자", "차"];

const fmtDateKorean = (value: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

export function buildBriefDoc(form: BriefForm): BriefDoc {
  const submitterLabel = form.submitterRole === "plaintiff" ? "원고" : "피고";
  const opponentLabel = form.submitterRole === "plaintiff" ? "피고" : "원고";
  const prefix = form.submitterRole === "plaintiff" ? "갑" : "을";
  const startNo = Number(form.evidenceStartNo) || 1;

  const caseInfo = [
    `사      건   ${form.caseNo || "[ 사건번호 ]"}${form.caseName ? `  ${form.caseName}` : ""}`,
    `원      고   ${form.plaintiff || "[ 원고 ]"}`,
    `피      고   ${form.defendant || "[ 피고 ]"}`,
    ...(form.agent ? [`${submitterLabel} 소송대리인   ${form.agent}`] : []),
  ];

  const opponentSummary: string[] = [];
  if (form.opponentDocType || form.opponentDocDate) {
    const dateLabel = form.opponentDocDate ? `${fmtDateKorean(form.opponentDocDate)}자 ` : "";
    opponentSummary.push(`${opponentLabel}는 ${dateLabel}${form.opponentDocType || "서면"}에서 다음과 같이 주장합니다.`);
  }
  opponentSummary.push(form.opponentClaim || "[ 상대방 주장을 입력하면 이 자리에 정리됩니다 ]");
  if (form.defenses.length > 0) opponentSummary.push(`이는 ${form.defenses.join(", ")}에 해당합니다.`);
  if (form.undisputedFacts) opponentSummary.push(`다만 ${form.undisputedFacts} 이 점은 당사자 사이에 다툼이 없습니다.`);

  const filledPoints = form.rebuttalPoints.filter((point) => point.claim || point.rebuttal);
  const rebuttal =
    filledPoints.length > 0
      ? filledPoints.map((point, index) => {
          const label = ORDINALS[index] ?? String(index + 1);
          const lines = [
            `${label}. 쟁점 ${index + 1} — ${point.claim || "[ 상대방 주장 ]"}.`,
            `    ${point.rebuttal || "[ 반박 내용을 입력하면 이 자리에 정리됩니다 ]"}`,
          ];
          if (point.evidenceRef) lines.push(`    (근거 : ${point.evidenceRef})`);
          return lines.join("\n");
        })
      : ["[ 반박 포인트를 추가하면 이 자리에 정리됩니다 ]"];

  const relatedLaw =
    form.citedPrecedents.length > 0
      ? form.citedPrecedents.map((precedent, index) => `${index + 1}. ${precedent.caseNo} — ${precedent.summary}`)
      : ["해당 없음"];

  const conclusion = [
    form.myArgument ||
      `이상과 같은 이유로 ${submitterLabel}의 주장은 이유 있으므로, 귀 재판부에서 이를 받아들여 주시기 바랍니다.`,
  ];

  const evidence = form.newEvidence.map((name, index) => `${index + 1}. ${prefix} 제${startNo + index}호증  ${name}`);

  return {
    title: form.briefNo || "준비서면",
    caseInfo,
    opponentSummary,
    rebuttal,
    relatedLaw,
    conclusion,
    evidence,
    attachments: ["준비서면 부본 1부"],
    court: `${form.court || "[ 법원 ]"}${form.panel ? ` ${form.panel}` : ""} 귀중`,
    date: new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date()),
    submitterName: form.submitterRole === "plaintiff" ? form.plaintiff : form.defendant,
  };
}

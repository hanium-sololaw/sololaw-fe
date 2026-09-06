export type SubmitterRole = "plaintiff" | "defendant";

export type RebuttalPoint = {
  id: string;
  claim: string;
  rebuttal: string;
  evidenceRef: string;
  precedentRef: string;
};

export function emptyRebuttalPoint(): RebuttalPoint {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    claim: "",
    rebuttal: "",
    evidenceRef: "",
    precedentRef: "",
  };
}

export type CitedPrecedent = {
  id: string;
  caseNo: string;
  summary: string;
};

export function emptyCitedPrecedent(): CitedPrecedent {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, caseNo: "", summary: "" };
}

export type BriefForm = {
  // 1. 어떤 사건의 준비서면인가요
  court: string;
  panel: string;
  caseNo: string;
  caseName: string;
  plaintiff: string;
  defendant: string;
  submitterRole: SubmitterRole;
  briefNo: string;
  stage: string;
  hearingDate: string;
  agent: string;
  // 2. 상대방은 뭐라고 했나요
  opponentDocType: string;
  opponentDocDate: string;
  opponentClaim: string;
  defenses: string[];
  undisputedFacts: string;
  // 3. 증거·판례 첨부
  evidenceStartNo: string;
  newEvidence: string[];
  citedPrecedents: CitedPrecedent[];
  // 4. 어떤 부분을 반박하나요
  rebuttalPoints: RebuttalPoint[];
  myArgument: string;
};

export const emptyBriefForm: BriefForm = {
  court: "",
  panel: "",
  caseNo: "",
  caseName: "",
  plaintiff: "",
  defendant: "",
  submitterRole: "plaintiff",
  briefNo: "",
  stage: "",
  hearingDate: "",
  agent: "",
  opponentDocType: "",
  opponentDocDate: "",
  opponentClaim: "",
  defenses: [],
  undisputedFacts: "",
  evidenceStartNo: "1",
  newEvidence: [],
  citedPrecedents: [],
  rebuttalPoints: [emptyRebuttalPoint()],
  myArgument: "",
};

export const DEFENSE_OPTIONS = [
  "전부 부인",
  "변제 항변",
  "소멸시효 항변",
  "상계 항변",
  "공제 주장 (원상회복비 등)",
  "동시이행 항변",
  "과실상계 주장",
];

export const STAGE_OPTIONS = [
  "상대방 답변서를 받았어요",
  "상대방 준비서면을 받았어요",
  "변론기일이 잡혔어요",
  "이미 변론이 진행 중이에요",
];

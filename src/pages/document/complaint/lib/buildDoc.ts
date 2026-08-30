import { won } from "./cost";
import type { ComplaintType } from "./complaintTypes";
import type { ComplaintForm, Party } from "./types";

export type ComplaintDoc = {
  caseName: string;
  objectValue: string;
  parties: string[];
  claimPurpose: string[];
  claimCause: string[];
  evidence: string[];
  attachments: string[];
  court: string;
  annex: string;
  date: string;
  plaintiffName: string;
};

const fmtDate = (value: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
};

const addDays = (value: string, days: number) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  return fmtDate(d.toISOString().slice(0, 10));
};

function partyLines(label: string, parties: Party[]): string[] {
  return parties.flatMap((party, index) => {
    const prefix = parties.length > 1 ? `${label}    ${index + 1}.` : `${label}         `;
    const nameAndRep = party.representative ? `${party.name || `[ ${label} 이름 ]`} / ${party.representative}` : party.name || `[ ${label} 이름 ]`;
    const lines = [`${prefix} ${nameAndRep}`, `             ${party.address || `[ ${label} 주소 ]`}`];
    if (party.serviceAddress) lines.push(`             송달장소: ${party.serviceAddress}`);
    if (party.fax) lines.push(`             팩스: ${party.fax}`);
    return lines;
  });
}

/** 약정이자 텍스트에서 "연 N%" 형태의 비율을 뽑아낸다. 없으면 null. */
function agreedRatePercent(text: string): number | null {
  const match = /연\s*(\d+(?:\.\d+)?)\s*%/.exec(text);
  return match ? Number(match[1]) : null;
}

function twoTierInterestClause(startLabel: string, agreedRate: number | null): string {
  const firstRate = agreedRate ?? 5;
  return `${startLabel}부터 이 사건 소장 부본 송달일까지는 연 ${firstRate}%의, 그 다음 날부터 다 갚는 날까지는 연 12%의 각 비율로 계산한 돈`;
}

function claimPurposeFor(type: ComplaintType, form: ComplaintForm, amountLabel: string): string[] {
  const facts = form.facts;
  const serviceDayLabel = "이 사건 소장 부본 송달 다음날";

  switch (type.id) {
    case "loan": {
      const dueDate = facts["변제기"];
      const startLabel = /^\d{4}-\d{2}-\d{2}$/.test(dueDate || "") ? addDays(dueDate, 1) : serviceDayLabel;
      const clause = twoTierInterestClause(startLabel, agreedRatePercent(facts["이자 약정"] || ""));
      return [
        `1. 피고는 원고에게 ${amountLabel} 및 이에 대한 ${clause}을 지급하라.`,
        "2. 소송비용은 피고가 부담한다.",
        "라는 판결을 구합니다.",
      ];
    }
    case "deposit": {
      const handoverDate = facts["인도(이사 완료)일"];
      const startLabel = /^\d{4}-\d{2}-\d{2}$/.test(handoverDate || "") ? fmtDate(handoverDate) : serviceDayLabel;
      const clause = twoTierInterestClause(startLabel, null);
      return [
        `1. 피고는 원고에게 ${amountLabel} 및 이에 대한 ${clause}을 지급하라.`,
        "2. 소송비용은 피고가 부담한다.",
        "라는 판결을 구합니다.",
      ];
    }
    case "wage": {
      const resignDate = facts["퇴직일"];
      const startLabel = /^\d{4}-\d{2}-\d{2}$/.test(resignDate || "") ? addDays(resignDate, 14) : serviceDayLabel;
      return [
        `1. 피고는 원고에게 ${amountLabel} 및 이에 대한 ${startLabel}부터 다 갚는 날까지 연 20%의 비율로 계산한 돈을 지급하라.`,
        "2. 소송비용은 피고가 부담한다.",
        "라는 판결을 구합니다.",
      ];
    }
    case "damage": {
      const incidentDate = facts["사고(불법행위) 발생일"];
      const startLabel = /^\d{4}-\d{2}-\d{2}$/.test(incidentDate || "") ? fmtDate(incidentDate) : serviceDayLabel;
      const clause = twoTierInterestClause(startLabel, null);
      return [
        `1. 피고는 원고에게 ${amountLabel} 및 이에 대한 ${clause}을 지급하라.`,
        "2. 소송비용은 피고가 부담한다.",
        "라는 판결을 구합니다.",
      ];
    }
    case "eviction": {
      const unpaidMonths = facts["밀린 관리비·공과금"] || facts["월세"];
      const lines = ["1. 피고는 원고에게 별지 목록 기재 부동산을 인도하라."];
      if (unpaidMonths) {
        lines.push(
          `2. 피고는 원고에게 ${amountLabel} 및 이에 대한 ${serviceDayLabel}부터 다 갚는 날까지 연 12%의 비율로 계산한 돈을 지급하라.`,
          "3. 소송비용은 피고가 부담한다.",
        );
      } else {
        lines.push("2. 소송비용은 피고가 부담한다.");
      }
      lines.push("라는 판결을 구합니다.");
      return lines;
    }
    default:
      return [`1. 피고는 원고에게 ${amountLabel}을 지급하라.`, "2. 소송비용은 피고가 부담한다.", "라는 판결을 구합니다."];
  }
}

function situationOpening(type: ComplaintType, form: ComplaintForm): string {
  const situation = form.situation;
  if (type.id === "eviction") {
    return situation
      ? `원고는 피고에게 임대차 관계 종료를 이유로 목적물 인도를 요구하였으나, 피고는 "${situation}"는 사정 속에서도 부동산을 비워주지 않고 있습니다.`
      : "피고는 부동산을 비워주지 않고 있습니다.";
  }
  return situation
    ? `원고는 피고에게 반환을 요구하였으나, 현재 "${situation}"는 상황입니다.`
    : "원고는 피고에게 여러 차례 이행을 요구하였습니다.";
}

export function buildComplaintDoc(type: ComplaintType, form: ComplaintForm): ComplaintDoc {
  const amountValue = Number(form.claimAmount) || 0;
  const amountLabel = amountValue > 0 ? `금 ${won(amountValue)}원` : "[ 청구 금액 ]";
  const objectValueLabel =
    form.valuationType === "uncalculable"
      ? "소가 산출 불가"
      : `금 ${won(Number(form.objectValue || form.claimAmount) || 0)}원`;

  const parties = [...partyLines("원고", form.plaintiffs), ...partyLines("피고", form.defendants)];

  const claimCause = [situationOpening(type, form), form.causeText || "[ 사실관계를 입력하면 이 자리에 정리됩니다 ]"];

  const evidence = form.attachments.map((name, index) => `1. 갑 제${index + 1}호증  ${name}`);

  return {
    caseName: `${type.shortTitle} 청구의 소`,
    objectValue: objectValueLabel,
    parties,
    claimPurpose: claimPurposeFor(type, form, amountLabel),
    claimCause,
    evidence,
    attachments: ["소장 부본 1부", "송달료 납부서 1부"],
    court: form.court || "[ 법원 ]",
    annex: type.id === "eviction" ? form.facts["부동산의 표시"] || "[ 부동산의 표시 기재 필요 ]" : "해당 없음",
    date: new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date()),
    plaintiffName: form.plaintiffs[0]?.name || "",
  };
}

import { won } from "../../complaint/lib/cost";
import type { PetitionType } from "./petitionTypes";
import type { Party, PetitionForm } from "./types";

export type PetitionSection = {
  heading: string;
  lines: string[];
};

export type PetitionDoc = {
  title: string;
  sections: PetitionSection[];
  extraDoc: PetitionSection | null;
  court: string;
  date: string;
  applicantName: string;
};

function partyLines(label: string, party: Party): string[] {
  const nameLine = party.representative ? `${party.name || `[ ${label} 이름 ]`} / ${party.representative}` : party.name || `[ ${label} 이름 ]`;
  const lines = [`${label}         ${nameLine}`, `             ${party.address || `[ ${label} 주소 ]`}`];
  if (party.phone) lines.push(`             전화 ${party.phone}`);
  if (party.serviceAddress) lines.push(`             송달장소: ${party.serviceAddress}`);
  if (party.fax) lines.push(`             팩스: ${party.fax}`);
  return lines;
}

function factLines(facts: Record<string, string>, keys: string[]): string[] {
  return keys.map((key) => `${key} : ${facts[key] || `[ ${key} 기재 필요 ]`}`);
}

export function buildPetitionDoc(type: PetitionType, form: PetitionForm): PetitionDoc {
  const amountValue = Number(form.claimAmount) || 0;
  const amountLabel = amountValue > 0 ? `금 ${won(amountValue)}원` : "[ 청구 금액 ]";
  const facts = form.facts;
  const narrativeLines = [form.narrative || "[ 신청 사유를 입력하면 이 자리에 정리됩니다 ]"];

  const partySection: PetitionSection = {
    heading: "당사자",
    lines: [
      ...partyLines(type.applicantLabel, form.applicant),
      ...(type.respondentLabel ? partyLines(type.respondentLabel, form.respondent) : []),
    ],
  };

  const sections: PetitionSection[] = [partySection];
  let extraDoc: PetitionSection | null = null;

  switch (type.id) {
    case "payment": {
      const interest = facts["이자·지연손해금"] === "청구함";
      sections.push(
        { heading: "청구 종류", lines: factLines(facts, ["청구 종류", "채권 발생일", "변제기", "이자·지연손해금"]) },
        {
          heading: "신청취지",
          lines: [
            `채무자는 채권자에게 ${amountLabel}${interest ? " 및 이 사건 지급명령정본 송달 다음날부터 다 갚는 날까지 연 12%의 비율로 계산한 돈" : ""}을 지급하라는 지급명령을 구합니다.`,
          ],
        },
        { heading: "신청이유", lines: narrativeLines },
      );
      break;
    }
    case "aid": {
      sections[0] = {
        heading: "사건",
        lines: [
          `사건번호 : ${form.caseNo || "소 제기 전"}`,
          ...(form.caseName ? [`사건명 : ${form.caseName}`] : []),
        ],
      };
      sections.push(
        { heading: "당사자", lines: partyLines(type.applicantLabel, form.applicant) },
        { heading: "신청취지", lines: ["신청인에 대하여 이 사건 소송에 관한 인지대·송달료 소송구조를 허가한다는 결정을 구합니다."] },
        {
          heading: "신청이유",
          lines: [
            ...factLines(facts, [
              "지금 어느 단계",
              "구조받을 비용",
              "해당 사항",
              "월 평균 소득",
              "부양가족 수",
              "보유 재산",
              "채무 총액",
              "주거 형태",
            ]),
            ...narrativeLines,
          ],
        },
      );
      break;
    }
    case "leasereg": {
      sections.push(
        { heading: "신청취지", lines: ["별지 목록 기재 부동산에 관하여 임차권등기명령을 구합니다."] },
        { heading: "신청이유", lines: narrativeLines },
        {
          heading: "관련 법리",
          lines:
            form.citedPrecedents.length > 0
              ? form.citedPrecedents.map((p, i) => `${i + 1}. ${p.caseNo} — ${p.summary}`)
              : ["해당 없음"],
        },
        { heading: "첨부서류", lines: form.attachments.map((name, i) => `${i + 1}. ${name}`) },
      );
      extraDoc = { heading: "별지 — 부동산의 표시", lines: [facts["부동산의 표시"] || "[ 부동산의 표시 기재 필요 ]"] };
      break;
    }
    case "enforcement": {
      sections.push(
        { heading: "집행권원", lines: factLines(facts, ["집행권원 종류", "확정일", "집행문"]) },
        { heading: "집행목적물", lines: [facts["집행할 목적물"] || "[ 집행할 목적물 기재 필요 ]"] },
        { heading: "청구금액", lines: [amountLabel] },
        {
          heading: "신청취지",
          lines: [`위 집행권원에 기하여 ${facts["집행 방법"] || "[ 집행 방법 ]"}의 방법으로 강제집행을 실시한다는 결정을 구합니다.`],
        },
      );
      break;
    }
    case "seizure": {
      sections.push(
        {
          heading: "청구채권의 표시",
          lines: [...factLines(facts, ["채권 발생일", "청구채권 종류"]), `청구금액 : ${amountLabel}`],
        },
        { heading: "가압류할 목적물의 표시", lines: [facts["가압류할 목적물"] || "[ 가압류할 목적물 기재 필요 ]"] },
        { heading: "신청취지", lines: ["채무자 소유의 별지 목록 기재 재산은 이를 가압류한다는 결정을 구합니다."] },
        { heading: "신청이유", lines: narrativeLines },
      );
      const statementKeys = type.statementFields.map((f) => f.key);
      extraDoc = {
        heading: "가압류신청 진술서",
        lines: [
          "이 진술서를 허위로 작성한 경우 보정할 기회 없이 신청이 기각되거나 소송비용 부담, 손해배상 책임을 질 수 있습니다.",
          ...factLines(form.statement, statementKeys),
        ],
      };
      break;
    }
  }

  return {
    title: type.title,
    sections,
    extraDoc,
    court: `${form.court || "[ 법원 ]"} 귀중`,
    date: new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date()),
    applicantName: form.applicant.name,
  };
}

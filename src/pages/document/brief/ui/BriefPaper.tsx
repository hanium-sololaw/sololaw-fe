import PaperContainer from "../../shared/PaperContainer";
import PaperSectionTitle from "../../shared/PaperSectionTitle";
import type { BriefDoc } from "../lib/buildDoc";

type BriefPaperProps = {
  doc: BriefDoc;
};

export default function BriefPaper({ doc }: BriefPaperProps) {
  return (
    <PaperContainer>
      <p className="text-center text-xl font-bold tracking-[0.4em] text-gray-900">{doc.title}</p>

      <div className="mt-6 space-y-0.5 whitespace-pre-wrap">
        {doc.caseInfo.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <PaperSectionTitle>1. 상대방 주장의 요지</PaperSectionTitle>
      {doc.opponentSummary.map((line, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}

      <PaperSectionTitle>2. 반 박</PaperSectionTitle>
      {doc.rebuttal.map((line, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}

      <PaperSectionTitle>3. 관련 법리</PaperSectionTitle>
      {doc.relatedLaw.map((line, index) => (
        <p key={index}>{line}</p>
      ))}

      <PaperSectionTitle>4. 결 론</PaperSectionTitle>
      {doc.conclusion.map((line, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}

      <PaperSectionTitle>입 증 방 법</PaperSectionTitle>
      {doc.evidence.length === 0 ? (
        <p className="text-gray-400">[ 함께 낼 증거를 추가하면 이 자리에 나열됩니다 ]</p>
      ) : (
        doc.evidence.map((line, index) => <p key={index}>{line}</p>)
      )}

      <PaperSectionTitle>첨 부 서 류</PaperSectionTitle>
      {doc.attachments.map((line, index) => (
        <p key={index}>1. {line}</p>
      ))}

      <p className="mt-6 text-center">{doc.date}</p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <span>제출자</span>
        <span className="min-w-[7rem] border-b border-gray-300 pb-0.5 text-center">
          {doc.submitterName ? <b className="font-semibold text-blue-500">{doc.submitterName}</b> : <span className="text-gray-300">[ 이름 ]</span>}
        </span>
        <span className="shrink-0">(인)</span>
      </div>
      <p className="mt-5 text-center font-semibold tracking-[0.15em]">
        <b className="text-blue-500">{doc.court}</b>
      </p>
    </PaperContainer>
  );
}

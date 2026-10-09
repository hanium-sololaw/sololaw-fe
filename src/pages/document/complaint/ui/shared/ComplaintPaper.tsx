import type { ReactNode } from "react";
import type { ComplaintDoc } from "../../lib/buildDoc";

type ComplaintPaperProps = {
  doc: ComplaintDoc;
};

const HIGHLIGHT = /(\d{4}\. ?\d{1,2}\. ?\d{1,2}\.?|\d[\d,]*원|연 ?\d+(?:\.\d+)?%)/g;

const Value = ({ children }: { children: ReactNode }) => (
  <b className="font-semibold text-blue-500">{children}</b>
);

function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(HIGHLIGHT).map((part, index) => (index % 2 === 1 ? <Value key={index}>{part}</Value> : part))}
    </>
  );
}

const Heading = ({ children }: { children: ReactNode }) => (
  <p className="pt-5 text-center text-[15px] leading-[30px] font-bold tracking-[0.35em] text-gray-900">{children}</p>
);

export default function ComplaintPaper({ doc }: ComplaintPaperProps) {
  return (
    <div className="font-serif text-[11px] leading-[22px] font-medium text-gray-800">
      <p className="text-center text-xl leading-7 font-bold tracking-[0.4em] text-gray-900">소 장</p>

      <div className="pt-4">
        {doc.parties.map((line, index) => (
          <p key={index} className="whitespace-pre-wrap">
            <Value>{line}</Value>
          </p>
        ))}
      </div>

      <p className="pt-6">
        <Value>{doc.caseName}</Value>
      </p>
      <p className="mt-[22px]">
        소송목적의 값&emsp;&emsp;<Value>{doc.objectValue}</Value>
      </p>

      <Heading>청 구 취 지</Heading>
      <div className="pt-2">
        {doc.claimPurpose.map((line, index) => (
          <p key={index}>
            <Highlighted text={line} />
          </p>
        ))}
      </div>

      <Heading>청 구 원 인</Heading>
      <div className="pt-2">
        {doc.claimCause.map((line, index) => (
          <p key={index} className="whitespace-pre-wrap">
            <Highlighted text={line} />
          </p>
        ))}
      </div>

      <Heading>입 증 방 법</Heading>
      <div className="pt-2">
        {doc.evidence.length === 0 ? (
          <p className="text-gray-400">[ 가지고 있는 자료를 체크하면 이 자리에 나열됩니다 ]</p>
        ) : (
          doc.evidence.map((line, index) => <p key={index}>{line}</p>)
        )}
      </div>

      <Heading>첨 부 서 류</Heading>
      <div className="pt-2">
        {doc.attachments.map((line, index) => (
          <p key={index}>1. {line}</p>
        ))}
      </div>

      <p className="pt-6 text-center">{doc.date}</p>
      <div className="flex items-center justify-end gap-2 pt-3">
        <span>위 원고</span>
        <span className="min-w-28 border-b border-gray-300 pb-[3px] text-center">
          {doc.plaintiffName ? <Value>{doc.plaintiffName}</Value> : <span className="text-gray-300">[ 이름 ]</span>}
        </span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-dashed border-gray-300 text-center text-[9px] leading-[11.25px] text-gray-400">
          서명
          <br />
          날인
        </span>
      </div>
      <p className="pt-1 text-right text-gray-400">출력 후 직접 서명하세요</p>
      <p className="pt-5 text-center tracking-[0.15em]">
        <span className="font-normal text-blue-500">{doc.court}</span>
        <b className="font-semibold"> 귀중</b>
      </p>

      {doc.annex !== "해당 없음" && (
        <div className="mt-10 border-t-2 border-dashed border-gray-300 pt-8">
          <p className="text-center text-[15px] font-bold tracking-[0.3em] text-gray-900">별 지</p>
          <p className="mt-3 text-center text-gray-600">부동산의 표시</p>
          <p className="mt-3 text-center whitespace-pre-wrap">
            <Value>{doc.annex}</Value>
          </p>
        </div>
      )}

      <p className="pt-6 text-center text-[10px] text-gray-400">- 1 -</p>
    </div>
  );
}

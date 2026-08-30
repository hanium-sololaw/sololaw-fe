import type { ComplaintDoc } from "../lib/buildDoc";

type ComplaintPaperProps = {
  doc: ComplaintDoc;
};

export default function ComplaintPaper({ doc }: ComplaintPaperProps) {
  return (
    <div className="font-serif text-[13px] leading-loose text-gray-800">
      <p className="text-center text-xl font-bold tracking-[0.4em] text-gray-900">소 장</p>

      <div className="mt-6 space-y-0.5 whitespace-pre-wrap">
        {doc.parties.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <p className="mt-6">
        <b className="font-semibold text-blue-500">{doc.caseName}</b>
      </p>
      <p className="mt-1 text-gray-600">소송목적의 값 · {doc.objectValue}</p>

      <p className="mt-5 mb-2 text-center text-[15px] font-bold tracking-[0.35em] text-gray-900">청 구 취 지</p>
      {doc.claimPurpose.map((line, index) => (
        <p key={index}>{line}</p>
      ))}

      <p className="mt-5 mb-2 text-center text-[15px] font-bold tracking-[0.35em] text-gray-900">청 구 원 인</p>
      {doc.claimCause.map((line, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}

      <p className="mt-5 mb-2 text-center text-[15px] font-bold tracking-[0.35em] text-gray-900">입 증 방 법</p>
      {doc.evidence.length === 0 ? (
        <p className="text-gray-400">[ 가지고 있는 자료를 체크하면 이 자리에 나열됩니다 ]</p>
      ) : (
        doc.evidence.map((line, index) => <p key={index}>{line}</p>)
      )}

      <p className="mt-5 mb-2 text-center text-[15px] font-bold tracking-[0.35em] text-gray-900">첨 부 서 류</p>
      {doc.attachments.map((line, index) => (
        <p key={index}>1. {line}</p>
      ))}

      <p className="mt-6 text-center">{doc.date}</p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <span>원고</span>
        <span className="min-w-[7rem] border-b border-gray-300 pb-0.5 text-center">
          {doc.plaintiffName ? <b className="font-semibold text-blue-500">{doc.plaintiffName}</b> : <span className="text-gray-300">[ 이름 ]</span>}
        </span>
        <span className="shrink-0">(인)</span>
      </div>
      <p className="mt-5 text-center font-semibold tracking-[0.15em]">
        <b className="text-blue-500">{doc.court}</b> 귀중
      </p>

      {doc.annex !== "해당 없음" && (
        <div className="mt-10 border-t-2 border-dashed border-gray-300 pt-8">
          <p className="text-center text-[15px] font-bold tracking-[0.3em] text-gray-900">별 지</p>
          <p className="mt-3 text-center text-gray-600">부동산의 표시</p>
          <p className="mt-3 whitespace-pre-wrap text-center">
            <b className="font-semibold text-blue-500">{doc.annex}</b>
          </p>
        </div>
      )}
    </div>
  );
}

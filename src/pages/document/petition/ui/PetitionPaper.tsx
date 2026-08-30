import type { PetitionDoc } from "../lib/buildDoc";

type PetitionPaperProps = {
  doc: PetitionDoc;
};

export default function PetitionPaper({ doc }: PetitionPaperProps) {
  return (
    <div className="font-serif text-[13px] leading-loose text-gray-800">
      <p className="text-center text-xl font-bold tracking-[0.4em] text-gray-900">{doc.title}</p>

      {doc.sections.map((section) => (
        <div key={section.heading}>
          <p className="mt-5 mb-2 text-center text-[15px] font-bold tracking-[0.35em] text-gray-900">{section.heading}</p>
          {section.lines.map((line, index) => (
            <p key={index} className="whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>
      ))}

      <p className="mt-6 text-center">{doc.date}</p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <span>신청인</span>
        <span className="min-w-[7rem] border-b border-gray-300 pb-0.5 text-center">
          {doc.applicantName ? <b className="font-semibold text-blue-500">{doc.applicantName}</b> : <span className="text-gray-300">[ 이름 ]</span>}
        </span>
        <span className="shrink-0">(인)</span>
      </div>
      <p className="mt-5 text-center font-semibold tracking-[0.15em]">
        <b className="text-blue-500">{doc.court}</b>
      </p>

      {doc.extraDoc && (
        <div className="mt-10 border-t-2 border-dashed border-gray-300 pt-8">
          <p className="mb-3 text-center text-[11px] font-semibold text-blue-500">
            ↓ 여기부터는 별개의 서면입니다. 신청서와 함께 제출하세요.
          </p>
          <p className="text-center text-[15px] font-bold tracking-[0.3em] text-gray-900">{doc.extraDoc.heading}</p>
          {doc.extraDoc.lines.map((line, index) => (
            <p key={index} className="mt-2 whitespace-pre-wrap">
              {line}
            </p>
          ))}
          <p className="mt-6 text-center">{doc.date}</p>
          <p className="mt-5 text-center font-semibold tracking-[0.15em]">
            <b className="text-blue-500">{doc.court}</b>
          </p>
        </div>
      )}
    </div>
  );
}

import PaperContainer from "../../shared/PaperContainer";
import type { EvidenceListDoc } from "../lib/buildDoc";

type EvidenceListPaperProps = {
  doc: EvidenceListDoc;
};

export default function EvidenceListPaper({ doc }: EvidenceListPaperProps) {
  return (
    <PaperContainer>
      <p className="text-center text-xl font-bold tracking-[0.4em] text-gray-900">증 거 설 명 서</p>
      <p className="mt-1 text-center text-sm text-gray-500">{doc.title}</p>

      <div className="mt-6 space-y-0.5 whitespace-pre-wrap">
        {doc.caseInfo.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {doc.rows.length === 0 ? (
        <p className="mt-6 text-gray-400">[ 증거를 추가하면 이 자리에 표가 나타납니다 ]</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                {["호증번호", "서증명", "입증취지", "원본", "작성자", "작성일"].map((head) => (
                  <th key={head} className="border border-gray-300 px-2 py-2 font-semibold whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doc.rows.map((row) => (
                <tr key={row.no}>
                  <td className="border border-gray-300 px-2 py-2 text-center whitespace-nowrap">{row.no}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <b className="font-semibold text-blue-500">{row.name}</b>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">{row.purpose}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center whitespace-nowrap">{row.originalLabel}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center whitespace-nowrap">{row.author}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center whitespace-nowrap">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-5 space-y-0.5">
        {doc.note.map((line, index) => (
          <p key={index} className="text-[12px] text-gray-600">
            {line}
          </p>
        ))}
      </div>

      <p className="mt-8 text-center font-semibold tracking-[0.15em]">
        <b className="text-blue-500">{doc.court}</b>
      </p>
    </PaperContainer>
  );
}

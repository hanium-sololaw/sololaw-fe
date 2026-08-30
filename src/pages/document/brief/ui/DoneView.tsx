import type { BriefDoc } from "../lib/buildDoc";
import BriefPaper from "./BriefPaper";

type DoneViewProps = {
  doc: BriefDoc;
  onEdit: () => void;
  onExit: () => void;
};

export default function DoneView({ doc, onEdit, onExit }: DoneViewProps) {
  return (
    <div className="flex flex-col gap-5">
      <button type="button" onClick={onEdit} className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700">
        ← 이전으로 돌아가기
      </button>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl font-bold text-gray-900">AI가 정리한 준비서면</h1>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500">{doc.title}</span>
          </div>
          <p className="mt-1 text-[13px] text-gray-500">
            상대방 주장과 반박 내용을 준비서면 양식에 맞춰 정리했습니다.
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button type="button" onClick={onEdit} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            내용 수정하기
          </button>
          <button type="button" onClick={() => window.print()} className="rounded-xl bg-blue-400 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">
            PDF 저장 · 인쇄
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 sm:px-12 sm:py-12">
        <BriefPaper doc={doc} />
      </div>

      <p className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-xs leading-relaxed text-gray-500">
        이 문서는 참고용 초안입니다. 제출 전 사건번호·당사자·주장 내용을 반드시 검토하고 수정하세요.
      </p>

      <button
        type="button"
        onClick={onExit}
        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        문서 생성 홈으로
      </button>
    </div>
  );
}

import { useRecentDocuments } from "../../lib/useRecentDocuments";
import type { Document, DocType } from "../../shared/document";

const DOC_TYPE_LABEL: Record<DocType, string> = {
  COMPLAINT: "소장",
  ANSWER: "답변서",
  BRIEF: "준비서면",
  EVIDENCE_LIST: "증거목록",
  APPLICATION: "신청서",
};

type RecentDocumentRowProps = {
  doc: Document;
  busy: boolean;
  onDownload: () => void;
  onDelete: () => void;
};

function RecentDocumentRow({ doc, busy, onDownload, onDelete }: RecentDocumentRowProps) {
  return (
    <li className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-gray-50 py-3 text-sm last:border-b-0">
      <span className="flex items-center gap-2 truncate text-gray-800">
        <span className="h-4 w-4 shrink-0 rounded-sm bg-blue-100" />
        {doc.title}
      </span>
      <span className="text-gray-500">{DOC_TYPE_LABEL[doc.docType]}</span>
      <span className="text-gray-400">{doc.createdAt.slice(0, 10)}</span>
      <span className="flex items-center gap-1">
        <button
          type="button"
          onClick={onDownload}
          disabled={busy}
          className="rounded-md px-2 py-1 text-xs font-semibold text-blue-500 hover:bg-blue-50 disabled:opacity-40"
        >
          다운로드
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="rounded-md px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 disabled:opacity-40"
        >
          삭제
        </button>
      </span>
    </li>
  );
}

const Notice = ({ message }: { message: string }) => (
  <p className="py-6 text-center text-sm text-gray-400">{message}</p>
);

export default function RecentDocumentsList() {
  const { documents, loading, busyId, download, remove } = useRecentDocuments();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">최근 생성 문서</h2>

      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-gray-100 pb-2 text-sm text-gray-400">
          <span>문서명</span>
          <span>유형</span>
          <span>생성일</span>
          <span />
        </div>

        {loading && <Notice message="불러오는 중..." />}
        {!loading && documents.length === 0 && <Notice message="아직 생성한 문서가 없어요." />}
        {!loading && documents.length > 0 && (
          <ul className="flex flex-col">
            {documents.map((doc) => (
              <RecentDocumentRow
                key={doc.id}
                doc={doc}
                busy={busyId === doc.id}
                onDownload={() => download(doc)}
                onDelete={() => remove(doc)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

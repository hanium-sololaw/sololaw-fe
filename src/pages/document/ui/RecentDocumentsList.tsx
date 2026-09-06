import { useEffect, useState } from "react";
import { listDocuments } from "../shared/listDocuments";
import { downloadDocument } from "../shared/downloadDocument";
import { deleteDocument } from "../shared/deleteDocument";
import type { Document, DocType } from "../shared/document";

const DOC_TYPE_LABEL: Record<DocType, string> = {
  COMPLAINT: "소장",
  ANSWER: "답변서",
  BRIEF: "준비서면",
  EVIDENCE_LIST: "증거목록",
  APPLICATION: "신청서",
};

const RECENT_COUNT = 5;

export default function RecentDocumentsList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const fetchDocuments = () =>
    listDocuments({ size: RECENT_COUNT, sort: "createdAt,desc" })
      .then((result) => setDocuments(result.content))
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));

  const reload = () => {
    setLoading(true);
    return fetchDocuments();
  };

  useEffect(() => {
    void fetchDocuments();
  }, []);

  const handleDownload = async (doc: Document) => {
    setBusyId(doc.id);
    try {
      await downloadDocument(doc.id, `${doc.title}.pdf`);
    } catch {
      // 다운로드 실패는 브라우저 상태를 바꾸지 않으므로 조용히 무시
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (doc: Document) => {
    if (!window.confirm(`"${doc.title}" 문서를 삭제할까요?`)) return;
    setBusyId(doc.id);
    try {
      await deleteDocument(doc.id);
      await reload();
    } catch {
      setBusyId(null);
    }
  };

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

        {loading ? (
          <p className="py-6 text-center text-sm text-gray-400">불러오는 중...</p>
        ) : documents.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">아직 생성한 문서가 없어요.</p>
        ) : (
          <ul className="flex flex-col">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-gray-50 py-3 text-sm last:border-b-0"
              >
                <span className="flex items-center gap-2 truncate text-gray-800">
                  <span className="h-4 w-4 shrink-0 rounded-sm bg-blue-100" />
                  {doc.title}
                </span>
                <span className="text-gray-500">{DOC_TYPE_LABEL[doc.docType]}</span>
                <span className="text-gray-400">{doc.createdAt.slice(0, 10)}</span>
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    disabled={busyId === doc.id}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-blue-500 hover:bg-blue-50 disabled:opacity-40"
                  >
                    다운로드
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(doc)}
                    disabled={busyId === doc.id}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 disabled:opacity-40"
                  >
                    삭제
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

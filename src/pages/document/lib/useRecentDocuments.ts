import { useEffect, useState } from "react";
import { deleteDocument } from "../shared/deleteDocument";
import type { Document } from "../shared/document";
import { downloadDocument } from "../shared/downloadDocument";
import { listDocuments } from "../shared/listDocuments";

const RECENT_COUNT = 5;

export function useRecentDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const fetchDocuments = () =>
    listDocuments({ size: RECENT_COUNT, sort: "createdAt,desc" })
      .then((result) => setDocuments(result.content))
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));

  useEffect(() => {
    void fetchDocuments();
  }, []);

  const download = async (doc: Document) => {
    setBusyId(doc.id);
    try {
      await downloadDocument(doc.id, `${doc.title}.pdf`);
    } catch {
      // a failed download leaves nothing to roll back
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (doc: Document) => {
    if (!window.confirm(`"${doc.title}" 문서를 삭제할까요?`)) return;
    setBusyId(doc.id);
    try {
      await deleteDocument(doc.id);
      setLoading(true);
      await fetchDocuments();
    } catch {
      setBusyId(null);
    }
  };

  return { documents, loading, busyId, download, remove };
}

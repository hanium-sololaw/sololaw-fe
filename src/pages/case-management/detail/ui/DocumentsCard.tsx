import { Link } from "react-router-dom";
import type { DocumentItem } from "../model";

type DocumentsCardProps = {
  documents: DocumentItem[];
};

export default function DocumentsCard({ documents }: DocumentsCardProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">문서</h2>
        <span className="text-sm font-semibold text-gray-400">
          {documents.length}개
        </span>
      </div>

      {documents.length === 0 && <p className="text-sm text-gray-400">등록된 문서가 없습니다.</p>}
      <div className="flex flex-col gap-3">
        {documents.map((doc) => (
          <div key={doc.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5 text-sm text-gray-700">
                <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                  {doc.category}
                </span>
                <span className="truncate">{doc.title}</span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-gray-500">
                {doc.progress}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-400"
                style={{ width: `${doc.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Link to="/document"
        className="self-start text-sm font-semibold text-blue-500 hover:text-blue-600"
      >
        문서 생성으로 →
      </Link>
    </section>
  );
}

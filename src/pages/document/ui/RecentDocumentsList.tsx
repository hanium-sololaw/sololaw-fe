import { recentDocuments } from "../data/recentDocuments";

export default function RecentDocumentsList() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">최근 생성 문서</h2>

      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-gray-100 pb-2 text-sm text-gray-400">
          <span>문서명</span>
          <span>유형</span>
          <span>생성일</span>
        </div>

        <ul className="flex flex-col">
          {recentDocuments.map((doc) => (
            <li
              key={doc.id}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-gray-50 py-3 text-sm last:border-b-0"
            >
              <span className="flex items-center gap-2 truncate text-gray-800">
                <span className="h-4 w-4 shrink-0 rounded-sm bg-blue-100" />
                {doc.name}
              </span>
              <span className="text-gray-500">{doc.type}</span>
              <span className="text-gray-400">{doc.createdAt}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

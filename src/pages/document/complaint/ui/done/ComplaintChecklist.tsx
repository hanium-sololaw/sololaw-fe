import type { ComplaintDoc } from "../../lib/buildDoc";

type Item = { title: string; note: string; status: "done" | "na" | "todo" };

const NOTES = [
  { title: "서명", text: "출력한 소장에 자필 서명 또는 도장을 찍으세요." },
  { title: "부본 — 피고 수만큼 더", text: "법원 제출용 원본 1부와 피고 수만큼의 부본을 준비하세요." },
  { title: "인지대·송달료 납부", text: "접수 전에 인지대·송달료를 납부하고 영수증을 함께 냅니다." },
];

function buildItems(doc: ComplaintDoc): Item[] {
  const done = (ok: boolean): Item["status"] => (ok ? "done" : "todo");
  return [
    { title: "당사자 인적사항·주소·주민번호", note: doc.plaintiffName ? `원고 ${doc.plaintiffName}` : "원고 이름 미입력", status: done(doc.parties.length > 0) },
    { title: "대리인", note: "본인 소송 — 해당 없음", status: "na" },
    {
      title: "연락처 (전화·팩스·이메일)",
      note: "당사자 연락처 기재",
      status: done(doc.parties.some((line) => /\d{2,3}-\d{3,4}-\d{4}/.test(line))),
    },
    { title: "청구취지", note: `${doc.claimPurpose.length}개 항 기재`, status: done(doc.claimPurpose.length > 0) },
    { title: "청구원인", note: `${doc.claimCause.length}개 항 기재`, status: done(doc.claimCause.length > 0) },
    { title: "입증방법·첨부서류", note: `${doc.evidence.length}개 입증 · 첨부 ${doc.attachments.length}종`, status: done(doc.evidence.length > 0) },
    { title: "작성 연월일", note: doc.date, status: done(!!doc.date) },
    { title: "법원의 표시", note: doc.court, status: done(!!doc.court) },
    { title: "기명날인 및 간인", note: "출력 후 직접 서명하세요", status: "todo" },
  ];
}

export default function ComplaintChecklist({ doc }: { doc: ComplaintDoc }) {
  const items = buildItems(doc);
  const total = items.filter((item) => item.status !== "na").length;
  const doneCount = items.filter((item) => item.status === "done").length;

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">소장 필수 기재사항</h2>
          <span className="text-sm font-semibold text-blue-300">
            {doneCount} / {total}
          </span>
        </div>
        <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-blue-300" style={{ width: `${(doneCount / total) * 100}%` }} />
        </div>

        <ul className="divide-y divide-gray-100">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-2 py-2.5">
              <span
                className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded text-[10px] font-bold text-white ${
                  item.status === "done" ? "bg-blue-300" : item.status === "na" ? "bg-blue-50" : "bg-red-400"
                }`}
              >
                {item.status === "done" ? "✓" : item.status === "todo" ? "!" : ""}
              </span>
              <div className="min-w-0">
                <p className={`text-xs font-semibold ${item.status === "na" ? "text-gray-300" : "text-gray-700"}`}>{item.title}</p>
                <p className={`truncate text-[11px] ${item.status === "todo" ? "text-red-400" : item.status === "na" ? "text-gray-300" : "text-gray-400"}`}>
                  {item.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-blue-100 bg-white p-4">
        <h2 className="mb-2 text-sm font-semibold text-gray-900">제출 전에 이것만 확인하세요</h2>
        <ol className="flex flex-col gap-2">
          {NOTES.map((note, index) => (
            <li key={note.title} className="text-xs text-gray-500">
              <p className="mb-0.5 flex items-center gap-1.5 font-semibold text-gray-700">
                <span className="grid h-4 w-4 place-items-center rounded bg-blue-50 text-[10px] text-blue-300">{index + 1}</span>
                {note.title}
              </p>
              {note.text}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

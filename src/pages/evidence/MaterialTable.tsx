import FileIcon from "@/assets/icons/shared/document-icon.svg?react";
import { statusLabels, statusStyles, type Material } from "./model";

type Props = {
  items: Material[];
  cases: { id: number; title: string; court: string; claimAmount: number }[];
  evidence: boolean;
  busyId: number | null;
  preview: boolean;
  onStatus: (item: Material, status: Material["status"]) => void;
  onAction: (item: Material, action: string) => void;
};
const formatDate = (value: string) => value ? value.slice(0, 16).replace("T", " ").replaceAll("-", ". ") : "—";
export default function MaterialTable({ items, cases, evidence, busyId, preview, onStatus, onAction }: Props) {
  const headers = evidence ? ["호증", "서증명", "입증취지", "사건", "생성 파일", "제출 상태", "기한 · 제출일", "크기", "관리"] : ["문서명", "사건", "관할법원", "청구금액", "작성", "생성시점", "제출 상태", "기한 · 제출일", "관리"];
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="w-full min-w-[1040px] text-left text-xs text-gray-700">
        <caption className="sr-only">{evidence ? "증거자료" : "문서"} 목록</caption>
        <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
          <tr>{headers.map((header) => <th key={header} scope="col" className="whitespace-nowrap px-4 py-4 font-medium">{header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => {
            const lawsuit = cases.find((entry) => entry.id === item.caseId);
            return (
              <tr key={item.id} className={item.status === "NEEDS_REVISION" ? "bg-red-50" : "hover:bg-gray-50/60"}>
                {evidence && <td className="whitespace-nowrap px-4 py-5 font-semibold"><span className="mr-2 rounded bg-blue-50 px-1.5 py-0.5 text-blue-300">{item.exhibit?.match(/\d+/)?.[0]}</span>{item.exhibit || "—"}</td>}
                <td className="min-w-44 px-4 py-5"><div className="flex items-center gap-2"><FileIcon className="h-4 w-4 shrink-0 text-gray-300" />{item.status === "SUBMITTED" && <span className="shrink-0 rounded border border-blue-200 bg-blue-50 px-1 text-[10px] text-blue-300">제출본</span>}<span className="max-w-52 break-words">{item.title}</span>{!item.isLatest && <span className="shrink-0 rounded bg-gray-100 px-1 text-[10px] text-gray-500">이전 버전</span>}</div></td>
                {evidence && <td className="min-w-44 max-w-60 px-4 py-5 leading-5">{item.purpose || "—"}</td>}
                <td className="px-4 py-5"><span className="inline-block max-w-44 truncate rounded bg-gray-50 px-2 py-1" title={lawsuit?.title}><span className="mr-1 text-blue-300">•</span>{lawsuit?.title || `사건 #${item.caseId}`}</span></td>
                {!evidence && <><td className="whitespace-nowrap px-4 py-5">{lawsuit?.court || "—"}</td><td className="whitespace-nowrap px-4 py-5">{lawsuit?.claimAmount != null ? `${lawsuit.claimAmount.toLocaleString("ko-KR")}원` : "—"}</td><td className="px-4 py-5"><div className="flex items-center gap-1 text-gray-400"><div className="h-1.5 w-14 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-blue-300" style={{ width: `${Math.min(100, Math.max(0, item.writingRate ?? 0))}%` }} /></div>{item.writingRate ?? 0}%</div></td></>}
                <td className="whitespace-nowrap px-4 py-5">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-5"><select aria-label={`${item.title} 제출 상태`} disabled={busyId !== null} value={item.status} onChange={(event) => onStatus(item, event.target.value as Material["status"])} className={`rounded px-2 py-1.5 text-xs focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 ${statusStyles[item.status]}`}>{Object.entries(statusLabels).filter(([key]) => evidence ? key !== "DRAFT" : key !== "NOT_SUBMITTED").map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td>
                <td className="whitespace-nowrap px-4 py-5 text-gray-400">{item.status === "SUBMITTED" && item.submittedAt ? `제출 ${item.submittedAt.slice(0, 10)}` : item.deadline || "—"}</td>
                {evidence && <td className="whitespace-nowrap px-4 py-5 text-gray-400">{item.size || "—"}</td>}
                <td className="px-4 py-5"><select aria-label={`${item.title} 관리`} value="" disabled={preview || busyId !== null} onChange={(event) => onAction(item, event.target.value)} className="w-12 rounded bg-transparent px-1 py-2 text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-40"><option value="" disabled>•••</option><option value="download">다운로드</option>{evidence && <><option value="edit">상세·수정</option>{item.isLatest && <option value="replace">파일 교체</option>}</>}<option value="delete">삭제</option></select></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {items.length === 0 && <p className="py-20 text-center text-sm text-gray-500">조건에 맞는 자료가 없어요.</p>}
    </div>
  );
}
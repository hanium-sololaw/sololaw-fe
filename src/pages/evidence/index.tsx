import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listMyCases } from "@/shared/api/cases";
import { listDocuments } from "@/pages/document/shared/listDocuments";
import { updateDocumentStatus } from "@/pages/document/shared/updateStatus";
import { downloadDocument } from "@/pages/document/shared/downloadDocument";
import SearchIcon from "@/assets/icons/case-search/search-icon.svg?react";
import UploadIcon from "@/assets/icons/schedule/upload-outline-icon.svg?react";
import BellIcon from "@/assets/icons/shared/bell-icon.svg?react";
import MaterialTable from "./MaterialTable";
import EvidenceModal from "./EvidenceModal";
import { deleteDocument } from "@/pages/document/shared/deleteDocument";
import { loadEvidence, updateEvidenceStatus, evidenceStatus, toMaterial, downloadEvidence, deleteEvidence, type Evidence } from "./api";
import { matchesTab, previewCases, previewMaterials, tabs, type Material, type Tab } from "./model";

// Fetch every page so search, case filters and tab counts cover all documents.
async function loadMaterials() {
  const first = await listDocuments({ size: 100, sort: "createdAt,desc" });
  const result = [...first.content];
  for (let page = 1; page < first.totalPages; page++) result.push(...(await listDocuments({ size: 100, page, sort: "createdAt,desc" })).content);
  return result.map((doc): Material => ({ ...doc, kind: doc.docType, createdAt: doc.generatedAt || doc.createdAt }));
}
async function loadCases() {
  const first = await listMyCases({ size: 100 });
  const result = [...first.content];
  for (let page = 1; page < first.totalPages; page++) result.push(...(await listMyCases({ size: 100, page })).content);
  return result;
}
const pill = "shrink-0 rounded-full px-4 py-2.5 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-blue-400";
export default function EvidencePage() {
  const [params] = useSearchParams();
  const preview = params.get("preview") === "1";
  const [tab, setTab] = useState<Tab>("EVIDENCE");
  const [materials, setMaterials] = useState<Material[]>(preview ? previewMaterials : []);
  const [cases, setCases] = useState<typeof previewCases>(preview ? previewCases : []);
  const [loading, setLoading] = useState(!preview);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [caseId, setCaseId] = useState<number | null>(() => { const value = Number(params.get("caseId")); return Number.isSafeInteger(value) && value > 0 ? value : null; });
  const [unsubmitted, setUnsubmitted] = useState(false);
  const [needsReview, setNeedsReview] = useState(false);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{ mode: "upload" | "edit" | "replace"; item?: Material } | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    if (preview) return;
    Promise.all([loadMaterials(), loadCases(), loadEvidence()]).then(([docs, lawsuits, evidence]) => {
      if (active) { setMaterials([...docs, ...evidence]); setCases(lawsuits); }
    }).catch(() => { if (active) setError("자료를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [preview, retry]);
  const selectedTab = tabs.find((entry) => entry.id === tab)!;
  const tabItems = materials.filter((item) => matchesTab(item, tab));
  const pending = tabItems.filter((item) => item.isLatest && item.status !== "SUBMITTED").length;
  const reviews = tabItems.filter((item) => item.status === "NEEDS_REVISION").length;
  const filtered = tabItems.filter((item) => {
    const title = cases.find((entry) => entry.id === item.caseId)?.title || "";
    return (caseId === null || item.caseId === caseId) && (!unsubmitted || (item.isLatest && item.status !== "SUBMITTED")) && (!needsReview || item.status === "NEEDS_REVISION") && `${item.title} ${title} ${item.purpose || ""}`.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / 10));
  const currentPage = Math.min(page, totalPages);
  const changeStatus = async (item: Material, status: Material["status"]) => {
    if (preview) { setMaterials((items) => items.map((entry) => entry.id === item.id && entry.kind === item.kind ? { ...entry, status } : entry)); return; }
    if (busyId !== null) return;
    if (item.kind !== "EVIDENCE" && status === "NOT_SUBMITTED") return;
    setBusyId(item.id); setError("");
    try {
      const updated = item.kind === "EVIDENCE"
        ? toMaterial(await updateEvidenceStatus(item.id, evidenceStatus(status)))
        : { ...item, status: (await updateDocumentStatus(item.id, status as Exclude<Material["status"], "NOT_SUBMITTED">)).status };
      setMaterials((items) => items.map((entry) => entry.id === item.id && entry.kind === item.kind ? updated : entry));
    } catch { setError("제출 상태를 저장하지 못했어요. 다시 시도해 주세요."); }
    finally { setBusyId(null); }
  };
  const download = async (item: Material) => {
    setBusyId(item.id); setError("");
    try { if (item.kind === "EVIDENCE") await downloadEvidence(item.id, item.title); else await downloadDocument(item.id, /\.pdf$/i.test(item.title) ? item.title : `${item.title}.pdf`); }
    catch { setError("파일을 다운로드하지 못했어요. 생성이 완료된 문서인지 확인해 주세요."); }
    finally { setBusyId(null); }
  };
  const handleAction = async (item: Material, action: string) => {
    if (preview || busyId !== null) return;
    if (action === "download") { await download(item); return; }
    if ((action === "edit" || action === "replace") && item.kind === "EVIDENCE") { setModal({ mode: action, item }); return; }
    if (action !== "delete" || !window.confirm(`"${item.title}" 자료를 삭제할까요? 삭제한 자료는 복구할 수 없습니다.`)) return;
    setBusyId(item.id); setError("");
    try {
      if (item.kind === "EVIDENCE") await deleteEvidence(item.id); else await deleteDocument(item.id);
      setMaterials((items) => items.filter((entry) => !(entry.id === item.id && entry.kind === item.kind)));
    } catch { setError("자료를 삭제하지 못했어요. 다시 시도해 주세요."); }
    finally { setBusyId(null); }
  };
  const handleSaved = (saved: Evidence) => {
    const material = toMaterial(saved);
    setMaterials((items) => {
      const remaining = items.filter((entry) => !(entry.kind === "EVIDENCE" && entry.id === saved.id));
      return [material, ...remaining.map((entry) => modal?.mode === "replace" && entry.kind === "EVIDENCE" && entry.id === modal.item?.id ? { ...entry, isLatest: false } : entry)];
    });
    setModal(null); setTab("EVIDENCE"); setPage(1); setError("");
  };
  return (
    <div className="mx-auto w-full max-w-[1600px] pb-10 text-gray-700">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-5 pt-2">
        <div><h1 className="text-3xl font-bold text-gray-900">증빙자료</h1><p className="mt-3 text-base">소송에 필요한 증거자료를 체계적으로 관리하세요.</p></div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg bg-gray-200 p-1 text-xs"><span className="rounded-md bg-white px-4 py-2 shadow-sm">리스트로</span><button type="button" disabled title="폴더형 보기는 준비 중입니다" className="cursor-not-allowed px-3 py-2 text-gray-500">폴더형으로 보기</button></div>
          <button type="button" disabled={preview || loading} onClick={() => setModal({ mode: "upload" })} className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-300 px-5 py-3 text-sm text-white hover:bg-blue-400 disabled:opacity-40"><UploadIcon className="h-5 w-5" />파일 업로드</button>
          <button type="button" aria-pressed={needsReview} onClick={() => { setNeedsReview(!needsReview); setPage(1); }} className={`flex items-center gap-2 whitespace-nowrap rounded-lg bg-red-50 px-5 py-3 text-sm text-red-400 focus-visible:ring-2 focus-visible:ring-red-400 ${needsReview ? "ring-1 ring-red-200" : ""}`}><BellIcon className="h-5 w-5" />확인할 것<span className="rounded-full bg-red-100 px-1.5 text-xs">{reviews}</span></button>
        </div>
      </header>
      {preview && <p className="mb-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-500">시안 미리보기 · 예시 데이터입니다. 변경 사항은 저장되지 않습니다. <a className="ml-2 underline" href="/evidence">실제 자료 보기</a></p>}
      <div role="tablist" aria-label="자료 종류" className="flex overflow-x-auto px-4">
        {tabs.map((entry) => <button type="button" role="tab" id={`tab-${entry.id}`} aria-controls="materials-panel" aria-selected={tab === entry.id} key={entry.id} onClick={() => { setTab(entry.id); setPage(1); setNeedsReview(false); }} className={`flex shrink-0 items-center gap-5 rounded-t-xl px-6 py-4 text-sm focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 ${tab === entry.id ? "bg-white text-gray-700" : "bg-gray-200 text-gray-400"}`}>{entry.label}<span className={`rounded-full px-1.5 text-base ${tab === entry.id ? "bg-blue-50 text-blue-300" : "bg-gray-50 text-gray-300"}`}>{loading ? "—" : materials.filter((item) => matchesTab(item, entry.id)).length}</span></button>)}
      </div>
      <section className="rounded-2xl bg-white p-5">
        <form className="flex gap-3" onSubmit={(event) => { event.preventDefault(); setSearch(query.trim()); setPage(1); }}><div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-blue-300"><SearchIcon className="h-5 w-5 text-gray-400" /><input aria-label="서류나 사건 검색" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="서류나 사건 검색하기" className="min-w-0 flex-1 py-4 text-sm placeholder:text-gray-400" /></div><button type="submit" className="rounded-lg bg-blue-300 px-6 text-sm text-white hover:bg-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500">검색</button></form>
        <div className="mt-3 flex gap-2 overflow-x-auto"><button type="button" aria-pressed={unsubmitted} onClick={() => { setUnsubmitted(!unsubmitted); setPage(1); }} className={`${pill} ${unsubmitted ? "bg-blue-50 text-blue-400" : "bg-gray-100 text-gray-500"}`}>아직 안 낸 것만</button><span className="mx-1 border-l border-dashed border-gray-200" /><button type="button" aria-pressed={caseId === null} onClick={() => { setCaseId(null); setPage(1); }} className={`${pill} ${caseId === null ? "bg-blue-50 text-blue-400" : "bg-gray-50 text-gray-500"}`}>전체 사건</button>{cases.map((entry) => <button type="button" key={entry.id} aria-pressed={caseId === entry.id} onClick={() => { setCaseId(entry.id); setPage(1); }} className={`${pill} ${caseId === entry.id ? "bg-blue-50 text-blue-400" : "bg-gray-50 text-gray-500"}`}>{entry.title}</button>)}</div>
      </section>
      <section id="materials-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-6">
        <div className="mb-3 flex min-h-10 flex-wrap items-center justify-between gap-3 px-2"><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-bold text-gray-900">{selectedTab.label}</h2><span className="rounded-full bg-gray-100 px-1.5 text-gray-400">{filtered.length}</span><p className="text-xs text-gray-400">최신본 미제출 {pending}<span className="ml-3">{tab === "EVIDENCE" ? "교체·보정한 파일도 이전 버전과 함께 관리해요" : "생성 파일은 버전별로 남아요"}</span></p></div>{selectedTab.path && <Link to={selectedTab.path} className="inline-flex h-10 shrink-0 items-center rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-600 hover:bg-blue-50">＋ {selectedTab.label} 작성</Link>}</div>
        {error && <div role="alert" className="mb-3 flex items-center justify-between rounded-lg bg-red-50 p-4 text-sm text-red-500">{error}<button type="button" onClick={() => { setError(""); setLoading(true); setRetry((value) => value + 1); }} className="ml-3 shrink-0 underline">다시 시도</button></div>}
        {loading ? <p role="status" className="rounded-2xl border border-gray-200 bg-white py-20 text-center text-sm text-gray-500">자료를 불러오는 중이에요.</p> : <MaterialTable items={filtered.slice((currentPage - 1) * 10, currentPage * 10)} cases={cases} evidence={tab === "EVIDENCE"} busyId={busyId} preview={preview} onStatus={changeStatus} onAction={handleAction} />}
        <nav aria-label="자료 페이지" className="mt-3 flex items-center justify-center gap-2"><button type="button" aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="h-8 w-8 text-gray-400 disabled:opacity-30">‹</button>{Array.from({ length: totalPages }, (_, i) => i + 1).filter((value) => value === 1 || value === totalPages || Math.abs(currentPage - value) <= 2).map((value, i, visible) => <span key={value} className="flex items-center gap-2">{i > 0 && value - visible[i - 1] > 1 && <span className="text-gray-400">…</span>}<button type="button" aria-current={currentPage === value ? "page" : undefined} onClick={() => setPage(value)} className={`h-8 w-8 rounded text-sm focus-visible:ring-2 focus-visible:ring-blue-500 ${currentPage === value ? "bg-blue-300 text-white" : "text-gray-400"}`}>{value}</button></span>)}<button type="button" aria-label="다음 페이지" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} className="h-8 w-8 text-gray-400 disabled:opacity-30">›</button></nav>
      </section>
      {modal && <EvidenceModal mode={modal.mode} item={modal.item} cases={cases} initialCaseId={caseId} onClose={() => setModal(null)} onSaved={handleSaved} />}
      <p className="mt-8 text-xs leading-5 text-gray-400">서증명은 <span className="text-gray-600">청구원인에 적은 이름과 똑같이</span> 맞춰야 재판부가 대조할 수 있어요. 제출 상태는 법원 시스템에만 있어 저희가 조회할 수 없으니 직접 표시해 주세요.</p>
    </div>
  );
}
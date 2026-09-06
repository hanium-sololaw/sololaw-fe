import { useEffect, useRef, useState } from "react";
import { createEvidence, getEvidence, nextExhibitNo, partyLabels, replaceEvidence, updateEvidence, uploadEvidenceFile, type Evidence, type PartyType } from "./api";
import type { Material } from "./model";

type Props = {
  mode: "upload" | "edit" | "replace";
  item?: Material;
  cases: { id: number; title: string }[];
  initialCaseId: number | null;
  onClose: () => void;
  onSaved: (evidence: Evidence) => void;
};
const inputClass = "mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 disabled:bg-gray-50";
export default function EvidenceModal({ mode, item, cases, initialCaseId, onClose, onSaved }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [caseId, setCaseId] = useState(item?.caseId ?? initialCaseId ?? "");
  const [partyType, setPartyType] = useState<PartyType>("GAP");
  const [exhibitNo, setExhibitNo] = useState(item?.exhibit || "");
  const [purpose, setPurpose] = useState(item?.purpose || "");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [deadline, setDeadline] = useState(item?.deadline || "");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [detailReady, setDetailReady] = useState(mode !== "edit");
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState("");
  const [numberNotice, setNumberNotice] = useState("");
  const [progress, setProgress] = useState("");
  const uploaded = useRef<{ file: File; caseId: number; metadata: Awaited<ReturnType<typeof uploadEvidenceFile>> } | null>(null);
  useEffect(() => { const element = dialog.current; element?.showModal(); return () => element?.close(); }, []);
  useEffect(() => {
    let active = true;
    if (mode !== "edit" || !item) return;
    getEvidence(item.id).then((detail) => {
      if (!active) return;
      setDetailReady(true); setExhibitNo(detail.exhibitNo || ""); setPurpose(detail.proofPurpose || "");
      setDescription(detail.description || ""); setTags((detail.tags || []).join(", ")); setDeadline(detail.deadline || "");
    }).catch(() => { if (active) setError("상세 정보를 불러오지 못했어요. 창을 닫고 다시 시도해 주세요."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [mode, item]);


  useEffect(() => {
    let active = true;
    if (mode !== "upload" || !caseId) return;
    nextExhibitNo(Number(caseId), partyType).then((number) => {
      if (active) setNumberNotice(`다음 호증: ${partyLabels[partyType]} 제${number}호증`);
    }).catch(() => { if (active) setNumberNotice("다음 호증 번호를 조회하지 못했어요. 호증 번호를 직접 입력할 수 있어요."); });
    return () => { active = false; };
  }, [mode, caseId, partyType]);
  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy || loading || !detailReady || !caseId) return;
    if (mode !== "edit" && (!file || file.size === 0)) { setError("내용이 있는 파일을 선택해 주세요."); return; }
    setBusy(true); setError("");
    try {
      const metadata = { exhibitNo: exhibitNo.trim() || undefined, proofPurpose: purpose.trim(), description: description.trim(), tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean), deadline: deadline || undefined };
      let saved: Evidence;
      if (mode === "edit" && item) {
        saved = await updateEvidence(item.id, metadata);
      } else {
        setProgress("파일을 업로드하고 있어요…");
        if (!uploaded.current || uploaded.current.file !== file || uploaded.current.caseId !== Number(caseId)) {
          uploaded.current = { file: file!, caseId: Number(caseId), metadata: await uploadEvidenceFile(Number(caseId), file!) };
        }
        setProgress("자료를 등록하고 있어요…");
        saved = mode === "replace" && item ? await replaceEvidence(item.id, uploaded.current.metadata) : await createEvidence(Number(caseId), { ...uploaded.current.metadata, ...metadata, partyType });
      }
      onSaved(saved);
    } catch (reason) {
      setError(reason instanceof Error && reason.message.includes("413") ? "저장 공간이 부족해요. 파일을 정리한 후 다시 시도해 주세요." : "저장하지 못했어요. 네트워크와 목록을 확인한 뒤 다시 시도해 주세요.");
    } finally { setBusy(false); setProgress(""); }
  };
  return (
    <dialog ref={dialog} onCancel={(event) => { event.preventDefault(); if (!busy) onClose(); }} aria-labelledby="evidence-modal-title" className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl bg-white p-7 text-gray-700 shadow-xl backdrop:bg-black/30">
      <div className="mb-5 flex items-center justify-between"><h2 id="evidence-modal-title" className="text-xl font-bold text-gray-900">{mode === "upload" ? "증거자료 업로드" : mode === "edit" ? "증거자료 수정" : "증거 파일 교체"}</h2><button type="button" aria-label="닫기" disabled={busy} onClick={onClose} className="rounded px-2 text-2xl focus-visible:ring-2 focus-visible:ring-blue-300 disabled:opacity-40">×</button></div>
      <form onSubmit={save} className="space-y-4">
        <fieldset disabled={busy || loading} className="space-y-4 disabled:opacity-60">
          <label className="block text-sm">사건 <span className="text-red-400">*</span><select required value={caseId} disabled={mode !== "upload"} onChange={(event) => { setCaseId(event.target.value); setExhibitNo(""); setNumberNotice(""); }} className={inputClass}><option value="">사건을 선택해 주세요</option>{cases.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select></label>
          {mode !== "edit" && <label className="block rounded-xl border border-dashed border-blue-200 bg-blue-50 p-5 text-center text-sm"><span className="mb-3 block text-blue-500">{mode === "replace" ? "교체할 파일 선택" : "업로드할 파일 선택"}</span><input type="file" required onChange={(event) => { setFile(event.target.files?.[0] || null); uploaded.current = null; }} className="w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:text-blue-500" />{file && <span className="mt-2 block break-all text-gray-500">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</span>}</label>}
          {mode === "replace" ? <p className="text-sm leading-6 text-gray-500">기존 파일은 이전 버전으로 남고, 호증 번호와 입증취지를 이어받은 새 파일이 최신본으로 등록됩니다.</p> : <>
            {mode === "upload" && <label className="block text-sm">호증 구분<select value={partyType} onChange={(event) => { setPartyType(event.target.value as PartyType); setExhibitNo(""); setNumberNotice(""); }} className={inputClass}>{Object.entries(partyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>}
            <label className="block text-sm">호증 번호<input value={exhibitNo} onChange={(event) => setExhibitNo(event.target.value)} placeholder="예: 갑 제1호증 (선택)" className={inputClass} />{caseId && numberNotice && <span className="mt-1 block text-xs text-gray-500">{numberNotice}</span>}</label>
            <label className="block text-sm">입증취지<textarea rows={2} value={purpose} onChange={(event) => setPurpose(event.target.value)} placeholder="이 자료로 입증하려는 사실을 적어 주세요" className={inputClass} /></label>
            <label className="block text-sm">설명<textarea rows={2} value={description} onChange={(event) => setDescription(event.target.value)} className={inputClass} /></label>
            <label className="block text-sm">태그<input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="쉼표로 구분해 주세요" className={inputClass} /></label>
            <label className="block text-sm">제출 기한<input type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} className={inputClass} />{mode === "edit" && <span className="mt-1 block text-xs text-gray-500">비워두면 기존 제출 기한이 유지됩니다.</span>}</label>
          </>}
        </fieldset>
        {loading && <p role="status" className="text-sm text-gray-500">상세 정보를 불러오는 중이에요.</p>}
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</p>}
        <div className="flex justify-end gap-2"><button type="button" disabled={busy} onClick={onClose} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm">취소</button><button type="submit" disabled={busy || loading || !detailReady || !caseId || (mode !== "edit" && !file)} className="rounded-lg bg-blue-300 px-5 py-2.5 text-sm text-white disabled:opacity-40">{busy ? progress || "저장 중…" : mode === "upload" ? "등록" : "저장"}</button></div>
      </form>
    </dialog>
  );
}
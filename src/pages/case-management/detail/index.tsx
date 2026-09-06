import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCaseDetail, deleteCase, updateCaseStatus, type CaseDetail, type CaseStatus } from "@/shared/api/cases";
import { listMyCitations, type PrecedentCitation } from "@/shared/api/citations";
import { listDocuments } from "@/pages/document/shared/listDocuments";
import type { Document, DocType } from "@/pages/document/shared/document";
import { listEvidence, type Evidence } from "@/pages/evidence/api";
import { getSchedules } from "@/pages/schedule/api/getSchedules";
import type { ScheduleRecord } from "@/pages/schedule/api/types";
import { getCaseTodos } from "../api/getCaseTodos";
import { createCaseTodo } from "../api/createCaseTodo";
import { updateCaseTodo } from "../api/updateCaseTodo";
import { getCaseStages } from "../api/getCaseStages";
import { updateCaseStageStatus } from "../api/updateCaseStageStatus";
import type { ApiStageStatus, StageRecord, TodoRecord } from "../api/types";
import { caseStatusMeta, formatDate } from "../lib/caseDisplay";
import type { ChecklistItem } from "./model";
import CaseDetailHeader from "./ui/CaseDetailHeader";
import TodoCard from "./ui/TodoCard";
import StatsOverviewCard from "./ui/StatsOverviewCard";
import RecentChangesCard from "./ui/RecentChangesCard";
import ProcedureTimeline from "./ui/ProcedureTimeline";
import PetitionChecklistCard from "./ui/PetitionChecklistCard";
import AIReviewCard from "./ui/AIReviewCard";
import UpcomingScheduleCard from "./ui/UpcomingScheduleCard";
import DocumentsCard from "./ui/DocumentsCard";
import EvidenceCard from "./ui/EvidenceCard";
import RelatedCasesCard from "./ui/RelatedCasesCard";
import FilingInfoBar from "./ui/FilingInfoBar";
import DisclaimerFooter from "./ui/DisclaimerFooter";

const documentLabels: Record<DocType, string> = { COMPLAINT: "소장", ANSWER: "답변서", BRIEF: "준비서면", EVIDENCE_LIST: "증거목록", APPLICATION: "신청서" };
async function fetchDocuments(caseId: number) {
  const first = await listDocuments({ caseId, size: 100, sort: "createdAt,desc" });
  const items = [...first.content];
  for (let page = 1; page < first.totalPages; page++) items.push(...(await listDocuments({ caseId, size: 100, page, sort: "createdAt,desc" })).content);
  return items;
}
async function fetchEvidence(caseId: number) {
  const first = await listEvidence({ caseId, size: 100 });
  const items = [...first.content];
  for (let page = 1; page < first.totalPages; page++) items.push(...(await listEvidence({ caseId, size: 100, page })).content);
  return items;
}
function dateKey() { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`; }
function dayLabel(date: string) { const days = Math.round((Date.parse(`${date.slice(0,10)}T00:00:00Z`) - Date.parse(`${dateKey()}T00:00:00Z`)) / 86400000); return days === 0 ? "D-Day" : days > 0 ? `D-${days}` : `D+${Math.abs(days)}`; }
export default function CaseManagementDetailPage() {
  const { id = "" } = useParams();
  return <CaseDetailContent key={id} id={id} />;
}
function CaseDetailContent({ id }: { id: string }) {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<CaseDetail | null>(null);
  const [todos, setTodos] = useState<TodoRecord[]>([]);
  const [stages, setStages] = useState<StageRecord[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [schedules, setSchedules] = useState<ScheduleRecord[]>([]);
  const [citations, setCitations] = useState<PrecedentCitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reload, setReload] = useState(0);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    if (!Number.isSafeInteger(Number(id)) || Number(id) <= 0) { Promise.resolve().then(() => { if (active) { setErrors({ detail: "올바르지 않은 사건 주소입니다." }); setLoading(false); } }); return () => { active = false; }; }
    Promise.allSettled([getCaseDetail(Number(id)), getCaseTodos(id), getCaseStages(id), fetchDocuments(Number(id)), fetchEvidence(Number(id)), getSchedules({ caseId: Number(id) }), listMyCitations({ caseId: Number(id) })]).then(([caseResult, todoResult, stageResult, docResult, evidenceResult, scheduleResult, citationResult]) => {
      if (!active) return;
      const nextErrors: Record<string, string> = {};
      if (caseResult.status === "fulfilled") setDetail(caseResult.value); else nextErrors.detail = "사건 정보를 불러오지 못했어요.";
      if (todoResult.status === "fulfilled") setTodos(todoResult.value); else nextErrors.todos = "할 일을 불러오지 못했어요.";
      if (stageResult.status === "fulfilled") setStages([...stageResult.value].sort((a,b) => a.stageOrder - b.stageOrder)); else nextErrors.stages = "절차 정보를 불러오지 못했어요.";
      if (docResult.status === "fulfilled") setDocuments(docResult.value); else nextErrors.documents = "문서를 불러오지 못했어요.";
      if (evidenceResult.status === "fulfilled") setEvidence(evidenceResult.value); else nextErrors.evidence = "증빙자료를 불러오지 못했어요.";
      if (scheduleResult.status === "fulfilled") setSchedules(scheduleResult.value); else nextErrors.schedules = "일정을 불러오지 못했어요.";
      if (citationResult.status === "fulfilled") setCitations(citationResult.value); else nextErrors.citations = "관련 판례를 불러오지 못했어요.";
      setErrors(nextErrors); setLoading(false);
    });
    return () => { active = false; };
  }, [id, reload]);
  const retry = () => { setLoading(true); setReload((value) => value + 1); };
  const problem = (key: string) => <section role="alert" className="rounded-[20px] border border-gray-200 bg-white p-5 text-sm text-gray-500">{errors[key]}<button onClick={retry} className="ml-3 text-blue-500 underline">다시 시도</button></section>;
  const refreshActivity = () => getCaseDetail(Number(id)).then(setDetail).catch(() => {});
  const toggleTodo = async (todoId: string) => {
    const item = todos.find((entry) => String(entry.id) === todoId);
    if (!item || busy) return;
    setBusy(true);
    try { const updated = await updateCaseTodo(id, todoId, { isDone: !item.isDone }); setTodos((items) => items.map((entry) => entry.id === updated.id ? updated : entry)); await refreshActivity(); }
    catch { window.alert("할 일을 변경하지 못했어요. 다시 시도해 주세요."); }
    finally { setBusy(false); }
  };
  const addTodo = async (title: string, dueDate: string) => {
    if (busy) return false;
    setBusy(true);
    try { const created = await createCaseTodo(id, { title, dueDate: dueDate || undefined }); setTodos((items) => [...items, created]); await refreshActivity(); return true; }
    catch { window.alert("할 일을 추가하지 못했어요. 다시 시도해 주세요."); return false; }
    finally { setBusy(false); }
  };
  const selectStage = async (stageId: string) => {
    if (busy || errors.stages) return;
    const index = stages.findIndex((stage) => String(stage.id) === stageId);
    if (index < 0) return;
    setBusy(true);
    const results = await Promise.allSettled(stages.map((record, i) => {
      const status: ApiStageStatus = i < index ? "COMPLETED" : i === index ? "IN_PROGRESS" : "SCHEDULED";
      return record.status === status ? Promise.resolve(record) : updateCaseStageStatus(id, record.id, status);
    }));
    setStages((items) => items.map((item, i) => results[i].status === "fulfilled" ? results[i].value : item));
    if (results.some((result) => result.status === "rejected")) {
      window.alert("일부 절차를 변경하지 못했어요. 현재 상태를 다시 확인해 주세요.");
      try { setStages((await getCaseStages(id)).sort((a,b) => a.stageOrder - b.stageOrder)); } catch { setErrors((prev) => ({ ...prev, stages: "절차 정보를 다시 불러오지 못했어요." })); }
    }
    await refreshActivity(); setBusy(false);
  };
  const remove = async () => {
    if (busy || !detail || !window.confirm(`'${detail.title}' 사건을 삭제할까요? 이 작업은 되돌릴 수 없어요.`)) return;
    setBusy(true);
    try { await deleteCase(Number(id)); navigate("/case-management"); }
    catch { window.alert("사건을 삭제하지 못했어요."); setBusy(false); }
  };
  const changeStatus = async (status: CaseStatus) => {
    if (busy || status === detail?.status) return;
    const reason = window.prompt("상태를 변경하는 사유를 입력해주세요 (5자 이상)");
    if (reason === null) return;
    if (reason.trim().length < 5) { window.alert("사유는 5자 이상 입력해주세요."); return; }
    setBusy(true);
    try { const updated = await updateCaseStatus(Number(id), status, reason.trim()); setDetail((prev) => prev ? { ...prev, ...updated } : prev); await refreshActivity(); }
    catch { window.alert(`${caseStatusMeta[status].label} 상태로 변경하지 못했어요.`); }
    finally { setBusy(false); }
  };
  if (loading) return <p role="status" className="p-6 text-sm text-gray-500">사건 정보를 불러오는 중이에요.</p>;
  if (!detail || errors.detail) return <div className="space-y-4">{problem("detail")}<Link to="/case-management" className="text-blue-500">사건 목록으로</Link></div>;
  const latestEvidence = evidence.filter((item) => item.isLatest);
  const completedEvidence = latestEvidence.filter((item) => item.proofPurpose?.trim()).length;
  const complaint = documents.find((item) => item.docType === "COMPLAINT" && item.isLatest);
  const progress = complaint?.writingRate ?? 0;
  const upcoming = schedules.filter((item) => item.eventDate >= dateKey()).sort((a,b) => a.eventDate.localeCompare(b.eventDate) || (a.eventTime?.hour ?? 0) - (b.eventTime?.hour ?? 0) || (a.eventTime?.minute ?? 0) - (b.eventTime?.minute ?? 0));
  const nextTodo = todos.filter((item) => !item.isDone && item.dueDate).sort((a,b) => a.dueDate!.localeCompare(b.dueDate!))[0];
  const current = stages.find((item) => item.status === "IN_PROGRESS") ?? [...stages].reverse().find((item) => item.status === "COMPLETED");
  const filed = stages.find((stage) => stage.name.includes("접수") && stage.status !== "SCHEDULED");
  const filedAt = filed?.stageDate ? formatDate(filed.stageDate) : "";
  const checklist: ChecklistItem[] = [
    { id: "court", label: "관할 법원", done: !!detail.court?.trim() },
    { id: "amount", label: "청구 금액", done: detail.claimAmount > 0 },
    { id: "plaintiff", label: "원고 정보", done: detail.parties.some((party) => party.partyRole === "PLAINTIFF" && !!party.name?.trim()) },
    { id: "defendant", label: "피고 정보", done: detail.parties.some((party) => party.partyRole === "DEFENDANT" && !!party.name?.trim()) },
    { id: "facts", label: "사실관계", done: null },
    { id: "evidence", label: "입증자료", done: errors.evidence ? null : latestEvidence.length > 0 },
  ];
  return <div className="flex flex-col gap-6">
    <CaseDetailHeader title={detail.title} status={detail.status} caseNumber={detail.caseNumber || "사건번호 미등록"} court={detail.court || "법원 미등록"} lastActivity={detail.recentActivities[0]?.description || "최근 활동 없음"} currentStageLabel={errors.stages ? "조회 실패" : current?.name || "미설정"} petitionTitle={errors.documents ? "소장 조회 실패" : complaint ? "소장 작성" : "소장 미작성"} petitionProgress={progress} remainingTasksToFile={errors.todos ? null : todos.filter((todo) => !todo.isDone).length} onStatusChange={changeStatus} onDelete={remove} />
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {errors.todos ? problem("todos") : <TodoCard todos={todos.map((todo) => ({ id: String(todo.id), title: todo.title, done: todo.isDone, dueDate: todo.dueDate ? formatDate(todo.dueDate) : "기한 미정" }))} nextDeadline={nextTodo?.dueDate ? { dDay: dayLabel(nextTodo.dueDate), date: formatDate(nextTodo.dueDate) } : { dDay: "—", date: "등록된 기한 없음" }} onToggle={toggleTodo} onAdd={addTodo} busy={busy} />}
      <StatsOverviewCard stats={{ documentCount: detail.documentCount, documentNote: errors.documents ? "조회 실패" : documents[0]?.title || "등록된 문서 없음", evidenceCount: detail.evidenceCount, evidenceNote: errors.evidence ? "조회 실패" : `최신본 입증취지 ${completedEvidence}/${latestEvidence.length}건 작성`, scheduleCount: detail.scheduleCount, scheduleNote: errors.schedules ? "조회 실패" : upcoming[0] ? `${formatDate(upcoming[0].eventDate)} · ${upcoming[0].title}` : "예정된 일정 없음" }} />
      <RecentChangesCard activityLog={detail.recentActivities.map((activity,i) => ({ id: String(i), title: activity.description, description: "", time: formatDate(activity.createdAt) }))} />
    </div>
    {errors.stages ? problem("stages") : stages.length ? <ProcedureTimeline stages={stages.map((stage) => ({ id: String(stage.id), label: stage.name, date: stage.stageDate ? formatDate(stage.stageDate) : undefined, status: stage.status }))} currentStageId={current ? String(current.id) : ""} onSelectStage={selectStage} disabled={busy} /> : <p className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500">등록된 절차가 없습니다.</p>}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3"><PetitionChecklistCard items={checklist} /><AIReviewCard notes={[]} />{errors.schedules ? problem("schedules") : <UpcomingScheduleCard schedules={upcoming.map((item) => ({ id: String(item.id), title: item.title, dDay: dayLabel(item.eventDate) }))} />}</div>
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">{errors.documents ? problem("documents") : <DocumentsCard documents={documents.map((doc) => ({ id: String(doc.id), category: documentLabels[doc.docType], title: doc.title, progress: doc.writingRate }))} />}{errors.evidence ? problem("evidence") : <EvidenceCard completed={completedEvidence} total={latestEvidence.length} caseId={id} />}{errors.citations ? problem("citations") : <RelatedCasesCard cases={citations.map((item) => ({ id: String(item.id), title: item.name, badge: item.court }))} />}</div>
    <FilingInfoBar caseNumber={detail.caseNumber || "사건번호 미등록"} filedAt={filedAt} />
    <DisclaimerFooter />
  </div>;
}
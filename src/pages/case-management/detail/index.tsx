import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockCases, type CaseStatus } from "../data/mockCases";
import {
  getCaseDetail,
  procedureStages,
  type ActivityLogItem,
  type ProcedureStageId,
  type TodoItem,
} from "./data/mockCaseDetail";
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

let activityIdSeq = 1000;
let todoIdSeq = 1000;

export default function CaseManagementDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const summary = mockCases.find((item) => item.id === id);
  const detail = useMemo(() => getCaseDetail(id, summary), [id, summary]);

  const [status, setStatus] = useState<CaseStatus>(detail.status);
  const [currentStageId, setCurrentStageId] = useState<ProcedureStageId>(
    detail.currentStageId,
  );
  const [todos, setTodos] = useState<TodoItem[]>(detail.todos);
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>(
    detail.activityLog,
  );

  const currentStageLabel =
    procedureStages.find((stage) => stage.id === currentStageId)?.label ??
    "-";

  const handleToggleTodo = (todoId: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo,
      ),
    );

    const todo = todos.find((item) => item.id === todoId);
    if (todo && !todo.done) {
      setActivityLog((prev) => [
        {
          id: `activity-${activityIdSeq++}`,
          title: `${todo.title} 완료`,
          description: "체크리스트에서 완료 처리",
          time: "방금 전",
        },
        ...prev,
      ]);
    }
  };

  const handleAddTodo = (title: string, dueDate: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: `todo-${todoIdSeq++}`,
        title,
        dueDate: dueDate || "기한 미정",
        done: false,
      },
    ]);
  };

  const handleSelectStage = (stageId: ProcedureStageId) => {
    if (stageId === currentStageId) return;
    setCurrentStageId(stageId);

    const label = procedureStages.find((stage) => stage.id === stageId)
      ?.label;
    setActivityLog((prev) => [
      {
        id: `activity-${activityIdSeq++}`,
        title: `현재 진행 단계 — ${label}`,
        description: "직접 변경",
        time: "방금 전",
      },
      ...prev,
    ]);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `'${detail.title}' 사건을 삭제할까요? 이 작업은 되돌릴 수 없어요.`,
    );
    if (!confirmed) return;
    navigate("/case-management");
  };

  return (
    <div className="flex flex-col gap-6">
      <CaseDetailHeader
        title={detail.title}
        status={status}
        caseNumber={detail.caseNumber}
        court={detail.court}
        lastActivity={detail.lastActivity}
        currentStageLabel={currentStageLabel}
        petitionTitle={detail.petitionTitle}
        petitionProgress={detail.petitionProgress}
        remainingTasksToFile={detail.remainingTasksToFile}
        onStatusChange={setStatus}
        onDelete={handleDelete}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TodoCard
          todos={todos}
          nextDeadline={detail.nextDeadline}
          onToggle={handleToggleTodo}
          onAdd={handleAddTodo}
        />
        <StatsOverviewCard stats={detail.stats} />
        <RecentChangesCard activityLog={activityLog} />
      </div>

      <ProcedureTimeline
        stages={procedureStages}
        currentStageId={currentStageId}
        filedAt={detail.filedAt}
        petitionProgress={detail.petitionProgress}
        onSelectStage={handleSelectStage}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <PetitionChecklistCard items={detail.petitionChecklist} />
        <AIReviewCard notes={detail.aiReviewNotes} />
        <UpcomingScheduleCard schedules={detail.upcomingSchedules} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <DocumentsCard documents={detail.documents} />
        <EvidenceCard
          completed={detail.evidenceCompleted}
          total={detail.evidenceTotal}
        />
        <RelatedCasesCard cases={detail.relatedCases} />
      </div>

      <FilingInfoBar caseNumber={detail.caseNumber} filedAt={detail.filedAt} />

      <DisclaimerFooter />
    </div>
  );
}

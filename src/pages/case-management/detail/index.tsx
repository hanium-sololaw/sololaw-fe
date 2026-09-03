import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
  ApiCaseStatus,
  ApiStageStatus,
  StageRecord,
  TodoRecord,
} from "../api/types";
import { fetchCaseDetail, type CaseDetailRecord } from "../api/getCaseDetail";
import { deleteCase } from "../api/deleteCase";
import { updateCaseStatus } from "../api/updateCaseStatus";
import { getCaseTodos } from "../api/getCaseTodos";
import { createCaseTodo } from "../api/createCaseTodo";
import { updateCaseTodo } from "../api/updateCaseTodo";
import { getCaseStages } from "../api/getCaseStages";
import { updateCaseStageStatus } from "../api/updateCaseStageStatus";
import { caseStatusMeta, formatDate } from "../lib/caseDisplay";
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

function toTodoItem(record: TodoRecord): TodoItem {
  return {
    id: String(record.id),
    title: record.title,
    dueDate: record.dueDate ?? "기한 미정",
    done: record.isDone,
  };
}

export default function CaseManagementDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const detail = useMemo(() => getCaseDetail(id), [id]);

  const [apiDetail, setApiDetail] = useState<CaseDetailRecord | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [status, setStatus] = useState<ApiCaseStatus>("PREPARING");
  const [currentStageId, setCurrentStageId] = useState<ProcedureStageId>(
    detail.currentStageId,
  );
  const [stageRecords, setStageRecords] = useState<StageRecord[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>(detail.todos);
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>(
    detail.activityLog,
  );

  useEffect(() => {
    let cancelled = false;
    setDetailError(null);

    fetchCaseDetail(id)
      .then((data) => {
        if (cancelled) return;
        setApiDetail(data);
        setStatus(data.status);
        setActivityLog(
          data.recentActivities.map((activity, index) => ({
            id: `recent-${index}`,
            title: activity.description,
            description: "",
            time: formatDate(activity.createdAt),
          })),
        );
      })
      .catch(() => {
        if (!cancelled) setDetailError("사건 정보를 불러오지 못했어요.");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    getCaseTodos(id)
      .then((records) => {
        if (!cancelled) setTodos(records.map(toTodoItem));
      })
      .catch(() => {
        // keep placeholder todos when the API call fails
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    getCaseStages(id)
      .then((records) => {
        if (!cancelled) setStageRecords(records);
      })
      .catch(() => {
        // keep placeholder timeline when the API call fails
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const stagesLoaded = stageRecords.length === procedureStages.length;

  const effectiveCurrentStageId = stagesLoaded
    ? (() => {
        const inProgressIndex = stageRecords.findIndex(
          (stage) => stage.status === "IN_PROGRESS",
        );
        if (inProgressIndex !== -1) return procedureStages[inProgressIndex].id;

        const lastCompletedIndex = stageRecords.reduce(
          (acc, stage, index) => (stage.status === "COMPLETED" ? index : acc),
          -1,
        );
        return procedureStages[Math.max(lastCompletedIndex, 0)].id;
      })()
    : currentStageId;

  const title = apiDetail?.title ?? detail.title;
  const caseNumber = apiDetail?.caseNumber ?? detail.caseNumber;
  const court = apiDetail?.court ?? detail.court;
  const petitionProgress = apiDetail?.progressRate ?? detail.petitionProgress;
  const lastActivity = apiDetail?.recentActivities[0]?.description ??
    detail.lastActivity;

  const stats = {
    documentCount: apiDetail?.documentCount ?? detail.stats.documentCount,
    documentNote: detail.stats.documentNote,
    evidenceCount: apiDetail?.evidenceCount ?? detail.stats.evidenceCount,
    evidenceNote: detail.stats.evidenceNote,
    scheduleCount: apiDetail?.scheduleCount ?? detail.stats.scheduleCount,
    scheduleNote: detail.stats.scheduleNote,
  };

  const currentStageLabel =
    procedureStages.find((stage) => stage.id === effectiveCurrentStageId)
      ?.label ?? "-";

  const handleToggleTodo = async (todoId: string) => {
    const todo = todos.find((item) => item.id === todoId);
    if (!todo) return;

    const nextDone = !todo.done;

    try {
      await updateCaseTodo(id, todoId, { isDone: nextDone });
    } catch {
      window.alert("변경하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    setTodos((prev) =>
      prev.map((item) =>
        item.id === todoId ? { ...item, done: nextDone } : item,
      ),
    );

    if (nextDone) {
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

  const handleAddTodo = async (todoTitle: string, dueDate: string) => {
    try {
      const created = await createCaseTodo(id, {
        title: todoTitle,
        dueDate: dueDate || undefined,
      });
      setTodos((prev) => [...prev, toTodoItem(created)]);
    } catch {
      window.alert("할 일을 추가하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleSelectStage = async (stageId: ProcedureStageId) => {
    if (stageId === effectiveCurrentStageId) return;

    const clickedIndex = procedureStages.findIndex(
      (stage) => stage.id === stageId,
    );
    if (clickedIndex === -1) return;

    const label = procedureStages[clickedIndex].label;

    if (!stagesLoaded) {
      setCurrentStageId(stageId);
      setActivityLog((prev) => [
        {
          id: `activity-${activityIdSeq++}`,
          title: `현재 진행 단계 — ${label}`,
          description: "직접 변경",
          time: "방금 전",
        },
        ...prev,
      ]);
      return;
    }

    const updates = stageRecords
      .map((record, index) => {
        const nextStatus: ApiStageStatus =
          index < clickedIndex
            ? "COMPLETED"
            : index === clickedIndex
              ? "IN_PROGRESS"
              : "SCHEDULED";
        return { record, nextStatus };
      })
      .filter(({ record, nextStatus }) => record.status !== nextStatus);

    try {
      const results = await Promise.all(
        updates.map(({ record, nextStatus }) =>
          updateCaseStageStatus(id, record.id, nextStatus),
        ),
      );
      setStageRecords((prev) =>
        prev.map(
          (record) =>
            results.find((updated) => updated.id === record.id) ?? record,
        ),
      );
      setActivityLog((prev) => [
        {
          id: `activity-${activityIdSeq++}`,
          title: `현재 진행 단계 — ${label}`,
          description: "직접 변경",
          time: "방금 전",
        },
        ...prev,
      ]);
    } catch {
      window.alert("절차 단계를 변경하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `'${title}' 사건을 삭제할까요? 이 작업은 되돌릴 수 없어요.`,
    );
    if (!confirmed) return;

    try {
      await deleteCase(id);
      navigate("/case-management");
    } catch {
      window.alert("사건을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleStatusChange = async (nextStatus: ApiCaseStatus) => {
    if (nextStatus === status) return;

    const reason = window.prompt(
      "상태를 변경하는 사유를 입력해주세요 (5자 이상)",
    );
    if (reason === null) return;
    if (reason.trim().length < 5) {
      window.alert("사유는 5자 이상 입력해주세요.");
      return;
    }

    try {
      const updated = await updateCaseStatus(id, {
        status: nextStatus,
        reason: reason.trim(),
      });
      setStatus(updated.status);
      setActivityLog((prev) => [
        {
          id: `activity-${activityIdSeq++}`,
          title: `사건 상태 변경 — ${caseStatusMeta[updated.status].label}`,
          description: reason.trim(),
          time: "방금 전",
        },
        ...prev,
      ]);
    } catch {
      window.alert("상태를 변경하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <CaseDetailHeader
        title={title}
        status={status}
        caseNumber={caseNumber}
        court={court}
        lastActivity={lastActivity}
        currentStageLabel={currentStageLabel}
        petitionTitle={detail.petitionTitle}
        petitionProgress={petitionProgress}
        remainingTasksToFile={detail.remainingTasksToFile}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {detailError && <p className="text-sm text-red-500">{detailError}</p>}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TodoCard
          todos={todos}
          nextDeadline={detail.nextDeadline}
          onToggle={handleToggleTodo}
          onAdd={handleAddTodo}
        />
        <StatsOverviewCard stats={stats} />
        <RecentChangesCard activityLog={activityLog} />
      </div>

      <ProcedureTimeline
        stages={procedureStages}
        currentStageId={effectiveCurrentStageId}
        filedAt={detail.filedAt}
        petitionProgress={petitionProgress}
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

      <FilingInfoBar caseNumber={caseNumber} filedAt={detail.filedAt} />

      <DisclaimerFooter />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import CheckButtonIcon from "@/assets/icons/mypage/check-button.svg?react";
import UploadIcon from "@/assets/icons/schedule/upload-outline-icon.svg?react";
import { listMyCases } from "@/shared/api/cases";
import {
  analyzeCourtDocument,
  type CourtDocumentAnalysis,
} from "../api/analyzeCourtDocument";
import { createSchedule } from "../api/createSchedule";
import type { ScheduleEventTime, ScheduleType } from "../api/types";

type CourtNoticeUploadModalProps = {
  onClose: () => void;
  onCreated?: () => void;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

const extractedInfo = [
  "사건번호 및 사건명",
  "변론기일 날짜 및 시간",
  "법원 정보(관할 법원, 재판부)",
  "제출 기한(답변서, 준비서면 등)",
];

const scheduleTypeOptions: { value: ScheduleType; label: string }[] = [
  { value: "HEARING", label: "변론기일" },
  { value: "SUBMISSION_DEADLINE", label: "제출기한" },
  { value: "OBJECTION_PERIOD", label: "이의신청 기간" },
  { value: "PREPARATION", label: "서류 준비" },
  { value: "ATTENDANCE", label: "출석" },
  { value: "OTHER", label: "기타" },
];

type Draft = {
  caseId: number | null;
  title: string;
  scheduleType: ScheduleType;
  date: string;
  time: string;
  location: string;
  memo: string;
};

function toTimeInput(value: CourtDocumentAnalysis["hearingTime"]): string {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 5);
  return `${String(value.hour).padStart(2, "0")}:${String(value.minute).padStart(2, "0")}`;
}

function toEventTime(value: string): ScheduleEventTime | undefined {
  const [hour, minute] = value.split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return undefined;
  return { hour, minute, second: 0, nano: 0 };
}

function toDraft(result: CourtDocumentAnalysis, caseId: number | null): Draft {
  const scheduleType = result.scheduleType ?? "OTHER";
  const isHearing = scheduleType === "HEARING";

  return {
    caseId: caseId ?? result.matchedCaseId,
    title: isHearing
      ? (result.documentType ?? "변론기일")
      : (result.deadlineType ?? result.documentType ?? "제출기한"),
    scheduleType,
    date: (isHearing
      ? result.hearingDate
      : (result.submissionDeadline ?? result.hearingDate)) ?? "",
    time: isHearing ? toTimeInput(result.hearingTime) : "",
    location: [result.court, result.division].filter(Boolean).join(" "),
    memo: [result.caseNumber, result.caseName].filter(Boolean).join(" · "),
  };
}

const inputClassName =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-300";

export default function CourtNoticeUploadModal({
  onClose,
  onCreated,
}: CourtNoticeUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caseOptions, setCaseOptions] = useState<{ id: number; title: string }[]>([]);
  const [caseId, setCaseId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CourtDocumentAnalysis | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    listMyCases({ size: 200 })
      .then((page) =>
        setCaseOptions(
          page.content.map((item) => ({ id: item.id, title: item.title })),
        ),
      )
      .catch(() => {
        // the case can still be left unselected
      });
  }, []);

  const handleFileChange = (selected: File | null) => {
    setError("");
    if (!selected) return;

    const extension = selected.name.slice(selected.name.lastIndexOf(".")).toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      setError("PDF, JPG, PNG 파일만 올릴 수 있어요.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("10MB 이하 파일만 올릴 수 있어요.");
      return;
    }
    setFile(selected);
  };

  // each call spends AI credit, so only on explicit click and never while one is in flight
  const handleAnalyze = async () => {
    if (!file || isAnalyzing) return;

    setIsAnalyzing(true);
    setError("");
    try {
      const result = await analyzeCourtDocument(file);
      if (!result.success) {
        setError(result.message || "문서에서 일정을 찾지 못했어요. 다른 파일로 시도해주세요.");
        return;
      }
      setAnalysis(result);
      setDraft(toDraft(result, caseId));
    } catch {
      setError("문서를 분석하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!draft || isSaving) return;
    if (!draft.title.trim() || !draft.date) {
      setError("일정 이름과 날짜를 확인해주세요.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      await createSchedule({
        caseId: draft.caseId ?? undefined,
        title: draft.title.trim(),
        scheduleType: draft.scheduleType,
        eventDate: draft.date,
        eventTime: draft.time ? toEventTime(draft.time) : undefined,
        location: draft.location.trim() || undefined,
        memo: draft.memo.trim() || undefined,
      });
      onCreated?.();
      onClose();
    } catch {
      setError("일정을 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateDraft = (patch: Partial<Draft>) =>
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));

  const caseSelect = (value: number | null, onChange: (id: number | null) => void) => (
    <select
      value={value ?? ""}
      onChange={(event) =>
        onChange(event.target.value ? Number(event.target.value) : null)
      }
      className={`${inputClassName} ${value ? "" : "text-gray-400"}`}
    >
      <option value="">사건을 선택해주세요 (선택)</option>
      {caseOptions.map((option) => (
        <option key={option.id} value={option.id} className="text-gray-800">
          {option.title}
        </option>
      ))}
    </select>
  );

  return (
    <div data-modal className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="scrollbar-none flex max-h-[90vh] w-full max-w-lg flex-col gap-5 overflow-y-auto rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900">
              {draft ? "추출된 일정 확인" : "법원 통지서에서 일정 자동 등록"}
            </h2>
            <p className="text-sm text-gray-500">
              {draft
                ? "AI가 읽은 내용을 확인·수정한 뒤 저장하세요."
                : "통지서를 올리면 AI가 일정을 읽고, 확인한 일정만 사건에 저장합니다."}
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        {draft && analysis ? (
          <>
            {(analysis.documentType || analysis.caseNumber) && (
              <div className="flex flex-col gap-1 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                {analysis.documentType && (
                  <p className="font-semibold text-gray-800">{analysis.documentType}</p>
                )}
                {analysis.caseNumber && (
                  <p>
                    {[analysis.caseNumber, analysis.caseName].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            )}

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-800">등록할 사건</span>
              {caseSelect(draft.caseId, (id) => updateDraft({ caseId: id }))}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-800">일정 이름</span>
              <input
                value={draft.title}
                onChange={(event) => updateDraft({ title: event.target.value })}
                className={inputClassName}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-800">일정 종류</span>
              <select
                value={draft.scheduleType}
                onChange={(event) =>
                  updateDraft({ scheduleType: event.target.value as ScheduleType })
                }
                className={inputClassName}
              >
                {scheduleTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-800">날짜</span>
                <input
                  type="date"
                  value={draft.date}
                  onChange={(event) => updateDraft({ date: event.target.value })}
                  className={inputClassName}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-800">시간 (선택)</span>
                <input
                  type="time"
                  value={draft.time}
                  onChange={(event) => updateDraft({ time: event.target.value })}
                  className={inputClassName}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-800">장소</span>
              <input
                value={draft.location}
                onChange={(event) => updateDraft({ location: event.target.value })}
                placeholder="법원·재판부"
                className={inputClassName}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-800">메모</span>
              <input
                value={draft.memo}
                onChange={(event) => updateDraft({ memo: event.target.value })}
                className={inputClassName}
              />
            </label>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setAnalysis(null);
                  setDraft(null);
                  setError("");
                }}
                className="flex-1 rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                다른 파일 올리기
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-300 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
              >
                <CheckButtonIcon />
                {isSaving ? "저장 중..." : "일정 저장"}
              </button>
            </div>
          </>
        ) : (
          <>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-800">등록할 사건</span>
              {caseSelect(caseId, setCaseId)}
            </label>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="flex flex-col items-center justify-center gap-3 rounded-[14px] border border-dashed border-gray-200 bg-gray-50 py-10 text-center disabled:opacity-60"
              >
                <UploadIcon />
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-gray-500">
                    {file?.name ?? "파일 선택"}
                  </span>
                  <span className="text-xs text-gray-400">
                    PDF, JPG, PNG (최대 10MB)
                  </span>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS.join(",")}
                className="hidden"
                onChange={(event) => {
                  handleFileChange(event.target.files?.[0] ?? null);
                  event.target.value = "";
                }}
              />
            </div>

            <div className="flex flex-col gap-2 rounded-xl bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-400">
                자동으로 추출하는 정보
              </p>
              <ul className="flex flex-col gap-1.5">
                {extractedInfo.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-blue-400"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className="flex w-full shrink-0 items-center justify-center gap-1 rounded-lg bg-blue-300 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAnalyzing ? "분석 중... (최대 수십 초 걸릴 수 있어요)" : "분석하기"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import type { PrecedentCitation } from "@/shared/api/citations";
import { fieldCls, fieldHintCls, fieldTextareaCls } from "../../../ui/shared/formStyles";
import StepHeader from "../../../ui/shared/StepHeader";
import { emptyCitedPrecedent, type BriefForm } from "../../lib/types";
import { useCaseCitations, useEvidenceUpload, useExhibitStart } from "../../lib/useEvidenceStepData";
import type { FormChangeHandler } from "../../../shared/formTypes";
import { removeAt, updateAt } from "../../../shared/listUtils";

type EvidenceStepProps = {
  form: BriefForm;
  onChange: FormChangeHandler<BriefForm>;
  caseId: number | null;
};

const citationText = (citation: PrecedentCitation) =>
  `${citation.court} ${citation.decisionDate} 선고 ${citation.caseNo} 판결`;

export default function EvidenceStep({ form, onChange, caseId }: EvidenceStepProps) {
  const [draft, setDraft] = useState("");
  const [editingStart, setEditingStart] = useState(false);

  const isPlaintiff = form.submitterRole === "plaintiff";
  const prefix = isPlaintiff ? "갑" : "을";
  const partyType = isPlaintiff ? "GAP" : "EUL";
  const startNo = Number(form.evidenceStartNo) || 1;
  const lastUsedNo = Math.max(1, startNo - 1);

  const isAutoStart = useExhibitStart(caseId, partyType, (no) => onChange("evidenceStartNo", no));
  const citations = useCaseCitations(caseId);
  const upload = useEvidenceUpload(caseId, partyType, (names) => onChange("newEvidence", [...form.newEvidence, ...names]));

  const addEvidence = () => {
    const name = draft.trim();
    if (!name) return;
    onChange("newEvidence", [...form.newEvidence, name]);
    setDraft("");
  };
  const removeEvidence = (index: number) => onChange("newEvidence", removeAt(form.newEvidence, index));

  const isCited = (citation: PrecedentCitation) => form.citedPrecedents.some((p) => p.caseNo === citationText(citation));
  const toggleCitation = (citation: PrecedentCitation) => {
    const text = citationText(citation);
    if (isCited(citation)) {
      onChange("citedPrecedents", form.citedPrecedents.filter((p) => p.caseNo !== text));
      return;
    }
    const precedent = { ...emptyCitedPrecedent(), caseNo: text, summary: citation.referenceNote || citation.name };
    onChange("citedPrecedents", [...form.citedPrecedents, precedent]);
  };

  const updatePrecedent = (index: number, key: "caseNo" | "summary", value: string) =>
    onChange("citedPrecedents", updateAt(form.citedPrecedents, index, { [key]: value }));
  const addPrecedent = () => onChange("citedPrecedents", [...form.citedPrecedents, emptyCitedPrecedent()]);
  const removePrecedent = (index: number) => onChange("citedPrecedents", removeAt(form.citedPrecedents, index));

  return (
    <div className="flex flex-col gap-6">
      <StepHeader index={3} title="증거 · 판례 첨부" />

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-gray-700">이번에 함께 낼 증거</span>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg bg-gray-50 px-4 py-3 text-sm">
          <span className="text-gray-500">시작 호증 번호</span>
          {editingStart ? (
            <span className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                className={`${fieldCls} !h-9 !w-24`}
                value={startNo}
                onChange={(e) => onChange("evidenceStartNo", e.target.value)}
              />
              <button type="button" onClick={() => setEditingStart(false)} className="text-xs text-gray-400 underline">
                완료
              </button>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <b className="font-semibold text-blue-500">
                {prefix} 제{startNo}호증
              </b>
              <button type="button" onClick={() => setEditingStart(true)} className="text-xs text-gray-400 underline">
                수정
              </button>
            </span>
          )}
          <span className="ml-auto text-xs text-gray-400">
            {isAutoStart
              ? `이 사건에서 ${prefix} 제${lastUsedNo}호증까지 이미 냈어요 — 사건 기록에서 세어 맞췄습니다.`
              : `이 사건에서 ${prefix} 제${lastUsedNo}호증까지 이미 냈다면 ${startNo}을 입력해주세요.`}
          </span>
        </div>

        {caseId !== null && (
          <>
            <label
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-[10px] border border-dashed border-gray-200 bg-gray-50 py-6 text-center ${
                upload.uploading ? "pointer-events-none opacity-60" : "hover:border-blue-300"
              }`}
            >
              <svg className="h-8 w-8 text-gray-300" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21V6M10 12l6-6 6 6M5 21v4a1 1 0 001 1h20a1 1 0 001-1v-4" />
              </svg>
              <span className="text-base font-semibold text-gray-500">
                {upload.uploading ? "올리는 중…" : "파일을 드래그하거나 클릭하여 업로드"}
              </span>
              <span className="text-xs text-gray-400">PDF, JPG, PNG, DOCX (최대 10MB)</span>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                className="hidden"
                onChange={(e) => {
                  void upload.upload(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
            {upload.error && <p className="text-xs text-red-500">{upload.error}</p>}
            <p className="rounded-lg bg-blue-50 px-4 py-2 text-xs leading-[1.5] text-blue-300">
              올린 파일의 이름이 곧 서증명이 되어 입증방법란에 «{prefix} 제{startNo}호증 …» 순서로 들어갑니다. 올려서 순서를
              바꾸면 번호도 따라 바뀝니다. 알아보기 쉬운 이름으로 고쳐 주세요. 파일은 증빙자료에 보관되지만 실제 제출은
              전자소송포털에 직접 올리셔야 합니다.
            </p>
          </>
        )}

        <div className="flex gap-2">
          <input
            className={fieldCls}
            placeholder="예: 목적물 인도 확인서"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              addEvidence();
            }}
          />
          <button
            type="button"
            onClick={addEvidence}
            className="shrink-0 rounded-[10px] border border-gray-200 px-4 text-sm font-semibold text-gray-500 hover:bg-gray-50"
          >
            추가
          </button>
        </div>
        {caseId === null && <span className={fieldHintCls}>사건을 선택하고 들어오면 파일도 바로 올릴 수 있어요.</span>}

        {form.newEvidence.map((name, index) => (
          <div key={`${name}-${index}`} className="flex items-center gap-2.5 rounded-[10px] border border-gray-200 bg-white p-2.5">
            <span className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-400">
              {prefix} 제{startNo + index}호증
            </span>
            <span className="min-w-0 flex-1 text-sm text-gray-800">{name}</span>
            <button
              type="button"
              onClick={() => removeEvidence(index)}
              className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
              aria-label="삭제"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">인용할 판례</span>
          <button
            type="button"
            onClick={addPrecedent}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50"
          >
            + 직접 추가
          </button>
        </div>

        {citations.map((citation) => {
          const picked = isCited(citation);
          return (
            <button
              key={citation.id}
              type="button"
              onClick={() => toggleCitation(citation)}
              className={`flex items-center justify-between gap-3 rounded-[10px] border px-4 py-3 text-left ${
                picked ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-gray-700">{citation.name}</span>
                <span className="block text-xs text-gray-400">{citationText(citation)}</span>
              </span>
              <span className={`shrink-0 text-xs font-semibold ${picked ? "text-blue-500" : "text-gray-400"}`}>
                {picked ? "✓ 인용 중" : "인용하기"}
              </span>
            </button>
          );
        })}

        {form.citedPrecedents.length === 0 && citations.length === 0 && (
          <p className="rounded-[10px] border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-400">
            아직 추천할 판례가 없어요. 쟁점을 먼저 고르거나, 판례 검색에서 [내 문서에 인용]으로 담아 오세요.
          </p>
        )}

        {form.citedPrecedents.map((precedent, index) => (
          <div key={precedent.id} className="flex flex-col gap-2 rounded-[10px] border border-gray-200 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-300">판례 {index + 1}</span>
              <button type="button" onClick={() => removePrecedent(index)} className="text-xs text-gray-400 hover:text-red-500">
                삭제
              </button>
            </div>
            <input
              className={fieldCls}
              placeholder="예: 대법원 2026. 5. 8. 선고 2025다220329 판결"
              value={precedent.caseNo}
              onChange={(e) => updatePrecedent(index, "caseNo", e.target.value)}
            />
            <textarea
              rows={2}
              className={fieldTextareaCls}
              placeholder="이 판례가 무엇을 판단했는지 한두 문장으로 요약해주세요."
              value={precedent.summary}
              onChange={(e) => updatePrecedent(index, "summary", e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { inputCls, labelCls } from "../../shared/formStyles";
import { emptyCitedPrecedent, type BriefForm } from "../lib/types";

type EvidenceStepProps = {
  form: BriefForm;
  onChange: <K extends keyof BriefForm>(key: K, value: BriefForm[K]) => void;
};

export default function EvidenceStep({ form, onChange }: EvidenceStepProps) {
  const [draft, setDraft] = useState("");
  const prefix = form.submitterRole === "plaintiff" ? "갑" : "을";
  const startNo = Number(form.evidenceStartNo) || 1;

  const addEvidence = () => {
    const name = draft.trim();
    if (!name) return;
    onChange("newEvidence", [...form.newEvidence, name]);
    setDraft("");
  };
  const removeEvidence = (index: number) => onChange("newEvidence", form.newEvidence.filter((_, i) => i !== index));

  const updatePrecedent = (index: number, key: "caseNo" | "summary", value: string) =>
    onChange(
      "citedPrecedents",
      form.citedPrecedents.map((p, i) => (i === index ? { ...p, [key]: value } : p)),
    );
  const addPrecedent = () => onChange("citedPrecedents", [...form.citedPrecedents, emptyCitedPrecedent()]);
  const removePrecedent = (index: number) => onChange("citedPrecedents", form.citedPrecedents.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">증거 · 판례 첨부</h3>
        <p className="mt-1 text-sm text-gray-500">이 사건에서 이미 낸 증거 다음 번호부터 이어서 매겨져요.</p>
      </div>

      <label className="block max-w-[220px]">
        <span className={labelCls}>시작 호증 번호</span>
        <input
          type="number"
          min={1}
          className={inputCls}
          value={form.evidenceStartNo}
          onChange={(e) => onChange("evidenceStartNo", e.target.value)}
        />
        <span className="mt-1.5 block text-xs text-gray-400">
          이 사건에서 {prefix} 제{Math.max(1, startNo - 1)}호증까지 이미 냈다면 {startNo}을 입력해주세요.
        </span>
      </label>

      <div>
        <span className={labelCls}>이번에 함께 낼 증거</span>
        <div className="flex gap-2">
          <input
            className={inputCls}
            placeholder="예: 목적물 인도 확인서"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addEvidence();
              }
            }}
          />
          <button
            type="button"
            onClick={addEvidence}
            className="shrink-0 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            추가
          </button>
        </div>

        {form.newEvidence.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {form.newEvidence.map((name, index) => (
              <div key={`${name}-${index}`} className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-2.5">
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
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className={labelCls}>인용할 판례 (선택)</span>
          <button
            type="button"
            onClick={addPrecedent}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            + 판례 추가
          </button>
        </div>

        {form.citedPrecedents.length === 0 && (
          <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-400">
            인용할 판례가 있으면 추가해주세요. 없어도 준비서면을 완성할 수 있어요.
          </p>
        )}

        {form.citedPrecedents.map((precedent, index) => (
          <div key={precedent.id} className="mt-2 flex flex-col gap-2 rounded-xl border border-gray-200 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-500">판례 {index + 1}</span>
              <button type="button" onClick={() => removePrecedent(index)} className="text-xs text-gray-400 hover:text-red-500">
                삭제
              </button>
            </div>
            <input
              className={inputCls}
              placeholder="예: 대법원 2026. 5. 8. 선고 2025다220329 판결"
              value={precedent.caseNo}
              onChange={(e) => updatePrecedent(index, "caseNo", e.target.value)}
            />
            <textarea
              rows={2}
              className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
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

import { useState } from "react";
import CheckIcon from "@/assets/icons/case-search/check-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import {
  accuracyStyles,
  getAccuracyLevel,
  getAccuracyPercent,
} from "../../data/accuracy";
import { checklistMeta, type ChecklistId } from "../../data/checklistMeta";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

type AnalysisInfoCardProps = {
  caseTitle: string;
};

export default function AnalysisInfoCard({
  caseTitle,
}: AnalysisInfoCardProps) {
  const [context, setContext] = useState("");
  const checkedItems = useCaseSearchStore((state) => state.checkedItems);
  const onAnalyze = useCaseSearchStore((state) => state.analyze);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const accuracy = getAccuracyLevel(checkedCount);
  const style = accuracyStyles[accuracy];
  const percent = getAccuracyPercent(checkedCount);

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-300 text-xs font-semibold text-white">
            2
          </span>
          분석에 사용할 정보
        </h2>
        <span
          className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${style.badge}`}
        >
          정확도 {accuracy}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-1 w-full rounded-full bg-gray-100">
          <div
            className={`h-1 rounded-full transition-all ${style.bar}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          정보가 많을수록 유사 판례 관련도·정확도가 올라가요.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {(Object.keys(checklistMeta) as ChecklistId[]).map((id) => {
          const meta = checklistMeta[id];
          const checked = checkedItems[id];

          return (
            <div
              key={id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                {checked ? (
                  <Icon icon={CheckIcon} size={20} />
                ) : (
                  <span className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300" />
                )}
                <div className="flex flex-col gap-0.5">
                  <p className="font-semibold text-gray-900">{meta.title}</p>
                  <p className="text-sm text-gray-500">
                    {checked
                      ? meta.doneDescription()
                      : meta.pendingDescription}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-700">
          맥락 추가 (선택) — 자유롭게 적으면 정확도가 더 올라가요
        </p>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={3}
          placeholder="예: 명도는 완료했는데 임대인이 원상회복 비용을 이유로 보증금 반환을 미루고 있어요."
          className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm text-gray-700 outline-none placeholder:text-gray-500 focus:border-blue-400"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={() => onAnalyze(context.trim() || caseTitle)}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-400 px-5 py-2.5 text-sm font-semibold text-white"
        >
          이 정보로 유사 판례 분석
        </button>
      </div>
    </section>
  );
}

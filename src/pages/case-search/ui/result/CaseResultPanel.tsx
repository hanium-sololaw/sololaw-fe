import { useState } from "react";
import ShineIcon from "@/assets/icons/case-search/shine-line-icon.svg?react";

import Icon from "@/shared/ui/Icon";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";
import CaseResultCard from "../shared/CaseResultCard";

type ResultTab = "search" | "saved";

export default function CaseResultPanel() {
  const hasAnalyzed = useCaseSearchStore((state) => state.hasAnalyzed);
  const analyzeError = useCaseSearchStore((state) => state.analyzeError);
  const cases = useCaseSearchStore((state) => state.cases);
  const casesTotal = useCaseSearchStore((state) => state.casesTotal);
  const savedCaseIds = useCaseSearchStore((state) => state.savedCaseIds);
  const toggleSavedCase = useCaseSearchStore((state) => state.toggleSavedCase);
  const citedCaseIds = useCaseSearchStore((state) => state.citedCaseIds);
  const toggleCitedCase = useCaseSearchStore((state) => state.toggleCitedCase);
  const [resultTab, setResultTab] = useState<ResultTab>("search");
  const savedCases = cases.filter((item) => savedCaseIds.has(item.id));

  if (!hasAnalyzed) {
    return (
      <section className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white px-8 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Icon icon={ShineIcon} size={28} />
        </div>
        <p className="text-lg font-semibold text-gray-900 mt-1">
          아직 분석 전이에요
        </p>
        <p className="text-sm text-gray-500">
          위 정보를 확인하고 [이 정보로 유사 판례 분석]을 누르면 관련 판례와
          통계가 여기에 표시됩니다.
        </p>
      </section>
    );
  }

  if (analyzeError) {
    return (
      <section className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-red-200 bg-red-50 px-8 py-16 text-center">
        <p className="text-base font-semibold text-red-500">유사 판례 분석에 실패했어요</p>
        <p className="text-sm text-red-400">{analyzeError} 잠시 후 다시 시도해주세요.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {resultTab === "saved" ? "저장한 판례" : "내 사건과 유사한 판례"}{" "}
            <span className="text-blue-500">
              {resultTab === "saved" ? savedCases.length : casesTotal}건
            </span>
          </h2>
          {resultTab === "search" && cases.length > 0 && casesTotal > cases.length && (
            <p className="mt-1 text-xs text-gray-400">
              관련도 높은 상위 {cases.length}건을 표시하고 있어요.
            </p>
          )}
        </div>
        <div className="flex gap-1 self-start rounded-lg bg-gray-100 p-1 text-sm">
          <button
            type="button"
            onClick={() => setResultTab("search")}
            className={`rounded-md px-3 py-1.5 ${
              resultTab === "search"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            검색 결과
          </button>
          <button
            type="button"
            onClick={() => setResultTab("saved")}
            className={`rounded-md px-3 py-1.5 ${
              resultTab === "saved"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            저장됨({savedCases.length})
          </button>
        </div>
      </div>

      {resultTab === "saved" ? (
        savedCases.length === 0 ? (
          <p className="rounded-xl bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">
            아직 저장한 판례가 없어요.
          </p>
        ) : (
          <>
            <div className="h-px bg-gray-200" />
            {savedCases.map((item) => (
              <CaseResultCard
                key={item.id}
                title={item.title}
                outcome={item.outcome}
                court={item.court}
                caseNumber={item.caseNumber}
                date={item.date}
                relevance={item.relevance}
                summary={item.summary}
                detailUrl={item.detailUrl}
                cited={citedCaseIds.has(item.id)}
                onToggleCite={() => toggleCitedCase(item)}
                saved
                onToggleSave={() => toggleSavedCase(item.id)}
              />
            ))}
          </>
        )
      ) : cases.length === 0 ? (
        <p className="rounded-xl bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">
          입력하신 사건과 관련된 공개 판례를 찾지 못했어요.
        </p>
      ) : (
        cases.map((item) => (
          <CaseResultCard
            key={item.id}
            title={item.title}
            outcome={item.outcome}
            court={item.court}
            caseNumber={item.caseNumber}
            date={item.date}
            relevance={item.relevance}
            summary={item.summary}
            detailUrl={item.detailUrl}
            cited={citedCaseIds.has(item.id)}
            onToggleCite={() => toggleCitedCase(item)}
            saved={savedCaseIds.has(item.id)}
            onToggleSave={() => toggleSavedCase(item.id)}
          />
        ))
      )}
    </section>
  );
}

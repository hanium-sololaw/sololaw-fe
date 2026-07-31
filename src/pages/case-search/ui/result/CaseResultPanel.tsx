import { useState } from "react";
import ShineIcon from "@/assets/icons/case-search/shine-line-icon.svg?react";
import LockIcon from "@/assets/icons/case-search/lock-icon.svg?react";
import CrownIcon from "@/assets/icons/case-search/crown-icon.svg?react";

import Icon from "@/shared/ui/Icon";
import { mockCases, lockedCaseCount } from "../../data/mockCases";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";
import CaseResultCard from "../shared/CaseResultCard";

type ResultTab = "search" | "saved";

export default function CaseResultPanel() {
  const hasAnalyzed = useCaseSearchStore((state) => state.hasAnalyzed);
  const [resultTab, setResultTab] = useState<ResultTab>("search");

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

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          내 사건과 유사한 판례{" "}
          <span className="text-blue-500">{mockCases.length}건</span>
        </h2>
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1 text-sm">
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
            저장됨
          </button>
        </div>
      </div>

      {resultTab === "saved" ? (
        <p className="rounded-xl bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">
          아직 저장한 판례가 없어요.
        </p>
      ) : (
        <>
          {mockCases.map((item) => (
            <CaseResultCard
              key={item.id}
              title={item.title}
              outcome={item.outcome}
              court={item.court}
              caseNumber={item.caseNumber}
              date={item.date}
              relevance={item.relevance}
              summary={item.summary}
            />
          ))}

          <div className="flex items-center justify-between gap-4 rounded-lg border border-blue-100 bg-white px-5 py-4">
            <div className="flex items-center gap-5">
              <Icon
                icon={LockIcon}
                size={22}
                className="text-blue-500"
              />
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-blue-500">
                  유사 판례 {lockedCaseCount}건이 더 있어요
                </p>
                <p className="text-sm text-gray-400">관련성 보통</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl border border-blue-100 bg-transparent px-4 py-3 text-sm font-semibold text-blue-500 shadow-none"
              >
                <Icon icon={CrownIcon} size={15} />
                프리미엄으로 전체 보기 →
              </button>
              <p className="text-xs text-gray-400">
                월 9,900원 · 언제든 해지
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

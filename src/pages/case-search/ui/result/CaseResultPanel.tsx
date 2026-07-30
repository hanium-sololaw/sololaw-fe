import { useState } from "react";
import ShineIcon from "@/assets/icons/case-search/shine-line-icon.svg?react";
import PaperIcon from "@/assets/icons/case-search/paper-icon.svg?react";
import CopyIcon from "@/assets/icons/case-search/copy-icon.svg?react";
import StarIcon from "@/assets/icons/case-search/star-icon.svg?react";

import Icon from "@/shared/ui/Icon";
import {
  mockCases,
  outcomeStyles,
  lockedCaseCount,
} from "../../data/mockCases";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

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
        <h2 className="text-lg font-semibold text-gray-900">
          내 사건과 유사한 판례 {mockCases.length}건
        </h2>
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1 text-sm font-medium">
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
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="flex items-center gap-2 font-semibold text-gray-900">
                  {item.title}
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${outcomeStyles[item.outcome]}`}
                  >
                    {item.outcome}
                  </span>
                </p>
                <a href="#" className="shrink-0 text-sm text-gray-400">
                  원문보기 ↗
                </a>
              </div>

              <p className="flex flex-wrap items-center gap-x-2 text-sm text-gray-500">
                <span>{item.court}</span>
                <span>·</span>
                <span>{item.caseNumber}</span>
                <span>·</span>
                <span>{item.date}</span>
                <span
                  className={`ml-1 ${item.relevance === "높음" ? "text-blue-500" : "text-gray-400"}`}
                >
                  ★ 관련성 {item.relevance}
                </span>
              </p>

              <div className="bg-gray-50 px-3.5 py-3 rounded-lg">
                <p className="text-sm font-500 text-gray-600">{item.summary}</p>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-400 px-3 py-2 text-xs font-semibold text-white"
                >
                  <Icon icon={PaperIcon} size={14} className="text-white" />내
                  문서에 인용
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600"
                >
                  <Icon icon={CopyIcon} size={13} />
                  복사
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600"
                >
                  <Icon icon={StarIcon} size={13} />
                  저장
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 py-6 text-center">
            <p className="text-sm font-medium text-gray-600">
              🔒 유사 판례 {lockedCaseCount}건이 더 있어요
              <br />
              <span className="text-xs font-normal text-gray-400">
                관련성 보통
              </span>
            </p>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-blue-400 px-4 py-2 text-sm font-semibold text-white"
            >
              👑 프리미엄으로 전체 보기 →
            </button>
            <p className="text-xs text-gray-400">월 9,900원 · 언제든 해지</p>
          </div>
        </>
      )}
    </section>
  );
}

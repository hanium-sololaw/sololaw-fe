import { useState } from "react";
import ShineIcon from "@/assets/icons/case-search/shine-line-icon.svg?react";
import PaperIcon from "@/assets/icons/case-search/paper-icon.svg?react";
import CopyIcon from "@/assets/icons/case-search/copy-icon.svg?react";
import StarLineIcon from "@/assets/icons/case-search/star-line-icon.svg?react";
import StarSolidIcon from "@/assets/icons/case-search/star-solid-icon.svg?react";
import ArrowUpRightIcon from "@/assets/icons/shared/tabler-arrow-up.svg?react";
import LockIcon from "@/assets/icons/case-search/lock-icon.svg?react";
import CrownIcon from "@/assets/icons/case-search/crown-icon.svg?react";
import BuildingIcon from "@/assets/icons/case-search/building-icon.svg?react";
import PaperTextIcon from "@/assets/icons/case-search/paper-text-icon.svg?react";
import DateIcon from "@/assets/icons/case-search/date-icon.svg?react";

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
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="flex items-center gap-2 font-semibold text-gray-900">
                  {item.title}
                  <span
                    className={`shrink-0 rounded-xl px-3 py-1 text-xs font-semibold ${outcomeStyles[item.outcome]}`}
                  >
                    {item.outcome}
                  </span>
                </p>
                <a
                  href="#"
                  className="flex shrink-0 items-center text-sm text-gray-500"
                >
                  원문보기
                  <Icon icon={ArrowUpRightIcon} size={20} />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <p className="flex flex-wrap items-center gap-x-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Icon icon={BuildingIcon} size={14} />
                    {item.court}
                  </span>

                  <span className="flex items-center gap-1">
                    <Icon icon={PaperTextIcon} size={14} />
                    {item.caseNumber}
                  </span>

                  <span className="flex items-center gap-1">
                    <Icon icon={DateIcon} size={14} />
                    {item.date}
                  </span>
                </p>
                <span className="flex items-center gap-1 rounded-xl text-xs font-semibold text-yellow-500">
                  <Icon icon={StarSolidIcon} size={14} />
                  관련성 {item.relevance}
                </span>
              </div>

              <div className="bg-gray-50 px-3.5 py-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  {item.summary}
                </p>
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
                  <Icon icon={StarLineIcon} size={13} />
                  저장
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between gap-4 rounded-lg border border-blue-100 bg-white px-5 py-4">
            <div className="flex items-center gap-5">
              <Icon
                icon={LockIcon}
                size={22}
                className="shrink-0 text-blue-500"
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

import { useState } from "react";
import DocumentIcon from "@/assets/icons/shared/document-icon.svg?react";
import PaperIcon from "@/assets/icons/case-search/paper-icon.svg?react";
import ShineSolidIcon from "@/assets/icons/case-search/shine-solid-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

export default function SimilarCaseAnalysis() {
  const [situation, setSituation] = useState("");
  const analyze = useCaseSearchStore((state) => state.analyze);

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          분석할 내 사건 선택
        </h2>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-500">
          AI 분석
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-5">
        <div className="flex items-center gap-3">
          <DocumentIcon className="h-6 w-6 text-gray-500" />
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-gray-800">등록된 사건이 없어요</p>
            <p className="text-sm text-gray-500">
              판례를 분석하려면 먼저 내 사건을 등록해야 해요.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-400 px-4 py-2.5 text-sm text-white"
        >
          <DocumentIcon className="h-4 w-4" />새 사건 만들기
        </button>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        또는
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-blue-500">
          <Icon icon={ShineSolidIcon} size={16} />
          사건 등록 없이, 상황만 적고 바로 분석하기
        </p>

        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          rows={3}
          placeholder="예: 임대차 계약이 끝나서 집을 비워줬는데, 집주인이 원상회복 비용을 이유로 보증금 1,000만 원을 돌려주지 않고 있어요."
          className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400"
        />

        <button
          type="button"
          disabled={situation.trim() === ""}
          onClick={() => analyze()}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-400 py-3.5 text-base text-white disabled:bg-blue-200"
        >
          <Icon icon={PaperIcon} size={16} className="text-white" />이 내용으로
          유사 판례 분석
        </button>

        <p className="text-center text-xs text-gray-400">
          직접 입력만으로 분석하면 정확도가 낮을 수 있어요. 사건을 등록하면
          소장·증거까지 반영돼 더 정확해져요.
        </p>
      </div>
    </section>
  );
}

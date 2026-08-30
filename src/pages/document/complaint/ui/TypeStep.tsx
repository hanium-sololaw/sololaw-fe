import { useMemo, useState } from "react";
import Icon from "@/shared/ui/Icon";
import SearchIcon from "@/assets/icons/case-search/search-icon.svg?react";
import StarIcon from "@/assets/icons/case-search/star-line-icon.svg?react";
import ChevronLeftIcon from "@/assets/icons/document/chevron-left-icon.svg?react";
import ChevronRightIcon from "@/assets/icons/document/chevron-right-icon.svg?react";
import ComplaintGuideModal from "./ComplaintGuideModal";
import { complaintTypes } from "../lib/complaintTypes";
import type { ComplaintType } from "../lib/complaintTypes";
import type { ComplaintTypeId } from "../lib/types";

type TypeStepProps = {
  onPick: (id: ComplaintTypeId, situation: string) => void;
  onBack: () => void;
};

export default function TypeStep({ onPick, onBack }: TypeStepProps) {
  const [query, setQuery] = useState("");
  const [guideType, setGuideType] = useState<ComplaintType | null>(null);

  const visibleTypes = useMemo(() => {
    const q = query.trim();
    if (!q) return complaintTypes;
    return complaintTypes.filter(
      (type) => type.title.includes(q) || type.description.includes(q),
    );
  }, [query]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 self-start text-sm text-gray-500 hover:text-gray-700"
      >
        <Icon icon={ChevronLeftIcon} size={16} />
        문서 종류 다시 고르기
      </button>

      <h1 className="text-center text-2xl font-bold text-gray-900">
        어떤 유형의 소장을 작성할까요?
      </h1>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="찾으시려는 유형의 소장을 입력해주세요."
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-5 pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none"
        />
        <Icon
          icon={SearchIcon}
          size={20}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white">
        {visibleTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => setGuideType(type)}
            className="flex w-full items-center gap-3 border-b border-gray-100 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-gray-50"
          >
            <Icon icon={StarIcon} size={18} className="shrink-0 text-gray-300" />
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-gray-900">{type.title}</span>
              <span className="mt-0.5 block text-sm text-gray-500">{type.description}</span>
            </span>
            <Icon icon={ChevronRightIcon} size={18} className="shrink-0 text-gray-300" />
          </button>
        ))}
        {visibleTypes.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-gray-400">검색 결과가 없습니다.</p>
        )}
      </div>

      <p className="text-center text-xs leading-relaxed text-gray-400">
        현재 지원하는 소장 유형은 계속 확대되고 있습니다.
        <br />
        필요한 소장 유형을 순차적으로 추가해 나갈 예정입니다.
      </p>

      {guideType && (
        <ComplaintGuideModal
          type={guideType}
          onClose={() => setGuideType(null)}
          onConfirm={(situation) => onPick(guideType.id, situation)}
        />
      )}
    </div>
  );
}

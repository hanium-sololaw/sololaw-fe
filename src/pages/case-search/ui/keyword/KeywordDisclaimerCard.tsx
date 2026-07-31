import Icon from "@/shared/ui/Icon";
import AboutIcon from "@/assets/icons/case-search/about-icon.svg?react";

export default function KeywordDisclaimerCard() {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-blue-700">
        <Icon icon={AboutIcon} size={16} />
        검색 결과는 참고 자료입니다
      </p>
      <p className="text-sm text-blue-600">
        공개된 일부 판례·법령을 대상으로 하며, 승소 가능성이나 통계는
        제공하지 않습니다. 검색 결과가 전체 판례를 대표하지 않으니, 구체적
        적용은 반드시 직접·전문가 검토가 필요합니다.
      </p>
    </div>
  );
}

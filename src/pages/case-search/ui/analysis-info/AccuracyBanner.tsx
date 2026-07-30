import Icon from "@/shared/ui/Icon";
import WarningIcon from "@/assets/icons/case-search/warning-icon.svg?react";
import { getAccuracyLevel } from "../../data/accuracy";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

export default function AccuracyBanner() {
  const checkedItems = useCaseSearchStore((state) => state.checkedItems);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const accuracy = getAccuracyLevel(checkedCount);

  if (accuracy === "낮음") {
    return (
      <div>
        <p className="flex items-center gap-1.5 rounded-xl bg-red-50 px-5 py-3 text-sm text-red-500">
          <Icon icon={WarningIcon} size={16} className="shrink-0" />
          정보가 적어 관련 판례 정확도가 낮을 수 있어요. 소장을
          작성·업로드하거나 사건 상황을 적으면 더 정확해집니다.
        </p>
      </div>
    );
  }

  if (accuracy === "높음") {
    return (
      <p className="rounded-xl bg-blue-50 px-5 py-3 text-sm text-blue-500">
        소장·증거까지 충분한 정보로 분석했어요. 사건 쟁점과 가장 관련도 높은
        판례를 보여드립니다.
      </p>
    );
  }

  return null;
}

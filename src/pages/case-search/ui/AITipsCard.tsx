import LightIcon from "@/assets/icons/case-search/light-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import { aiTips } from "../data/aiTips";

export default function AITipsCard() {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-yellow-700">
        <Icon icon={LightIcon} size={18} className="text-yellow-500" />
        AI 팁
      </h2>

      <ul className="flex flex-col gap-2">
        {aiTips.map((tip) => (
          <li
            key={tip}
            className="flex gap-2 text-sm text-yellow-800 before:content-['•']"
          >
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

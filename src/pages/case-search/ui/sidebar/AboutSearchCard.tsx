import AboutIcon from "@/assets/icons/case-search/about-icon.svg?react";
import Icon from "@/shared/ui/Icon";
import { aboutItems } from "../../data/aboutItems";

export default function AboutSearchCard() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
        <Icon icon={AboutIcon} size={16} />이 검색에 대하여
      </h2>

      <dl className="flex flex-col gap-4">
        {aboutItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <dt className="text-sm font-bold text-gray-700">{item.label}</dt>
            <dd className="text-sm text-gray-500">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

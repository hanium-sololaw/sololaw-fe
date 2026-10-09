import Icon from "@/shared/ui/Icon";
import ChevronTopIcon from "@/assets/icons/document/chevron-top-icon.svg?react";
import { FIRST_TIME_STEPS } from "./helpers";

export default function FirstTimeCard() {
  return (
    <details className="group rounded-2xl border border-gray-200 bg-white px-5 py-4" open>
      <summary className="flex cursor-pointer list-none items-start gap-3 border-b border-gray-100 py-[9px]">
        <span className="flex-1 text-[15px] leading-[1.6] font-bold tracking-[-0.225px] text-gray-900">
          전자소송, 처음이신가요?
        </span>
        <Icon icon={ChevronTopIcon} size={20} className="rotate-180 transition-transform group-open:rotate-0" />
      </summary>
      <ol>
        {FIRST_TIME_STEPS.map((step, index) => (
          <li key={step.title} className="flex items-center gap-3 py-3">
            <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded bg-gray-50 text-base font-semibold text-gray-300">
              {index + 1}
            </span>
            <div>
              <p className="text-sm leading-[1.6] font-bold text-gray-900">{step.title}</p>
              <p className="text-[13px] leading-[1.6] font-medium text-gray-500">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}

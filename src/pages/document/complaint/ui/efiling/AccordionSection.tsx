import type { ReactNode } from "react";
import Icon from "@/shared/ui/Icon";
import ChevronTopIcon from "@/assets/icons/document/chevron-top-icon.svg?react";

export default function AccordionSection({
  index,
  title,
  hint,
  children,
}: {
  index: number;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <details className="group py-1" open>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-2 py-2">
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-400">
            {index}
          </span>
          <span className="font-semibold text-gray-900">{title}</span>
        </span>
        <Icon
          icon={ChevronTopIcon}
          size={20}
          className="mt-0.5 shrink-0 rotate-180 transition-transform group-open:rotate-0"
        />
      </summary>
      <div className="pb-2 pl-8">
        {hint && <p className="mb-2 text-xs text-gray-400">{hint}</p>}
        {children}
      </div>
    </details>
  );
}

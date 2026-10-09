import type { ReactNode } from "react";

type StepHeaderProps = {
  index: number;
  title: string;
  remaining?: number;
  description?: ReactNode;
};

export default function StepHeader({ index, title, remaining = 0, description }: StepHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800">
          <span className="grid h-[22px] w-[22px] place-items-center rounded bg-blue-50 text-base text-blue-300">
            {index}
          </span>
          {title}
        </h3>
        {remaining > 0 && (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
            필수 {remaining}개 남음
          </span>
        )}
      </div>
      {description && <p className="text-xs text-gray-400">{description}</p>}
    </div>
  );
}

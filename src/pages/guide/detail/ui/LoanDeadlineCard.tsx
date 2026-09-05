import { useState } from "react";
import CalendarIcon from "@/assets/icons/lawsuit/calendar-icon.svg?react";
import DateField from "@/shared/ui/DateField";
import type {
  LoanDeadlineItem,
  LoanStepDetail,
} from "../data/mockLoanGuideDetail";

type LoanDeadlineCardProps = {
  deadline: LoanStepDetail["deadline"];
  helperNote: string;
};

const dateFieldTriggerClassName =
  "flex w-fit items-center gap-8 rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-left text-base leading-[normal] font-medium outline-none focus:border-blue-400";

function DeadlineItemBox({ item }: { item: LoanDeadlineItem }) {
  const [baseDate, setBaseDate] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-100 bg-white p-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-justify text-base leading-[160%] font-medium text-gray-700">
            {item.title}
          </span>
          <span className="flex items-center gap-1 rounded bg-gray-50 px-1 text-xs leading-[160%] font-semibold text-gray-400">
            {item.roleBadge}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xs leading-[160%] font-medium text-gray-600">
            {item.periodLabel}
          </span>
          <span className="text-xs leading-[160%] font-semibold text-blue-300">
            {item.period}
          </span>
        </div>

        <span className="w-fit text-xs leading-[160%] font-medium text-gray-300">
          {item.noteTag}
        </span>

        <p className="text-[13px] leading-[160%] font-medium text-gray-500">
          {item.description}
        </p>
      </div>

      <DateField
        value={baseDate}
        onChange={setBaseDate}
        triggerClassName={dateFieldTriggerClassName}
        valueTextClassName="text-gray-800"
        placeholderTextClassName="text-gray-300"
        icon={CalendarIcon}
        iconPosition="right"
      />
    </div>
  );
}

export default function LoanDeadlineCard({
  deadline,
  helperNote,
}: LoanDeadlineCardProps) {
  return (
    <section className="rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <span className="flex aspect-square h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-center text-base leading-7 font-semibold text-blue-300">
          1
        </span>
        <h2 className="text-base font-semibold text-gray-900">
          이 단계에서 챙길 기한
        </h2>
      </div>

      {deadline.type === "notice" ? (
        <div className="mt-4 flex flex-col gap-1 rounded-2xl border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-900">
            {deadline.heading}
          </p>
          <p className="text-sm text-gray-500">{deadline.body}</p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {deadline.items.map((item) => (
            <DeadlineItemBox key={item.title} item={item} />
          ))}
        </div>
      )}

      <p className="mt-3 text-xs leading-[160%] font-medium text-gray-400">
        {helperNote}
      </p>
    </section>
  );
}

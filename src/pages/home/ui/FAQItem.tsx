import { useState } from "react";
import Icon from "@/shared/ui/Icon";
import ArrowBottomIcon from "@/assets/icons/arrow_bottom.svg?react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[16px] text-gray-700 font-semibold">
          {question}
        </span>
        <Icon
          icon={ArrowBottomIcon}
          size={20}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-gray-600 leading-relaxed pb-5 pr-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

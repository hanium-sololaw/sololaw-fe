import { useState } from "react";
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
        <ArrowBottomIcon
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-5 pr-6">
          {answer}
        </p>
      )}
    </div>
  );
}

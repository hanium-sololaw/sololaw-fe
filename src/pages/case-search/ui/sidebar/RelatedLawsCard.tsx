import BookIcon from "@/assets/icons/shared/book-icon.svg?react";
import { relatedLaws } from "../../data/relatedLaws";

export default function RelatedLawsCard() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
        <BookIcon className="h-4 w-4 text-gray-900" />
        관련 법령
      </h2>

      <div className="flex flex-col gap-3">
        {relatedLaws.map((law) => (
          <div key={law.id} className="rounded-xl border border-gray-200 p-3.5">
            <p className="font-semibold text-gray-900 mb-1">{law.title}</p>
            <p className="text-sm text-gray-500 font-[14px]">
              {law.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

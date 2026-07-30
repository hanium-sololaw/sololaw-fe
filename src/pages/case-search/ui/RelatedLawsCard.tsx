import BookIcon from "@/assets/icons/shared/book-icon.svg?react";

const relatedLaws = [
  {
    id: "1",
    title: "민법 제618조 (임대차의 의의)",
    description: "관련 가능성이 있는 조항입니다",
  },
  {
    id: "2",
    title: "주택임대차보호법 제3조의2 (보증금의 회수)",
    description: "관련 가능성이 있는 조항입니다",
  },
  {
    id: "3",
    title: "민사소송법 제251조 (장래 이행의 소)",
    description: "관련 가능성이 있는 조항입니다",
  },
];

export default function RelatedLawsCard() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
        <BookIcon className="h-4 w-4 text-gray-500" />
        관련 법령
      </h2>

      <div className="flex flex-col gap-3">
        {relatedLaws.map((law) => (
          <div
            key={law.id}
            className="rounded-xl border border-gray-200 p-3.5"
          >
            <p className="font-semibold text-gray-800">{law.title}</p>
            <p className="text-sm text-gray-400">{law.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

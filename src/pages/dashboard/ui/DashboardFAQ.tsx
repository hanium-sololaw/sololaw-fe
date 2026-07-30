import ChatIcon from "@/assets/icons/dashboard/chat-icon.svg?react";
import ArrowRightIcon from "@/assets/icons/dashboard/arrow-right.svg?react";

type FAQItem = {
  id: string;
  title: string;
  views: number;
};

const faqItems: FAQItem[] = [
  {
    id: "1",
    title: "재판 준비서면 작성 방법은?",
    views: 512,
  },
  {
    id: "2",
    title: "다음 변론을 추가로 제출하려면?",
    views: 324,
  },
  {
    id: "3",
    title: "증거 제출은 왜 중요할까요?",
    views: 289,
  },
  {
    id: "4",
    title: "준비서면 작성시 주의할 점은?",
    views: 156,
  },
];

export default function DashboardFAQ() {
  return (
    <section
      className="
        relative
        overflow-hidden
        flex flex-col gap-4
        rounded-[20px]
        border border-gray-200
        bg-white
        px-6.5
        py-6
        shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-8
          right-8
          bottom-3
          h-16
          rounded-[28px]
          bg-[linear-gradient(180deg,transparent_0%,#F6FAFF_35%,#E8F2FF_100%)]
          blur-xl
        "
      />
      <h2 className="text-lg font-semibold text-gray-900">
        질문이 많은 — 자주 묻는 질문
      </h2>

      <div className="flex flex-col gap-3 z-10">
        {faqItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="
              w-full
              flex flex-col gap-1 items-start
              rounded-[10px]
              border border-gray-200
              bg-white
              p-3
            "
          >
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex gap-2">
                <ChatIcon className="mt-1 shrink-0" />
                <p className="text-base font-medium text-gray-800">
                  {item.title}
                </p>
              </div>

              <ArrowRightIcon className="shrink-0" />
            </div>

            <p className="text-sm text-gray-400">조회 {item.views}회</p>
          </button>
        ))}
      </div>
    </section>
  );
}

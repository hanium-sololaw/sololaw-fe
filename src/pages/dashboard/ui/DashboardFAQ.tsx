import { useState } from "react";
import ChatIcon from "@/assets/icons/dashboard/chat-icon.svg?react";
import ArrowRightIcon from "@/assets/icons/dashboard/arrow-right.svg?react";

type FAQItem = {
  id: string;
  title: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    id: "1",
    title: "재판 준비서면 작성 방법은?",
    answer:
      "상대방 주장에 대한 반박과 내 주장을 사실관계 → 법률적 근거 → 결론 순서로 정리해요. 주장마다 뒷받침하는 증거 번호(갑 제1호증 등)를 함께 적어 주세요. 문서 작성 메뉴에서 AI 초안을 받아 수정할 수 있어요.",
  },
  {
    id: "2",
    title: "다음 변론을 추가로 제출하려면?",
    answer:
      "변론기일 전에 준비서면과 추가 증거를 법원에 제출하면 돼요. 보통 기일 7일 전까지 제출하는 것이 좋고, 전자소송 사이트에서 사건번호로 접수할 수 있어요.",
  },
  {
    id: "3",
    title: "증거 제출은 왜 중요할까요?",
    answer:
      "법원은 제출된 증거를 바탕으로 사실관계를 판단해요. 주장만 있고 증거가 없으면 인정받기 어렵기 때문에 계약서·문자·이체내역 등 관련 자료를 빠짐없이 정리해 제출하는 것이 중요해요.",
  },
  {
    id: "4",
    title: "준비서면 작성시 주의할 점은?",
    answer:
      "감정적인 표현은 피하고 사실과 증거 위주로 간결하게 작성해요. 사건번호·당사자 표시를 정확히 기재하고, 이전에 제출한 주장과 모순되지 않는지 확인해 주세요.",
  },
];

export default function DashboardFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

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
        {faqItems.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-[10px] border border-gray-200 bg-white"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-2 px-3 py-5 text-left"
              >
                <div className="flex items-center gap-2">
                  <ChatIcon className="shrink-0" />
                  <p className="text-base text-gray-800">{item.title}</p>
                </div>

                <ArrowRightIcon
                  className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-3 pb-4 text-sm leading-relaxed text-gray-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

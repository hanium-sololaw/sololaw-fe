import { FAQ_ITEMS } from "../dummy/faq";
import SectionHeader from "./SectionHeader";
import FAQItem from "./FAQItem";

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          title="자주 묻는 질문"
          description="나홀로법에 서비스에 대해 궁금하신 점을 확인해보세요"
        />

        <div className="bg-white rounded-xl px-6">
          {FAQ_ITEMS.map((item) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    question: '나홀로법에는 어떤 서비스인가요?',
    answer:
      '나홀로법에는 변호사 없이 혼자 소송을 준비하는 분들을 위한 AI 기반 법률 지원 서비스입니다. 문서 작성부터 절차 안내, 증빙자료 관리까지 소송 준비에 필요한 모든 과정을 돕습니다.',
  },
  {
    question: 'AI가 생성한 법률 문서를 그대로 사용해도 되나요?',
    answer:
      'AI가 생성한 문서는 참고용으로 제공되며, 실제 법적 효력을 위해서는 내용을 검토하고 필요 시 법률 전문가의 확인을 받으시길 권장합니다.',
  },
  {
    question: '어떤 종류의 소송에 도움을 줄 수 있나요?',
    answer:
      '민사소송(대여금, 임금, 손해배상 등), 소액사건, 임차권 관련 소송 등 다양한 나홀로 소송 유형을 지원합니다. 지원 범위는 지속적으로 확대되고 있습니다.',
  },
  {
    question: '업로드한 개인정보와 자료는 안전하게 관리되나요?',
    answer:
      '모든 개인정보와 문서는 암호화되어 안전하게 저장되며, 개인정보보호법에 따라 엄격하게 관리됩니다. 사용자의 동의 없이 제3자에게 제공되지 않습니다.',
  },
  {
    question: '법률 문서 작성 경험이 전혀 없어도 이용할 수 있나요?',
    answer:
      '네, 법률 지식이 없어도 쉽게 이용할 수 있도록 설계되었습니다. 단계별 안내와 AI 질문 응답을 통해 필요한 정보를 입력하면 자동으로 문서가 완성됩니다.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[15px] text-gray-800">{question}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-5 pr-6">{answer}</p>
      )}
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">자주 묻는 질문</h2>
          <p className="text-sm text-gray-500">나홀로법에 서비스에 대해 궁금하신 점을 확인해보세요</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 px-6">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

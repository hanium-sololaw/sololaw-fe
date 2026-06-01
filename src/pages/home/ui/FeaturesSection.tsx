import { useState } from 'react'

const FEATURES = [
  {
    id: 0,
    label: '증빙 자료 관리',
    title: '증빙 자료 관리',
    description: '소송에 필요한 증거 자료와 서류를 체계적으로 업로드하고 분류하여 언제든지 확인할 수 있습니다.',
    bgColor: 'bg-slate-100',
    iconColor: 'text-slate-400',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 1,
    label: 'AI 법률 문서 생성',
    title: 'AI 법률 문서 생성',
    description: '소송 유형 및 사용자 상황을 분석하여 소장, 준비서면 등 주요 법률 문서를 자동 생성합니다.',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-400',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 8h10M7 12h6" />
      </svg>
    ),
  },
  {
    id: 2,
    label: '일정 관리',
    title: '일정 관리',
    description: '재판 기일, 서류 제출 마감일 등 소송 관련 일정을 한눈에 확인하고 알림을 받을 수 있습니다.',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-400',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeLinecap="round" strokeWidth="2" />
      </svg>
    ),
  },
]

export default function FeaturesSection() {
  const [active, setActive] = useState(1)

  const prev = () => setActive((i) => (i - 1 + FEATURES.length) % FEATURES.length)
  const next = () => setActive((i) => (i + 1) % FEATURES.length)

  const order = [
    (active - 1 + FEATURES.length) % FEATURES.length,
    active,
    (active + 1) % FEATURES.length,
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">소송 준비, 이렇게 도와드려요</h2>
          <p className="text-sm text-gray-500">나홀로 소송에 필요한 모든 기능을 하나의 플랫폼에서</p>
        </div>

        <div className="relative flex items-center justify-center gap-4 mb-10">
          <button
            onClick={prev}
            className="absolute left-0 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex items-end justify-center gap-4 w-full px-14">
            {order.map((featureIdx, position) => {
              const feature = FEATURES[featureIdx]
              const isCenter = position === 1
              return (
                <button
                  key={feature.id}
                  onClick={() => setActive(featureIdx)}
                  className={`flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 text-left ${
                    isCenter
                      ? 'w-[320px] h-[200px] shadow-lg ring-2 ring-blue-500'
                      : 'w-[200px] h-[140px] opacity-60 hover:opacity-80'
                  } ${feature.bgColor}`}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-3">
                    <div className={feature.iconColor}>{feature.icon}</div>
                    <span className={`font-medium text-gray-700 ${isCenter ? 'text-[15px]' : 'text-sm'}`}>
                      {feature.label}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <button
            onClick={next}
            className="absolute right-0 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{FEATURES[active].title}</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">{FEATURES[active].description}</p>
        </div>
      </div>
    </section>
  )
}

export default function ServiceSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">혼자 준비하는 소송을 위해</h2>
          <p className="text-sm text-gray-500">나홀로 소송에 꼭 필요한 법률 서류를 한곳에서 제공합니다</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-[45%] flex-shrink-0">
            <div className="rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="md:flex-1 space-y-5">
            <p className="text-[15px] text-gray-700 leading-relaxed">
              나홀로 소송은 변호사 없이 직접 준비해야 하는 감정 절차를 이해하고
              필요한 서류를 준비하는 과정이 쉽지 않습니다.
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              나홀로법에는 이러한 부담을 덜기 위해 만들어진{' '}
              <span className="font-semibold text-gray-900">AI 기반 나홀로 소송 지원 서비스</span>{' '}
              입니다.
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              문서 작성부터 판례법원 분석, 절차 안내, 증빙자료 관리까지 소송 준비에
              필요한 모든 과정을 한곳에서 쉽고 명확하게 도와드립니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

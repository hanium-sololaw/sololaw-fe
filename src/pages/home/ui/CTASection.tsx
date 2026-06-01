import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-blue-600">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">지금 바로 시작하세요</h2>
        <p className="text-blue-100 text-sm leading-relaxed mb-8">
          복잡한 소송 준비, 나홀로법에와 함께라면 쉽고 간편합니다
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-medium text-sm px-8 py-3 rounded-md transition-colors"
        >
          무료로 시작하기 →
        </Link>
      </div>
    </section>
  )
}

import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-blue-900">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-50 mb-[28px]">
          지금 바로 시작하세요
        </h2>
        <p className="text-gray-50 leading-relaxed mb-[24px]">
          복잡한 소송 준비, 나홀로법에와 함께라면 쉽고 간편합니다
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 font-medium text-md px-5 py-4 text-white transition-opacity hover:opacity-80 rounded-[8px] border border-white/50 bg-white/10 backdrop-blur-[5px]"
        >
          무료로 시작하기 →
        </Link>
      </div>
    </section>
  );
}

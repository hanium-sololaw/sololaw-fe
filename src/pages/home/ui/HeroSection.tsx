import hero from "@/assets/images/hero.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
      <img
        src={hero}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center text-white px-4">
        <p className="text-base text-gray-200 mb-3">
          혼자 준비하는 소송의 시작
        </p>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          가장 든든한 법률 파트너와 함께
        </h1>
        <p className="text-sm text-gray-300 mb-8">
          복잡한 소송 절차부터 문서 작성까지, AI가 단계별로 집에 도와드립니다
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-gray-900 text-sm font-medium px-6 py-3 rounded-md transition-colors"
        >
          지금 시작하기 →
        </Link>
      </div>
    </section>
  );
}

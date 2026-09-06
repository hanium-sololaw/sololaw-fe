import hero from "@/assets/images/home/hero.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[656px] flex items-center justify-center overflow-hidden">
      <img
        src={hero}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl font-bold leading-tight mb-4">
          혼자 준비하는 소송의 시작 <br /> 가장 든든한 법률 파트너와 함께
        </h1>
        <p className="text-lg text-[#F9FAFB] mb-8">
          복잡한 소송 절차부터 문서 작성까지, AI가 단계별로 함께 도와드립니다
        </p>
        <Link
          to="/login"
          className="
    inline-flex items-center gap-[10px]
    px-6 py-3
    rounded-[8px]
    border border-white/50
    bg-white/10
    backdrop-blur-[5px]
    font-semibold
    hover:bg-white
    hover:text-gray-900
  "
        >
          <span>지금 시작하기</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}

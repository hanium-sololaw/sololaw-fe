import service from "@/assets/images/home/service.png";
import SectionHeader from "./SectionHeader";

export default function ServiceSection() {
  return (
    <section id="service" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="혼자 준비하는 소송을 위해"
          description="나홀로 소송에 꼭 필요한 법률 서류를 한곳에서 제공합니다"
        />

        <div className="flex flex-col sm:flex-row gap-10 items-center">
          <div className="sm:w-[45%] flex-shrink-0">
            <div className="rounded-xl overflow-hidden aspect-[16/9]">
              <img
                src={service}
                alt="나홀로 소송 서비스"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="sm:flex-1 space-y-5">
            <p className="text-[15px] text-gray-700 leading-relaxed">
              나홀로 소송은 변호사 없이 직접 준비해야 하는 감정 절차를 이해하고
              필요한 서류를 준비하는 과정이 쉽지 않습니다.
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              나홀로법에는 이러한 부담을 덜기 위해 만들어진{" "}
              <span className="font-semibold text-gray-900">
                AI 기반 나홀로 소송 지원 서비스
              </span>{" "}
              입니다.
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              문서 작성부터 판례법원 분석, 절차 안내, 증빙자료 관리까지 소송
              준비에 필요한 모든 과정을 한곳에서 쉽고 명확하게 도와드립니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

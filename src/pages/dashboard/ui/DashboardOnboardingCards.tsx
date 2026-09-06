import caseImage from "@/assets/dashboard/onboarding-case.svg";
import documentImage from "@/assets/dashboard/onboarding-document.svg";
import evidenceImage from "@/assets/dashboard/onboarding-evidence.svg";

const cards = [
  {
    id: "case",
    title: "사건 등록",
    description: "소송 유형·상대방·청구금액을 입력해 사건을 만들어요.",
    image: caseImage,
    imageClassName: "w-[240px]",
  },
  {
    id: "document",
    title: "문서 작성",
    description: "AI가 소장·준비서면·증거목록 초안을 형식에 맞춰 생성해요.",
    image: documentImage,
    imageClassName: "w-[216px]",
  },
  {
    id: "evidence",
    title: "증거·일정 관리",
    description: "증거를 정리하고 변론기일·제출기한 알림을 받아요.",
    image: evidenceImage,
    imageClassName: "w-[208px]",
  },
];

export default function DashboardOnboardingCards() {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-6 lg:grid-cols-3">
      {cards.map(({ id, title, description, image, imageClassName }) => (
        <div
          key={id}
          className="flex h-[264px] min-w-0 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white px-7 pt-6"
        >
          <h3 className="text-xl font-bold text-gray-600">{title}</h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">{description}</p>

          <div className="mt-5 flex min-h-0 flex-1 justify-center" aria-hidden="true">
            <img
              src={image}
              alt=""
              className={`${imageClassName} block h-auto max-w-full shrink-0 self-start`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

import CaseImage from "@/assets/dashboard/empty-state-case.svg?react";
import DocumentImage from "@/assets/dashboard/empty-state-document.svg?react";
import EvidenceImage from "@/assets/dashboard/empty-state-evidence.svg?react";

type OnboardingCard = {
  id: string;
  title: string;
  description: string;
  Image: typeof CaseImage;
};

const cards: OnboardingCard[] = [
  {
    id: "case",
    title: "사건 등록",
    description: "소송 유형·상대방·청구금액을 입력해 사건을 만들어요.",
    Image: CaseImage,
  },
  {
    id: "document",
    title: "문서 작성",
    description: "AI가 소장·준비서면·증거목록 초안을 형식에 맞춰 생성해요.",
    Image: DocumentImage,
  },
  {
    id: "evidence",
    title: "증거·일정 관리",
    description: "증거를 정리하고 변론기일·제출기한 알림을 받아요.",
    Image: EvidenceImage,
  },
];

export default function DashboardOnboardingCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map(({ id, title, description, Image }) => (
        <div
          key={id}
          className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6"
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>

          <div className="flex flex-1 items-center justify-center py-2">
            <Image className="h-24 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

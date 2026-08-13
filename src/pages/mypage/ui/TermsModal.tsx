import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";

type TermsModalProps = {
  onClose: () => void;
};

const termsSections = [
  {
    title: "제1조 (목적)",
    body: '본 약관은 나홀로법에(이하 "서비스")가 제공하는 AI 기반 나홀로 소송 지원 서비스의 이용 조건 및 절차를 규정함을 목적으로 합니다.',
  },
  {
    title: "제2조 (서비스의 성격)",
    body: "본 서비스가 제공하는 모든 정보와 생성 문서는 법률 자문이 아니며, 사용자의 문서 작성을 보조하는 도구로서 기능합니다. 최종적인 법적 판단과 책임은 이용자 본인에게 있습니다.",
  },
  {
    title: "제3조 (면책)",
    body: "서비스는 AI 특성상 일부 부정확한 내용이 포함될 수 있으며, 이에 따른 결과에 대해 책임지지 않습니다. 복잡한 사안은 법률 전문가와 상담하시기 바랍니다.",
  },
];

export default function TermsModal({ onClose }: TermsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">서비스 이용약관</h2>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {termsSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-gray-800">
                {section.title}
              </h3>
              <p className="text-sm font-normal text-gray-600">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] bg-blue-300 px-4.5 py-2.5 text-sm font-semibold text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

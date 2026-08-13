import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";

type PrivacyModalProps = {
  onClose: () => void;
};

const privacySections = [
  {
    title: "1. 수집 항목",
    body: "이름, 이메일, 아이디, 사용자가 업로드한 소송 관련 문서 및 증거 자료.",
  },
  {
    title: "2. 이용 목적",
    body: "소송 준비 지원(문서 생성, 판례 분석, 일정 관리) 제공 목적에 한해 사용합니다.",
  },
  {
    title: "3. 보관 및 보호",
    body: "업로드된 자료는 암호화되어 보관되며, 증거에 포함된 제3자 개인정보는 자동 탐지하여 마킹을 안내합니다.",
  },
  {
    title: "4. 파기",
    body: "회원 탈퇴 또는 보관 목적 달성 시 지체 없이 파기합니다.",
  },
];

export default function PrivacyModal({ onClose }: PrivacyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">개인정보처리방침</h2>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {privacySections.map((section) => (
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

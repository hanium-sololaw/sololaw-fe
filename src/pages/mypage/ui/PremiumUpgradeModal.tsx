import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";

type PremiumUpgradeModalProps = {
  onClose: () => void;
};

const sharedDescription =
  "판례의 관련성 설명·저장·내 문서 인용과 국가법령정보센터 원문 연결을 제공합니다.";

export default function PremiumUpgradeModal({
  onClose,
}: PremiumUpgradeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-gray-700">
              판례검색 이용권
            </h2>
            <p className="text-sm text-gray-500">
              증빙자료 저장공간과 별도로 운영되는 판례검색 전용 구독입니다.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="grid grid-cols-1 items-center gap-3.5 sm:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[inset_0_6px_6px_-2px_rgba(101,106,118,0.15),inset_0_-20px_20px_-6px_rgba(255,255,255,0.49),inset_0_-40px_100px_-8px_rgba(212,212,212,0.40),inset_0_-80px_60px_-25px_#FFF]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600">
                  기본 검색
                </span>
                <span className="text-xs font-semibold text-blue-400">
                  현재 이용권
                </span>
              </div>

              <div className="border-b border-gray-100 pb-3">
                <span className="text-[28px] font-bold text-gray-900">
                  무료
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm leading-[1.6] font-medium text-gray-700">
                내 사건과 유사한 판례를 검색당 최대 5건까지 확인
              </p>
              <p className="text-sm leading-[1.6] font-medium text-gray-500">
                {sharedDescription}
              </p>
            </div>

            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="w-full rounded-[10px] py-3 text-sm font-bold text-transparent invisible"
            >
              판례검색 프리미엄 시작
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[inset_0_6px_6px_-2px_rgba(35,101,255,0.15),inset_0_-20px_20px_-6px_rgba(255,255,255,0.40),inset_0_-40px_10px_-8px_rgba(0,77,255,0.50),inset_0_-80px_60px_-25px_#144CCD]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-400">
                  판례검색 프리미엄
                </span>
                <span className="rounded-sm bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-300 backdrop-blur-sm">
                  추천
                </span>
              </div>

              <div className="border-b border-blue-100 pb-3">
                <span className="text-[28px] font-bold text-blue-400">
                  14,900원
                </span>
                <span className="pb-1 text-sm text-blue-300"> / 월</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm leading-[1.6] font-medium text-gray-700">
                내 사건 유사판례의 전체 검색 결과와 공식 원문을 연속해서 확인
              </p>
              <p className="text-sm leading-[1.6] font-medium text-gray-500">
                {sharedDescription}
              </p>
            </div>

            <button
              type="button"
              className="w-full rounded-[10px] bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              판례검색 프리미엄 시작
            </button>
          </div>
        </div>

        <p className="text-start text-sm font-normal text-gray-400">
          표시 가격은 부가세 포함 기준입니다.
          <br />
          판례검색 구독을 해지해도 저장공간 요금제와 보관 중인 증빙자료에는
          영향을 주지 않습니다.
        </p>
      </div>
    </div>
  );
}

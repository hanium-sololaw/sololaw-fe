import ShieldIcon from "@/assets/icons/mypage/shield-icon.svg?react";
import LogoutIcon from "@/assets/icons/mypage/logout-icon.svg?react";

export default function AccountFooter() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-start gap-2 rounded-2xl border border-gray-200 bg-white p-4.5">
        <ShieldIcon />
        <p className="text-sm text-gray-600">
          본 서비스가 제공하는 정보와 생성 문서는 법률 자문이 아니며
          참고용입니다. 최종 판단과 책임은 이용자 본인에게 있습니다.
        </p>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white p-4.5 text-base font-bold text-red-500  hover:bg-gray-50"
      >
        <LogoutIcon />
        로그아웃
      </button>
    </div>
  );
}

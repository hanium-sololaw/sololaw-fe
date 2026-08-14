import MoveIcon from "@/assets/icons/schedule/move-icon.svg?react";

const relatedLinks = ["답변서 제출 의무", "준비절차의 기간 지정"];

export default function ScheduleNoticeBanner() {
  return (
    <section className="flex flex-col gap-2 rounded-[20px] border border-gray-200 bg-white p-5">
      <h2 className="text-base font-semibold text-gray-900">
        소장을 제출했다고 준비서면 기한이 자동으로 생기지는 않아요.
      </h2>
      <p className="text-sm leading-[1.6] text-gray-500">
        법원은 사건에 따라 답변서 부본, 기일통지서, 석명준비명령·보정명령 등을
        보냅니다. 피고의 답변서 30일은 소장 제출일이 아니라 소장 부본을 송달받은
        날부터 계산합니다. 이 화면은 통지서에 실제로 적힌 날짜만 후보로
        추출하고, 확인한 뒤 등록합니다.
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-5">
        {relatedLinks.map((label) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-600"
          >
            {label}
            <MoveIcon />
          </button>
        ))}
      </div>
    </section>
  );
}

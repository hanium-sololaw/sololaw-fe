import { useNavigate } from "react-router-dom";
import BannerSvg from "@/assets/dashboard/banner-1.svg?react";
import BannerWideSvg from "@/assets/dashboard/banner-2.svg?react";
import ArrowUpRightIcon from "@/assets/icons/shared/tabler-arrow-up.svg?react";
import DiamondIcon from "@/assets/icons/dashboard/search-icon.svg?react";

type AiTask = {
  label: string;
  urgent?: boolean;
};

const aiTasks: AiTask[] = [
  {
    label: "준비서면 작성 권장",
    urgent: true,
  },
  {
    label: "증거 보완 권장",
  },
  {
    label: "답변 예정 권장하기",
  },
];

export default function DashboardBanner() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-4">
      {/* 왼쪽 */}
      <div>
        <div className="grid h-full w-full">
          <BannerWideSvg className="col-start-1 row-start-1 lg:hidden" />
          <BannerSvg className="col-start-1 row-start-1 hidden lg:block" />

          <div className="col-start-1 row-start-1 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/document/brief")}
              className="flex h-14 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 text-lg font-semibold text-gray-600 shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.10),inset_0_-10px_50px_-6px_rgba(255,255,255,0.40),inset_0_-40px_30px_-8px_#E2E8F0,inset_0_-80px_60px_-30px_#F7F9FF]"
            >
              바로 작성하러 가기
              <ArrowUpRightIcon className="text-gray-400" />
            </button>
          </div>

          <div className="col-start-1 row-start-1 flex h-full flex-col px-10 py-6 pointer-events-none">
            <div className="flex flex-1 flex-col justify-center gap-2.25">
              <p className="text-3xl leading-tight font-semibold text-blue-400">
                준비서면 제출 D-3
                <br />
                지금 바로 작성하세요!
              </p>

              <p className="text-sm text-gray-500">
                서울중앙지방법원 2024가단12345 | 7월 1일(월) 오전 10시까지 제출
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex h-45 w-139.25 flex-col gap-2.5 rounded-2xl border border-gray-200 bg-white px-8.5 pt-4 pb-5 shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.10),inset_0_-10px_50px_-6px_rgba(255,255,255,0.40),inset_0_-40px_30px_-8px_#E2E8F0,inset_0_-80px_60px_-30px_#F7F9FF]">
        <div className="flex items-center gap-3">
          <DiamondIcon />

          <p className="text-xl font-semibold text-blue-400">
            AI가 제안 주요 작업
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {aiTasks.map((task) => (
            <button
              key={task.label}
              className="flex h-9.25 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-1.75 text-sm text-blue-400"
            >
              {task.label}

              {task.urgent ? (
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                  긴급
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

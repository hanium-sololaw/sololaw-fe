import { useNavigate } from "react-router-dom";
import BannerSvg from "@/assets/dashboard/banner-1.svg?react";
import BannerWideSvg from "@/assets/dashboard/banner-2.svg?react";
import ArrowUpRightIcon from "@/assets/icons/shared/tabler-arrow-up.svg?react";
import DiamondIcon from "@/assets/icons/dashboard/search-icon.svg?react";
import { formatDDay } from "@/pages/schedule/lib/scheduleMapping";
import { useNextDeadline, type NextDeadline } from "../hook/useNextDeadline";
import { useSuggestedTasks } from "../hook/useSuggestedTasks";
import { documentRouteFor } from "../lib/documentRoute";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function formatDeadlineDate({ schedule }: NextDeadline): string {
  const [year, month, day] = schedule.eventDate.split("-").map(Number);
  const weekday = WEEKDAY_LABELS[new Date(year, month - 1, day).getDay()];
  const datePart = `${month}월 ${day}일(${weekday})`;
  if (!schedule.eventTime) return `${datePart}까지 제출`;

  const { hour, minute } = schedule.eventTime;
  const period = hour < 12 ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const minutePart = minute ? ` ${minute}분` : "";
  return `${datePart} ${period} ${hour12}시${minutePart}까지 제출`;
}

export default function DashboardBanner() {
  const navigate = useNavigate();
  const { deadline, isLoading } = useNextDeadline();
  const suggestedTasks = useSuggestedTasks();

  const subline = deadline
    ? [
        [deadline.court, deadline.caseNumber].filter(Boolean).join(" "),
        formatDeadlineDate(deadline),
      ]
        .filter(Boolean)
        .join(" | ")
    : "법원 통지서를 등록하면 제출 기한을 계산해 알려드려요.";

  return (
    // wraps the suggestion card below the banner when there isn't room beside it; items-stretch
    // matches the banner's height while side by side, and lets it shrink to its content once wrapped
    <div className="flex flex-wrap items-stretch gap-4">
      {/* 왼쪽 */}
      <div className="shrink-0">
        <div className="grid h-full w-full">
          <BannerWideSvg className="col-start-1 row-start-1 lg:hidden" />
          <BannerSvg className="col-start-1 row-start-1 hidden lg:block" />

          <div className="col-start-1 row-start-1 flex justify-end">
            <button
              type="button"
              onClick={() =>
                navigate(
                  deadline
                    ? documentRouteFor(
                        deadline.schedule.title,
                        deadline.schedule.caseId,
                      )
                    : "/schedule",
                )
              }
              className="flex h-14 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 text-lg font-semibold text-gray-600 shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.10),inset_0_-10px_50px_-6px_rgba(255,255,255,0.40),inset_0_-40px_30px_-8px_#E2E8F0,inset_0_-80px_60px_-30px_#F7F9FF]"
            >
              {deadline || isLoading ? "바로 작성하러 가기" : "일정 등록하러 가기"}
              <ArrowUpRightIcon className="text-gray-400" />
            </button>
          </div>

          <div className="col-start-1 row-start-1 flex h-full flex-col px-10 py-6 pointer-events-none">
            <div className="flex flex-1 flex-col justify-center gap-2.25">
              {!isLoading && (
                <>
                  <p className="max-w-115 text-3xl leading-tight font-semibold text-blue-400">
                    {deadline ? (
                      <>
                        <span className="line-clamp-1">
                          {deadline.schedule.title}{" "}
                          {formatDDay(deadline.schedule.dDay)}
                        </span>
                        지금 바로 작성하세요!
                      </>
                    ) : (
                      <>
                        다가오는 제출 기한이 없어요
                        <br />
                        일정을 등록해 두세요
                      </>
                    )}
                  </p>

                  <p className="line-clamp-1 max-w-150 text-sm text-gray-500">
                    {subline}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex min-w-90 flex-1 flex-col gap-2.5 rounded-2xl border border-gray-200 bg-white px-8.5 pt-4 pb-5 shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.10),inset_0_-10px_50px_-6px_rgba(255,255,255,0.40),inset_0_-40px_30px_-8px_#E2E8F0,inset_0_-80px_60px_-30px_#F7F9FF]">
        <div className="flex items-center gap-3">
          <DiamondIcon />

          <p className="text-xl font-semibold text-blue-400">
            AI가 제안 주요 작업
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {suggestedTasks?.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => navigate(task.to)}
              className="flex h-9.25 max-w-full items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-1.75 text-sm text-blue-400 hover:border-blue-200 hover:bg-blue-50"
            >
              <span className="truncate">{task.label}</span>

              {task.urgent ? (
                <span className="shrink-0 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
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

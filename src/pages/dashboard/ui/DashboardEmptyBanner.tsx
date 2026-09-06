import FolderIcon from "@/assets/dashboard/empty-state-folder.svg?react";
import ArrowUpRightIcon from "@/assets/icons/shared/tabler-arrow-up.svg?react";

type DashboardEmptyBannerProps = {
  onCreateCase: () => void;
};

export default function DashboardEmptyBanner({
  onCreateCase,
}: DashboardEmptyBannerProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCreateCase}
          className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
        >
          새 사건 등록하기
          <ArrowUpRightIcon className="text-gray-400" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-blue-50/40 px-8 py-14 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-500">
          <FolderIcon className="h-7 w-7" />
        </span>

        <p className="text-2xl font-bold text-blue-500">
          아직 진행 중인 사건이 없어요
        </p>

        <p className="text-sm text-gray-500">
          사건을 등록하면 일정·문서·증거를 한 곳에서 관리하고,
          <br />
          AI가 소송 준비를 단계별로 도와드려요.
        </p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";

type NotificationHeaderProps = {
  hasUnread: boolean;
  onMarkAllRead: () => void;
};

export default function NotificationHeader({
  hasUnread,
  onMarkAllRead,
}: NotificationHeaderProps) {
  return (
    <div className="flex items-start justify-between pt-2">
      <div className="flex flex-col gap-2">
        <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
          <Link to="/mypage" className="text-gray-400 hover:text-gray-600">
            마이페이지
          </Link>
          <ChevronRightIcon aria-hidden="true" className="h-6 w-6 shrink-0" />
          <span className="text-blue-400">알림관리</span>
        </h1>
        <p className="text-sm text-gray-400">
          소송 진행에 필요한 알림을 확인하고 설정하세요.
        </p>
      </div>

      <button
        type="button"
        onClick={onMarkAllRead}
        disabled={!hasUnread}
        className="mt-1.5 text-sm font-semibold text-blue-400 disabled:text-gray-300"
      >
        모두 읽음
      </button>
    </div>
  );
}

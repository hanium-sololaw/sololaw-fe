import { useNavigate } from "react-router-dom";
import BellIcon from "@/assets/icons/mypage/bell-icon.svg?react";
import BellActiveIcon from "@/assets/icons/mypage/bell-active-icon.svg?react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import type { Notification, NotificationType } from "@/shared/api/notifications";

const typeLabel: Record<NotificationType, string> = {
  DEADLINE: "제출 기한",
  HEARING: "기일",
  OPPONENT_FILING: "상대방 서면",
  AI_PRECEDENT: "유사 판례",
  EVIDENCE_SUPPLEMENT: "증거 보완",
};

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diffMinutes < 1) return "방금";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}일 전`;

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

type NotificationListProps = {
  items: Notification[];
  hasNext: boolean;
  isLoading: boolean;
  error: string | null;
  onLoadMore: () => void;
  onRead: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function NotificationList({
  items,
  hasNext,
  isLoading,
  error,
  onLoadMore,
  onRead,
  onDelete,
}: NotificationListProps) {
  const navigate = useNavigate();

  const handleClick = (item: Notification) => {
    onRead(item.id);
    if (item.relatedCaseId) navigate(`/case-management/${item.relatedCaseId}`);
  };

  return (
    <section className="flex flex-1 flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3">
      {error && <p className="p-3.5 text-sm text-red-500">{error}</p>}

      {!isLoading && !error && items.length === 0 && (
        <p className="p-3.5 text-sm text-gray-400">아직 받은 알림이 없어요.</p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className={`group flex items-center gap-3 rounded-xl p-3.5 ${
            item.isRead ? "" : "bg-blue-50"
          }`}
        >
          <button
            type="button"
            onClick={() => handleClick(item)}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
          >
            <span
              className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full ${
                item.isRead
                  ? "bg-gray-100 text-gray-400"
                  : "bg-blue-100 text-blue-500"
              }`}
            >
              {item.isRead ? <BellIcon /> : <BellActiveIcon />}
            </span>

            <div className="flex min-w-0 flex-col gap-1">
              <p
                className={`flex items-center gap-1.5 text-base font-semibold ${
                  item.isRead ? "text-gray-600" : "text-gray-900"
                }`}
              >
                <span className="truncate">{item.title}</span>
                {!item.isRead && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />
                )}
              </p>
              <p className="truncate text-sm text-gray-500">
                {[
                  formatRelativeTime(item.createdAt),
                  typeLabel[item.type],
                  item.content,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </button>

          <button
            type="button"
            aria-label="알림 삭제"
            onClick={() => onDelete(item.id)}
            className="shrink-0 rounded-full p-1 text-gray-300 hover:bg-gray-100 hover:text-gray-500"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ))}

      {isLoading && <p className="p-3.5 text-sm text-gray-400">불러오는 중...</p>}

      {!isLoading && hasNext && (
        <button
          type="button"
          onClick={onLoadMore}
          className="mt-1 rounded-xl py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50"
        >
          더 보기
        </button>
      )}
    </section>
  );
}

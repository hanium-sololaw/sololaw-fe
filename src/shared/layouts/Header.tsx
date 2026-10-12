import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AlertIcon from "@/assets/icons/shared/alert-bell-icon.svg?react";
import { getMyProfile, type UserProfile } from "@/shared/api/users";
import {
  getUnreadNotificationCount,
  NOTIFICATIONS_CHANGED_EVENT,
} from "@/shared/api/notifications";

export default function Header() {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  // refetch on navigation and whenever the notifications page reads/deletes something
  useEffect(() => {
    const refresh = () => {
      getUnreadNotificationCount()
        .then(setUnreadCount)
        .catch(() => setUnreadCount(0));
    };

    refresh();
    window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, refresh);
    return () =>
      window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, refresh);
  }, [pathname]);

  return (
    <header className="flex h-16 shrink-0 items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <Link
          to="/mypage/notifications"
          aria-label={
            unreadCount > 0 ? `알림 ${unreadCount}개 읽지 않음` : "알림"
          }
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-900"
        >
          <AlertIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none font-semibold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Link>

        <Link to="/mypage" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[18px] font-semibold text-blue-500">
            {profile?.name.charAt(0) ?? ""}
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900">
              {profile?.name ?? ""}
            </span>
            <span className="text-xs text-gray-500">
              {profile?.email ?? ""}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}

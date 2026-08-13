import BellIcon from "@/assets/icons/mypage/bell-icon.svg?react";
import BellActiveIcon from "@/assets/icons/mypage/bell-active-icon.svg?react";
import { notifications } from "../data/mockNotifications";

export default function NotificationList() {
  return (
    <section className="flex flex-1 flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3">
      {notifications.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 rounded-xl p-3.5 ${
            item.read ? "" : "bg-blue-50"
          }`}
        >
          <span
            className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full ${
              item.read
                ? "bg-gray-100 text-gray-400"
                : "bg-blue-100 text-blue-500"
            }`}
          >
            {item.read ? <BellIcon /> : <BellActiveIcon />}
          </span>

          <div className="flex flex-col gap-1">
            <p
              className={`flex items-center gap-1.5 font-semibold text-base ${
                item.read ? "text-gray-600" : "text-gray-900"
              }`}
            >
              {item.title}
              {!item.read && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              )}
            </p>
            <p className="text-sm text-gray-500">{item.meta}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

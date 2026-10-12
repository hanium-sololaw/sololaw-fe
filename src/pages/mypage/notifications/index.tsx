import NotificationHeader from "./ui/NotificationHeader";
import NotificationList from "./ui/NotificationList";
import NotificationSettings from "./ui/NotificationSettings";
import { useNotifications } from "./hook/useNotifications";

export default function NotificationsPage() {
  const notifications = useNotifications();

  return (
    <div className="flex flex-col gap-10">
      <NotificationHeader
        hasUnread={notifications.items.some((item) => !item.isRead)}
        onMarkAllRead={notifications.markAllRead}
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <NotificationList
          items={notifications.items}
          hasNext={notifications.hasNext}
          isLoading={notifications.isLoading}
          error={notifications.error}
          onLoadMore={notifications.loadMore}
          onRead={notifications.markRead}
          onDelete={notifications.remove}
        />
        <NotificationSettings />
      </div>
    </div>
  );
}

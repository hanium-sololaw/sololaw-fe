import NotificationHeader from "./ui/NotificationHeader";
import NotificationList from "./ui/NotificationList";
import NotificationSettings from "./ui/NotificationSettings";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <NotificationHeader />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <NotificationList />
        <NotificationSettings />
      </div>
    </div>
  );
}

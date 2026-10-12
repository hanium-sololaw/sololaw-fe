import { useEffect, useState } from "react";
import {
  deleteNotification,
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  NOTIFICATIONS_CHANGED_EVENT,
  type Notification,
} from "@/shared/api/notifications";

const PAGE_SIZE = 20;

const fetchPage = (page: number) =>
  listNotifications({ page, size: PAGE_SIZE, sort: "createdAt,desc" });

const notifyChanged = () =>
  window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));

export function useNotifications() {
  const [items, setItems] = useState<Notification[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPage(0)
      .then((result) => {
        if (cancelled) return;
        setItems(result.content);
        setHasNext(result.hasNext);
      })
      .catch(() => {
        if (!cancelled) setError("알림을 불러오지 못했어요.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchPage(nextPage);
      setItems((prev) => [...prev, ...result.content]);
      setPage(nextPage);
      setHasNext(result.hasNext);
    } catch {
      setError("알림을 불러오지 못했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  const markRead = async (id: number) => {
    const target = items.find((item) => item.id === id);
    if (!target || target.isRead) return;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
    );
    try {
      await markNotificationRead(id);
      notifyChanged();
    } catch {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isRead: false } : item,
        ),
      );
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setItems((prev) => prev.map((item) => ({ ...item, isRead: true })));
      notifyChanged();
    } catch {
      window.alert("알림을 읽음 처리하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteNotification(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      notifyChanged();
    } catch {
      window.alert("알림을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    items,
    hasNext,
    isLoading,
    error,
    loadMore,
    markRead,
    markAllRead,
    remove,
  };
}

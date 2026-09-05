export type NotificationItem = {
  id: string;
  title: string;
  meta: string;
  read: boolean;
};

export const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "준비서면 제출 기한 D-3",
    meta: "2024가단12345 · 방금",
    read: false,
  },
  {
    id: "2",
    title: "상대방이 답변서를 제출했습니다",
    meta: "오늘 오전 8:42 · AI 분석",
    read: false,
  },
  {
    id: "3",
    title: "유사 판례 결과가 새로 발견되었습니다",
    meta: "어제 · 업데이트된 판례집 보기",
    read: false,
  },
  {
    id: "4",
    title: "변론기일 D-17 리마인더",
    meta: "어제 오전 9:00",
    read: true,
  },
];

export type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export const notificationSettings: NotificationSetting[] = [
  {
    id: "hearing",
    title: "변론기일 리마인더",
    description: "기일 3일 전, 1일 전 알림",
    enabled: true,
  },
  {
    id: "deadline",
    title: "제출 기한 알림",
    description: "준비서면·증거 제출 기한 임박 시",
    enabled: true,
  },
  {
    id: "opponent",
    title: "상대방 서면 제출 알림",
    description: "답변서·준비서면 제출 시",
    enabled: true,
  },
  {
    id: "similarCase",
    title: "유사 판례 업데이트",
    description: "새 판례 발견 시",
    enabled: false,
  },
];

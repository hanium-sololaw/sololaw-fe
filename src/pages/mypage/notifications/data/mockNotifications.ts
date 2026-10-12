import type { NotificationSettingKey } from "../api/notificationSettings";

export type NotificationSetting = {
  key: NotificationSettingKey;
  title: string;
  description: string;
};

// aiPrecedentAlert is intentionally not shown — similar-case updates are listed under 유의사항 instead
export const notificationSettings: NotificationSetting[] = [
  {
    key: "hearingReminderAlert",
    title: "기일 알림",
    description: "내가 등록한 기일 7일 전·3일 전·1일 전",
  },
  {
    key: "submissionDeadlineAlert",
    title: "제출 기한 알림",
    description: "답변서·준비서면 등 기한이 다가올 때",
  },
  {
    key: "overdueDeadlineAlert",
    title: "기한 지남 알림",
    description: "기한이 지났는데 완료 표시가 없을 때",
  },
  {
    key: "evidenceSupplementAlert",
    title: "증거 보완 알림",
    description: "보완필요로 표시해 둔 증거가 남아 있을 때",
  },
];

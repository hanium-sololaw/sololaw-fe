import type { ScheduleType } from "../api/types";

export const scheduleTypeByLabel: Record<string, ScheduleType> = {
  "변론기일": "HEARING",
  "제출기한": "SUBMISSION_DEADLINE",
  "서류 준비": "PREPARATION",
  "상담": "ATTENDANCE",
  "기타": "OTHER",
};

export const reminderValueByLabel: Record<string, number> = {
  "당일": 0,
  "1일 전": 1,
  "3일 전": 3,
  "7일 전": 7,
};

export function formatDDay(value: number): string {
  if (value > 0) return `D-${value}`;
  if (value === 0) return "D-DAY";
  return `D+${Math.abs(value)}`;
}

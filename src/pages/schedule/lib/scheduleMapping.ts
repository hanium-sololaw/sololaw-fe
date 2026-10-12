import type { ScheduleType } from "../api/types";

export const scheduleTypeByLabel: Record<string, ScheduleType> = {
  "변론기일": "HEARING",
  "제출기한": "SUBMISSION_DEADLINE",
  "서류 준비": "PREPARATION",
  "상담": "ATTENDANCE",
  "이의신청 기간": "OBJECTION_PERIOD",
  "기타": "OTHER",
};

export function labelByValue<T>(
  map: Record<string, T>,
  value: T | null | undefined,
): string {
  return Object.entries(map).find(([, item]) => item === value)?.[0] ?? "";
}

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

export function formatMonthDay(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "-";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

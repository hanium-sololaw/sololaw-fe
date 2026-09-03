export type ScheduleType =
  | "SUBMISSION_DEADLINE"
  | "HEARING"
  | "PREPARATION"
  | "ATTENDANCE"
  | "OBJECTION_PERIOD"
  | "OTHER";

export type ScheduleEventTime = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
};

export type ScheduleRecord = {
  id: number;
  caseId: number | null;
  title: string;
  scheduleType: ScheduleType;
  eventDate: string;
  eventTime: ScheduleEventTime | null;
  location: string | null;
  memo: string | null;
  reminderEnabled: boolean;
  reminderValue: number | null;
  reminderUnit: string | null;
  dDay: number;
  createdAt: string;
  modifiedAt: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  code: number;
  errorCode: string;
  message: string;
  timestamp: string;
  data: T;
};

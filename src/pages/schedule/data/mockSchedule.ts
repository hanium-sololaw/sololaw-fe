export type ScheduleEvent = {
  id: string;
  date: string;
  time?: string;
  title: string;
  caseName: string;
  dDay: string;
  urgent?: boolean;
};

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    date: "2026-08-17",
    time: "14:00",
    title: "제1회 변론기일 출석",
    caseName: "대여금 반환 청구",
    dDay: "D-3",
    urgent: true,
  },
  {
    id: "2",
    date: "2026-08-18",
    title: "급여명세서 동료 정보 가림 처리",
    caseName: "교통사고 손해배상",
    dDay: "D-4",
  },
  {
    id: "3",
    date: "2026-08-19",
    title: "하자 보수 견적서 한 곳 더 받기",
    caseName: "인테리어 하자 손해배상",
    dDay: "D-5",
  },
  {
    id: "4",
    date: "2026-08-20",
    time: "10:00",
    title: "준비서면(2) 제출",
    caseName: "임대차 보증금 반환 청구",
    dDay: "D-6",
  },
  {
    id: "5",
    date: "2026-08-21",
    title: "등기사항전부증명서 최신본 재발급",
    caseName: "상가 건물명도 청구",
    dDay: "D-7",
  },
  {
    id: "6",
    date: "2026-08-23",
    title: "피고 주소 보정 여부 확인",
    caseName: "대여금 반환 청구 (소액)",
    dDay: "D-9",
  },
  {
    id: "7",
    date: "2026-08-24",
    title: "내용증명 발송",
    caseName: "인테리어 하자 손해배상",
    dDay: "D-10",
  },
  {
    id: "8",
    date: "2026-08-25",
    title: "준비서면(1) — 과실비율 반박 제출",
    caseName: "교통사고 손해배상",
    dDay: "D-11",
  },
  {
    id: "9",
    date: "2026-08-28",
    title: "제1회 변론기일 출석",
    caseName: "임대차 보증금 반환 청구",
    dDay: "D-14",
    urgent: true,
  },
];

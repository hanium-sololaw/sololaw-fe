export type CaseStatus = "진행 중" | "준비 중" | "종료";

export type MyCase = {
  id: string;
  title: string;
  status: CaseStatus;
  caseNumber: string;
  court: string;
};

export const myProfile = {
  name: "김지민",
  email: "example@gmail.com",
  plan: "free",
  stats: {
    documents: 7,
    evidence: 14,
    schedules: 9,
  },
};

export const myCases: MyCase[] = [
  {
    id: "1",
    title: "임대차 보증금 반환 청구",
    status: "진행 중",
    caseNumber: "2024가단123456",
    court: "서울중앙지방법원",
  },
  {
    id: "2",
    title: "근로계약 위반 손해배상",
    status: "준비 중",
    caseNumber: "2024가단998877",
    court: "서울남부지방법원",
  },
];

export const caseStatusStyle: Record<CaseStatus, string> = {
  "진행 중": "bg-blue-50 text-blue-500",
  "준비 중": "bg-yellow-50 text-yellow-500",
  "종료": "bg-gray-100 text-gray-500",
};

export type AccountSettingItem = {
  id: string;
  label: string;
};

export const accountSettingItems: AccountSettingItem[] = [
  { id: "password", label: "비밀번호 변경" },
  { id: "notification", label: "알림 설정" },
  { id: "terms", label: "서비스 이용약관" },
  { id: "privacy", label: "개인정보처리방침" },
];

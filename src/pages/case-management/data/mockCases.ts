export type CaseStatus = "진행 중" | "준비 중" | "종료";

export type CaseSummary = {
  id: string;
  title: string;
  court: string;
  caseNumber: string;
  status: CaseStatus;
  currentStage: string;
  nextTodo: string;
  petitionTitle: string;
  petitionProgress: number;
  remainingTasks: number;
  documentCount: number;
  evidenceCount: number;
  updatedAt: string;
};

export const caseStatusStyle: Record<CaseStatus, string> = {
  "진행 중": "bg-blue-50 text-blue-500",
  "준비 중": "bg-yellow-50 text-yellow-600",
  "종료": "bg-gray-100 text-gray-500",
};

export const mockCases: CaseSummary[] = [
  {
    id: "1",
    title: "임대차 보증금 반환 청구",
    court: "서울중앙지방법원",
    caseNumber: "2024가단123456",
    status: "진행 중",
    currentStage: "현재 변론",
    nextTodo: "다음 할 일 · 제1회 변론기일 참석",
    petitionTitle: "소장 작성",
    petitionProgress: 79,
    remainingTasks: 2,
    documentCount: 4,
    evidenceCount: 6,
    updatedAt: "방금 전",
  },
  {
    id: "2",
    title: "대여금 반환 청구",
    court: "서울동부지방법원",
    caseNumber: "2024가단 98765",
    status: "진행 중",
    currentStage: "현재 법원 접수",
    nextTodo: "다음 할 일 · 답변서 확인",
    petitionTitle: "소장 작성",
    petitionProgress: 100,
    remainingTasks: 0,
    documentCount: 3,
    evidenceCount: 5,
    updatedAt: "1시간 전",
  },
  {
    id: "3",
    title: "상가 건물명도 청구",
    court: "서울남부지방법원",
    caseNumber: "2024가단 45213",
    status: "준비 중",
    currentStage: "현재 소장 작성",
    nextTodo: "다음 할 일 · 사실관계 정리",
    petitionTitle: "소장 작성",
    petitionProgress: 42,
    remainingTasks: 4,
    documentCount: 1,
    evidenceCount: 3,
    updatedAt: "어제",
  },
  {
    id: "4",
    title: "교통사고 손해배상 청구",
    court: "서울북부지방법원",
    caseNumber: "2024가단 33291",
    status: "진행 중",
    currentStage: "현재 변론",
    nextTodo: "다음 할 일 · 준비서면(2) 제출",
    petitionTitle: "소장 작성",
    petitionProgress: 100,
    remainingTasks: 1,
    documentCount: 6,
    evidenceCount: 9,
    updatedAt: "2일 전",
  },
  {
    id: "5",
    title: "임금체불(임금·퇴직금) 청구",
    court: "서울서부지방법원",
    caseNumber: "2024가단 71042",
    status: "준비 중",
    currentStage: "현재 내용증명",
    nextTodo: "다음 할 일 · 내용증명 발송",
    petitionTitle: "소장 작성",
    petitionProgress: 18,
    remainingTasks: 5,
    documentCount: 0,
    evidenceCount: 2,
    updatedAt: "3일 전",
  },
  {
    id: "6",
    title: "인테리어 하자 손해배상 청구",
    court: "수원지방법원",
    caseNumber: "2023가단 205981",
    status: "종료",
    currentStage: "판결 완료",
    nextTodo: "다음 할 일 · 판결문 보관",
    petitionTitle: "소장 작성",
    petitionProgress: 100,
    remainingTasks: 0,
    documentCount: 8,
    evidenceCount: 11,
    updatedAt: "2주 전",
  },
];

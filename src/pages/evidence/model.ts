import type { DocumentStatus, DocType } from "@/pages/document/shared/document";

export type Material = {
  id: number;
  kind: DocType | "EVIDENCE";
  title: string;
  caseId: number;
  status: DocumentStatus | "NOT_SUBMITTED";
  isLatest: boolean;
  createdAt: string;
  writingRate?: number;
  exhibit?: string;
  purpose?: string;
  size?: string;
  deadline?: string;
  submittedAt?: string;
};

export const tabs = [
  { id: "COMPLAINT", label: "소장", path: "/document/complaint" },
  { id: "EVIDENCE", label: "증거자료", path: "" },
  { id: "BRIEF", label: "준비서면", path: "/document/brief" },
  { id: "EVIDENCE_LIST", label: "증거목록", path: "/document/evidence" },
  { id: "APPLICATION", label: "신청서·답변서", path: "/document/petition" },
] as const;
export type Tab = (typeof tabs)[number]["id"];
export const statusLabels: Record<Material["status"], string> = {
  DRAFT: "작성 중", NOT_SUBMITTED: "미제출", SCHEDULED_TO_SUBMIT: "제출 예정", SUBMITTED: "제출 완료", NEEDS_REVISION: "보완 필요",
};
export const statusStyles: Record<Material["status"], string> = {
  DRAFT: "bg-gray-50 text-gray-600", NOT_SUBMITTED: "bg-gray-50 text-gray-600",
  SCHEDULED_TO_SUBMIT: "bg-blue-100 text-blue-500", SUBMITTED: "bg-blue-300 text-white", NEEDS_REVISION: "bg-red-50 text-red-400",
};
export const matchesTab = (item: Material, tab: Tab) => item.kind === tab || (tab === "APPLICATION" && item.kind === "ANSWER");
export const previewCases = [
  { id: 1, title: "임대차 보증금 반환 청구", court: "서울중앙지방법원", claimAmount: 10000000 },
  { id: 2, title: "근로계약 위반 손해배상", court: "서울중앙지방법원", claimAmount: 5000000 },
  { id: 3, title: "대여금 반환 청구 (소액)", court: "서울중앙지방법원", claimAmount: 300000 },
];
const names = ["임대차계약서.pdf", "보증금_입금증.jpg", "문자_납부내역.pdf", "카카오톡_대화내용.pdf", "하자보수_사진1.jpg", "하자보수_사진2.jpg", "근로계약서.pdf", "급여이체내역.pdf", "사내메신저_지시내용.pdf", "차용증.jpg", "계좌이체내역.pdf", "문자_대화내용.pdf"];
const purposes = ["임대차 계약 관계 및 보증금 지급 사실 입증", "보증금을 피고에게 실제 지급한 사실 입증", "월세를 성실히 납부한 사실 입증", "피고가 보증금 반환을 회피한 사실 입증", "임차인이 원상복구 의무를 다한 사실 입증", "임차인이 원상복구 의무를 다한 사실 입증", "근로조건과 계약 기간을 정한 사실 입증", "급여가 일부만 지급된 사실 입증", "연장근로를 지시받은 사실 입증", "금전을 빌려준 사실 입증", "대여금 지급 사실 입증", "변제 약정 사실 입증"];
export const previewMaterials: Material[] = [
  ...names.map((title, i): Material => ({
    id: i + 1, kind: "EVIDENCE", title, caseId: i < 6 ? 1 : i < 9 ? 2 : 3,
    exhibit: `갑 제${i < 6 ? i + 1 : i < 9 ? i - 5 : i - 8}호증`, purpose: purposes[i],
    status: [0, 1, 9, 10].includes(i) ? "SUBMITTED" : i === 3 ? "NEEDS_REVISION" : i === 2 ? "SCHEDULED_TO_SUBMIT" : "NOT_SUBMITTED",
    isLatest: true, createdAt: `2026-08-${String(12 + i).padStart(2, "0")}T09:20:00`,
    size: `${[2.3, 1.1, 0.8, 3.2, 2.8, 2.5, 1.4, 0.8, 2.1, 1, 0.8, 1.2][i]} MB`,
    submittedAt: [0, 1, 9, 10].includes(i) ? "2026-08-28" : undefined,
    deadline: "2026-09-18",
  })),
  ...["대여금 반환 소장", "대여금 반환 소장", "임대차보증금 반환 소장"].map((title, i): Material => ({ id: 100 + i, kind: "COMPLAINT", title, caseId: i < 2 ? 3 : 1, status: i === 0 ? "SUBMITTED" : "DRAFT", isLatest: i !== 1, writingRate: [100, 95, 50][i], createdAt: "2026-08-12T13:24:00", submittedAt: i === 0 ? "2026-08-16" : undefined })),
];
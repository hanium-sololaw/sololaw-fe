export type DocumentTypeId = "complaint" | "brief" | "evidence" | "petition";

export type DocumentTypeOption = {
  id: DocumentTypeId;
  title: string;
  description: string;
};

export const documentTypes: DocumentTypeOption[] = [
  {
    id: "complaint",
    title: "소장",
    description: "소송을 제기하기 위한 기본 문서",
  },
  {
    id: "brief",
    title: "준비서면",
    description: "주장과 증거를 정리한 문서",
  },
  {
    id: "evidence",
    title: "증거목록",
    description: "제출할 증거의 목록",
  },
  {
    id: "petition",
    title: "신청서",
    description: "법원에 제출하는 각종 신청서",
  },
];

import type { CaseStatus } from "@/shared/api/cases";
import type { DocumentTypeId } from "./documentTypes";

export type RecommendationPriority = "높음" | "보통" | "낮음";

export type Recommendation = {
  documentType: DocumentTypeId;
  label: string;
  priority: RecommendationPriority;
  reason: string;
};

// ponytail: 추천 API가 없어 사건 상태별 고정 규칙. 서버 추천이 생기면 이 표만 API 호출로 교체.
export const recommendationsByStatus: Record<CaseStatus, Recommendation[]> = {
  PREPARING: [
    { documentType: "complaint", label: "소장", priority: "높음", reason: "소송을 시작하려면 소장 작성이 필요합니다." },
    { documentType: "evidence", label: "증거목록", priority: "보통", reason: "소장과 함께 낼 증거를 미리 정리해 두세요." },
  ],
  SUBMISSION_READY: [
    { documentType: "complaint", label: "소장", priority: "높음", reason: "제출 직전 단계로 소장 최종 점검이 필요합니다." },
    { documentType: "evidence", label: "증거목록", priority: "높음", reason: "제출할 증거와 입증취지를 확인하세요." },
  ],
  FILED: [
    { documentType: "brief", label: "준비서면", priority: "높음", reason: "상대방 답변에 대비해 주장을 정리한 준비서면이 필요합니다." },
    { documentType: "evidence", label: "증거목록", priority: "보통", reason: "추가로 제출할 증거가 있다면 목록을 보완하세요." },
  ],
  IN_PROGRESS: [
    { documentType: "brief", label: "준비서면", priority: "높음", reason: "다음 단계로 준비서면 작성이 필요합니다." },
    { documentType: "evidence", label: "증거목록", priority: "보통", reason: "추가로 제출할 증거가 있다면 목록을 보완하세요." },
    { documentType: "petition", label: "신청서", priority: "낮음", reason: "기일 변경이나 보정이 필요하면 신청서를 작성하세요." },
  ],
  CLOSED: [],
};

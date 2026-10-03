export type ChecklistId = "basic" | "complaint" | "evidence";

export const checklistMeta: Record<
  ChecklistId,
  {
    title: string;
    pendingDescription: string;
    doneDescription: () => string;
  }
> = {
  basic: {
    title: "사건 기본 정보",
    pendingDescription:
      "아직 없음",
    doneDescription: () => "유형·청구금액·상대방 자동 반영됨",
  },
  complaint: {
    title: "소장",
    pendingDescription: "아직 없음 — 작성하면 정확도가 크게 올라가요",
    doneDescription: () => "등록된 소장 내용 자동 반영됨",
  },
  evidence: {
    title: "증거·준비서면",
    pendingDescription: "아직 없음 — 등록하면 정확도가 올라가요",
    doneDescription: () => "등록된 증거·준비서면 자동 반영됨",
  },
};

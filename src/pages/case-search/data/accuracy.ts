export type AccuracyLevel = "낮음" | "보통" | "높음";

export function getAccuracyLevel(checkedCount: number): AccuracyLevel {
  if (checkedCount >= 3) return "높음";
  if (checkedCount === 2) return "보통";
  return "낮음";
}

export const accuracyStyles: Record<
  AccuracyLevel,
  { badge: string; bar: string }
> = {
  낮음: { badge: "bg-red-50 text-red-400", bar: "bg-red-400" },
  보통: { badge: "bg-orange-50 text-orange-500", bar: "bg-orange-400" },
  높음: { badge: "bg-blue-50 text-blue-500", bar: "bg-blue-400" },
};

const TOTAL_CHECKLIST_ITEMS = 3;

export function getAccuracyPercent(checkedCount: number): number {
  if (checkedCount === 0) return 5;
  return Math.round((checkedCount / TOTAL_CHECKLIST_ITEMS) * 100);
}

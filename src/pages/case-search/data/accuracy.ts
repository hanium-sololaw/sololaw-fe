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
  낮음: { badge: "bg-red-50 text-red-500", bar: "bg-red-500" },
  보통: { badge: "bg-yellow-50 text-yellow-500", bar: "bg-yellow-500" },
  높음: { badge: "bg-blue-50 text-blue-500", bar: "bg-blue-500" },
};

const ACCURACY_PERCENT_BY_COUNT = [5, 25, 60, 95] as const;

export function getAccuracyPercent(checkedCount: number): number {
  return ACCURACY_PERCENT_BY_COUNT[checkedCount] ?? 95;
}

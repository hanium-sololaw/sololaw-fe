/** Picks the document wizard that matches a deadline title, linked to its case. */
export function documentRouteFor(title: string, caseId: number | null): string {
  const query = caseId ? `?caseId=${caseId}` : "";
  if (title.includes("증거")) return `/document/evidence${query}`;
  if (/답변서|신청서/.test(title)) return `/document/petition${query}`;
  if (title.includes("소장")) return `/document/complaint${query}`;
  return `/document/brief${query}`;
}

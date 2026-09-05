import { ragApiClient } from "@/shared/api/client";
import type { CaseType } from "@/shared/api/cases";

export type SearchOutcome = "win" | "partial" | "lose" | "unknown";
export type SearchCategory = "civil" | "loan" | "lease";

export const CATEGORY_OPTIONS: { value: SearchCategory; label: string }[] = [
  { value: "civil", label: "민사" },
  { value: "loan", label: "대여금" },
  { value: "lease", label: "임대차" },
];

/** null = API returned "unknown" (판정 불가) — render no badge. */
export type CaseOutcome = "원고 승소" | "원고 일부승소" | "원고 패소" | null;

export const outcomeStyles: Record<Exclude<CaseOutcome, null>, string> = {
  "원고 승소": "bg-blue-50 text-blue-500",
  "원고 일부승소": "bg-blue-50 text-blue-500",
  "원고 패소": "bg-red-50 text-red-500",
};

export type CaseCard = {
  id: string;
  title: string;
  outcome: CaseOutcome;
  court: string;
  caseNumber: string;
  date: string;
  relevance: "높음" | "보통";
  summary: string;
  detailUrl: string;
  category: string;
};

export type RelatedStatute = { name: string; title: string | null; count: number };

export type SearchStatistics = {
  plaintiffWinRate: number | null;
  classified: number;
  win: number;
  partial: number;
  lose: number;
  unknown: number;
  sampleSize: number;
  disclaimer: string;
};

export type SearchResult = {
  total: number;
  cases: CaseCard[];
  statutes: RelatedStatute[];
  statistics: SearchStatistics | null;
};

type ApiCaseCard = {
  name: string;
  outcome: SearchOutcome;
  court: string;
  case_no: string;
  decision_date: string;
  relevance: number;
  reference_note: string;
  detail_url: string;
  similarity: number | null;
  serial_id: string;
  category: string;
};

type ApiStatute = { name: string; title: string | null; count: number };

type ApiStatistics = {
  plaintiff_win_rate: number | null;
  classified: number;
  outcomes: { win: number; partial: number; lose: number; unknown: number };
  sample_size: number;
  disclaimer: string;
} | null;

type ApiSearchResponse = {
  total: number;
  cases: ApiCaseCard[];
  statutes: ApiStatute[];
  statistics: ApiStatistics;
};

type SearchRequest = {
  query?: string;
  case_context?: string;
  category?: SearchCategory;
  limit?: number;
};

const OUTCOME_LABEL: Record<SearchOutcome, CaseOutcome> = {
  win: "원고 승소",
  partial: "원고 일부승소",
  lose: "원고 패소",
  unknown: null,
};

/**
 * "내 사건" 탭에서 등록된 사건의 유형(CaseType)으로 검색 category를 자동 지정한다. 매칭되는 값이
 * 없으면 전체 검색으로 둔다. WAGE/TORT → civil, DEPOSIT/EVICTION → lease 매핑은 확정된 스펙이
 * 아닌 최선의 추정치 — 실제 분류 기준이 다르면 조정 필요.
 */
export function categoryFromCaseType(type: CaseType | undefined): SearchCategory | undefined {
  switch (type) {
    case "LOAN":
      return "loan";
    case "DEPOSIT":
    case "EVICTION":
      return "lease";
    case "WAGE":
    case "TORT":
      return "civil";
    default:
      return undefined;
  }
}

function toCaseCard(item: ApiCaseCard): CaseCard {
  return {
    id: item.serial_id,
    title: item.name,
    outcome: OUTCOME_LABEL[item.outcome],
    court: item.court,
    caseNumber: item.case_no,
    date: item.decision_date,
    relevance: item.relevance >= 70 ? "높음" : "보통",
    summary: item.reference_note,
    detailUrl: item.detail_url,
    category: item.category,
  };
}

/** Calls the 판례 검색 API. Pass either `query` (키워드 탭) or `caseContext` (내 사건 탭) — the guide requires exactly one. */
export async function searchCases(params: {
  query?: string;
  caseContext?: string;
  category?: SearchCategory;
  limit?: number;
}): Promise<SearchResult> {
  const body: SearchRequest = {
    query: params.query || undefined,
    case_context: params.caseContext || undefined,
    category: params.category || undefined,
    limit: params.limit || undefined,
  };

  const data = await ragApiClient<ApiSearchResponse>("/api/v1/cases/search", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return {
    total: data.total,
    cases: data.cases.map(toCaseCard),
    statutes: data.statutes.map((item) => ({ name: item.name, title: item.title, count: item.count })),
    statistics: data.statistics
      ? {
          plaintiffWinRate: data.statistics.plaintiff_win_rate,
          classified: data.statistics.classified,
          win: data.statistics.outcomes.win,
          partial: data.statistics.outcomes.partial,
          lose: data.statistics.outcomes.lose,
          unknown: data.statistics.outcomes.unknown,
          sampleSize: data.statistics.sample_size,
          disclaimer: data.statistics.disclaimer,
        }
      : null,
  };
}

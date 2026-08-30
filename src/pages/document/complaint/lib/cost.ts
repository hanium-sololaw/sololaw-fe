export type LitigationStage = "first" | "appeal" | "final";

/**
 * 참고용 소송비용 계산 — 민사소송 등 인지법 제2조 및 대법원 송달료 규칙에 근거한
 * 근사치입니다. 인지액·송달료 단가는 개정될 수 있으므로 실제 납부액은 반드시
 * 전자소송 홈페이지(ecfs.scourt.go.kr)에서 확인해야 합니다.
 */
const STAGE_MULTIPLIER: Record<LitigationStage, number> = {
  first: 1,
  appeal: 1.5,
  final: 2,
};

const STAGE_SERVICE_ROUNDS: Record<LitigationStage, number> = {
  first: 15,
  appeal: 12,
  final: 8,
};

const SERVICE_FEE_PER_ROUND = 5200;
const ELECTRONIC_STAMP_RATIO = 0.1;

const floorTo100 = (value: number) => Math.floor(value / 100) * 100;

function baseStampDuty(sueValue: number): number {
  if (sueValue < 10_000_000) return sueValue * 0.005;
  if (sueValue < 100_000_000) return sueValue * 0.0045 + 5_000;
  if (sueValue < 1_000_000_000) return sueValue * 0.004 + 55_000;
  return sueValue * 0.0035 + 555_000;
}

export function calcStampDuty(
  sueValue: number,
  stage: LitigationStage,
  electronicFiling: boolean,
): number {
  if (sueValue <= 0) return 0;
  const staged = floorTo100(baseStampDuty(sueValue) * STAGE_MULTIPLIER[stage]);
  const final = electronicFiling ? floorTo100(staged * ELECTRONIC_STAMP_RATIO) : staged;
  return Math.max(1_000, final);
}

export function calcServiceFee(partyCount: number, stage: LitigationStage): number {
  if (partyCount <= 0) return 0;
  return SERVICE_FEE_PER_ROUND * STAGE_SERVICE_ROUNDS[stage] * partyCount;
}

export type LitigationCost = {
  stampDuty: number;
  serviceFee: number;
  total: number;
};

export function calcLitigationCost(
  sueValue: number,
  stage: LitigationStage,
  electronicFiling: boolean,
  partyCount = 2,
): LitigationCost {
  const stampDuty = calcStampDuty(sueValue, stage, electronicFiling);
  const serviceFee = calcServiceFee(partyCount, stage);
  return { stampDuty, serviceFee, total: stampDuty + serviceFee };
}

export const won = (value: number) => value.toLocaleString("ko-KR");

if (import.meta.env.DEV) {
  console.assert(
    calcStampDuty(5_000_000, "first", false) === 25_000,
    "calcStampDuty: 500만원 1심 종이 소송 인지액은 25,000원이어야 합니다",
  );
  console.assert(
    calcStampDuty(5_000_000, "first", true) === 2_500,
    "calcStampDuty: 전자소송은 인지액의 1/10이어야 합니다",
  );
  console.assert(
    calcStampDuty(0, "first", false) === 0,
    "calcStampDuty: 청구금액이 0이면 인지액도 0이어야 합니다",
  );
}

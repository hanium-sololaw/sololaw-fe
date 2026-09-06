# 소송 비용 계산기 모달

## Purpose

The document hub page (`src/pages/document/index.tsx`) already shows a "소송 비용 계산기" quick-link
card (`quickLinks.ts`, id `calculator`) with no click handler. Clicking it should open a modal that
lets a user estimate the 인지대(stamp duty), 송달료(service fee), and 변호사보수 인정액(recoverable
attorney fee cap) for a lawsuit from a claim amount and a few case parameters. Pure client-side
calculator — no API, no persistence.

## Components

- `src/pages/document/lib/costCalculator.ts` — pure calculation functions, no React:
  - `calcStampDuty(claimAmount, instance, isElectronic): number`
  - `calcServiceFee(claimAmount, instance, partyCount): number` (claimAmount unused today, kept for
    signature symmetry — service fee only depends on instance + party count)
  - `calcAttorneyFee(claimAmount): number`
- `src/pages/document/ui/CostCalculatorModal.tsx` — the modal, built on the existing shared
  `Modal` component (`src/pages/document/shared/Modal.tsx`) and `useModal` hook
  (`src/shared/hooks/useModal.ts`), following the pattern already used by
  `ComplaintGuideModal.tsx`.
- `DocumentQuickLinks.tsx` — add an `onClick` to the `calculator` card wired to `useModal`, render
  `<CostCalculatorModal>` when open.

## State (local to the modal, `useState`)

| field | type | default |
|---|---|---|
| claimAmount | number | 0 |
| caseCategory | `"single" \| "collegiate"` (단독/합의) | `"single"` |
| instance | `"first" \| "second" \| "third"` (1심/2심/3심) | `"first"` |
| plaintiffCount | number | 1 |
| defendantCount | number | 1 |
| isElectronic | boolean | true |
| showAttorneyFee | boolean | false |

`caseCategory` is informational only (matches the mockup's helper text about 단독/합의 jurisdiction
thresholds) and does not affect any formula.

## Formulas

All formulas below are implemented from general knowledge of the relevant rules and are **not
verified against the current official text**. Each function carries a code comment saying so.
Treat the calculator's output as a rough estimate until checked against 대한민국 법원 전자소송포털 or
an authoritative source.

**인지액** (`calcStampDuty`), tiered by claim amount `X`:
- `X < 10,000,000`: `X × 0.005`
- `10,000,000 ≤ X < 100,000,000`: `X × 0.0045 + 5,000`
- `100,000,000 ≤ X < 1,000,000,000`: `X × 0.004 + 55,000`
- `X ≥ 1,000,000,000`: `X × 0.0035 + 555,000`

Then × instance multiplier (`first` ×1, `second` ×1.5, `third` ×2), then × 9/10 if
`isElectronic`, then rounded down to the nearest 10원.

**송달료** (`calcServiceFee`): `5,200 × cyclesByInstance[instance] × (plaintiffCount +
defendantCount)`, where `cyclesByInstance = { first: 5, second: 6, third: 8 }`. This is the
least-confident number in the spec — the real 예납 기준표 varies by court/case type in ways this
simplification doesn't model.

**변호사보수 인정액** (`calcAttorneyFee`), tiered by claim amount `X`, same at every instance
(not modeling the real per-instance multiplier — known simplification):
- `X ≤ 20,000,000`: `X × 0.1`
- `20,000,000 < X ≤ 50,000,000`: `2,000,000 + (X − 20,000,000) × 0.08`
- `50,000,000 < X ≤ 100,000,000`: `3,800,000 + (X − 50,000,000) × 0.06`
- `100,000,000 < X ≤ 150,000,000`: `6,800,000 + (X − 100,000,000) × 0.04`
- `150,000,000 < X ≤ 200,000,000`: `8,800,000 + (X − 150,000,000) × 0.02`
- `200,000,000 < X ≤ 500,000,000`: `9,800,000 + (X − 200,000,000) × 0.01`
- `X > 500,000,000`: `12,800,000 + (X − 500,000,000) × 0.005`

## UI (matches the provided screenshot)

- Title "소송 비용 계산기" + subtitle.
- 청구 금액 number input (원 suffix) + helper text.
- Two-column dropdowns: 사건 종류 (단독사건/합의사건) and 심급 (1심 소장/2심 항소장/3심 상고장), each
  with static helper text under it.
- 당사자 수: 원고/피고 number inputs (min 1).
- 전자소송으로 제출 checkbox card (checked by default), styled like the checked-state row in
  `AnalysisInfoCard` (blue check + description).
- 비용 납부 안내 card: 예상 인지대, 예상 송달료 (with 당사자 N인 note), and — only when
  `showAttorneyFee` is true — 변호사보수 인정액; then 합계(본인 납부) = 인지대 + 송달료 only
  (attorney fee is never part of the total the user actually pays).
- Blue info box explaining the attorney-fee cap is not money paid now.
- `변호사보수 인정액도 계산` toggle (radio-styled per the mockup) controlling `showAttorneyFee`.
- Footer disclaimer paragraph + three reference labels (전자소송포털 / 민사소송 등 인지법 / 변호사
  보수 산입 규칙) rendered as plain text, no `href` — avoids guessing at government URLs. Can become
  real links later if the user supplies them.
- "확인" button just closes the modal (`onClose`) — no persistence, no API call.

## Out of scope

- Wiring the other three quick-link cards (guide/template/recommend) — untouched, no handler today,
  staying that way.
- Making the reference links live.
- Modeling per-court/case-type variation in 송달료 예납횟수 more precisely than the single table above.
- Any backend persistence of a calculation.

export const CLAIM_TEXT_LIMIT = 2000;

export const FIRST_TIME_STEPS = [
  {
    title: "전자소송 사용자등록",
    desc: "최초 1회. 회원가입과 별개로 「사용자 등록」까지 마쳐야 제출 버튼이 눌립니다.",
  },
  {
    title: "소장 제출",
    desc: "서류제출 → 민사서류 → 민사본안 → 소장. 아래 입력 도우미가 이 화면 순서 그대로예요.",
  },
  { title: "인지대·송달료 납부", desc: "포털에서 바로 결제합니다. 접수번호가 나오면 제출이 끝난 거예요." },
  { title: "접수 확인·송달 수신", desc: "사건번호가 부여되면 진행 상황과 판결문까지 포털에서 봅니다." },
];

/** Masks a resident registration number, tolerating missing/odd dash formatting. Never returns the number unmasked. */
export function maskResidentId(residentId: string) {
  const digits = residentId.replace(/\D/g, "");
  if (digits.length < 7) return "*".repeat(residentId.length || 1);
  return `${digits.slice(0, 6)}-${digits[6]}******`;
}

/** "갑 제1호증 계좌이체 내역" → { label: "갑 제1호증", value: "계좌이체 내역" } */
export function splitEvidenceLine(line: string) {
  const match = line.match(/^((?:갑|을)\s*제\s*\d+\s*호증)\s*(.*)$/);
  if (!match) return { label: line, value: "" };
  return { label: match[1], value: match[2] };
}

export function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

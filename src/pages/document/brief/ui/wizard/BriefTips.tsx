import TipsCard from "../../../ui/shared/TipsCard";

const TIPS = [
  "기일 **1주 전**까지 제출하는 것이 원칙이에요.",
  "쟁점은 **3개 이내**로 압축하세요. 많을수록 흐려집니다.",
  "상대방이 **인정한 사실**은 다시 다투지 마세요.",
  "감정적 표현 대신 **사실과 법리**만 적습니다.",
];

const STEP_NOTES: Record<number, string[]> = {
  0: [
    "**상대방이 기일에 안 나오면** 준비서면에 적어 두지 않은 내용은 그날 말할 수 없어요 (민사소송법 제276조).",
    "**하고 싶은 말은 미리 다 적어 두세요.**",
  ],
  1: [
    "**상대방이 낸 서면**은 포털에서 내려받아 여기 올리고 본문을 붙여넣으면 항변을 찾아 드려요.",
    "**상대방이 인정한 것**까지 적어 두면 쟁점이 줄어 재판이 빨라집니다.",
  ],
  2: [
    "**판례는 파일이** 아니라 본문 「관련 법리」에 사건번호와 요지만 적습니다.",
    "**준비서면 본문은 우리가 만들어 드려요.** 전자소송에 한글·PDF로 첨부해 내면 됩니다 (전자문서규칙 제11조 제1항).",
    "**낼 때 돈은 따로 들지 않아요** — 소장 낼 때 넣어 둔 송달료에서 나갑니다.",
  ],
  3: [
    "**쟁점마다 상대방 주장 → 나의 반박 → 근거** 한 세트로 적으면 그대로 항목이 됩니다.",
    "**문장은 평소 말로** 적으셔도 돼요 — AI가 서면 문장으로 정리합니다.",
  ],
};

const FILE_NOTES: Record<number, string[]> = {
  2: [
    "**올린 파일**은 이 브라우저에만 임시 보관됩니다. 실제 제출은 전자소송포털에 직접 올리셔야 해요.",
    "**파일에 붙인 이름**이 그대로 문서에 인쇄되니 알아보기 쉽게 고쳐 주세요.",
  ],
};

export default function BriefTips({ stepIndex, stepTitle }: { stepIndex: number; stepTitle: string }) {
  const notes = STEP_NOTES[stepIndex];
  const fileNotes = FILE_NOTES[stepIndex];
  return (
    <>
      <TipsCard title="준비서면은 이렇게 씁니다" tips={TIPS} />
      {notes && <TipsCard title={`${stepTitle}에서 알아둘 것`} tips={notes} />}
      {fileNotes && <TipsCard title="파일에 대해" tips={fileNotes} />}
    </>
  );
}

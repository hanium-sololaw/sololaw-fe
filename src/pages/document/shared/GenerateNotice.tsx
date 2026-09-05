/** 마지막 글자에 받침이 있으면 withBatchim, 없으면 without를 돌려준다 (은/는, 이/가 등 조사 선택용) */
function josa(word: string, withBatchim: string, without: string): string {
  const last = word.trim().slice(-1);
  const code = last.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return without;
  return (code - 0xac00) % 28 ? withBatchim : without;
}

type GenerateNoticeProps = {
  done: boolean;
  label: string;
};

export default function GenerateNotice({ done, label }: GenerateNoticeProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4 backdrop-blur-[2px]">
      <div role="status" aria-live="polite" className="w-full max-w-[420px] rounded-2xl bg-white px-8 py-12 text-center shadow-2xl">
        {done ? (
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-400 text-white">✓</span>
        ) : (
          <span className="mx-auto block h-11 w-11 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-400" />
        )}
        <p className="mt-6 text-lg font-bold text-blue-500">
          {done ? `${label}${josa(label, "이", "가")} 완성되었어요!` : `AI가 ${label}${josa(label, "을", "를")} 작성하고 있어요`}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {done ? "완성된 내용을 확인해볼까요?" : "입력한 내용을 바탕으로 정리하고 있어요"}
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { CLAIM_TEXT_LIMIT, downloadTextFile } from "./helpers";

export default function CopyTextBlock({ label, text, filename }: { label: string; text: string; filename: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근이 막힌 환경에서는 조용히 무시
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between rounded-t-xl border border-gray-100 bg-gray-50 px-4 py-2.5">
        <span className="text-sm font-semibold text-gray-700">
          {label}{" "}
          <span className="ml-1 text-xs font-normal text-gray-400">
            {text.length.toLocaleString("ko-KR")} / {CLAIM_TEXT_LIMIT.toLocaleString("ko-KR")}자
          </span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 text-xs font-semibold text-blue-500 hover:text-blue-600"
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
      <div className="whitespace-pre-wrap rounded-b-xl border border-t-0 border-gray-100 bg-gray-50/60 px-4 py-3 text-sm leading-relaxed text-gray-700">
        {text || "-"}
      </div>
      <button
        type="button"
        onClick={() => downloadTextFile(filename, text)}
        className="mt-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
      >
        {label.replace(" 전문", "")}만 파일로 저장
      </button>
    </div>
  );
}

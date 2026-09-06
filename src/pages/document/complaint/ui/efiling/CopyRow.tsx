import { useState } from "react";

export default function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근이 막힌 환경에서는 조용히 무시
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-2.5 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="truncate text-sm font-medium text-gray-800">{value || "-"}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 text-xs font-semibold text-blue-500 hover:text-blue-600"
      >
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}

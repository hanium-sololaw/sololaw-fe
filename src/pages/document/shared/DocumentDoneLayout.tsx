import type { ReactNode } from "react";

type DocumentDoneLayoutProps = {
  title: string;
  badge?: string;
  subtitle: string;
  disclaimer: ReactNode;
  onEdit: () => void;
  onExit: () => void;
  extraActions?: ReactNode;
  children: ReactNode;
};

export default function DocumentDoneLayout({
  title,
  badge,
  subtitle,
  disclaimer,
  onEdit,
  onExit,
  extraActions,
  children,
}: DocumentDoneLayoutProps) {
  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        ← 이전으로 돌아가기
      </button>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {badge && (
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-[13px] text-gray-500">{subtitle}</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            내용 수정하기
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl bg-blue-400 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            PDF 저장 · 인쇄
          </button>
          {extraActions}
        </div>
      </div>

      <div className="print-area rounded-2xl border border-gray-200 bg-white px-6 py-8 sm:px-12 sm:py-12">
        {children}
      </div>

      <p className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-xs leading-relaxed text-gray-500">
        {disclaimer}
      </p>

      <button
        type="button"
        onClick={onExit}
        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        문서 생성 홈으로
      </button>
    </div>
  );
}

import type { ReactNode } from "react";

type DocumentDoneLayoutProps = {
  title: string;
  badge?: string;
  subtitle: string;
  disclaimer: ReactNode;
  onEdit: () => void;
  onExit: () => void;
  extraActions?: ReactNode;
  sideContent?: ReactNode;
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
  sideContent,
  children,
}: DocumentDoneLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1 self-start text-[13px] font-medium text-gray-400 hover:text-gray-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5l-5 5 5 5" />
        </svg>
        이전으로 돌아가기
      </button>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl bg-white px-4 py-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-base font-semibold text-gray-900">{title}</h1>
            {badge && (
              <span className="rounded-xl bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-500">{badge}</span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-50"
          >
            답변 수정하기
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-blue-300 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            PDF 저장 · 인쇄
          </button>
          {extraActions}
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="print-area rounded-xl border border-gray-200 bg-white px-6 py-8 sm:px-12 sm:py-12">
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
        {sideContent && <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-[264px]">{sideContent}</aside>}
      </div>
    </div>
  );
}

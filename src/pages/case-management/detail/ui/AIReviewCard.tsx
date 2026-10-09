import ShineIcon from "@/assets/icons/case-search/shine-solid-icon.svg?react";
import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";

type AIReviewCardProps = {
  notes: string[];
};

export default function AIReviewCard({ notes }: AIReviewCardProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-base font-bold text-gray-900">
          <ShineIcon className="h-4 w-4 text-blue-400" />
          AI 검토
        </h2>
        {notes.length > 0 && (
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-400">
            {notes.length}건
          </span>
        )}
      </div>

      {notes.length === 0 ? (
        <p className="text-sm text-gray-400">아직 AI 검토 결과가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {notes.map((note) => (
            <li key={note}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 text-left text-sm text-gray-700 hover:text-gray-900"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                  {note}
                </span>
                <ChevronRightIcon className="shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

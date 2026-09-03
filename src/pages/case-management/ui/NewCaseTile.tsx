import AddIcon from "@/assets/icons/schedule/add-icon.svg?react";

type NewCaseTileProps = {
  onClick?: () => void;
};

export default function NewCaseTile({ onClick }: NewCaseTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-95 w-full flex-col items-center justify-center gap-3 rounded-[20px] border border-gray-200 bg-white p-6 text-center shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)] hover:border-blue-300 hover:bg-blue-50/40"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500">
        <AddIcon width={20} height={20} />
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-base font-bold text-gray-900">새 사건 시작</p>
        <p className="text-sm text-gray-500">
          다툼이 생겼다면 먼저 등록하세요
        </p>
      </div>
    </button>
  );
}

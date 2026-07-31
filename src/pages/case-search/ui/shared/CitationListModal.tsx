import Icon from "@/shared/ui/Icon";
import DocumentIcon from "@/assets/icons/shared/document-icon.svg?react";

export type CitationItem = {
  id: string;
  title: string;
  court: string;
  caseNumber: string;
  date: string;
  onRemove: () => void;
};

type CitationListModalProps = {
  items: CitationItem[];
  onClose: () => void;
};

export default function CitationListModal({
  items,
  onClose,
}: CitationListModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col gap-5 overflow-y-auto rounded-3xl bg-white p-5 sm:p-8">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            내 인용 목록 ({items.length})
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-500"
          >
            &times;
          </button>
        </div>

        <p className="-mt-3 text-sm text-gray-500">
          문서 생성 시 청구원인·준비서면에 자동으로 반영됩니다.
        </p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-1 py-10 text-center text-gray-500">
            <Icon icon={DocumentIcon} size={26} />
            <p className="pt-3">아직 인용한 판례가 없습니다.</p>
            <p>판례 카드의 [내 문서에 인용]을 눌러 담아보세요.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-0.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <button
                    type="button"
                    onClick={item.onRemove}
                    className="shrink-0 text-sm text-red-500"
                  >
                    제거
                  </button>
                </div>
                <p className="text-[13px] text-gray-500">
                  {item.court} · {item.caseNumber} · {item.date}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          className="flex items-center justify-center gap-1.5 self-end rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white"
        >
          문서 생성으로 보내기 →
        </button>
      </div>
    </div>
  );
}

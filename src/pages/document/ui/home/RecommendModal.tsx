import type { Case } from "@/shared/api/cases";
import { recommendationsByStatus } from "../../data/recommendations";
import type { DocumentTypeId } from "../../data/documentTypes";
import Modal from "../shared/Modal";

type RecommendModalProps = {
  selectedCase?: Case;
  onPick: (type: DocumentTypeId) => void;
  onClose: () => void;
};

const priorityTone = {
  높음: "bg-blue-50 text-blue-500",
  보통: "bg-gray-100 text-gray-600",
  낮음: "bg-gray-100 text-gray-400",
};

export default function RecommendModal({ selectedCase, onPick, onClose }: RecommendModalProps) {
  const items = selectedCase ? recommendationsByStatus[selectedCase.status] : [];

  return (
    <Modal title="AI 맞춤 추천" onClose={onClose} maxWidthClassName="max-w-[600px]">
      {selectedCase ? (
        <p className="rounded-lg bg-blue-50 px-4 py-1 text-xs leading-[1.6] text-blue-300">
          <b>{selectedCase.title}</b> 사건을 분석하여 다음 단계에 필요한 문서를 추천해드립니다.
        </p>
      ) : (
        <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">사건을 먼저 선택하면 필요한 문서를 추천해드려요.</p>
      )}

      {selectedCase && items.length === 0 && (
        <p className="py-6 text-center text-sm text-gray-500">종결된 사건이라 추천할 문서가 없어요.</p>
      )}

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.documentType} className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 px-4 py-3">
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-gray-700">{item.label}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${priorityTone[item.priority]}`}>{item.priority}</span>
              </div>
              <p className="text-xs text-gray-500">{item.reason}</p>
            </div>
            <button
              type="button"
              onClick={() => onPick(item.documentType)}
              className="shrink-0 rounded-lg bg-blue-300 px-5 py-3 text-sm font-semibold text-white"
            >
              작성하기
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="rounded-lg bg-blue-300 px-5 py-3 text-sm font-semibold text-white">
          확인
        </button>
      </div>
    </Modal>
  );
}

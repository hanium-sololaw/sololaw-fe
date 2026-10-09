import { useState } from "react";
import Modal from "../shared/Modal";
import type { Case } from "@/shared/api/cases";
import { caseStatusMeta } from "@/pages/case-management/lib/caseDisplay";

type CaseSelectModalProps = {
  cases: Case[];
  selectedId: number | null;
  onConfirm: (id: number) => void;
  onCreate: () => void;
  onClose: () => void;
};

export default function CaseSelectModal({ cases, selectedId, onConfirm, onCreate, onClose }: CaseSelectModalProps) {
  const [pickedId, setPickedId] = useState(selectedId);

  return (
    <Modal title="어느 사건의 문서인가요?" onClose={onClose} maxWidthClassName="max-w-2xl">
      <p className="-mt-3 text-sm text-gray-500 sm:text-base">
        고른 사건을 현재 작업 기준으로 사용합니다. 새 소장은 완성 후 따로 연결할 수 있어요.
      </p>

      {cases.length === 0 ? (
        <p className="text-sm text-gray-400">등록된 사건이 없어요. 사건 관리 페이지에서 먼저 사건을 등록해주세요.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {cases.map((item) => {
            const active = item.id === pickedId;
            const status = caseStatusMeta[item.status];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPickedId(item.id)}
                className={`flex items-start justify-between gap-3 rounded-xl border px-5 py-4 text-left ${
                  active ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <p className={`font-semibold ${active ? "text-blue-300" : "text-gray-700"}`}>{item.title}</p>
                  <p className={`text-sm ${active ? "text-blue-300" : "text-gray-400"}`}>
                    {item.caseNumber} · {item.court}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    active ? "text-blue-500" : status.style
                  }`}
                >
                  {status.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onCreate}
          className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700"
        >
          + 사건 생성
        </button>
        <button
          type="button"
          disabled={pickedId === null}
          onClick={() => pickedId !== null && onConfirm(pickedId)}
          className="rounded-xl bg-blue-300 px-8 py-3 font-semibold text-white disabled:bg-blue-200"
        >
          확인
        </button>
      </div>
    </Modal>
  );
}

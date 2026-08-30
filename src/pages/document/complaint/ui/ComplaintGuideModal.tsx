import { useState } from "react";
import Modal from "../../shared/Modal";
import Icon from "@/shared/ui/Icon";
import ChevronRightIcon from "@/assets/icons/document/chevron-right-icon.svg?react";
import type { ComplaintType } from "../lib/complaintTypes";

type ComplaintGuideModalProps = {
  type: ComplaintType;
  onClose: () => void;
  onConfirm: (situationLabel: string) => void;
};

export default function ComplaintGuideModal({
  type,
  onClose,
  onConfirm,
}: ComplaintGuideModalProps) {
  const situations = type.situations;
  const [situationId, setSituationId] = useState(situations[0].id);
  const activeSituation = situations.find((s) => s.id === situationId) ?? situations[0];

  return (
    <Modal
      title={`소장(${type.title.replace(/\s/g, "")})`}
      onClose={onClose}
      maxWidthClassName="max-w-xl"
    >
      <p className="-mt-3 text-sm text-gray-500">
        지금 상황을 선택하면 소장이 맞는 절차인지 무엇을 준비해야 하는지 알려드려요.
      </p>

      <div className="flex flex-col gap-2.5">
        {situations.map((situation) => {
          const active = situation.id === situationId;
          return (
            <button
              key={situation.id}
              type="button"
              onClick={() => setSituationId(situation.id)}
              className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                active
                  ? "border-blue-300 bg-blue-50 text-blue-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {situation.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-gray-50 px-4 py-3.5 text-sm leading-relaxed text-gray-600">
        {activeSituation.hint.split("\n").map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-gray-900">미리 알아두면 좋은 정보</p>
        <div className="flex flex-col gap-1.5 rounded-xl bg-gray-50 px-4 py-3.5 text-sm leading-relaxed text-gray-600">
          {type.tips.map((tip) => (
            <p key={tip}>{tip}</p>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-gray-900">준비할 항목</p>
        <div className="flex flex-wrap gap-2">
          {type.attachmentOptions.map((item) => (
            <span
              key={item}
              className="rounded-full border border-gray-200 px-3.5 py-1.5 text-sm text-gray-600"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onConfirm(activeSituation.label)}
        className="flex items-center justify-center gap-1.5 self-end rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
      >
        문서 생성으로 보내기
        <Icon icon={ChevronRightIcon} size={16} />
      </button>
    </Modal>
  );
}

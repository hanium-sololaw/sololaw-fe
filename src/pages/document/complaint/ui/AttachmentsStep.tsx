import type { ComplaintType } from "../lib/complaintTypes";
import type { ComplaintForm } from "../lib/types";

type AttachmentsStepProps = {
  type: ComplaintType;
  form: ComplaintForm;
  onChange: <K extends keyof ComplaintForm>(key: K, value: ComplaintForm[K]) => void;
};

export default function AttachmentsStep({ type, form, onChange }: AttachmentsStepProps) {
  const toggle = (option: string) => {
    const next = form.attachments.includes(option)
      ? form.attachments.filter((item) => item !== option)
      : [...form.attachments, option];
    onChange("attachments", next);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">가지고 있는 자료</h3>
        <p className="mt-1 text-sm text-gray-500">
          체크한 순서대로 갑 제1호증, 갑 제2호증…으로 소장에 매겨져요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {type.attachmentOptions.map((option) => {
          const index = form.attachments.indexOf(option);
          const checked = index !== -1;
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                checked ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border text-[11px] font-bold ${
                  checked ? "border-blue-400 bg-blue-400 text-white" : "border-gray-300 text-transparent"
                }`}
              >
                ✓
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium text-gray-800">{option}</span>
              {checked && (
                <span className="shrink-0 rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-blue-500">
                  갑 제{index + 1}호증
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400">
        자료가 없어도 소장을 완성할 수 있어요. 파일 자체는 증거목록 문서에서 따로 업로드해주세요.
      </p>
    </div>
  );
}

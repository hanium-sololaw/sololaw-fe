import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import CheckButtonIcon from "@/assets/icons/mypage/check-button.svg?react";
import {
  effectiveDate,
  highlightedSections,
  termsSections,
} from "../data/termsSections";

type TermsModalProps = {
  onClose: () => void;
};

export default function TermsModal({ onClose }: TermsModalProps) {
  return (
    <div data-modal className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="scrollbar-none flex max-h-[85vh] w-full max-w-lg flex-col gap-5 overflow-y-auto rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900">
              서비스 이용약관
            </h2>
            <p className="text-sm text-gray-500">시행일 {effectiveDate}</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {termsSections.map((section) => (
            <div
              key={section.title}
              className={`flex flex-col gap-1.5 ${
                highlightedSections.has(section.title)
                  ? "rounded-lg bg-blue-50 py-3 px-4"
                  : ""
              }`}
            >
              <h3 className="text-sm font-bold text-gray-900">
                {section.title}
              </h3>

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-xs leading-[1.6] font-medium text-gray-400"
                >
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ol className="flex list-decimal flex-col gap-1 pl-5 marker:text-gray-500">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="text-xs leading-[1.6] font-medium text-gray-400"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex w-full shrink-0 items-center justify-center gap-1 rounded-lg bg-blue-300 py-3 text-sm font-semibold text-white hover:bg-blue-500"
        >
          <CheckButtonIcon />
          확인했어요
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import CheckButtonIcon from "@/assets/icons/mypage/check-button.svg?react";
import UploadIcon from "@/assets/icons/schedule/upload-outline-icon.svg?react";
import { mockLawsuits } from "@/pages/guide/data/mockLawsuits";

type CourtNoticeUploadModalProps = {
  onClose: () => void;
};

const extractedInfo = [
  "사건번호 및 사건명",
  "변론기일 날짜 및 시간",
  "법원 정보(관할 법원, 재판부)",
  "제출 기한(답변서, 준비서면 등)",
];

export default function CourtNoticeUploadModal({
  onClose,
}: CourtNoticeUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const caseSelectRef = useRef<HTMLDivElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [caseId, setCaseId] = useState("");
  const [isCaseOpen, setIsCaseOpen] = useState(false);

  const selectedCase = mockLawsuits.find((lawsuit) => lawsuit.id === caseId);

  useEffect(() => {
    if (!isCaseOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        caseSelectRef.current &&
        !caseSelectRef.current.contains(event.target as Node)
      ) {
        setIsCaseOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCaseOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900">
              법원 통지서에서 일정 자동 등록
            </h2>
            <p className="text-sm text-gray-500">
              텍스트 PDF·TXT를 이 기기에서 읽고, 선택한 일정만 사건에
              저장합니다.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">
            등록할 사건
          </label>
          <div ref={caseSelectRef} className="relative">
            <button
              type="button"
              onClick={() => setIsCaseOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm outline-none focus:border-blue-400"
            >
              <span
                className={selectedCase ? "text-gray-800" : "text-gray-400"}
              >
                {selectedCase ? selectedCase.title : "사건을 선택해주세요"}
              </span>
            </button>

            {isCaseOpen && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-[14px] border border-gray-200 bg-white shadow-lg">
                {mockLawsuits.map((lawsuit) => (
                  <button
                    key={lawsuit.id}
                    type="button"
                    onClick={() => {
                      setCaseId(lawsuit.id);
                      setIsCaseOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50"
                  >
                    {lawsuit.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 rounded-[14px] border border-dashed border-gray-200 bg-gray-50 py-10 text-center"
          >
            <UploadIcon />
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-gray-500">
                {fileName ?? "PDF"}
              </span>
              <span className="text-xs text-gray-400">
                PDF, JPG, PNG, DOCX (최대 10MB)
              </span>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.docx"
            className="hidden"
            onChange={(event) =>
              setFileName(event.target.files?.[0]?.name ?? null)
            }
          />
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-400">
            자동으로 추출하는 정보
          </p>
          <ul className="flex flex-col gap-1.5">
            {extractedInfo.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-blue-400"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex w-full shrink-0 items-center justify-center gap-1 rounded-lg bg-blue-400 py-3 text-sm font-semibold text-white hover:bg-blue-500"
        >
          <CheckButtonIcon />
          확인했어요
        </button>
      </div>
    </div>
  );
}

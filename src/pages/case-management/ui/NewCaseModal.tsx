import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import ChevronDownIcon from "@/assets/icons/home/arrow-bottom.svg?react";
import UploadIcon from "@/assets/icons/schedule/upload-outline-icon.svg?react";
import AboutIcon from "@/assets/icons/case-search/about-icon.svg?react";
import { createCase } from "@/shared/api/cases";
import {
  caseTypeByLabel,
  startingStageByProgressId,
} from "../lib/newCaseMapping";

const caseTypes = [
  "대여금",
  "임대차 보증금 반환",
  "건물명도",
  "손해배상",
  "임금체불(임금·퇴직금)",
  "기타",
];

const courts = [
  "서울중앙지방법원",
  "서울동부지방법원",
  "서울남부지방법원",
  "서울북부지방법원",
  "서울서부지방법원",
  "수원지방법원",
  "인천지방법원",
];

const progressOptions = [
  {
    id: "none",
    title: "아직 상대방에게 별도로 요구하지 않았어요",
    description: "분쟁이 시작됐지만, 아직 공식적으로 대응하지 않은 상태예요.",
  },
  {
    id: "notice",
    title: "상대방에게 해결을 요구했어요 (내용증명)",
    description: "연락하거나 내용증명을 보냈지만, 아직 해결되지 않았어요.",
  },
  {
    id: "preparing",
    title: "소송을 준비하고 있어요",
    description: "분쟁 경위와 자료를 정리하며 소송 제기를 준비하고 있어요.",
  },
  {
    id: "filed",
    title: "법원에 소장을 제출했고, 이후 절차를 진행하고 있어요",
    description: "답변서·기일통지서 등 법원의 다음 절차를 기다리고 있어요.",
  },
];

function useOutsideClick(onOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOutside]);

  return ref;
}

type SelectFieldProps = {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({
  value,
  placeholder,
  options,
  onChange,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm outline-none focus:border-blue-400"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-56 w-full overflow-y-auto rounded-[14px] border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type NewCaseModalProps = {
  onClose: () => void;
  onCreated: () => void;
};

export default function NewCaseModal({ onClose, onCreated }: NewCaseModalProps) {
  const [caseTitle, setCaseTitle] = useState("");
  const [caseType, setCaseType] = useState("");
  const [defendant, setDefendant] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [court, setCourt] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [progressStage, setProgressStage] = useState("none");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    if (!caseTitle.trim() || !defendant.trim()) {
      setSubmitError("사건명과 상대방(피고)은 필수예요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await createCase({
        title: caseTitle.trim(),
        caseType: caseTypeByLabel[caseType],
        opponentName: defendant.trim(),
        claimAmount: claimAmount ? Number(claimAmount) : undefined,
        court: court || undefined,
        caseNumber: caseNumber.trim() || undefined,
        startingStage: startingStageByProgressId[progressStage],
      });
      onCreated();
    } catch {
      setSubmitError("사건을 만들지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-modal className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="scrollbar-none flex max-h-[90vh] w-full max-w-xl flex-col gap-5 overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 [&::-webkit-scrollbar]:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900">
              새 사건 만들기
            </h2>
            <p className="text-sm text-gray-500">
              진행할 소송 사건을 등록하세요.
            </p>
          </div>

          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">사건명</label>
          <input
            value={caseTitle}
            onChange={(event) => setCaseTitle(event.target.value)}
            placeholder="예: 임대차 보증금 반환 청구"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              사건 유형
            </label>
            <SelectField
              value={caseType}
              placeholder="선택하세요"
              options={caseTypes}
              onChange={setCaseType}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              상대방(피고)
            </label>
            <input
              value={defendant}
              onChange={(event) => setDefendant(event.target.value)}
              placeholder="예: 김철수"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              청구 금액
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={claimAmount}
                onChange={(event) => setClaimAmount(event.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-gray-200 py-3 pr-9 pl-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400"
              />
              <span className="pointer-events-none absolute right-4 text-sm text-gray-400">
                원
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              관할 법원
            </label>
            <SelectField
              value={court}
              placeholder="선택하세요"
              options={courts}
              onChange={setCourt}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">사건번호</label>
          <input
            value={caseNumber}
            onChange={(event) => setCaseNumber(event.target.value)}
            placeholder="접수 후 부여됩니다 · 신규 사건이라면 비워두세요!"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400"
          />
          <p className="text-xs text-gray-400">
            사건번호는 법원에 소장을 접수하면 부여됩니다.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">
            관련 서류 첨부{" "}
            <span className="font-medium text-gray-400">(선택)</span>
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 rounded-[14px] border border-dashed border-gray-200 bg-gray-50 py-10 text-center"
          >
            <UploadIcon />
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-gray-500">
                {fileName || "파일 선택"}
              </span>
              <span className="text-xs text-gray-400">
                내용증명, 계약서 등 (PDF, JPG, PNG, DOCX · 최대 10MB)
              </span>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.docx"
            className="hidden"
            onChange={(event) =>
              setFileName(event.target.files?.[0]?.name ?? "")
            }
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-bold text-gray-700">
            어디까지 진행되었나요?
          </label>

          <div className="flex flex-col gap-2">
            {progressOptions.map((option) => {
              const selected = progressStage === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setProgressStage(option.id)}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left ${
                    selected
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 ${
                      selected ? "border-blue-400" : "border-gray-300"
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                    )}
                  </span>

                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-900">
                      {option.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-400">
            선택한 단계에 맞춰 필요한 절차를 안내해드릴게요. 진행 단계는
            나중에 변경할 수 있어요.
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3.5">
          <AboutIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
          <p className="text-xs text-blue-700">
            관할 법원은 사건 유형·주소지에 따라 정해집니다. 정확한 관할은
            반드시 직접 확인하세요.
          </p>
        </div>

        {submitError && (
          <p className="text-xs font-medium text-red-500">{submitError}</p>
        )}

        <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] border border-gray-300 px-4.5 py-2.5 text-sm font-semibold text-gray-700"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-[10px] bg-blue-400 px-4.5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {isSubmitting ? "만드는 중..." : "사건 만들기"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { myCases } from "../../data/myCases";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

export default function CaseSelectionCard() {
  const selectedId = useCaseSearchStore((state) => state.selectedCaseId);
  const onSelect = useCaseSearchStore((state) => state.selectCase);
  const onConfirm = useCaseSearchStore((state) => state.confirmCase);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedCase = myCases.find((item) => item.id === selectedId);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-300 text-xs font-semibold text-white">
            1
          </span>
          분석할 내 사건 선택
        </h2>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-500">
          AI 분석
        </span>
      </div>

      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-4 text-left"
        >
          {selectedCase ? (
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-gray-900">
                {selectedCase.title}
              </p>
              <p className="text-sm text-gray-500">
                {selectedCase.caseNumber} · {selectedCase.type}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">사건을 선택해주세요</p>
          )}
          <svg
            className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            {myCases.map((item) => {
              const selected = item.id === selectedId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(item.id);
                      setIsOpen(false);
                    }}
                    className={`flex w-full flex-col gap-0.5 p-4 text-left ${
                      selected ? "bg-blue-50/50" : "hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.caseNumber} · {item.type}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="text-sm text-gray-500">
        선택한 사건의 쟁점을 분석해 관련도 높은 판례와 승소율(표본)을
        보여드려요.
      </p>

      <button
        type="button"
        onClick={onConfirm}
        className="w-full rounded-xl bg-blue-400 py-3.5 text-base text-white"
      >
        선택 완료
      </button>
    </section>
  );
}

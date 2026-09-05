import { useEffect, useRef, useState, type ReactNode } from "react";

type DropdownProps<T extends string | number> = {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  renderValue: (value: T) => ReactNode;
  renderOption: (option: T) => ReactNode;
  placeholder?: ReactNode;
};

export default function Dropdown<T extends string | number>({
  value,
  options,
  onChange,
  renderValue,
  renderOption,
  placeholder,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-4 text-left"
      >
        {value ? renderValue(value) : <p className="text-gray-500">{placeholder}</p>}
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
          {options.map((option) => {
            const selected = option === value;
            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`flex w-full flex-col gap-0.5 p-4 text-left ${
                    selected ? "bg-blue-50/50" : "hover:bg-gray-50"
                  }`}
                >
                  {renderOption(option)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

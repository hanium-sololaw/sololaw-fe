type AttachmentsStepProps = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function AttachmentsStep({ options, selected, onChange }: AttachmentsStepProps) {
  const toggle = (option: string) => {
    onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
  };

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-gray-700">함께 낼 서류</span>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const checked = selected.includes(option);
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
            </button>
          );
        })}
      </div>
    </div>
  );
}

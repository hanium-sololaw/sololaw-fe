export type ResultTab = "search" | "saved";

type ResultTabSwitchProps = {
  tab: ResultTab;
  savedCount: number;
  onChange: (tab: ResultTab) => void;
};

export default function ResultTabSwitch({ tab, savedCount, onChange }: ResultTabSwitchProps) {
  const tabs: { id: ResultTab; label: string }[] = [
    { id: "search", label: "검색 결과" },
    { id: "saved", label: `저장됨(${savedCount})` },
  ];

  return (
    <div className="flex gap-1 self-start rounded-lg bg-gray-100 p-1 text-sm">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-md px-3 py-1.5 ${tab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

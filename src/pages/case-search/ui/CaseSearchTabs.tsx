export type CaseSearchTab = "similar" | "keyword";

const tabs: { id: CaseSearchTab; label: string }[] = [
  { id: "similar", label: "내 사건과 비슷한 판례" },
  { id: "keyword", label: "키워드로 판례 검색" },
];

type CaseSearchTabsProps = {
  activeTab: CaseSearchTab;
  onChange: (tab: CaseSearchTab) => void;
};

export default function CaseSearchTabs({
  activeTab,
  onChange,
}: CaseSearchTabsProps) {
  return (
    <div className="flex gap-1 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-t-xl px-6 py-3 text-base font-medium transition-colors ${
            activeTab === tab.id
              ? "border border-b-0 border-gray-200 bg-white text-gray-900"
              : "text-gray-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

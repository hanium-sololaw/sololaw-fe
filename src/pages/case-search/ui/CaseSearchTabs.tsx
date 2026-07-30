import { tabs } from "../data/tabs";
import { useCaseSearchStore } from "../store/useCaseSearchStore";

export default function CaseSearchTabs() {
  const activeTab = useCaseSearchStore((state) => state.activeTab);
  const setActiveTab = useCaseSearchStore((state) => state.setActiveTab);

  return (
    <div className="flex gap-1 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
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

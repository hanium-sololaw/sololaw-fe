import CaseSearchHeader from "./ui/CaseSearchHeader";
import CaseSearchTabs from "./ui/CaseSearchTabs";
import SimilarCaseAnalysis from "./ui/SimilarCaseAnalysis";
import CaseSelectionCard from "./ui/CaseSelectionCard";
import SelectedCaseBar from "./ui/SelectedCaseBar";
import AnalysisInfoCard from "./ui/AnalysisInfoCard";
import CaseResultPanel from "./ui/CaseResultPanel";
import RelatedStatsCard from "./ui/RelatedStatsCard";
import RelatedLawsCard from "./ui/RelatedLawsCard";
import AITipsCard from "./ui/AITipsCard";
import AboutSearchCard from "./ui/AboutSearchCard";
import KeywordSearchTab from "./ui/KeywordSearchTab";
import AccuracyBanner from "./ui/AccuracyBanner";
import { myCases } from "./data/myCases";
import { useCaseSearchStore } from "./store/useCaseSearchStore";

export default function CaseSearchPage() {
  const activeTab = useCaseSearchStore((state) => state.activeTab);
  const selectedCaseId = useCaseSearchStore((state) => state.selectedCaseId);
  const caseConfirmed = useCaseSearchStore((state) => state.caseConfirmed);

  const selectedCase = myCases.find((item) => item.id === selectedCaseId)!;

  return (
    <div className="flex flex-col gap-6">
      <CaseSearchHeader citationCount={0} />

      <div className="flex flex-col">
        <CaseSearchTabs />

        <div className="rounded-b-2xl rounded-tr-2xl border border-t-0 border-gray-200 bg-white p-6">
          {activeTab === "keyword" ? (
            <KeywordSearchTab />
          ) : (
            <div className="grid grid-cols-[1fr_360px] gap-6">
              <div className="flex flex-col gap-6">
                {myCases.length === 0 ? (
                  <SimilarCaseAnalysis />
                ) : (
                  <>
                    {caseConfirmed ? (
                      <SelectedCaseBar caseItem={selectedCase} />
                    ) : (
                      <CaseSelectionCard />
                    )}

                    <AnalysisInfoCard caseTitle={selectedCase.title} />

                    <AccuracyBanner />
                  </>
                )}
                <CaseResultPanel />
              </div>

              <div className="flex flex-col gap-6">
                <RelatedStatsCard />
                <RelatedLawsCard />
                <AITipsCard />
                <AboutSearchCard />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

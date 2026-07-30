import CaseSearchHeader from "./ui/header/CaseSearchHeader";
import CaseSearchTabs from "./ui/header/CaseSearchTabs";
import SimilarCaseAnalysis from "./ui/analysis-info/SimilarCaseAnalysis";
import CaseSelectionCard from "./ui/analysis-info/CaseSelectionCard";
import SelectedCaseBar from "./ui/analysis-info/SelectedCaseBar";
import AnalysisInfoCard from "./ui/analysis-info/AnalysisInfoCard";
import AccuracyBanner from "./ui/analysis-info/AccuracyBanner";
import CaseAnalysisLoading from "./ui/result/CaseAnalysisLoading";
import CaseResultPanel from "./ui/result/CaseResultPanel";
import RelatedStatsCard from "./ui/result/RelatedStatsCard";
import RelatedLawsCard from "./ui/sidebar/RelatedLawsCard";
import AITipsCard from "./ui/sidebar/AITipsCard";
import AboutSearchCard from "./ui/sidebar/AboutSearchCard";
import KeywordSearchTab from "./ui/KeywordSearchTab";
import { myCases } from "./data/myCases";
import { useCaseSearchStore } from "./store/useCaseSearchStore";

export default function CaseSearchPage() {
  const activeTab = useCaseSearchStore((state) => state.activeTab);
  const selectedCaseId = useCaseSearchStore((state) => state.selectedCaseId);
  const caseConfirmed = useCaseSearchStore((state) => state.caseConfirmed);
  const hasAnalyzed = useCaseSearchStore((state) => state.hasAnalyzed);
  const isAnalyzing = useCaseSearchStore((state) => state.isAnalyzing);

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

                    {!hasAnalyzed && (
                      <>
                        <AnalysisInfoCard caseTitle={selectedCase.title} />
                        <AccuracyBanner />
                      </>
                    )}
                  </>
                )}
                {isAnalyzing ? <CaseAnalysisLoading /> : <CaseResultPanel />}
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

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
import KeywordSearchTab from "./ui/keyword/KeywordSearchTab";
import KeywordDisclaimerCard from "./ui/keyword/KeywordDisclaimerCard";
import CitationListModal from "./ui/shared/CitationListModal";
import { myCases } from "./data/myCases";
import { mockCases } from "./data/mockCases";
import { keywordSearchResults } from "./data/keywordSearch";
import { useCaseSearchStore } from "./store/useCaseSearchStore";
import { useModal } from "@/shared/hooks/useModal";

export default function CaseSearchPage() {
  const activeTab = useCaseSearchStore((state) => state.activeTab);
  const selectedCaseId = useCaseSearchStore((state) => state.selectedCaseId);
  const caseConfirmed = useCaseSearchStore((state) => state.caseConfirmed);
  const hasAnalyzed = useCaseSearchStore((state) => state.hasAnalyzed);
  const isAnalyzing = useCaseSearchStore((state) => state.isAnalyzing);
  const citedCaseIds = useCaseSearchStore((state) => state.citedCaseIds);
  const citedKeywordCaseIds = useCaseSearchStore(
    (state) => state.citedKeywordCaseIds,
  );
  const toggleCitedCase = useCaseSearchStore((state) => state.toggleCitedCase);
  const toggleCitedKeywordCase = useCaseSearchStore(
    (state) => state.toggleCitedKeywordCase,
  );
  const citationModal = useModal();

  const selectedCase = myCases.find((item) => item.id === selectedCaseId)!;

  const citedItems = [
    ...mockCases
      .filter((item) => citedCaseIds.has(item.id))
      .map((item) => ({ ...item, onRemove: () => toggleCitedCase(item.id) })),
    ...keywordSearchResults
      .filter((item) => citedKeywordCaseIds.has(item.id))
      .map((item) => ({
        ...item,
        onRemove: () => toggleCitedKeywordCase(item.id),
      })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <CaseSearchHeader
        citationCount={citedItems.length}
        onOpenCitationList={citationModal.open}
      />

      {citationModal.isOpen && (
        <CitationListModal items={citedItems} onClose={citationModal.close} />
      )}

      <div className="flex flex-col">
        <CaseSearchTabs />

        <div className="rounded-b-2xl rounded-tr-2xl bg-white p-6">
          {activeTab === "keyword" ? (
            <div className="grid grid-cols-[1fr_360px] gap-6">
              <KeywordSearchTab />

              <div className="flex flex-col gap-6">
                <RelatedLawsCard />
                <AITipsCard />
                <AboutSearchCard />
                <KeywordDisclaimerCard />
              </div>
            </div>
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

                    {!hasAnalyzed && !isAnalyzing && (
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

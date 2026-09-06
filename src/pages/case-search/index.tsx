import CaseSearchHeader from "./ui/header/CaseSearchHeader";
import CaseSearchTabs from "./ui/header/CaseSearchTabs";
import SimilarCaseAnalysis from "./ui/analysis-info/SimilarCaseAnalysis";
import CaseSelectionCard from "./ui/analysis-info/CaseSelectionCard";
import SelectedCaseBar from "./ui/analysis-info/SelectedCaseBar";
import AnalysisInfoCard from "./ui/analysis-info/AnalysisInfoCard";
import AccuracyBanner from "./ui/analysis-info/AccuracyBanner";
import CaseResultPanel from "./ui/result/CaseResultPanel";
import RelatedStatsCard from "./ui/result/RelatedStatsCard";
import RelatedLawsCard from "./ui/sidebar/RelatedLawsCard";
import AboutSearchCard from "./ui/sidebar/AboutSearchCard";
import KeywordSearchTab from "./ui/keyword/KeywordSearchTab";
import KeywordDisclaimerCard from "./ui/keyword/KeywordDisclaimerCard";
import CitationListModal from "./ui/shared/CitationListModal";
import SearchLoading from "./ui/shared/SearchLoading";
import { useCaseSearchStore } from "./store/useCaseSearchStore";
import { useModal } from "@/shared/hooks/useModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CaseSearchPage() {
  const navigate = useNavigate();
  const activeTab = useCaseSearchStore((state) => state.activeTab);
  const myCases = useCaseSearchStore((state) => state.myCases);
  const casesLoading = useCaseSearchStore((state) => state.casesLoading);
  const loadMyCases = useCaseSearchStore((state) => state.loadMyCases);
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
  const cases = useCaseSearchStore((state) => state.cases);
  const keywordCases = useCaseSearchStore((state) => state.keywordCases);
  const citationModal = useModal();

  useEffect(() => {
    loadMyCases();
  }, [loadMyCases]);

  const selectedCase = myCases.find((item) => item.id === selectedCaseId);

  const citedItems = [
    ...cases
      .filter((item) => citedCaseIds.has(item.id))
      .map((item) => ({ ...item, onRemove: () => toggleCitedCase(item) })),
    ...keywordCases
      .filter((item) => citedKeywordCaseIds.has(item.id))
      .map((item) => ({
        ...item,
        onRemove: () => toggleCitedKeywordCase(item.id),
      })),
  ];

  return (
    <div className="flex flex-col gap-6 pb-6">
      <CaseSearchHeader
        citationCount={citedItems.length}
        onOpenCitationList={citationModal.open}
      />

      {citationModal.isOpen && (
        <CitationListModal
          items={citedItems}
          onClose={citationModal.close}
          onSendToDocument={() => {
            citationModal.close();
            navigate("/document");
          }}
        />
      )}

      <div className="flex flex-col">
        <CaseSearchTabs />

        <div className="rounded-b-2xl rounded-tr-2xl bg-white p-4 sm:p-6">
          {activeTab === "keyword" ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
              <KeywordSearchTab />

              <div className="flex flex-col gap-6">
                <RelatedLawsCard />
                <AboutSearchCard />
                <KeywordDisclaimerCard />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
              <div className="flex flex-col gap-6">
                {casesLoading ? (
                  <SearchLoading title="내 사건을 불러오고 있어요" subtitle="잠시만 기다려주세요..." />
                ) : !selectedCase ? (
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
                {isAnalyzing ? <SearchLoading /> : <CaseResultPanel />}
              </div>

              <div className="flex flex-col gap-6">
                <RelatedStatsCard />
                <RelatedLawsCard />
                {/* <AITipsCard /> */}
                <AboutSearchCard />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

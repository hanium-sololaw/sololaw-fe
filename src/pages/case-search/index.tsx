import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/shared/hooks/useModal";
import { useCitedItems } from "./hooks/useCitedItems";
import { useCaseSearchStore } from "./store/useCaseSearchStore";
import AccuracyBanner from "./ui/analysis-info/AccuracyBanner";
import AnalysisInfoCard from "./ui/analysis-info/AnalysisInfoCard";
import CaseSelectionCard from "./ui/analysis-info/CaseSelectionCard";
import SelectedCaseBar from "./ui/analysis-info/SelectedCaseBar";
import SimilarCaseAnalysis from "./ui/analysis-info/SimilarCaseAnalysis";
import CaseSearchHeader from "./ui/header/CaseSearchHeader";
import CaseSearchTabs from "./ui/header/CaseSearchTabs";
import KeywordDisclaimerCard from "./ui/keyword/KeywordDisclaimerCard";
import KeywordSearchTab from "./ui/keyword/KeywordSearchTab";
import CaseResultPanel from "./ui/result/CaseResultPanel";
import RelatedStatsCard from "./ui/result/RelatedStatsCard";
import CitationListModal from "./ui/citation/CitationListModal";
import SearchLoading from "./ui/shared/SearchLoading";
import AboutSearchCard from "./ui/sidebar/AboutSearchCard";
import RelatedLawsCard from "./ui/sidebar/RelatedLawsCard";

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
  const citedItems = useCitedItems();
  const citationModal = useModal();

  useEffect(() => {
    loadMyCases();
  }, [loadMyCases]);

  const selectedCase = myCases.find((item) => item.id === selectedCaseId);

  const sendToDocument = () => {
    citationModal.close();
    navigate("/document");
  };

  const caseSetup = () => {
    if (casesLoading) return <SearchLoading title="내 사건을 불러오고 있어요" subtitle="잠시만 기다려주세요..." />;
    if (!selectedCase) return <SimilarCaseAnalysis />;
    return (
      <>
        {caseConfirmed ? <SelectedCaseBar caseItem={selectedCase} /> : <CaseSelectionCard />}
        {!hasAnalyzed && !isAnalyzing && (
          <>
            <AnalysisInfoCard caseTitle={selectedCase.title} />
            <AccuracyBanner />
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <CaseSearchHeader citationCount={citedItems.length} onOpenCitationList={citationModal.open} />

      {citationModal.isOpen && (
        <CitationListModal items={citedItems} onClose={citationModal.close} onSendToDocument={sendToDocument} />
      )}

      <div className="flex flex-col">
        <CaseSearchTabs />

        <div className="rounded-b-2xl rounded-tr-2xl bg-white p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            {activeTab === "keyword" ? (
              <>
                <KeywordSearchTab />
                <div className="flex flex-col gap-6">
                  <RelatedLawsCard />
                  <AboutSearchCard />
                  <KeywordDisclaimerCard />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-6">
                  {caseSetup()}
                  {isAnalyzing ? <SearchLoading /> : <CaseResultPanel />}
                </div>
                <div className="flex flex-col gap-6">
                  <RelatedStatsCard />
                  <RelatedLawsCard />
                  <AboutSearchCard />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

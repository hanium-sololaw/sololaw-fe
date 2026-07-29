import { useState } from "react";

import CaseSearchHeader from "./ui/CaseSearchHeader";
import CaseSearchTabs, { type CaseSearchTab } from "./ui/CaseSearchTabs";
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
import { myCases } from "./data/myCases";
import { getAccuracyLevel } from "./data/accuracy";

const emptyChecklist = { basic: false, complaint: false, evidence: false };

export default function CaseSearchPage() {
  const [activeTab, setActiveTab] = useState<CaseSearchTab>("similar");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(myCases[1].id);
  const [caseConfirmed, setCaseConfirmed] = useState(true);
  const [checkedItems, setCheckedItems] = useState(emptyChecklist);

  const selectedCase = myCases.find((item) => item.id === selectedCaseId)!;

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const accuracy = getAccuracyLevel(checkedCount);

  return (
    <div className="flex flex-col gap-6">
      <CaseSearchHeader citationCount={0} />

      <div className="flex flex-col">
        <CaseSearchTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="rounded-b-2xl rounded-tr-2xl border border-t-0 border-gray-200 bg-white p-6">
          {activeTab === "keyword" ? (
            <KeywordSearchTab />
          ) : (
            <div className="grid grid-cols-[1fr_360px] gap-6">
              <div className="flex flex-col gap-6">
                {myCases.length === 0 ? (
                  <SimilarCaseAnalysis onAnalyze={() => setHasAnalyzed(true)} />
                ) : (
                  <>
                    {caseConfirmed ? (
                      <SelectedCaseBar
                        caseItem={selectedCase}
                        onChange={() => setCaseConfirmed(false)}
                      />
                    ) : (
                      <CaseSelectionCard
                        selectedId={selectedCaseId}
                        onSelect={setSelectedCaseId}
                        onConfirm={() => {
                          setCaseConfirmed(true);
                          setCheckedItems(emptyChecklist);
                        }}
                      />
                    )}

                    <AnalysisInfoCard
                      caseTitle={selectedCase.title}
                      checkedItems={checkedItems}
                      onToggleItem={(id) =>
                        setCheckedItems((prev) => ({
                          ...prev,
                          [id]: !prev[id],
                        }))
                      }
                      onAnalyze={() => setHasAnalyzed(true)}
                    />

                    {accuracy === "낮음" && (
                      <p className="rounded-xl bg-orange-50 px-5 py-3 text-sm text-orange-600">
                        정보가 적어 관련 판례 정확도가 낮을 수 있어요. 소장을
                        작성·업로드하거나 사건 상황을 적으면 더 정확해집니다.
                      </p>
                    )}

                    {accuracy === "높음" && (
                      <p className="rounded-xl bg-blue-50 px-5 py-3 text-sm text-blue-600">
                        소장·증거까지 충분한 정보로 분석했어요. 사건 쟁점과 가장
                        관련도 높은 판례를 보여드립니다.
                      </p>
                    )}
                  </>
                )}
                <CaseResultPanel hasAnalyzed={hasAnalyzed} />
              </div>

              <div className="flex flex-col gap-6">
                <RelatedStatsCard hasAnalyzed={hasAnalyzed} />
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

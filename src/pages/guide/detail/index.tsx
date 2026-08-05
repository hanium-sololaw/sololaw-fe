import GuideHeader from "../ui/GuideHeader";
import CaseSummaryBar from "./ui/CaseSummaryBar";
import ProcedureTimeline from "./ui/ProcedureTimeline";
import UpcomingSchedule from "./ui/UpcomingSchedule";
import SubmittedDocuments from "./ui/SubmittedDocuments";
import {
  caseSummary,
  procedureSteps,
  upcomingSchedules,
  submittedDocuments,
} from "./data/mockGuideDetail";

export default function GuideDetailPage() {
  return (
    <div className="flex flex-col gap-6">
      <GuideHeader />

      <CaseSummaryBar
        category={caseSummary.category}
        title={caseSummary.title}
        court={caseSummary.court}
        caseNumber={caseSummary.caseNumber}
        progress={caseSummary.progress}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <ProcedureTimeline steps={procedureSteps} />

        <div className="flex flex-col gap-6">
          <UpcomingSchedule schedules={upcomingSchedules} />
          <SubmittedDocuments documents={submittedDocuments} />
        </div>
      </div>
    </div>
  );
}

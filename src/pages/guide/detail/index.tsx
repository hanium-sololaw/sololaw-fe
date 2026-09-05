import { useParams } from "react-router-dom";
import CaseGuideDetailPage from "./CaseGuideDetailPage";

const KNOWN_CASE_IDS = ["1", "2", "3", "4", "5"];

export default function GuideDetailPage() {
  const { id } = useParams();

  if (id && KNOWN_CASE_IDS.includes(id)) {
    return <CaseGuideDetailPage caseId={id} />;
  }

  return <CaseGuideDetailPage caseId="1" />;
}

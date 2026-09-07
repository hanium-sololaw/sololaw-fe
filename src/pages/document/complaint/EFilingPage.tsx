import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { ComplaintDoc } from "./lib/buildDoc";
import type { ComplaintForm } from "./lib/types";
import EFilingGuideView from "./ui/EFilingGuideView";

type EFilingLocationState = { doc: ComplaintDoc; form: ComplaintForm; typeTitle: string };

export default function ComplaintEFilingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as EFilingLocationState | null;

  if (!state?.doc) return <Navigate to="/document/complaint" replace />;

  return (
    <EFilingGuideView
      doc={state.doc}
      form={state.form}
      typeTitle={state.typeTitle}
      onEdit={() => navigate("/document/complaint")}
      onBack={() => navigate("/document/complaint/done", { state })}
    />
  );
}

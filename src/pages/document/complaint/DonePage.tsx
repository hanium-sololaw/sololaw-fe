import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { ComplaintDoc } from "./lib/buildDoc";
import type { ComplaintForm } from "./lib/types";
import DoneView from "./ui/DoneView";

type DoneLocationState = { doc: ComplaintDoc; form: ComplaintForm; typeTitle: string };

export default function ComplaintDonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as DoneLocationState | null;

  if (!state?.doc) return <Navigate to="/document/complaint" replace />;

  return (
    <DoneView
      doc={state.doc}
      onEdit={() => navigate("/document/complaint")}
      onExit={() => navigate("/document")}
      onSubmitGuide={() => navigate("/document/complaint/efiling", { state })}
    />
  );
}

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { EvidenceListDoc } from "./lib/buildDoc";
import DoneView from "./ui/DoneView";

type DoneLocationState = { doc: EvidenceListDoc };

export default function EvidenceListDonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as DoneLocationState | null;

  if (!state?.doc) return <Navigate to="/document/evidence" replace />;

  return (
    <DoneView
      doc={state.doc}
      onEdit={() => navigate("/document/evidence")}
      onExit={() => navigate("/document")}
    />
  );
}

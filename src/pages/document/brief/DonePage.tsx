import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { BriefDoc } from "./lib/buildDoc";
import DoneView from "./ui/DoneView";

type DoneLocationState = { doc: BriefDoc };

export default function BriefDonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as DoneLocationState | null;

  if (!state?.doc) return <Navigate to="/document/brief" replace />;

  return (
    <DoneView
      doc={state.doc}
      onEdit={() => navigate("/document/brief")}
      onExit={() => navigate("/document")}
    />
  );
}

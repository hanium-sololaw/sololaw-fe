import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { PetitionDoc } from "./lib/buildDoc";
import DoneView from "./ui/DoneView";

type DoneLocationState = { doc: PetitionDoc };

export default function PetitionDonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as DoneLocationState | null;

  if (!state?.doc) return <Navigate to="/document/petition" replace />;

  return (
    <DoneView
      doc={state.doc}
      onEdit={() => navigate("/document/petition")}
      onExit={() => navigate("/document")}
    />
  );
}

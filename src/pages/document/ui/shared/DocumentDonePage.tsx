import type { ReactNode } from "react";
import { Navigate, useLocation, useNavigate, type NavigateFunction } from "react-router-dom";

type DoneActions = {
  onEdit: () => void;
  onExit: () => void;
  navigate: NavigateFunction;
};

type DocumentDonePageProps<TState extends { doc: unknown }> = {
  wizardPath: string;
  children: (state: TState, actions: DoneActions) => ReactNode;
};

export default function DocumentDonePage<TState extends { doc: unknown }>({
  wizardPath,
  children,
}: DocumentDonePageProps<TState>) {
  const navigate = useNavigate();
  const state = useLocation().state as TState | null;

  if (!state?.doc) return <Navigate to={wizardPath} replace />;

  return children(state, {
    onEdit: () => navigate(wizardPath),
    onExit: () => navigate("/document"),
    navigate,
  });
}

import DocumentDonePage from "../ui/shared/DocumentDonePage";
import type { ComplaintDoc } from "./lib/buildDoc";
import type { ComplaintForm } from "./lib/types";
import DoneView from "./ui/done/DoneView";

type ComplaintDoneState = { doc: ComplaintDoc; form: ComplaintForm; typeTitle: string };

export default function ComplaintDonePage() {
  return (
    <DocumentDonePage<ComplaintDoneState> wizardPath="/document/complaint">
      {(state, { onEdit, onExit, navigate }) => (
        <DoneView
          doc={state.doc}
          onEdit={onEdit}
          onExit={onExit}
          onSubmitGuide={() => navigate("/document/complaint/efiling", { state })}
        />
      )}
    </DocumentDonePage>
  );
}

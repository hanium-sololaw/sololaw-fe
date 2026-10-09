import DocumentDonePage from "../ui/shared/DocumentDonePage";
import type { ComplaintDoc } from "./lib/buildDoc";
import type { ComplaintForm } from "./lib/types";
import EFilingGuideView from "./ui/efiling/EFilingGuideView";

type ComplaintDoneState = { doc: ComplaintDoc; form: ComplaintForm; typeTitle: string };

export default function ComplaintEFilingPage() {
  return (
    <DocumentDonePage<ComplaintDoneState> wizardPath="/document/complaint">
      {(state, { onEdit, navigate }) => (
        <EFilingGuideView
          doc={state.doc}
          form={state.form}
          typeTitle={state.typeTitle}
          onEdit={onEdit}
          onBack={() => navigate("/document/complaint/done", { state })}
        />
      )}
    </DocumentDonePage>
  );
}

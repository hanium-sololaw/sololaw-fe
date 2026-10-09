import DocumentDonePage from "../ui/shared/DocumentDonePage";
import type { EvidenceListDoc } from "./lib/buildDoc";
import DoneView from "./ui/done/DoneView";

export default function EvidenceListDonePage() {
  return (
    <DocumentDonePage<{ doc: EvidenceListDoc }> wizardPath="/document/evidence">
      {({ doc }, { onEdit, onExit }) => <DoneView doc={doc} onEdit={onEdit} onExit={onExit} />}
    </DocumentDonePage>
  );
}

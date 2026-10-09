import DocumentDonePage from "../ui/shared/DocumentDonePage";
import type { BriefDoc } from "./lib/buildDoc";
import DoneView from "./ui/done/DoneView";

export default function BriefDonePage() {
  return (
    <DocumentDonePage<{ doc: BriefDoc }> wizardPath="/document/brief">
      {({ doc }, { onEdit, onExit }) => <DoneView doc={doc} onEdit={onEdit} onExit={onExit} />}
    </DocumentDonePage>
  );
}

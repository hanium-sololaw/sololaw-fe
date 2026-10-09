import DocumentDonePage from "../ui/shared/DocumentDonePage";
import type { PetitionDoc } from "./lib/buildDoc";
import DoneView from "./ui/done/DoneView";

export default function PetitionDonePage() {
  return (
    <DocumentDonePage<{ doc: PetitionDoc }> wizardPath="/document/petition">
      {({ doc }, { onEdit, onExit }) => <DoneView doc={doc} onEdit={onEdit} onExit={onExit} />}
    </DocumentDonePage>
  );
}

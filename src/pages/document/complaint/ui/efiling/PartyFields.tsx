import type { Party } from "../../lib/types";
import AccordionSection from "./AccordionSection";
import CopyRow from "./CopyRow";
import { maskResidentId } from "./helpers";

export default function PartyFields({
  index,
  title,
  hint,
  party,
}: {
  index: number;
  title: string;
  hint?: string;
  party: Party | undefined;
}) {
  if (!party) return null;
  return (
    <AccordionSection index={index} title={title} hint={hint}>
      <CopyRow label="이름 / 상호" value={party.name} />
      {party.residentId && <CopyRow label="주민등록번호" value={maskResidentId(party.residentId)} />}
      <CopyRow label="주소" value={party.address} />
      {party.fax && <CopyRow label="연락처" value={party.fax} />}
    </AccordionSection>
  );
}

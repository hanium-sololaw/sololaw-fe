import DocumentDoneLayout from "../../shared/DocumentDoneLayout";
import type { EvidenceListDoc } from "../lib/buildDoc";
import EvidenceListPaper from "./EvidenceListPaper";

type DoneViewProps = {
  doc: EvidenceListDoc;
  onEdit: () => void;
  onExit: () => void;
};

export default function DoneView({ doc, onEdit, onExit }: DoneViewProps) {
  return (
    <DocumentDoneLayout
      title="완성된 증거목록"
      badge={doc.title}
      subtitle="추가한 증거를 순서대로 호증 번호를 매겨 증거설명서 양식에 맞춰 정리했습니다."
      disclaimer="이 문서는 참고용 초안입니다. 제출 전 호증 번호가 소장·준비서면에서 이미 낸 번호와 겹치지 않는지 반드시 확인하세요."
      onEdit={onEdit}
      onExit={onExit}
    >
      <EvidenceListPaper doc={doc} />
    </DocumentDoneLayout>
  );
}

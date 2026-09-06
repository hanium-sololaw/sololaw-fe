import DocumentDoneLayout from "../../shared/DocumentDoneLayout";
import type { BriefDoc } from "../lib/buildDoc";
import BriefPaper from "./BriefPaper";

type DoneViewProps = {
  doc: BriefDoc;
  onEdit: () => void;
  onExit: () => void;
};

export default function DoneView({ doc, onEdit, onExit }: DoneViewProps) {
  return (
    <DocumentDoneLayout
      title="완성된 준비서면"
      badge={doc.title}
      subtitle="상대방 주장과 반박 내용을 준비서면 양식에 맞춰 정리했습니다."
      disclaimer="이 문서는 참고용 초안입니다. 제출 전 사건번호·당사자·주장 내용을 반드시 검토하고 수정하세요."
      onEdit={onEdit}
      onExit={onExit}
    >
      <BriefPaper doc={doc} />
    </DocumentDoneLayout>
  );
}

import DocumentDoneLayout from "../../shared/DocumentDoneLayout";
import type { PetitionDoc } from "../lib/buildDoc";
import PetitionPaper from "./PetitionPaper";

type DoneViewProps = {
  doc: PetitionDoc;
  onEdit: () => void;
  onExit: () => void;
};

export default function DoneView({ doc, onEdit, onExit }: DoneViewProps) {
  return (
    <DocumentDoneLayout
      title={`완성된 ${doc.title}`}
      subtitle="입력한 내용을 신청서 양식에 맞춰 정리했습니다."
      disclaimer="이 문서는 참고용 초안입니다. 제출 전 당사자·금액·기재사항을 반드시 검토하고 수정하세요. 주민등록번호는 법원 제출본에만 넣고 상대방 부본에서는 뒷자리를 가려주세요."
      onEdit={onEdit}
      onExit={onExit}
    >
      <PetitionPaper doc={doc} />
    </DocumentDoneLayout>
  );
}

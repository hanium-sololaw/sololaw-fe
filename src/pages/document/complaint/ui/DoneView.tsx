import Icon from "@/shared/ui/Icon";
import ArrowRightIcon from "@/assets/icons/schedule/arrow-right-icon.svg?react";
import DocumentDoneLayout from "../../shared/DocumentDoneLayout";
import type { ComplaintDoc } from "../lib/buildDoc";
import ComplaintPaper from "./ComplaintPaper";

type DoneViewProps = {
  doc: ComplaintDoc;
  onEdit: () => void;
  onExit: () => void;
  onSubmitGuide: () => void;
};

export default function DoneView({ doc, onEdit, onExit, onSubmitGuide }: DoneViewProps) {
  return (
    <DocumentDoneLayout
      title="완성된 소장"
      badge={doc.caseName}
      subtitle="입력한 사실관계를 법원 제출 문장과 소장 양식에 맞춰 정리했습니다."
      disclaimer="이 문서는 참고용 초안입니다. 제출 전 사건번호·당사자·금액·청구 내용을 반드시 검토하고 수정하세요."
      onEdit={onEdit}
      onExit={onExit}
      extraActions={
        <button
          type="button"
          onClick={onSubmitGuide}
          className="flex items-center gap-1 rounded-xl bg-blue-400 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
        >
          전자소송 제출 안내
          <Icon icon={ArrowRightIcon} size={16} className="[&_path]:stroke-white" />
        </button>
      }
    >
      <ComplaintPaper doc={doc} />
    </DocumentDoneLayout>
  );
}

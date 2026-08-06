import DocumentIcon from "@/assets/icons/shared/document-icon.svg?react";
import CheckBadgeIcon from "@/assets/lawsuit/check-yellow-icon.svg?react";
import { useModal } from "@/shared/hooks/useModal";
import type { SubmittedDocument } from "../data/mockGuideDetail";
import UploadDocumentModal from "./UploadDocumentModal";

type SubmittedDocumentsProps = {
  caseTitle: string;
  documents: SubmittedDocument[];
};

export default function SubmittedDocuments({
  caseTitle,
  documents,
}: SubmittedDocumentsProps) {
  const uploadModal = useModal();

  return (
    <section className="rounded-[20px] border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">제출 서류</h2>

      <div className="flex flex-col gap-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-[10px] border border-gray-100 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <DocumentIcon className="text-gray-500" />
              <span className="text-base leading-6 font-normal text-gray-900">
                {doc.title}
              </span>
            </div>

            {doc.submitted ? (
              <CheckBadgeIcon className="h-5 w-5" />
            ) : (
              <span className="h-4 w-4 rounded-full border-2 border-gray-300" />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={uploadModal.open}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] bg-blue-400 py-3 text-sm font-semibold text-white"
      >
        서류 업로드
      </button>

      {uploadModal.isOpen && (
        <UploadDocumentModal
          caseTitle={caseTitle}
          documents={documents}
          onClose={uploadModal.close}
        />
      )}
    </section>
  );
}

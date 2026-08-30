import docTypeImage from "@/assets/images/document/doc-type.png";
import { documentTypes, type DocumentTypeId } from "../data/documentTypes";

type DocumentTypeCardProps = {
  title: string;
  description: string;
  onPick: () => void;
};

function DocumentTypeCard({
  title,
  description,
  onPick,
}: DocumentTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onPick}
      className="relative flex flex-col items-start gap-1 rounded-2xl border border-gray-200 bg-[#F2F4F6] p-6 text-left transition-colors hover:border-blue-300 hover:bg-blue-50"
    >
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="relative mt-6 flex w-full items-center justify-center">
        <img
          src={docTypeImage}
          alt=""
          className="relative w-full object-contain pr-[12px]"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[100px] w-full -translate-x-1/2 rounded-b-[20px] bg-[rgba(242,244,246,0.68)] backdrop-blur-sm" />
    </button>
  );
}

type DocumentTypeSelectorProps = {
  onPick: (id: DocumentTypeId) => void;
};

export default function DocumentTypeSelector({
  onPick,
}: DocumentTypeSelectorProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        작성할 문서 유형을 선택하세요
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {documentTypes.map((doc) => (
          <DocumentTypeCard
            key={doc.id}
            title={doc.title}
            description={doc.description}
            onPick={() => onPick(doc.id)}
          />
        ))}
      </div>
    </section>
  );
}

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
      className="group relative flex flex-col items-start gap-1 overflow-hidden rounded-2xl border border-gray-200 bg-[#F2F4F6] p-6 text-left transition-colors duration-300 hover:border-[#90c2ff] hover:bg-[#e8f3ff]"
    >
      <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-400">{title}</h3>
      <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-blue-400">{description}</p>

      <div className="relative mt-4 aspect-[248/210] w-full">
        <div className="absolute top-[54%] left-[55%] h-[92%] w-[66%] -translate-x-1/2 -translate-y-1/2 rotate-[5.54deg] rounded-[14px] bg-[#c0cad7] transition-transform duration-300 ease-out group-hover:top-[55%] group-hover:rotate-[14.22deg]" />
        <div className="absolute top-[49%] left-[45%] h-[92%] w-[66%] -translate-x-1/2 -translate-y-1/2 -rotate-[4.3deg] rounded-[14px] bg-white shadow-[0_0_22px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out group-hover:top-[51%] group-hover:-rotate-[7.28deg]" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[100px] w-full -translate-x-1/2 rounded-b-[20px] bg-[rgba(242,244,246,0.68)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[rgba(198,225,255,0.34)]" />
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

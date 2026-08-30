import { petitionTypes } from "../lib/petitionTypes";
import type { PetitionTypeId } from "../lib/types";

type TypeStepProps = {
  onPick: (id: PetitionTypeId) => void;
  onBack: () => void;
};

export default function TypeStep({ onPick, onBack }: TypeStepProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 self-start text-sm text-gray-500 hover:text-gray-700"
      >
        ← 문서 종류 다시 고르기
      </button>

      <h1 className="text-center text-2xl font-bold text-gray-900">어떤 신청서를 작성할까요?</h1>

      <div className="rounded-2xl border border-gray-200 bg-white">
        {petitionTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onPick(type.id)}
            className="flex w-full items-center gap-3 border-b border-gray-100 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-gray-50"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-gray-900">{type.title}</span>
              <span className="mt-0.5 block text-sm text-gray-500">{type.description}</span>
            </span>
            <span className="shrink-0 text-gray-300">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400";

type NarrativeStepProps = {
  question: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function NarrativeStep({ question, placeholder, value, onChange }: NarrativeStepProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{question}</span>
      <textarea
        rows={7}
        className={`${inputCls} h-auto resize-y py-2.5 leading-relaxed`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="mt-1.5 block text-xs text-gray-400">
        문장을 다듬지 않아도 괜찮아요. AI가 신청서 문체로 정리해드립니다.
      </span>
    </label>
  );
}

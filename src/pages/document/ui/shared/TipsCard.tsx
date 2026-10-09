type TipsCardProps = {
  title: string;
  /** Wrap the words to highlight in **double asterisks**. */
  tips: string[];
};

export default function TipsCard({ title, tips }: TipsCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 bg-white p-6">
      <h2 className="text-lg leading-7 font-semibold text-gray-900">{title}</h2>
      <ul className="flex flex-col gap-1">
        {tips.map((tip) => (
          <li key={tip} className="flex items-center gap-[7px] text-xs text-gray-700">
            <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />
            <p className="leading-[1.6]">
              {tip.split(/\*\*(.+?)\*\*/).map((part, index) =>
                index % 2 === 1 ? (
                  <span key={index} className="font-semibold text-blue-300">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

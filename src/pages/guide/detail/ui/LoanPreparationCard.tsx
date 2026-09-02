type LoanPreparationCardProps = {
  items: string[];
};

export default function LoanPreparationCard({
  items,
}: LoanPreparationCardProps) {
  return (
    <section className="rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <span className="flex aspect-square h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-center text-base leading-7 font-semibold text-blue-300">
          2
        </span>
        <h2 className="text-base font-semibold text-gray-900">
          이 단계 준비물은?
        </h2>
      </div>

      <ul className="mt-4 flex flex-col gap-1">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-base text-gray-700"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

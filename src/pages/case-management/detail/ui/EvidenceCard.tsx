import { Link } from "react-router-dom";

type EvidenceCardProps = {
  completed: number;
  total: number;
};

export default function EvidenceCard({ completed, total }: EvidenceCardProps) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">증빙자료</h2>
        <span className="text-sm font-semibold text-gray-400">{total}개</span>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-3xl font-bold text-gray-900">
          {completed}
          <span className="text-base font-medium text-gray-400">
            {" "}
            / {total}건 입증취지 작성
          </span>
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-blue-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Link
        to="/evidence"
        className="self-start text-sm font-semibold text-blue-500 hover:text-blue-600"
      >
        증빙자료에서 보기 →
      </Link>
    </section>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listMyCases, type Case } from "@/shared/api/cases";
import { caseStatusMeta } from "@/pages/case-management/lib/caseDisplay";

const RECENT_CASE_COUNT = 2;

export default function DashboardRecentActivity() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    listMyCases()
      .then((result) => {
        if (cancelled) return;
        const recent = [...result.content]
          .sort(
            (a, b) =>
              new Date(b.modifiedAt).getTime() -
              new Date(a.modifiedAt).getTime(),
          )
          .slice(0, RECENT_CASE_COUNT);
        setCases(recent);
      })
      .catch(() => {
        if (!cancelled) setError("최근 사건을 불러오지 못했어요.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border border-gray-200
        bg-white
        p-6
        shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-8
          right-8
          bottom-3
          h-16
          rounded-[28px]
          bg-[linear-gradient(180deg,transparent_0%,#F6FAFF_35%,#E8F2FF_100%)]
          blur-2xl
          opacity-70
        "
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-900">최근 사건</h2>
            <p className="text-sm text-gray-500">
              최근 수정한 사건에서 바로 이어서 하세요.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/case-management")}
            className="
      text-sm
      text-blue-400"
          >
            전체보기 →
          </button>
        </div>

        {isLoading && <p className="text-sm text-gray-400">불러오는 중...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <ul className="flex flex-col gap-3">
          {cases.map((item) => {
            const statusMeta = caseStatusMeta[item.status];
            const meta = [item.caseNumber, item.court]
              .filter(Boolean)
              .join(" · ");

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/case-management/${item.id}`)}
                  className="flex w-full items-center justify-between gap-3 rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-left hover:border-blue-200"
                >
                  <div className="flex min-w-0 flex-col gap-0.75">
                    <p className="truncate text-base text-gray-800">
                      {item.title}
                    </p>
                    {meta && (
                      <p className="truncate text-sm text-gray-400">{meta}</p>
                    )}
                  </div>

                  {statusMeta && (
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${statusMeta.style}`}
                    >
                      {statusMeta.label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

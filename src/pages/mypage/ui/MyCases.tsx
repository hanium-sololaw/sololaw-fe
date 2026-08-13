import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";
import { myCases, caseStatusStyle } from "../data/mockMyPage";

export default function MyCases() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-5 rounded-[20px] border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-gray-900">내 사건</h2>

      <div className="flex flex-col gap-3">
        {myCases.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(`/guide/${item.id}`)}
            className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5 text-left hover:bg-gray-50"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-900">
                  {item.title}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${caseStatusStyle[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {item.caseNumber} · {item.court}
              </p>
            </div>

            <ChevronRightIcon />
          </button>
        ))}
      </div>
    </section>
  );
}

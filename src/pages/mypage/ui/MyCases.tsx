import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@/assets/icons/mypage/chevron-right-icon.svg?react";
import { myCases, caseStatusStyle } from "../data/mockMyPage";

export default function MyCases() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-5 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-gray-900">내 사건</h2>
          <p className="text-sm text-gray-500">
            최근 수정한 사건부터 보여드려요.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-0.5 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          전체보기
          <ChevronRightIcon />
        </button>
      </div>

      {myCases.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-gray-50 px-6 py-10 text-center">
          <p className="text-sm font-semibold text-gray-700">
            아직 등록한 사건이 없어요.
          </p>
          <p className="text-sm text-gray-500">
            사건을 만들면 문서·증거·일정이 한곳에 모입니다.
          </p>
          <button
            type="button"
            className="mt-1 rounded-xl bg-blue-400 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            첫 사건 만들기
          </button>
        </div>
      ) : (
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
      )}
    </section>
  );
}

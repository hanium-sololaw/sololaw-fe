import { Link } from "react-router-dom";

export default function NotificationHeader() {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          <Link to="/mypage" className="text-gray-400 hover:text-gray-600">
            마이페이지
          </Link>
          <span className="text-gray-300">&gt;</span>
          알림 관리
        </h1>
        <p className="text-base text-gray-500">
          소송 진행에 필요한 알림을 확인하고 설정하세요.
        </p>
      </div>

      <button type="button" className="text-sm font-semibold text-blue-400">
        모두 읽음
      </button>
    </div>
  );
}

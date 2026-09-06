type DashboardHeaderProps = {
  hasCases: boolean;
};

export default function DashboardHeader({ hasCases }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-5">
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold text-gray-900">안녕하세요, 지민님</p>
        {hasCases ? (
          <p className="text-lg text-gray-700">
            진행 중인 사건 2건 | 다음 기일까지
            <span className="font-bold text-red-500"> D-3</span>
          </p>
        ) : (
          <p className="text-lg text-gray-700">
            첫 사건을 등록하고 소송 준비를 시작해보세요.
          </p>
        )}
      </div>

      <div className="flex flex-col justify-center text-right text-sm text-gray-700 gap-1">
        <p>2026년 5월 28일 목요일</p>
        <p className="font-semibold text-gray-800">오전 9:12</p>
      </div>
    </div>
  );
}

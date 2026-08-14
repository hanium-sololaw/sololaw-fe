export default function MyPageHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        마이페이지
      </h1>
      <p className="text-sm text-gray-500">
        내 사건 현황과 계정·저장공간 설정을 관리하세요.
      </p>
    </div>
  );
}

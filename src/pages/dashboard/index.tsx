import DashboardHeader from "./ui/DashboardHeader";

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <main className="p-6">
        <p>대시보드 콘텐츠</p>
      </main>
    </div>
  );
}

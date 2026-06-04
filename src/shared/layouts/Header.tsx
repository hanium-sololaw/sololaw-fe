import AlertIcon from "@/assets/dashboard/Icon_Dashboard.svg";

export default function Header() {
  return (
    <header className="flex items-center justify-end px-6 py-5.5">
      <div className="flex items-center gap-6">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <img src={AlertIcon} alt="알림" />
        </button>

        <div className="flex items-center gap-1">
          <div className="h-14 w-14 overflow-hidden rounded-full bg-gray-200">
            <img alt="프로필" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-gray-900">김지민</span>
            <span className="text-sm text-gray-500">example@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}

import AlertIcon from "@/assets/icons/shared/alert-bell-icon.svg?react";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-900">
          <AlertIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
            <img alt="프로필" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900">
              김지민
            </span>
            <span className="text-xs text-gray-500">example@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}

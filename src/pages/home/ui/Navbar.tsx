import { Link, useLocation } from "react-router-dom";
import Icon from "@/shared/ui/Icon";
import LogoIcon from "@/assets/icons/LogoIcon";

const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "서비스 소개", href: "/service" },
  { label: "사용 방법", href: "/guide" },
  { label: "기반 법률상담", href: "/consult" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Icon icon={LogoIcon} size={30} />
          <span className="font-700 text-[#64A8FF)] text-[18px]">
            나홀로법에
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm transition-colors ${
                location.pathname === item.href
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors"
        >
          시작하기
        </Link>
      </div>
    </header>
  );
}

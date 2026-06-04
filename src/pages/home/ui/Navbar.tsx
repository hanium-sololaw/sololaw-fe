import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon from "@/shared/ui/Icon";
import LogoSvg from "@/assets/icons/logo.svg?react";

const NAV_ITEMS = [
  { label: "홈", sectionId: "home" },
  { label: "서비스 소개", sectionId: "service" },
  { label: "이용 절차", sectionId: "guide" },
  { label: "자주 묻는 질문", sectionId: "faq" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const handler = () => {
      const offset = window.innerHeight * 0.4;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(ids[i]);
          return;
        }
      }
      setActive(ids[0]);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);

  return active;
}

export default function Navbar() {
  const activeSection = useActiveSection(NAV_ITEMS.map((i) => i.sectionId));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Icon icon={LogoSvg} size={32} />
          <span className="font-paperlogy font-bold text-[#64A8FF] text-[20px]">
            나홀로법에
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className={`relative text-[15px] font-medium pb-1 transition-colors ${
                  isActive
                    ? "text-blue-300 font-medium"
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-[5px] left-0 right-0 h-[1px] bg-blue-300 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        <Link
          to="/login"
          className="border-1 border-blue-300 text-blue-300 text-[15px] font-medium px-[16px] py-[8px] rounded-[8px] transition-colors"
        >
          시작하기
        </Link>
      </div>
    </header>
  );
}

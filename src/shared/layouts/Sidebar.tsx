import { NavLink } from "react-router-dom";

import LogoIcon from "@/assets/icons/shared/logo-full.svg?react";
import LogominiIcon from "@/assets/icons/shared/logo.svg?react";
import DashboardIcon from "@/assets/icons/shared/dashboard-icon.svg?react";
import DocumentIcon from "@/assets/icons/shared/document-icon.svg?react";
import JudgeIcon from "@/assets/icons/shared/judge-icon.svg?react";
import BookIcon from "@/assets/icons/shared/book-icon.svg?react";
import DataIcon from "@/assets/icons/shared/data-icon.svg?react";
import BellIcon from "@/assets/icons/shared/bell-icon.svg?react";
import GuideIcon from "@/assets/icons/shared/guide-icon.svg?react";
import LogoutIcon from "@/assets/icons/shared/logout-icon.svg?react";

const mainNavItems = [
  { to: "/dashboard", icon: DashboardIcon, label: "대시보드" },
  { to: "/document", icon: DocumentIcon, label: "문서 생성" },
  { to: "/case", icon: JudgeIcon, label: "판례 검색" },
  { to: "/guide", icon: BookIcon, label: "절차 안내" },
  { to: "/evidence", icon: DataIcon, label: "증빙 자료" },
  { to: "/schedule", icon: BellIcon, label: "스케줄 관리" },
];

const bottomNavItems = [
  { to: "/help", icon: GuideIcon, label: "가이드" },
  { to: "/logout", icon: LogoutIcon, label: "로그아웃" },
];

type NavItemProps = {
  to: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  small?: boolean;
};

function NavItem({ to, icon: Icon, label, small = false }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-[10px] font-medium
        lg:w-full lg:justify-start lg:px-4
        ${small ? "h-10 w-10 text-sm" : "h-12 w-12 text-base"}
        ${isActive ? "bg-blue-400 text-white" : "text-gray-500"}`
      }
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        <Icon />
      </span>

      <span className="hidden pl-3 lg:inline">{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-20 shrink-0 flex-col overflow-hidden bg-white lg:w-64">
      <div className="flex h-20 shrink-0 items-center justify-center">
        <LogominiIcon width={40} height={40} className="lg:hidden" />
        <LogoIcon width={150} height={45} className="hidden lg:block" />
      </div>

      <nav className="flex flex-1 flex-col items-center gap-1 px-2 lg:px-4">
        <div className="flex w-full flex-col items-center gap-1 px-1 lg:px-3">
          <div className="hidden h-8 w-full shrink-0 items-center text-sm text-gray-500 lg:flex">
            메인 메뉴
          </div>

          {mainNavItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>

      <nav className="flex shrink-0 flex-col items-center gap-1 px-3 py-4">
        {bottomNavItems.map((item) => (
          <NavItem key={item.to} {...item} small />
        ))}
      </nav>
    </aside>
  );
}

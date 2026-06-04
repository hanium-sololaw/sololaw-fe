import { NavLink } from "react-router-dom";

import LogoIcon from "@/assets/layout/Logo.svg?react";
import LogominiIcon from "@/assets/layout/Logo_mini.svg?react";
import DashboardIcon from "@/assets/layout/dashboardIcon.svg?react";
import DocumentIcon from "@/assets/layout/documentIcon.svg?react";
import JudgeIcon from "@/assets/layout/judgeIcon.svg?react";
import BookIcon from "@/assets/layout/bookIcon.svg?react";
import DataIcon from "@/assets/layout/dataIcon.svg?react";
import BellIcon from "@/assets/layout/bellIcon.svg?react";
import GuideIcon from "@/assets/layout/guideIcon.svg?react";
import LogoutIcon from "@/assets/layout/logoutIcon.svg?react";

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

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavItemProps = {
  to: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  collapsed: boolean;
  small?: boolean;
};

function NavItem({
  to,
  icon: Icon,
  label,
  collapsed,
  small = false,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex shrink-0 items-center overflow-hidden whitespace-nowrap rounded-xl font-medium
        ${small ? "h-10 px-6 py-3 text-sm" : "h-12 text-base"}
        ${isActive ? "bg-blue-400 text-white" : "text-gray-500"}
        ${collapsed ? "justify-center px-3" : "px-4"}
        w-full`
      }
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        <Icon />
      </span>

      {!collapsed && <span className="pl-3">{label}</span>}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <aside
      className={`flex h-screen shrink-0 flex-col overflow-hidden bg-white ${
        collapsed ? "w-26" : "w-71.25"
      }`}
    >
      <div
        className={`flex h-25 shrink-0 cursor-pointer items-center justify-center ${
          collapsed ? "px-5.5 py-5" : "h-24.5"
        }`}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {collapsed ? <LogominiIcon /> : <LogoIcon />}
      </div>

      <nav className="flex flex-1 flex-col items-center gap-1 px-5">
        <div className={`w-full ${collapsed ? "px-1.5" : "px-3"}`}>
          <div className="flex h-8 w-full shrink-0 items-center px-4 text-sm text-gray-400">
            {!collapsed && "메인 메뉴"}
          </div>

          {mainNavItems.map((item) => (
            <NavItem key={item.to} {...item} collapsed={collapsed} />
          ))}
        </div>
      </nav>

      <nav className="flex shrink-0 flex-col items-center gap-1 px-3 py-4">
        {bottomNavItems.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed} small />
        ))}
      </nav>
    </aside>
  );
}

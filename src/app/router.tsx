import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/shared/layouts/MainLayout";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import DashboardPage from "@/pages/dashboard";
import CaseSearchPage from "@/pages/case-search";
import GuidePage from "@/pages/guide";
import GuideDetailPage from "@/pages/guide/detail";
import MyPage from "@/pages/mypage";
import NotificationsPage from "@/pages/mypage/notifications";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/case", element: <CaseSearchPage /> },
      { path: "/guide", element: <GuidePage /> },
      { path: "/guide/:id", element: <GuideDetailPage /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/mypage/notifications", element: <NotificationsPage /> },
    ],
  },
]);

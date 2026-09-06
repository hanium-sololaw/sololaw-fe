import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/shared/layouts/MainLayout";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import DashboardPage from "@/pages/dashboard";
import CaseSearchPage from "@/pages/case-search";
import DocumentPage from "@/pages/document";
import ComplaintWizardPage from "@/pages/document/complaint";
import BriefWizardPage from "@/pages/document/brief";
import EvidenceListWizardPage from "@/pages/document/evidence";
import PetitionWizardPage from "@/pages/document/petition";
import GuidePage from "@/pages/guide";
import GuideDetailPage from "@/pages/guide/detail";
import MyPage from "@/pages/mypage";
import NotificationsPage from "@/pages/mypage/notifications";
import SchedulePage from "@/pages/schedule";
import CaseManagementPage from "@/pages/case-management";
import CaseManagementDetailPage from "@/pages/case-management/detail";

import EvidencePage from "@/pages/evidence";

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
      { path: "/document", element: <DocumentPage /> },
      { path: "/document/complaint", element: <ComplaintWizardPage /> },
      { path: "/document/brief", element: <BriefWizardPage /> },
      { path: "/document/evidence", element: <EvidenceListWizardPage /> },
      { path: "/document/petition", element: <PetitionWizardPage /> },
      { path: "/case", element: <CaseSearchPage /> },
      { path: "/case-management", element: <CaseManagementPage /> },
      { path: "/case-management/:id", element: <CaseManagementDetailPage /> },
      { path: "/guide", element: <GuidePage /> },
      { path: "/guide/:id", element: <GuideDetailPage /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/mypage/notifications", element: <NotificationsPage /> },
      { path: "/schedule", element: <SchedulePage /> },
      { path: "/evidence", element: <EvidencePage /> },
    ],
  },
]);

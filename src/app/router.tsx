import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import DashboardPage from '@/pages/dashboard'
import SearchPage from '@/pages/search'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'search', element: <SearchPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

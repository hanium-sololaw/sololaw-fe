import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto bg-gray-50 px-6 pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

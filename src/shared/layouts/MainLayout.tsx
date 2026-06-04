import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={isCollapsed} setCollapsed={setIsCollapsed} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          <Outlet context={{ isCollapsed }} />
        </main>
      </div>
    </div>
  );
}

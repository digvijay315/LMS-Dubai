import React, { useState } from "react";
import Sidebar1 from "./sidebar1";
import Header from "./Header";

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r
        transition-all duration-300
        ${collapsed ? "w-20" : "w-72"}`}
      >
        <Sidebar1
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300
        ${collapsed ? "ml-2" : "ml-6"}`}
      >
        <Header />
        <div className="p-4 bg-white min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;

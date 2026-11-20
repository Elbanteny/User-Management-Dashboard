import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  // Close mobile sidebar on route changes without cascading effect renders
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setIsMobileSidebarOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotificationDrawer from "../NotificationDrawer";

const IconBell = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconMenu = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

interface HeaderProps {
  onOpenSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const getPageTitle = (pathname: string) => {
    if (pathname === "/" || pathname === "/users") return "Manajemen Pengguna";
    if (pathname.startsWith("/users/")) return "Detail Pengguna";
    if (pathname === "/roles") return "Manajemen Peran";
    if (pathname.startsWith("/profile")) return "Profil Akun";
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/settings") return "Pengaturan";
    return "Dashboard";
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu button - visible only on mobile/tablet (< md) */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onOpenSidebar}
            className="md:hidden -ml-1 text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
            aria-label="Buka menu navigasi"
          >
            <IconMenu />
          </Button>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            {getPageTitle(location.pathname)}
          </h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            pill
            onClick={() => setIsNotificationOpen(true)}
            className="relative text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            aria-label="Buka notifikasi"
          >
            <IconBell />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Standalone Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onUnreadCountChange={setUnreadCount}
      />
    </>
  );
};

export default Header;

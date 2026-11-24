import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { currentUser, initialUsers } from "@/constants/users";
import { initialRoles } from "@/constants/roles";
import { getInitials } from "@/lib/utils";
import { navigationConfig } from "@/constants/navigation";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const navContent = (
    <>
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navigationConfig.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (location.pathname === "/" && item.id === "users");
          const badge = item.getBadge?.({
            usersCount: initialUsers.length,
            rolesCount: initialRoles.length,
          });

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 font-medium"
              }`}
            >
              <div className="flex items-center">
                <span
                  className={`mr-3 text-lg group-hover:scale-110 transition-transform ${
                    isActive ? "scale-110" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </div>
              {badge !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-700"
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => handleNavClick(`/profile/${currentUser.id}`)}
          className={`w-full flex items-center p-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left group ${
            location.pathname.startsWith("/profile")
              ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200"
              : "bg-gray-50/70 hover:bg-gray-100/80"
          }`}
          title={`${currentUser.name} (${currentUser.email})`}
        >
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mr-3 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            {currentUser.avatar || getInitials(currentUser.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{currentUser.role}</p>
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar (Persistent) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">AdminPanel</h1>
        </div>
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col md:hidden shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigasi Menu Mobile"
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">AdminPanel</h1>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            aria-label="Tutup menu navigasi"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const IconHome = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);

const IconUsers = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 19c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
    <circle cx="17.5" cy="9" r="2.8" />
    <path d="M16 14.2c2.7.4 5 2.2 5 4.8" />
  </svg>
);

const IconShield = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M12 2.5 20 6v5c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-3.5z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconSettings = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M4 7h9M18 7h3M4 12h3M12 12h9M4 17h12M14 17h5" />
  </svg>
);

const navigationItems = [
  { id: "dashboard", name: "Dashboard", path: "/dashboard" },
  { id: "users", name: "Pengguna", path: "/users" },
  { id: "roles", name: "Roles", path: "/roles" },
  { id: "settings", name: "Pengaturan", path: "/settings" },
];

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
        {navigationItems.map((item) => {
          const getIcon = () => {
            switch (item.id) {
              case "dashboard":
                return <IconHome />;
              case "users":
                return <IconUsers />;
              case "roles":
                return <IconShield />;
              case "settings":
                return <IconSettings />;
            }
          };
          const isActive =
            location.pathname === item.path ||
            (location.pathname === "/" && item.id === "users");
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors group cursor-pointer ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
            >
              <span
                className={`mr-3 text-lg group-hover:scale-110 transition-transform ${
                  isActive ? "scale-110" : ""
                }`}
              >
                {getIcon()}
              </span>
              <span className="font-medium text-sm">{item.name}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => handleNavClick("/profile")}
          className={`w-full flex items-center p-2 rounded-lg transition-colors cursor-pointer text-left ${
            location.pathname === "/profile"
              ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center mr-3 shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 truncate">Admin</p>
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
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
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
          </button>
        </div>
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;

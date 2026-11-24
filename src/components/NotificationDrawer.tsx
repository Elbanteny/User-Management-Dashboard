import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCheck,
  UserPlus,
  Award,
  Shield,
  X,
  Trash2,
  Clock,
  Sparkles,
} from "lucide-react";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "user" | "subscription" | "system" | "security";
  isRead: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Pengguna Baru Terdaftar",
    message: "Budi Santoso telah bergabung melalui tautan referral REF-ALICE.",
    time: "5 menit yang lalu",
    type: "user",
    isRead: false,
  },
  {
    id: "notif-2",
    title: "Upgrade Langganan",
    message: "Dewi Lestari telah meningkatkan paket langganan ke Pro.",
    time: "1 jam yang lalu",
    type: "subscription",
    isRead: false,
  },
  {
    id: "notif-3",
    title: "Perubahan Hak Akses",
    message: "Izin akses untuk peran 'Editor' diperbarui oleh Administrator.",
    time: "3 jam yang lalu",
    type: "security",
    isRead: false,
  },
  {
    id: "notif-4",
    title: "Pemberitahuan Sistem",
    message: "Pemeliharaan server berkala dijadwalkan besok pukul 02:00 WIB.",
    time: "Kemarin",
    type: "system",
    isRead: true,
  },
  {
    id: "notif-5",
    title: "Pengguna Berlangganan Baru",
    message: "Rian Hidayat memulai langganan paket Gratis.",
    time: "2 hari yang lalu",
    type: "subscription",
    isRead: true,
  },
];

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onUnreadCountChange,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    initialNotifications
  );
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Notify parent of unread count change
  React.useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [unreadCount, onUnreadCountChange]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "user":
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserPlus className="w-4 h-4" />
          </div>
        );
      case "subscription":
        return (
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
        );
      case "security":
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4" />
          </div>
        );
      case "system":
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs z-50 transition-opacity duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 max-w-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Panel Notifikasi"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900">Notifikasi</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                    {unreadCount} baru
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Pembaruan aktivitas sistem Anda
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Tutup notifikasi"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Filter Pills & Actions */}
        <div className="px-4 py-2.5 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Button
              size="xs"
              pill
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              Semua ({notifications.length})
            </Button>
            <Button
              size="xs"
              pill
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
            >
              Belum Dibaca ({unreadCount})
            </Button>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={markAllAsRead}
              className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
              title="Tandai semua telah dibaca"
            >
              <CheckCheck className="w-3.5 h-3.5 mr-1" />
              <span>Baca semua</span>
            </Button>
          )}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-400 space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-gray-600">
                {filter === "unread"
                  ? "Semua notifikasi telah dibaca"
                  : "Tidak ada notifikasi saat ini"}
              </p>
              <p className="text-xs text-gray-400">
                Pemberitahuan aktivitas akan muncul di sini.
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleReadStatus(item.id)}
                className={`p-4 flex items-start gap-3 transition-colors cursor-pointer group hover:bg-gray-50 ${
                  !item.isRead ? "bg-indigo-50/30" : "bg-white"
                }`}
              >
                {getNotificationIcon(item.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p
                      className={`text-sm leading-snug ${
                        !item.isRead
                          ? "font-semibold text-gray-900"
                          : "font-medium text-gray-700"
                      }`}
                    >
                      {item.title}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      {!item.isRead && (
                        <span
                          className="w-2 h-2 rounded-full bg-indigo-600"
                          title="Belum dibaca"
                        />
                      )}
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => deleteNotification(item.id, e)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 hover:bg-red-50"
                        title="Hapus notifikasi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>{notifications.length} notifikasi tersimpan</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={clearAllNotifications}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              <span>Hapus Semua</span>
            </Button>
          </div>
        )}
      </aside>
    </>
  );
};

export default NotificationDrawer;

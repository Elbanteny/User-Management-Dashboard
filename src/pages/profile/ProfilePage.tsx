import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { initialUsers, currentUser } from "@/constants/users";
import type { SubscriptionLevel } from "@/constants/users";
import { getInitials } from "@/lib/utils";

// ─── Badge helpers ──────────────────────────────────────────────────────────

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-gray-100 text-gray-500 border border-gray-200"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-400"}`}
      />
      {isActive ? "Aktif" : "Nonaktif"}
    </span>
  );
}

function SubscriptionBadge({ isSubscribed }: { isSubscribed: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isSubscribed
          ? "bg-blue-50 text-blue-700 border border-blue-200"
          : "bg-gray-100 text-gray-400 border border-gray-200"
      }`}
    >
      {isSubscribed ? "Berlangganan" : "Tidak Berlangganan"}
    </span>
  );
}

const levelStyles: Record<SubscriptionLevel, string> = {
  Pro: "bg-amber-100 text-amber-800 border border-amber-300",
  Starter: "bg-slate-100 text-slate-700 border border-slate-300",
  Gratis: "bg-gray-200 text-gray-700 border border-gray-300",
};

function LevelBadge({ level }: { level: SubscriptionLevel }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelStyles[level]}`}
    >
      {level}
    </span>
  );
}

// ─── Detail Row ──────────────────────────────────────────────────────────────

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 sm:w-40 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-800">{children}</span>
    </div>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 text-sm text-gray-700 animate-in fade-in slide-in-from-top-2">
      <svg
        className="w-4 h-4 text-amber-500 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"
        />
      </svg>
      {message}
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-600"
        aria-label="Tutup notifikasi"
      >
        ✕
      </Button>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const user = (id ? initialUsers.find((u) => u.id === id) : null) || currentUser;
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleNotImplemented = (feature: string) => {
    showToast(`Fitur "${feature}" belum tersedia.`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Avatar Card */}
      <div className="card p-0 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xs">
        {/* Cover strip */}
        <div className="h-24 sm:h-28 bg-linear-to-r from-indigo-500 to-indigo-700" />

        <div className="px-4 sm:px-6 pb-6">
          {/* Avatar + actions row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 -mt-10 mb-4">
            {/* Avatar with change-photo overlay */}
            <div className="relative group self-start">
              <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-sm select-none">
                {getInitials(user.name)}
              </div>
              <button
                onClick={() => handleNotImplemented("Ganti Foto")}
                className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Ganti foto profil"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNotImplemented("Edit Profil")}
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profil
              </Button>
              <Button
                variant="destructive-outline"
                size="sm"
                onClick={() => handleNotImplemented("Keluar")}
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Keluar
              </Button>
            </div>
          </div>

          {/* Name & role */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Detail Card */}
      <div className="card p-0 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xs">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">
            Informasi Akun
          </h2>
        </div>
        <div className="px-4 sm:px-6 py-2">
          <DetailRow label="Nama Lengkap">{user.name}</DetailRow>
          <DetailRow label="Email">{user.email}</DetailRow>
          <DetailRow label="Role">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              {user.role}
            </span>
          </DetailRow>
          <DetailRow label="Status Akun">
            <StatusBadge isActive={user.isActive} />
          </DetailRow>
          <DetailRow label="Berlangganan">
            <SubscriptionBadge isSubscribed={user.isSubscribed} />
          </DetailRow>
          <DetailRow label="Level Langganan">
            <LevelBadge level={user.subscriptionLevel} />
          </DetailRow>
          {user.referralCode && (
            <DetailRow label="Kode Referral yang Digunakan">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                {user.referralCode}
              </span>
              {user.referredBy && (
                <span className="ml-1.5 text-gray-500 text-xs">
                  dari {user.referredBy}
                </span>
              )}
            </DetailRow>
          )}
          <DetailRow label="ID Pengguna">
            <span className="font-mono text-xs text-gray-400">{user.id}</span>
          </DetailRow>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-0 overflow-hidden bg-white border border-red-100 rounded-xl shadow-xs">
        <div className="px-4 sm:px-6 py-4 border-b border-red-100">
          <h2 className="text-base font-semibold text-red-600">
            Zona Berbahaya
          </h2>
        </div>
        <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-gray-800">Hapus Akun</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data
              Anda.
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleNotImplemented("Hapus Akun")}
            className="w-full sm:w-auto shrink-0"
          >
            Hapus Akun
          </Button>
        </div>
      </div>
    </div>
  );
}

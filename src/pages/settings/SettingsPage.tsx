import React from "react";

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Kelola preferensi akun dan konfigurasi sistem.
        </p>
      </div>
      <div className="card bg-white p-5 space-y-4">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-2">
          Preferensi Aplikasi
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Notifikasi Email</p>
              <p className="text-xs text-gray-500">Terima pembaruan penting via email</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">
                Autentikasi Dua Langkah (2FA)
              </p>
              <p className="text-xs text-gray-500">Keamanan akun ekstra</p>
            </div>
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

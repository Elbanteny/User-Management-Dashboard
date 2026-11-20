import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Ringkasan performa dan aktivitas sistem pengguna.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-white p-5 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Pengguna</p>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-600">15</p>
          <p className="text-xs text-emerald-600">↑ 12% dari bulan lalu</p>
        </div>
        <div className="card bg-white p-5 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase">Pengguna Aktif</p>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600">12</p>
          <p className="text-xs text-gray-500">80% dari total pengguna</p>
        </div>
        <div className="card bg-white p-5 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase">Pelanggan Aktif</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">9</p>
          <p className="text-xs text-gray-500">Gold, Silver, & Bronze</p>
        </div>
        <div className="card bg-white p-5 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Peran</p>
          <p className="text-2xl sm:text-3xl font-bold text-amber-600">3</p>
          <p className="text-xs text-gray-500">Admin, Editor, Viewer</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

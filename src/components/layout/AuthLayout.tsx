import { Outlet } from "react-router-dom";
import { Users, MousePointer2 } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:grid lg:grid-cols-2">
      {/* Left Column: Visual Showcase (Hidden on small screens, primary brand color) */}
      <div className="hidden lg:flex p-3 xl:p-4 h-screen sticky top-0">
        <div className="w-full h-full bg-liner-to-br from-indigo-600 via-indigo-600 to-indigo-700 rounded-[28px] p-8 xl:p-10 flex flex-col justify-between relative overflow-hidden text-white shadow-xl shadow-indigo-600/10">
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Floating Badge & Mockup Showcase */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-4">
            {/* Top Interactive Indicator Pill */}
            <div className="w-full max-w-lg flex justify-end mb-4 pr-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-xs font-medium shadow-sm">
                <span className="text-white/80">Pribadi</span>
                <span className="inline-flex items-center gap-1 bg-white text-indigo-700 px-2.5 py-0.5 rounded-full font-semibold shadow-xs">
                  <Users className="w-3 h-3" />
                  Tim
                </span>
                <MousePointer2 className="w-3.5 h-3.5 ml-1 text-white animate-bounce" />
              </div>
            </div>

            {/* Mockup Window Container */}
            <div className="relative w-full max-w-lg">
              {/* Floating Stat Badge 1 (Top Left) */}
              <div className="absolute -top-6 -left-4 z-20 bg-white text-gray-900 rounded-2xl p-3.5 shadow-xl border border-gray-100/80 animate-fade-in hidden sm:block">
                <div className="text-[11px] font-medium text-gray-400">
                  Total Pendapatan
                </div>
                <div className="text-base font-bold text-gray-900 mt-0.5">
                  Rp 28.500.000
                </div>
                <div className="inline-flex items-center text-[10px] font-semibold text-emerald-600 mt-1">
                  +14.2%{" "}
                  <span className="text-gray-400 font-normal ml-1">
                    vs bulan lalu
                  </span>
                </div>
              </div>

              {/* Main Dashboard Preview Card with Unsplash Image */}
              <div className="bg-white/95 rounded-2xl shadow-2xl overflow-hidden border border-white/30 backdrop-blur-xs transition-transform hover:scale-[1.01] duration-300">
                {/* Window Header */}
                <div className="px-4 py-2.5 bg-slate-100/90 border-b border-gray-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-500">
                    dashboard.adminpanel.id
                  </span>
                  <div className="w-8" />
                </div>

                {/* Dashboard Screenshot from Unsplash */}
                <div className="relative h-60 xl:h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                    alt="Pratinjau Dashboard"
                    className="w-full h-full object-cover object-top opacity-95 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Stat Badge 2 (Bottom Right) */}
              <div className="absolute -bottom-6 -right-3 z-20 bg-white text-gray-900 rounded-2xl p-3.5 shadow-xl border border-gray-100/80 animate-fade-in hidden sm:block">
                <div className="text-[11px] font-medium text-gray-400">
                  Pengguna Aktif
                </div>
                <div className="text-base font-bold text-gray-900 mt-0.5">
                  12.450 Akun
                </div>
                <div className="inline-flex items-center text-[10px] font-semibold text-indigo-600 mt-1">
                  ↗ 18%{" "}
                  <span className="text-gray-400 font-normal ml-1">
                    peningkatan minggu ini
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Indonesian Jargon (Tanpa carausel) */}
          <div className="relative z-10 pt-6">
            <h2 className="text-2xl xl:text-3xl font-bold tracking-tight text-white mb-2.5">
              Kelola Cerdas. Berkembang Lebih Cepat.
            </h2>
            <p className="text-indigo-100 text-sm xl:text-base leading-relaxed opacity-90 max-w-md">
              AdminPanel membantu Anda mengelola data pengguna, mengatur hak
              akses, dan memantau analitik kinerja bisnis secara terpadu tanpa
              hambatan.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Form Area */}
      <div className="flex-1 flex flex-col justify-between min-h-screen p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Mobile Top Brand (Visible only on mobile/tablet) */}
        <div className="lg:hidden flex items-center justify-between pb-6">
          <span className="text-xl font-bold text-indigo-600">AdminPanel</span>
          <span className="text-xs text-gray-400">Portal Akses</span>
        </div>

        {/* Center Auth Form */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          <Outlet />
        </div>

        {/* Footer Bar */}
        <div className="w-full max-w-md mx-auto pt-6 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:text-gray-600 transition-colors"
          >
            Kebijakan Privasi
          </a>
          <span>© AdminPanel 2025</span>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordToggle } from "@/lib/usePasswordToggle";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const { type, isVisible, toggleVisibility } = usePasswordToggle();
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate register and redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="w-full">
      {/* Greeting and Tab Switcher */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          Hi, Selamat Datang{" "}
          <span className="inline-block animate-wave">👋</span>
        </h1>

        {/* Segmented Sign In / Sign Up Tab */}
        <div className="inline-flex p-1 bg-gray-100/90 rounded-full border border-gray-200/60 mt-5">
          <Link
            to="/auth/login"
            className="px-6 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Masuk
          </Link>
          <span className="px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-gray-900 shadow-xs cursor-default">
            Daftar
          </span>
        </div>
      </div>

      {/* Register Form */}
      <form className="space-y-4" onSubmit={handleRegister}>
        {/* Full Name */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
            <span className="text-red-600 font-semibold mr-0.5">*</span>Nama
            lengkap
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            required
            className="h-11 rounded-xl bg-gray-50/60 border-gray-200 focus:bg-white text-sm"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
            <span className="text-red-600 font-semibold mr-0.5">*</span>Alamat
            email
          </label>
          <Input
            type="email"
            placeholder="nama@perusahaan.com"
            required
            className="h-11 rounded-xl bg-gray-50/60 border-gray-200 focus:bg-white text-sm"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
            <span className="text-red-600 font-semibold mr-0.5">*</span>Kata
            sandi
          </label>
          <div className="relative">
            <Input
              type={type}
              placeholder="Minimal 8 karakter"
              required
              minLength={8}
              className="h-11 rounded-xl bg-gray-50/60 border-gray-200 focus:bg-white pr-10 text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={toggleVisibility}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              aria-label={
                isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        {/* Referral Code (Optional) */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
            Kode referral{" "}
            <span className="text-gray-400 font-normal">(opsional)</span>
          </label>
          <Input
            type="text"
            placeholder="Contoh: REF-12345"
            className="h-11 rounded-xl bg-gray-50/60 border-gray-200 focus:bg-white text-sm"
          />
        </div>

        {/* Terms agreement */}
        <div className="pt-1 pb-2">
          <label className="flex items-start gap-2 cursor-pointer text-xs sm:text-sm text-gray-600 select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
            />
            <span>
              Saya menyetujui{" "}
              <span className="text-indigo-600 hover:underline">
                Syarat & Ketentuan
              </span>{" "}
              serta{" "}
              <span className="text-indigo-600 hover:underline">
                Kebijakan Privasi
              </span>
              .
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          pill
          className="w-full mt-4"
        >
          Daftar Akun
        </Button>
      </form>
    </div>
  );
}

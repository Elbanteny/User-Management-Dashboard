import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordToggle } from "@/lib/usePasswordToggle";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { type, isVisible, toggleVisibility } = usePasswordToggle();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
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
          <span className="px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-gray-900 shadow-xs cursor-default">
            Masuk
          </span>
          <Link
            to="/auth/register"
            className="px-6 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Daftar
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <form className="space-y-4" onSubmit={handleLogin}>
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
              placeholder="Masukkan kata sandi Anda"
              required
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

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between pt-1 pb-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-gray-600 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
            />
            <span>Ingat saya</span>
          </label>

          <Link
            to="/auth/forgot-password"
            className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            Lupa kata sandi?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          pill
          className="w-full mt-4"
        >
          Masuk
        </Button>
      </form>
    </div>
  );
}

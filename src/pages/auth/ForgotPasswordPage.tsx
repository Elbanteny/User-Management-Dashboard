import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Lupa Kata Sandi 🔒
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm mx-auto">
          {submitted
            ? "Tautan pemulihan kata sandi telah dikirim ke alamat email Anda."
            : "Masukkan alamat email Anda untuk menerima tautan pemulihan kata sandi."}
        </p>
      </div>

      {!submitted ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
              <span className="text-red-600 font-semibold mr-0.5">*</span>Alamat
              email
            </label>
            <Input
              type="email"
              placeholder="nama@perusahaan.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-xl bg-gray-50/60 border-gray-200 focus:bg-white text-sm"
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            pill
            className="w-full mt-4"
          >
            Kirim Tautan Pemulihan
          </Button>

          {/* Tombol kembali tepat di bawah tombol kirim tautan */}
          <Button
            type="button"
            variant="ghost"
            size="lg"
            pill
            onClick={() => navigate("/auth/login")}
            className="w-full text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/60 gap-2 font-medium"
          >
            Kembali ke Masuk
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              Email instruksi telah dikirim ke <strong>{email}</strong>. Silakan
              periksa kotak masuk atau folder spam Anda.
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setSubmitted(false)}
            variant="outline"
            size="lg"
            pill
            className="w-full"
          >
            Kirim Ulang Email
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="lg"
            pill
            onClick={() => navigate("/auth/login")}
            className="w-full text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/60 gap-2 font-medium"
          >
            Kembali ke Masuk
          </Button>
        </div>
      )}
    </div>
  );
}

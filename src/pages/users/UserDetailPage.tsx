import { useParams, useNavigate } from "react-router-dom";
import { initialUsers, type User } from "@/constants/users";
import { initialStores, type Store } from "@/constants/stores";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

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

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = initialUsers.find((u: User) => u.id === id) || initialUsers[0];
  const userStores = initialStores.filter((s: Store) => s.userId === id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
        Detail Pengguna
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {/* User Info Section */}
        <div className="card p-0 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xs">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold border border-white shadow-sm">
              {getInitials(user.name)}
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Informasi Akun
              </h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
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
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === "active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`}
                />
                {user.status === "active" ? "Aktif" : "Nonaktif"}
              </span>
            </DetailRow>
            <DetailRow label="Level Langganan">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.subscriptionLevel === "Pro"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : user.subscriptionLevel === "Starter"
                      ? "bg-slate-50 text-slate-700 border border-slate-200"
                      : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}
              >
                {user.subscriptionLevel}
              </span>
            </DetailRow>
          </div>
        </div>

        {/* Stores Section */}
        <div className="card p-0 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xs">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">
              Daftar Toko
            </h2>
          </div>
          <div className="overflow-x-auto">
            {userStores.length === 0 ? (
              <p className="text-gray-500 text-sm py-8 text-center">
                Tidak ada data toko.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50 border-b border-gray-100">
                    <TableHead className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center w-14">
                      No
                    </TableHead>
                    <TableHead className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
                      Nama Toko
                    </TableHead>
                    <TableHead className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
                      Tanggal Dibuat
                    </TableHead>
                    <TableHead className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                      Jumlah Transaksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userStores.map((store: Store, index: number) => (
                    <TableRow
                      key={store.id}
                      className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <TableCell className="py-4 px-4 text-center font-medium text-xs text-gray-500">
                        {index + 1}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="font-medium text-sm text-gray-900">
                          {store.name}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-sm text-gray-600">
                        {new Date(store.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {store.transactionCount.toLocaleString("id-ID")}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-start pt-2">
        <Button
          variant="default"
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto shrink-0 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </div>
    </div>
  );
}

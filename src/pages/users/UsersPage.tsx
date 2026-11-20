import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EntityModal } from "@/components/shared/EntityModal";
import { DeleteModal } from "@/components/shared/DeleteModal";
import { CreateModal } from "@/components/shared/CreateModal";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { FilterBar } from "@/components/shared/FilterBar";
import {
  initialUsers,
  userFields,
  userFilterConfigs,
  type User,
  type UserFormModalData,
  type SubscriptionLevel,
} from "@/constants/users";
import {
  getActiveDuration,
  getInitials,
} from "@/lib/utils";

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("");
  const [referralFilter, setReferralFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 10;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedUser: UserFormModalData) => {
    const rawReferral = (updatedUser.referralCode || "").trim().toUpperCase();
    const formattedUser: User = {
      ...updatedUser,
      isSubscribed: updatedUser.isSubscribed === "Ya",
      subscriptionLevel:
        updatedUser.isSubscribed === "Ya"
          ? updatedUser.subscriptionLevel === "-"
            ? "Bronze"
            : updatedUser.subscriptionLevel
          : "-",
      isActive: updatedUser.status === "active",
      referralCode: rawReferral || undefined,
      referredBy: rawReferral
        ? updatedUser.referredBy || "Pengguna Komunitas"
        : undefined,
    };
    setUsers((prev) =>
      prev.map((u) => (u.id === formattedUser.id ? formattedUser : u)),
    );
    showToast("Berhasil memperbarui data pengguna!", "success");
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
      showToast("Berhasil menghapus pengguna! (simulasi)", "success");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.referralCode &&
        user.referralCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.referredBy &&
        user.referredBy.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "" || user.status === statusFilter;
    const matchesRole = roleFilter === "" || user.role === roleFilter;
    const matchesSubscription =
      subscriptionFilter === "" ||
      (subscriptionFilter === "subscribed" && user.isSubscribed) ||
      (subscriptionFilter === "unsubscribed" && !user.isSubscribed);
    const matchesReferral =
      referralFilter === "" ||
      (referralFilter === "referred" && Boolean(user.referralCode)) ||
      (referralFilter === "organic" && !user.referralCode);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRole &&
      matchesSubscription &&
      matchesReferral
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE),
  );
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validCurrentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const filterValues = {
    status: statusFilter,
    role: roleFilter,
    subscription: subscriptionFilter,
    referral: referralFilter,
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === "status") setStatusFilter(value);
    else if (key === "role") setRoleFilter(value);
    else if (key === "subscription") setSubscriptionFilter(value);
    else if (key === "referral") setReferralFilter(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setRoleFilter("");
    setSubscriptionFilter("");
    setReferralFilter("");
    setCurrentPage(1);
  };

  const handleCreate = (data: Record<string, string>) => {
    const rawName = (data.name || "").trim();
    const rawReferral = (data.referralCode || "").trim().toUpperCase();

    let referredBy: string | undefined = undefined;
    if (rawReferral) {
      const match = users.find(
        (u) =>
          u.referralCode === rawReferral ||
          `REF-${u.avatar}` === rawReferral ||
          u.name.toUpperCase().includes(rawReferral.replace("REF-", "")),
      );
      referredBy = match ? match.name : "Pengguna Komunitas";
    }

    const newUser: User = {
      id: String(Date.now()),
      name: rawName || "Pengguna Baru",
      email: data.email || "",
      role: data.role || "Viewer",
      status: (data.status as "active" | "inactive") || "active",
      avatar: getInitials(rawName),
      lastActive: new Date().toISOString(),
      isActive: (data.status || "active") === "active",
      isSubscribed: data.isSubscribed === "Ya",
      subscriptionLevel:
        (data.subscriptionLevel as SubscriptionLevel) ||
        (data.isSubscribed === "Ya" ? "Bronze" : "-"),
      referralCode: rawReferral || undefined,
      referredBy: rawReferral ? referredBy || "Pengguna Komunitas" : undefined,
    };
    setUsers((prev) => [newUser, ...prev]);
    setCurrentPage(1);
    showToast("Pengguna berhasil ditambahkan!", "success");
  };

  return (
    <div className="space-y-6 relative">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"}`}
        >
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          <span>{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manajemen Pengguna
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Kelola pengguna sistem, peran, dan status akun.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 sm:py-5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Pengguna
        </Button>
      </div>

      <div className="card !p-0 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xs">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          searchPlaceholder="Cari berdasarkan nama atau email pengguna..."
          filters={userFilterConfigs}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Mobile View: Card List (< md) */}
        <div className="block md:hidden divide-y divide-gray-100">
          {paginatedUsers.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              Tidak ada pengguna ditemukan.
            </div>
          ) : (
            paginatedUsers.map((user, index) => (
              <div
                key={user.id}
                className="p-4 space-y-3 bg-white hover:bg-gray-50/50 transition-colors"
              >
                {/* Header: Avatar, Name, Email, Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-md px-1.5 py-0.5 shrink-0">
                      #{startIndex + index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-semibold text-indigo-600 shrink-0">
                      {user.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        user.status === "active"
                          ? "bg-emerald-600"
                          : "bg-gray-500"
                      }`}
                    />
                    {user.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                {/* Badges: Role, Subscription, Level, Referral */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                    {user.role}
                  </span>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      user.isSubscribed
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.isSubscribed ? "Berlangganan" : "Non-Langganan"}
                  </span>

                  {user.subscriptionLevel === "Gold" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                      🏅 Gold
                    </span>
                  )}
                  {user.subscriptionLevel === "Silver" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300">
                      🥈 Silver
                    </span>
                  )}
                  {user.subscriptionLevel === "Bronze" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-800 border border-orange-200">
                      🥉 Bronze
                    </span>
                  )}

                  {user.referralCode ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                      🎟️ {user.referralCode}
                      {user.referredBy && (
                        <span className="font-normal text-[11px] text-purple-600">
                          (dari {user.referredBy})
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] text-gray-400 bg-gray-50 border border-gray-100">
                      Organik
                    </span>
                  )}
                </div>

                {/* Footer: Last active & action buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <div className="text-gray-500 flex items-center gap-1">
                    <span className="text-gray-400">Aktif:</span>
                    <span className="font-medium text-gray-700">
                      {getActiveDuration(user)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(user)}
                      className="h-7 px-2.5 text-xs text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(user)}
                      className="h-7 px-2.5 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Wide Table (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 border-b border-gray-100">
                <TableHead className="py-4 px-4 text-gray-500 font-semibold uppercase tracking-wider text-xs w-14 text-center">
                  No
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                  Nama
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                  Peran
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                  Status
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                  Berlangganan
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                  Level Langganan
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                  Referral
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                  Terakhir Aktif
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase tracking-wider text-xs text-center w-28">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100">
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-8 text-center text-gray-500"
                  >
                    Tidak ada pengguna ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="py-4 px-4 text-xs font-semibold text-gray-500 text-center">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-semibold text-indigo-600">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-600 font-medium">
                      {user.role}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user.status === "active"
                              ? "bg-emerald-600"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isSubscribed
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.isSubscribed ? "Ya" : "Tidak"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-xs font-medium">
                      {user.subscriptionLevel === "Gold" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                          🏅 Gold
                        </span>
                      )}
                      {user.subscriptionLevel === "Silver" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300">
                          🥈 Silver
                        </span>
                      )}
                      {user.subscriptionLevel === "Bronze" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-800 border border-orange-200">
                          🥉 Bronze
                        </span>
                      )}
                      {(user.subscriptionLevel === "-" ||
                        !user.subscriptionLevel) && (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      {user.referralCode ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                            <span className="text-[11px]">🎟️</span>
                            {user.referralCode}
                          </span>
                          {user.referredBy && (
                            <div className="text-[11px] text-gray-500 truncate max-w-[130px]">
                              oleh{" "}
                              <span className="font-medium text-gray-700">
                                {user.referredBy}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium text-gray-400 bg-gray-50 border border-gray-100">
                          Organik
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-600 text-xs font-medium">
                      {getActiveDuration(user)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      <div className="inline-flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer"
                          title="Edit Pengguna"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(user)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
                          title="Hapus Pengguna"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <PaginationControls
          currentPage={validCurrentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          pageSize={USERS_PER_PAGE}
          startIndex={startIndex}
          endIndex={Math.min(endIndex, filteredUsers.length)}
          onPageChange={setCurrentPage}
          itemLabel="pengguna"
        />
      </div>

      <CreateModal
        title="Tambah Pengguna Baru"
        description="Masukkan informasi pengguna baru ke dalam sistem."
        fields={userFields}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
      <EntityModal<UserFormModalData>
        title="Edit Pengguna"
        description="Perbarui informasi akun."
        fields={userFields}
        data={
          selectedUser
            ? {
                ...selectedUser,
                isSubscribed: selectedUser.isSubscribed ? "Ya" : "Tidak",
              }
            : null
        }
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        confirmText="Simpan Perubahan"
        confirmColor="blue"
      />
      <DeleteModal
        title="Hapus Pengguna"
        description="Apakah Anda yakin ingin menghapus pengguna"
        itemName={userToDelete?.name}
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UsersPage;

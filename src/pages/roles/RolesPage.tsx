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
import { initialRoles, type Role } from "@/constants/roles";

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const handleSave = (updated: Role) => {
    setRoles(roles.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleCreate = (data: Record<string, string>) => {
    const newRole: Role = {
      id: String(Date.now()),
      name: data.name || "Peran Baru",
      description: data.description || "Tidak ada deskripsi",
      userCount: 0,
      permissions: ["read"],
    };
    setRoles([...roles, newRole]);
  };

  const handleConfirmDelete = () => {
    if (roleToDelete) {
      setRoles(roles.filter((r) => r.id !== roleToDelete.id));
      setRoleToDelete(null);
    }
  };

  const roleFields = [
    { key: "name", label: "Nama Peran", required: true },
    { key: "description", label: "Deskripsi", required: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manajemen Peran
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Kelola akses sistem dan hak istimewa peran.
          </p>
        </div>
        <Button
          variant="default"
          size="lg"
          className="w-full sm:w-auto shrink-0 shadow-xs"
          onClick={() => setIsCreateModalOpen(true)}
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
          Tambah Peran
        </Button>
      </div>

      <div className="card p-0 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xs">
        {/* Mobile View: Roles Card List (< md) */}
        <div className="block md:hidden divide-y divide-gray-100">
          {roles.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              Tidak ada peran ditemukan.
            </div>
          ) : (
            roles.map((role, index) => (
              <div key={role.id} className="p-4 space-y-2.5 bg-white">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-md px-1.5 py-0.5 shrink-0 mt-0.5">
                      #{index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {role.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {role.description}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {role.userCount} pengguna
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-gray-50">
                  <Button
                    variant="info-outline"
                    size="xs"
                    onClick={() => {
                      setSelectedRole(role);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive-outline"
                    size="xs"
                    onClick={() => setRoleToDelete(role)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 border-b border-gray-100">
                <TableHead className="py-4 px-4 text-gray-500 font-semibold uppercase text-xs w-14 text-center">
                  No
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase text-xs">
                  Peran
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase text-xs">
                  Deskripsi
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase text-xs">
                  Pengguna
                </TableHead>
                <TableHead className="py-4 px-6 text-gray-500 font-semibold uppercase text-xs text-center w-28">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100">
              {roles.map((role, index) => (
                <TableRow key={role.id}>
                  <TableCell className="py-4 px-4 text-xs font-semibold text-gray-500 text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-medium">
                    {role.name}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-500">
                    {role.description}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {role.userCount} pengguna
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <div className="inline-flex items-center justify-center gap-1">
                      <Button
                        variant="info-ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedRole(role);
                          setIsEditModalOpen(true);
                        }}
                        title="Edit Peran"
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
                        variant="destructive-ghost"
                        size="icon"
                        onClick={() => setRoleToDelete(role)}
                        title="Hapus Peran"
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CreateModal
        title="Tambah Peran Baru"
        description="Masukkan informasi peran baru ke dalam sistem."
        fields={roleFields}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EntityModal
        title="Edit Peran"
        description="Ubah nama dan deskripsi peran."
        fields={roleFields}
        data={selectedRole}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        confirmText="Simpan Perubahan"
        confirmColor="blue"
      />

      <DeleteModal
        title="Hapus Peran"
        description="Apakah Anda yakin ingin menghapus peran"
        itemName={roleToDelete?.name}
        isOpen={!!roleToDelete}
        onClose={() => setRoleToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default RolesPage;

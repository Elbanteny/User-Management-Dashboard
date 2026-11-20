export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export const initialRoles: Role[] = [
  {
    id: "r1",
    name: "Admin",
    description: "Full access to all system features and settings.",
    userCount: 3,
    permissions: ["create", "read", "update", "delete"],
  },
  {
    id: "r2",
    name: "Editor",
    description: "Can manage content and users but limited settings.",
    userCount: 12,
    permissions: ["create", "read", "update"],
  },
  {
    id: "r3",
    name: "Viewer",
    description: "Read-only access to system data.",
    userCount: 45,
    permissions: ["read"],
  },
];

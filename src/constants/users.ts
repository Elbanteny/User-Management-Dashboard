import type { Field } from "@/components/shared/CreateModal";

export type SubscriptionLevel = "Gratis" | "Starter" | "Pro";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  avatar: string;
  lastActive: string;
  isActive: boolean;
  isSubscribed: boolean;
  subscriptionLevel: SubscriptionLevel;
  referralCode?: string;
  referredBy?: string;
}

export interface UserFormModalData extends Omit<User, "isSubscribed"> {
  isSubscribed: "Ya" | "Tidak";
}

export const userFields: Field[] = [
  {
    key: "name",
    label: "Nama",
    required: true,
    placeholder: "Masukkan nama pengguna",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "nama@contoh.com",
  },
  {
    key: "role",
    label: "Peran",
    type: "select",
    options: ["Admin", "Editor", "Viewer"],
    required: true,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: ["active", "inactive"],
    required: true,
  },
  {
    key: "isSubscribed",
    label: "Berlangganan",
    type: "select",
    options: ["Ya", "Tidak"],
  },
  {
    key: "subscriptionLevel",
    label: "Level Langganan",
    type: "select",
    options: ["Gratis", "Starter", "Pro"],
  },
  {
    key: "referralCode",
    label: "Kode Referral (Opsional)",
    placeholder: "Contoh: REF-JD01",
  },
];

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroupConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

export const userFilterConfigs: FilterGroupConfig[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { value: "", label: "Semua Status" },
      { value: "active", label: "Aktif" },
      { value: "inactive", label: "Tidak Aktif" },
    ],
  },
  {
    key: "role",
    label: "Peran",
    options: [
      { value: "", label: "Semua Peran" },
      { value: "Admin", label: "Admin" },
      { value: "Editor", label: "Editor" },
      { value: "Viewer", label: "Viewer" },
    ],
  },
  {
    key: "subscription",
    label: "Langganan",
    options: [
      { value: "", label: "Semua Langganan" },
      { value: "subscribed", label: "Berlangganan (Ya)" },
      { value: "unsubscribed", label: "Tidak Berlangganan (Tidak)" },
    ],
  },
  {
    key: "referral",
    label: "Referral",
    options: [
      { value: "", label: "Semua Pendaftaran" },
      { value: "referred", label: "Via Referral" },
      { value: "organic", label: "Organik (Tanpa Referral)" },
    ],
  },
];

export const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    avatar: "JD",
    lastActive: "2023-10-15T10:30:00Z",
    isActive: true,
    isSubscribed: true,
    subscriptionLevel: "Pro",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "active",
    avatar: "JS",
    lastActive: "2023-10-14T14:20:00Z",
    isActive: true,
    isSubscribed: false,
    subscriptionLevel: "Gratis",
    referralCode: "REF-JD01",
    referredBy: "John Doe",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Viewer",
    status: "inactive",
    avatar: "BJ",
    lastActive: "2023-10-12T09:15:00Z",
    isActive: false,
    isSubscribed: true,
    subscriptionLevel: "Starter",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Editor",
    status: "active",
    avatar: "AB",
    lastActive: "2023-10-15T08:45:00Z",
    isActive: true,
    isSubscribed: true,
    subscriptionLevel: "Pro",
    referralCode: "REF-JD01",
    referredBy: "John Doe",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Viewer",
    status: "inactive",
    avatar: "CW",
    lastActive: "2023-10-10T16:00:00Z",
    isActive: false,
    isSubscribed: false,
    subscriptionLevel: "Gratis",
    referralCode: "REF-JS02",
    referredBy: "Jane Smith",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "Admin",
    status: "active",
    avatar: "DP",
    lastActive: "2023-10-16T11:00:00Z",
    isActive: true,
    isSubscribed: true,
    subscriptionLevel: "Pro",
  },
  {
    id: "7",
    name: "Evan Wright",
    email: "evan.wright@example.com",
    role: "Editor",
    status: "active",
    avatar: "EW",
    lastActive: "2023-10-13T13:45:00Z",
    isActive: true,
    isSubscribed: false,
    subscriptionLevel: "Gratis",
    referralCode: "REF-AB04",
    referredBy: "Alice Brown",
  },
  {
    id: "8",
    name: "Fiona Gallagher",
    email: "fiona.g@example.com",
    role: "Viewer",
    status: "active",
    avatar: "FG",
    lastActive: "2023-10-15T16:20:00Z",
    isActive: true,
    isSubscribed: true,
    subscriptionLevel: "Gratis",
    referralCode: "REF-DP06",
    referredBy: "Diana Prince",
  },
  {
    id: "9",
    name: "George Miller",
    email: "george.m@example.com",
    role: "Editor",
    status: "inactive",
    avatar: "GM",
    lastActive: "2023-10-08T10:10:00Z",
    isActive: false,
    isSubscribed: false,
    subscriptionLevel: "Gratis",
  },
  {
    id: "10",
    name: "Hannah Abbott",
    email: "hannah.a@example.com",
    role: "Viewer",
    status: "active",
    avatar: "HA",
    lastActive: "2023-10-16T09:30:00Z",
    isActive: true,
    isSubscribed: true,
    subscriptionLevel: "Pro",
    referralCode: "REF-JD01",
    referredBy: "John Doe",
  },
  {
    id: "11",
    name: "Ian Malcolm",
    email: "ian.malcolm@example.com",
    role: "Admin",
    status: "active",
    avatar: "IM",
    lastActive: "2023-10-16T14:15:00Z",
    isActive: true,
    isSubscribed: true,
    subscriptionLevel: "Pro",
  },
  {
    id: "12",
    name: "Julia Roberts",
    email: "julia.r@example.com",
    role: "Editor",
    status: "inactive",
    avatar: "JR",
    lastActive: "2023-10-05T08:00:00Z",
    isActive: false,
    isSubscribed: false,
    subscriptionLevel: "Gratis",
    referralCode: "REF-AB04",
    referredBy: "Alice Brown",
  },
  {
    id: "13",
    name: "Kevin Bacon",
    email: "kevin.bacon@example.com",
    role: "Viewer",
    status: "active",
    avatar: "KB",
    lastActive: "2023-10-14T17:50:00Z",
    isActive: true,
    isSubscribed: true,
    subscriptionLevel: "Starter",
  },
  {
    id: "14",
    name: "Laura Croft",
    email: "laura.croft@example.com",
    role: "Editor",
    status: "active",
    avatar: "LC",
    lastActive: "2023-10-16T07:10:00Z",
    isActive: true,
    isSubscribed: false,
    subscriptionLevel: "Gratis",
    referralCode: "REF-IM11",
    referredBy: "Ian Malcolm",
  },
  {
    id: "15",
    name: "Michael Scott",
    email: "michael.scott@example.com",
    role: "Admin",
    status: "active",
    avatar: "MS",
    lastActive: "2023-10-16T12:00:00Z",
    isActive: true,
    isSubscribed: true,
    subscriptionLevel: "Pro",
  },
];

// Mock user yang sedang login saat ini (Frontend state)
export const currentUser: User = initialUsers[0];

export { cn } from "cn";

/**
 * Menghitung dan memformat durasi waktu sejak terakhir aktif
 */
export function getActiveDuration(user: { lastActive: string; status: string }): string {
  if (user.status === "active") return "Baru Saja";
  const lastActiveDate = new Date(user.lastActive);
  const now = new Date();
  const diffMs = now.getTime() - lastActiveDate.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} hari lalu`;
  if (hours > 0) return `${hours} jam lalu`;
  if (minutes > 0) return `${minutes} menit lalu`;
  return "baru saja";
}

/**
 * Mendapatkan inisial 1-2 huruf dari nama pengguna untuk avatar
 */
export function getInitials(name?: string): string {
  const rawName = (name || "").trim();
  if (!rawName) return "US";
  return rawName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Menghitung deretan nomor halaman dengan dukungan ellipsis untuk pagination
 */
export function getPaginationPages(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage, "...", totalPages);
    }
  }
  return pages;
}

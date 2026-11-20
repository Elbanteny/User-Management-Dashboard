import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationPages } from "@/lib/utils";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize?: number;
  startIndex?: number;
  endIndex?: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
  className?: string;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  startIndex: customStartIndex,
  endIndex: customEndIndex,
  onPageChange,
  itemLabel = "item",
  className = "",
}) => {
  const validCurrentPage = Math.min(
    Math.max(1, currentPage),
    Math.max(1, totalPages)
  );
  const startIndex =
    customStartIndex !== undefined
      ? customStartIndex
      : (validCurrentPage - 1) * pageSize;
  const endIndex =
    customEndIndex !== undefined
      ? customEndIndex
      : Math.min(startIndex + pageSize, totalItems);

  return (
    <div
      className={`p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      <div className="text-xs text-gray-500 text-center sm:text-left">
        Menampilkan{" "}
        <span className="font-semibold text-gray-700">
          {totalItems === 0 ? 0 : startIndex + 1}
        </span>{" "}
        -{" "}
        <span className="font-semibold text-gray-700">
          {endIndex}
        </span>{" "}
        dari{" "}
        <span className="font-semibold text-gray-700">
          {totalItems}
        </span>{" "}
        {itemLabel}
      </div>

      <Pagination className="w-auto mx-0">
        <PaginationContent className="flex-wrap justify-center">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text="Sebelumnya"
              onClick={(e) => {
                e.preventDefault();
                if (validCurrentPage > 1) onPageChange(validCurrentPage - 1);
              }}
              className={
                validCurrentPage <= 1
                  ? "pointer-events-none opacity-40 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-100"
              }
            />
          </PaginationItem>
          {getPaginationPages(validCurrentPage, totalPages).map((page, idx) => (
            <PaginationItem key={idx}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={validCurrentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(Number(page));
                  }}
                  className={`cursor-pointer ${
                    validCurrentPage === page
                      ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              text="Berikutnya"
              onClick={(e) => {
                e.preventDefault();
                if (validCurrentPage < totalPages)
                  onPageChange(validCurrentPage + 1);
              }}
              className={
                validCurrentPage >= totalPages
                  ? "pointer-events-none opacity-40 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-100"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;

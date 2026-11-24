import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FilterGroupConfig } from "@/constants/users";

export interface FilterBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  filters: FilterGroupConfig[];
  filterValues: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onReset?: () => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Cari data...",
  filters,
  filterValues,
  onFilterChange,
  onReset,
  className = "",
}) => {
  const hasActiveFilter =
    Boolean(searchQuery?.trim()) ||
    Object.values(filterValues).some((val) => Boolean(val));

  return (
    <div className={`p-4 border-b border-gray-100 space-y-3 ${className}`}>
      {/* Search Input (jika diberikan) */}
      {onSearchChange !== undefined && (
        <div className="relative w-full">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            className="w-full md:w-96 pl-9 pr-4 py-2 bg-gray-50/50 border-gray-200 rounded-lg text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-400 placeholder:text-gray-400"
            placeholder={searchPlaceholder}
            value={searchQuery ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}

      {/* Dynamic Looped Filter Combobox/Selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
        {filters.map((filter) => (
          <div key={filter.key} className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider shrink-0">
              {filter.label}:
            </span>
            <select
              className="w-full sm:w-auto py-1.5 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 cursor-pointer transition-colors"
              value={filterValues[filter.key] ?? ""}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Reset Filter Button */}
        {hasActiveFilter && onReset && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="w-full sm:w-auto text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 sm:ml-auto"
          >
            Reset Filter
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;

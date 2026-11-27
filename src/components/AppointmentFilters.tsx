import { Search } from "lucide-react";
import type { AppointmentStatus } from "@/types/appointment";

export type StatusFilter = "all" | AppointmentStatus;

export type SortOption =
    | "date"
    | "price-asc"
    | "price-desc";

interface AppointmentFiltersProps {
    search: string;
    status: StatusFilter;
    sort: SortOption;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: StatusFilter) => void;
    onSortChange: (value: SortOption) => void;
}

export default function AppointmentFilters({
    search,
    status,
    sort,
    onSearchChange,
    onStatusChange,
    onSortChange,
}: AppointmentFiltersProps) {
    const selectClass =
        "rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#292334] outline-none focus:border-[#69516c]";

    return (
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:flex-wrap">            <div className="relative min-w-0 flex-1">
            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="search"
                value={search}
                onChange={(event) =>
                    onSearchChange(event.target.value)
                }
                placeholder="Kunden oder Leistungen suchen..."
                aria-label="Termine suchen"
                className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-[#292334] outline-none focus:border-[#69516c]"
            />
        </div>

            <select
                value={status}
                aria-label="Nach Status filtern"
                onChange={(event) =>
                    onStatusChange(event.target.value as StatusFilter)
                }
                className={selectClass}
            >
                <option value="all">Alle Status</option>
                <option value="Bestätigt">Bestätigt</option>
                <option value="Offen">Offen</option>
                <option value="Storniert">Storniert</option>
            </select>

            <select
                value={sort}
                aria-label="Termine sortieren"
                onChange={(event) =>
                    onSortChange(event.target.value as SortOption)
                }
                className={selectClass}
            >
                <option value="date">Datum & Uhrzeit</option>
                <option value="price-asc">Preis aufsteigend</option>
                <option value="price-desc">Preis absteigend</option>
            </select>
        </div>
    );
}
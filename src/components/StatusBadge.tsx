import type { AppointmentStatus } from "@/types/appointment";

interface StatusBadgeProps {
    status: AppointmentStatus;
}

const statusStyles: Record<AppointmentStatus, string> = {
    Bestätigt: "bg-green-100 text-green-700",
    Offen: "bg-amber-100 text-amber-700",
    Storniert: "bg-red-100 text-red-700",
};

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
}
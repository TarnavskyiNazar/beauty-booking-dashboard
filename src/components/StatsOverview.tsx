import {
    CalendarDays,
    CircleCheck,
    Clock,
    Euro,
} from "lucide-react";

import StatCard from "./StatCard";
import type { Appointment } from "@/types/appointment";

interface StatsOverviewProps {
    appointments: Appointment[];
}

export default function StatsOverview({
    appointments,
}: StatsOverviewProps) {
    const confirmed = appointments.filter(
        (appointment) => appointment.status === "Bestätigt"
    );

    const pending = appointments.filter(
        (appointment) => appointment.status === "Offen"
    );

    const revenue = confirmed.reduce(
        (total, appointment) => total + appointment.price,
        0
    );

    const stats = [
        {
            title: "Termine gesamt",
            value: appointments.length,
            icon: CalendarDays,
            iconColor: "text-purple-600",
            iconBackground: "bg-purple-100",
        },
        {
            title: "Bestätigt",
            value: confirmed.length,
            icon: CircleCheck,
            iconColor: "text-green-600",
            iconBackground: "bg-green-100",
        },
        {
            title: "Offene Termine",
            value: pending.length,
            icon: Clock,
            iconColor: "text-amber-600",
            iconBackground: "bg-amber-100",
        },
        {
            title: "Erwarteter Umsatz",
            value: revenue.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
            }),
            icon: Euro,
            iconColor: "text-blue-600",
            iconBackground: "bg-blue-100",
        },
    ];

    return (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </section>
    );
}
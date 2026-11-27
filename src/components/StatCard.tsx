import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    iconColor: string;
    iconBackground: string;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    iconColor,
    iconBackground,
}: StatCardProps) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-gray-500">
                    {title}
                </p>

                <div
                    className={`rounded-lg p-3 ${iconBackground}`}
                >
                    <Icon size={22} className={iconColor} />
                </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-[#292334]">
                {value}
            </p>
        </article>
    );
}
import { useState } from "react";

import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Sparkles,
    Settings,
    LogOut,
    UserRound,
    Menu,
    X,
} from "lucide-react";

interface SidebarProps {
    email: string;
    onLogout: () => void;
}

const menuItems = [
    { label: "Übersicht", icon: LayoutDashboard },
    { label: "Termine", icon: CalendarDays },
    { label: "Kunden", icon: Users },
    { label: "Leistungen", icon: Sparkles },
    { label: "Einstellungen", icon: Settings },
];

export default function Sidebar({
    email,
    onLogout,
}: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className="w-full shrink-0 bg-[#292334] p-4 text-white lg:flex lg:min-h-screen lg:w-64 lg:flex-col lg:p-6">
            <div className="flex items-center justify-between lg:mb-10">
                <div>
                    <h1 className="text-3xl font-bold">
                        Beauty<span className="text-[#c58ba9]">.</span>
                    </h1>

                    <p className="mt-1 text-xs tracking-widest text-gray-400">
                        BOOKING STUDIO
                    </p>
                </div>

                <button
                    type="button"
                    aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
                    aria-expanded={isOpen}
                    aria-controls="sidebar-menu"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="cursor-pointer rounded-lg p-2 hover:bg-white/10 lg:hidden"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div
                id="sidebar-menu"
                className={`${isOpen ? "flex" : "hidden"
                    } mt-6 flex-1 flex-col lg:mt-0 lg:flex`}
            >
                <nav className="space-y-2">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                type="button"
                                disabled={index !== 0}
                                onClick={() => setIsOpen(false)}
                                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${index === 0
                                        ? "bg-[#69516c] text-white"
                                        : "cursor-not-allowed text-gray-400"
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-8 border-t border-white/10 pt-6 lg:mt-auto">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#69516c]">
                            <UserRound size={20} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-medium">
                                Mein Konto
                            </p>

                            <p
                                title={email}
                                className="truncate text-xs text-gray-400"
                            >
                                {email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10"
                    >
                        <LogOut size={19} />
                        Abmelden
                    </button>

                    <p className="mt-6 text-xs text-gray-500">
                        Beauty Booking v1.0
                    </p>
                </div>
            </div>
        </aside>
    );
}
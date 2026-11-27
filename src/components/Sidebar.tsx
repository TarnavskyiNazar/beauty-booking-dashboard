import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Sparkles,
  Settings,
} from "lucide-react";

const menuItems = [
  { label: "Übersicht", icon: LayoutDashboard },
  { label: "Termine", icon: CalendarDays },
  { label: "Kunden", icon: Users },
  { label: "Leistungen", icon: Sparkles },
  { label: "Einstellungen", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col bg-[#292334] p-6 text-white">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">
          Beauty<span className="text-pink-400">.</span>
        </h1>

        <p className="mt-1 text-xs tracking-widest text-purple-200">
          BOOKING STUDIO
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            type="button"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
              index === 0
                ? "bg-[#69516c] text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-4">
        <p className="text-xs text-gray-400">
          Beauty Booking v1.0
        </p>
      </div>
    </aside>
  );
}
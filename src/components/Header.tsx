import { Plus } from "lucide-react";

interface HeaderProps {
    onAdd: () => void;
}

export default function Header({ onAdd }: HeaderProps) {
    return (
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-[#292334]">
                    Dashboard
                </h2>

                <p className="mt-2 text-gray-500">
                    Willkommen in deinem Studio
                </p>
            </div>

            <button
                type="button"
                onClick={onAdd}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#69516c] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#57405a]"
            >
                <Plus size={20} />
                Neuer Termin
            </button>
        </header>
    );
}
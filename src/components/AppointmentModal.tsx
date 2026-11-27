import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

import type {
    Appointment,
    AppointmentStatus,
} from "@/types/appointment";

interface AppointmentModalProps {
    appointment?: Appointment,
    onClose: () => void;
    onSave: (appointment: Appointment) => void;
    saving: boolean
}

const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-[#292334] outline-none focus:border-[#69516c] focus:ring-2 focus:ring-purple-100";

export default function AppointmentModal({
    appointment,
    onClose,
    onSave,
    saving
}: AppointmentModalProps) {
    const isEditing = Boolean(appointment);

    const [customerName, setCustomerName] = useState(
        appointment?.customerName ?? ""
    );

    const [service, setService] = useState(
        appointment?.service ?? ""
    );

    const [date, setDate] = useState(
        appointment?.date ?? ""
    );

    const [time, setTime] = useState(
        appointment?.time ?? ""
    );

    const [price, setPrice] = useState(
        appointment?.price.toString() ?? ""
    );

    const [status, setStatus] = useState<AppointmentStatus>(
        appointment?.status ?? "Offen"
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (saving) return;
        if (!customerName.trim() || !service || !date || !time) {
            return;
        }

        const numericPrice = Number(price);

        if (!price.trim() || !Number.isFinite(numericPrice) || numericPrice < 0) {
            return;
        }

        const newAppointment: Appointment = {
            id: appointment?.id ?? crypto.randomUUID(),
            customerName: customerName.trim(),
            service,
            date,
            time,
            price: numericPrice,
            status,
        };

        onSave(newAppointment);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2
                            id="modal-title"
                            className="text-2xl font-bold text-[#292334]"
                        >
                            {isEditing ? "Termin bearbeiten" : "Neuer Termin"}                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {isEditing
                                ? "Bearbeite die Daten des ausgewählten Termins."
                                : "Erstelle einen neuen Termin für dein Studio."}                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fenster schließen"
                        className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-gray-700">
                            Kundenname
                        </span>

                        <input
                            type="text"
                            value={customerName}
                            onChange={(event) =>
                                setCustomerName(event.target.value)
                            }
                            placeholder="Vor- und Nachname"
                            className={inputClass}
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-gray-700">
                            Leistung
                        </span>

                        <select
                            value={service}
                            onChange={(event) => setService(event.target.value)}
                            className={inputClass}
                            required
                        >
                            <option value="">Leistung auswählen</option>
                            <option value="Laser-Haarentfernung">
                                Laser-Haarentfernung
                            </option>
                            <option value="Maniküre">Maniküre</option>
                            <option value="Kosmetik">Kosmetik</option>
                            <option value="Pediküre">Pediküre</option>
                            <option value="Massage">Massage</option>
                        </select>
                    </label>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-gray-700">
                                Datum
                            </span>

                            <input
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                className={inputClass}
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-gray-700">
                                Uhrzeit
                            </span>

                            <input
                                type="time"
                                value={time}
                                onChange={(event) => setTime(event.target.value)}
                                className={inputClass}
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-gray-700">
                                Preis (€)
                            </span>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                placeholder="0.00"
                                className={inputClass}
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-gray-700">
                                Status
                            </span>

                            <select
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value as AppointmentStatus)
                                }
                                className={inputClass}
                            >
                                <option value="Offen">Offen</option>
                                <option value="Bestätigt">Bestätigt</option>
                                <option value="Storniert">Storniert</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Abbrechen
                        </button>

                        <button
                            disabled={saving}
                            type="submit"
                            className="cursor-pointer rounded-lg bg-[#69516c] px-5 py-3 text-sm font-medium text-white hover:bg-[#57405a]"
                        >
                            {saving
                                ? "Wird gespeichert..."
                                : isEditing
                                    ? "Änderungen speichern"
                                    : "Termin speichern"}                      </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
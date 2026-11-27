import { Pencil, Trash2 } from "lucide-react";
import type { Appointment } from "@/types/appointment";
import StatusBadge from "./StatusBadge";

interface AppointmentTableProps {
    appointments: Appointment[];
    onDelete: (id: string) => void;
    onEdit: (appointment: Appointment) => void
}

export default function AppointmentTable({
    appointments, onDelete, onEdit
}: AppointmentTableProps) {
    return (
        <section>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full whitespace-nowrap text-left text-sm">
                    <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">
                                Datum
                            </th>
                            <th className="px-6 py-4 font-medium">Uhrzeit</th>
                            <th className="px-6 py-4 font-medium">Kunde</th>
                            <th className="px-6 py-4 font-medium">Leistung</th>
                            <th className="px-6 py-4 font-medium">Preis</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Aktionen</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {appointments.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    Keine Termine gefunden.
                                </td>
                            </tr>
                        )}
                        {appointments.map((appointment) => (
                            <tr
                                key={appointment.id}
                                className="text-[#292334] transition-colors hover:bg-gray-50"
                            >
                                <td className="px-6 py-5">
                                    {appointment.date.split("-").reverse().join(".")}
                                </td>
                                <td className="px-6 py-5 font-medium">
                                    {appointment.time}
                                </td>

                                <td className="px-6 py-5">
                                    {appointment.customerName}
                                </td>

                                <td className="px-6 py-5">
                                    {appointment.service}
                                </td>

                                <td className="px-6 py-5 font-medium">
                                    {appointment.price.toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={appointment.status} />
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            aria-label="Termin bearbeiten"
                                            onClick={() => onEdit(appointment)}
                                            className="cursor-pointer rounded-md p-2 text-gray-500 hover:bg-purple-100 hover:text-purple-700"
                                        >
                                            <Pencil size={17} />
                                        </button>

                                        <button
                                            type="button"
                                            aria-label="Termin löschen"
                                            onClick={() => onDelete(appointment.id)}
                                            className="cursor-pointer rounded-md p-2 text-gray-500 hover:bg-red-100 hover:text-red-600"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
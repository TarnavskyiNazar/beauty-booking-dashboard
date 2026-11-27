import type { Appointment } from "@/types/appointment";

export const appointments: Appointment[] = [
  {
    id: "1",
    customerName: "Anna Müller",
    service: "Laser-Haarentfernung",
    date: "2026-11-27",
    time: "09:00",
    price: 80,
    status: "Bestätigt",
  },
  {
    id: "2",
    customerName: "Julia Weber",
    service: "Maniküre",
    date: "2026-11-27",
    time: "10:30",
    price: 45,
    status: "Offen",
  },
  {
    id: "3",
    customerName: "Lisa Schmidt",
    service: "Kosmetik",
    date: "2026-11-27",
    time: "12:00",
    price: 65,
    status: "Bestätigt",
  },
  {
    id: "4",
    customerName: "Maria Fischer",
    service: "Laser-Haarentfernung",
    date: "2026-11-27",
    time: "14:00",
    price: 120,
    status: "Storniert",
  },
];
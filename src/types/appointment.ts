export type AppointmentStatus =
  | "Bestätigt"
  | "Offen"
  | "Storniert";

export interface Appointment {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status: AppointmentStatus;
}
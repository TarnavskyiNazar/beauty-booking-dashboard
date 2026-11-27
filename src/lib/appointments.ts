import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Appointment } from "@/types/appointment";

export function subscribeToAppointments(
  userId: string,
  onChange: (appointments: Appointment[]) => void,
  onError: (error: Error) => void
) {
  const appointmentsRef = collection(
    db,
    "users",
    userId,
    "appointments"
  );

  return onSnapshot(
    appointmentsRef,
    (snapshot) => {
      const appointments = snapshot.docs.map((document) => ({
        ...(document.data() as Omit<Appointment, "id">),
        id: document.id,
      }));

      onChange(appointments);
    },
    onError
  );
}

export async function saveAppointment(
  userId: string,
  appointment: Appointment
) {
  const appointmentRef = doc(
    db,
    "users",
    userId,
    "appointments",
    appointment.id
  );

await setDoc(appointmentRef, {
  customerName: appointment.customerName,
  service: appointment.service,
  date: appointment.date,
  time: appointment.time,
  price: appointment.price,
  status: appointment.status,
});
}

export async function deleteAppointment(
  userId: string,
  appointmentId: string
) {
  const appointmentRef = doc(
    db,
    "users",
    userId,
    "appointments",
    appointmentId
  );

  await deleteDoc(appointmentRef);
}
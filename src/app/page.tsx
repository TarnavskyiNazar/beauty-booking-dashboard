"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsOverview from "@/components/StatsOverview";
import AppointmentTable from "@/components/AppointmentTable";
import AppointmentModal from "@/components/AppointmentModal";
import AppointmentFilters from "@/components/AppointmentFilters";

import type {
  StatusFilter,
  SortOption,
} from "@/components/AppointmentFilters";

import { appointments as initialAppointments } from "@/data/appointments";
import type { Appointment } from "@/types/appointment";

export default function Home() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | undefined>(undefined);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [sortOption, setSortOption] =
    useState<SortOption>("date");

  const filteredAppointments = appointments
    .filter((appointment) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        appointment.customerName.toLowerCase().includes(query) ||
        appointment.service.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") {
        return a.price - b.price;
      }

      if (sortOption === "price-desc") {
        return b.price - a.price;
      }

      return `${a.date}T${a.time}`.localeCompare(
        `${b.date}T${b.time}`
      );
    });

  const handleOpenAdd = () => {
    setEditingAppointment(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(undefined);
  };

  const handleSave = (appointment: Appointment) => {
    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appointment.id ? appointment : item
        )
      );
    } else {
      setAppointments((prev) => [...prev, appointment]);
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Möchtest du diesen Termin wirklich löschen?"
    );

    if (!confirmed) return;

    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f8f7fa]">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <Header onAdd={handleOpenAdd} />

        <StatsOverview appointments={appointments} />

        <section className="mt-8">
          <h2 className="mb-5 text-xl font-bold text-[#292334]">
            Aktuelle Termine
          </h2>

          <AppointmentFilters
            search={search}
            status={statusFilter}
            sort={sortOption}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onSortChange={setSortOption}
          />

          <AppointmentTable
            appointments={filteredAppointments}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          <p className="mt-4 text-sm text-gray-500">
            {filteredAppointments.length} von{" "}
            {appointments.length} Terminen
          </p>
        </section>
      </main>

      {isModalOpen && (
        <AppointmentModal
          appointment={editingAppointment}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
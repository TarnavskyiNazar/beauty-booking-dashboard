"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsOverview from "@/components/StatsOverview";
import AppointmentTable from "@/components/AppointmentTable";
import AppointmentModal from "@/components/AppointmentModal";
import AppointmentFilters from "@/components/AppointmentFilters";
import AuthForm from "@/components/AuthForm";

import type {
  StatusFilter,
  SortOption,
} from "@/components/AppointmentFilters";

import type { Appointment } from "@/types/appointment";

import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";

import {
  subscribeToAppointments,
  saveAppointment,
  deleteAppointment,
} from "@/lib/appointments";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7fa]">
        <p className="text-lg text-[#69516c]">
          Wird geladen...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return <Dashboard key={user.uid} user={user} />;
}

function Dashboard({ user }: { user: User }) {
  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | undefined>(undefined);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [sortOption, setSortOption] =
    useState<SortOption>("date");

  const [dataLoading, setDataLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToAppointments(
      user.uid,
      (data) => {
        setAppointments(data);
        setDataLoading(false);
      },
      (error) => {
        console.error(error);
        setError("Termine konnten nicht geladen werden.");
        setDataLoading(false);
      }
    );

    return unsubscribe;
  }, [user.uid]);

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

  const handleSave = async (appointment: Appointment) => {
    if (saving) return;

    setError("");
    setSaving(true);

    try {
      await saveAppointment(user.uid, appointment);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      window.alert("Termin konnte nicht gespeichert werden.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Möchtest du diesen Termin wirklich löschen?"
    );

    if (!confirmed) return;

    setError("");

    try {
      await deleteAppointment(user.uid, id);
    } catch (error) {
      console.error(error);
      setError("Termin konnte nicht gelöscht werden.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      setError("Abmeldung fehlgeschlagen.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f7fa] lg:flex-row">      <Sidebar
      email={user.email ?? ""}
      onLogout={handleLogout}
    />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">        <Header onAdd={handleOpenAdd} />

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {dataLoading ? (
          <p className="text-gray-500">
            Termine werden geladen...
          </p>
        ) : (
          <>
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
          </>
        )}
      </main>

      {isModalOpen && (
        <AppointmentModal
          appointment={editingAppointment}
          onClose={saving ? () => { } : handleCloseModal}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
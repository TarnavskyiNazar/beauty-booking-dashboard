"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      }
    } catch {
      setError(
        isRegister
          ? "Registrierung fehlgeschlagen. Bitte überprüfe deine Angaben."
          : "Anmeldung fehlgeschlagen. Bitte überprüfe deine Zugangsdaten."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-[#292334] outline-none focus:border-[#69516c] focus:ring-2 focus:ring-purple-100";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f7fa] p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#292334]">
            Beauty<span className="text-[#c58ba9]">.</span>
          </h1>

          <p className="mt-1 text-xs tracking-widest text-gray-500">
            BOOKING STUDIO
          </p>
        </div>

        <h2 className="text-center text-2xl font-bold text-[#292334]">
          {isRegister
            ? "Konto erstellen"
            : "Willkommen zurück"}
        </h2>

        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          {isRegister
            ? "Registriere dich für dein Studio."
            : "Melde dich in deinem Studio an."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              E-Mail
            </span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@studio.de"
              autoComplete="email"
              className={inputClass}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Passwort
            </span>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mindestens 6 Zeichen"
              autoComplete={
                isRegister
                  ? "new-password"
                  : "current-password"
              }
              minLength={6}
              className={inputClass}
              required
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-[#69516c] px-5 py-3 font-medium text-white hover:bg-[#57405a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Bitte warten..."
              : isRegister
                ? "Registrieren"
                : "Anmelden"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isRegister
            ? "Bereits ein Konto?"
            : "Noch kein Konto?"}

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setIsRegister((prev) => !prev);
              setError("");
              setPassword("");
            }}
            className="ml-2 cursor-pointer font-semibold text-[#69516c] hover:underline"
          >
            {isRegister ? "Anmelden" : "Registrieren"}
          </button>
        </div>
      </div>
    </div>
  );
}
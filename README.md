# Beauty Booking Dashboard

Ein modernes, responsives Dashboard zur Verwaltung
von Terminen in Beauty-Studios.

Dieses Projekt wurde als eigenständiges Lern- und
Portfolio-Projekt entwickelt, um praktische Erfahrungen
mit Next.js, TypeScript und Firebase zu sammeln.
## Live Demo

https://beauty-booking-dashboard.vercel.app/

Die Anwendung kann direkt im Browser getestet werden.
Eine kostenlose Registrierung ist möglich.
Bitte ausschließlich fiktive Kundendaten verwenden.

## Funktionen

- Registrierung und Anmeldung mit E-Mail und Passwort
- Benutzerbezogene Terminverwaltung
- Termine erstellen, anzeigen, bearbeiten und löschen
- Suche nach Kunden und Dienstleistungen
- Filterung nach Terminstatus
- Sortierung nach Datum, Uhrzeit und Preis
- Dynamische Dashboard-Statistiken
- Echtzeit-Datenaktualisierung mit Cloud Firestore
- Zugriffsschutz durch Firestore Security Rules
- Responsive Design für Desktop, Tablet und Smartphone
- Ladezustände und Fehlerbehandlung

## Technologien

| Technologie | Verwendung |
|---|---|
| Next.js | React-Framework mit App Router |
| React | Komponenten und Zustandsverwaltung |
| TypeScript | Typsicherheit |
| Tailwind CSS | Styling und Responsive Design |
| Firebase Authentication | Benutzeranmeldung |
| Cloud Firestore | NoSQL-Datenbank |
| Lucide React | Icons |
| ESLint | Codequalität |
| Git & GitHub | Versionsverwaltung |

## Projektstruktur

```text
src/
├── app/
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AppointmentFilters.tsx
│   ├── AppointmentModal.tsx
│   ├── AppointmentTable.tsx
│   ├── AuthForm.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── StatCard.tsx
│   ├── StatsOverview.tsx
│   └── StatusBadge.tsx
├── data/
│   └── appointments.ts
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── appointments.ts
│   └── firebase.ts
└── types/
    └── appointment.ts
```

## Lokale Installation

Repository klonen:

```bash
git clone https://github.com/TarnavskyiNazar/beauty-booking-dashboard.git
cd beauty-booking-dashboard
npm install
```

Eine Datei `.env.local` im Hauptverzeichnis erstellen:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Ein eigenes Firebase-Projekt erstellen, Email/Password
Authentication aktivieren, Cloud Firestore einrichten
und benutzerbezogene Security Rules konfigurieren.

Entwicklungsserver starten:

```bash
npm run dev
```

Anwendung öffnen:

http://localhost:3000

## Codequalität

```bash
npx eslint .
npx tsc --noEmit
npm run build
```

## Sicherheit

Jeder angemeldete Benutzer kann ausschließlich auf
seine eigenen Termine zugreifen.

Die Daten werden unter folgendem Pfad gespeichert:

```text
users/{userId}/appointments/{appointmentId}
```

Das Projekt ist ein Lernprojekt und verwendet
ausschließlich fiktive Kundendaten.

## Lernziele

- Entwicklung einer modernen Webanwendung mit Next.js
- Wiederverwendbare React-Komponenten
- TypeScript und typisierte Datenmodelle
- CRUD-Operationen mit einer Cloud-Datenbank
- Authentifizierung und Autorisierung
- Asynchrone Programmierung
- Echtzeit-Datenverarbeitung
- Strukturierte Projektarchitektur
- Responsive Webentwicklung

## Geplante Erweiterungen

- Kalenderansicht
- Separate Kundenverwaltung
- Verwaltung von Dienstleistungen
- Passwort zurücksetzen
- Erweiterte Datenvalidierung
- Automatisierte Tests

## Autor

Nazar Tarnavskyi

GitHub: https://github.com/TarnavskyiNazar
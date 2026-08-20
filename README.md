# React POCs – Pattern-Bibliothek

Eine React-Anwendung, die verschiedene React-Patterns (State-Management, Prop-Handling, Validierung, Event-Kommunikation zwischen Komponenten) als **nachvollziehbare, isolierte Proof-of-Concepts (POCs)** sammelt – wie ein Kochbuch für React-Techniken.

## Zweck

Die App richtet sich an Entwickler:innen (auch mit wenig React-Erfahrung), die verstehen wollen, **wie Props und Event-Handler zwischen verschachtelten Komponenten zusammenspielen**. Jeder POC ist ein in sich geschlossenes Beispiel, das ein bestimmtes Muster demonstriert.

## Struktur
```text
src/
├── pocs/
│   └── 01-props-state-validation/
│       ├── meta.ts              # Titel, Beschreibung, Quellcode-Links, Mermaid-Diagramm
│       ├── views/
│       │   └── AutocompleteFormView.tsx   # Composition Root des POCs
│       ├── components/          # Gekapselte Unterkomponenten (z. B. ValidatedAutocomplete)
│       └── validators/          # Reine Validierungsfunktionen (E-Mail, Telefonnummer)
├── components/
│   └── PropFlowDiagram.tsx      # Rendert Mermaid-Diagramme zur Visualisierung des Datenflusses
├── registry/
│   └── pocRegistry.ts           # Zentrales Verzeichnis aller POCs (Typen, Metadaten)
└── pages/
    └── PocDetailPage.tsx        # Generische Detailseite, lädt POC-Komponente + Meta
```

## Funktionsweise

1. **Registry-Prinzip**: Jeder POC registriert sich mit Metadaten (`meta.ts`) in der zentralen `pocRegistry.ts`. Die Übersichtsseite listet alle POCs automatisch als Karten auf.
2. **Nachvollziehbarkeit**: Jede POC-Karte verlinkt auf die relevanten Quelldateien im Repository (GitHub-Deep-Links), damit man den Code direkt einsehen kann.
3. **Dateiname über Komponente**: Jede Komponente zeigt ihren Dateinamen als Kommentar/Label direkt im Code, um die Zuordnung Datei ↔️ UI-Element zu erleichtern.
4. **Prop-Flow-Diagramme**: POCs können ein Mermaid-Diagramm (`propFlowDiagram` in `meta.ts`) definieren, das den Daten- und Event-Fluss zwischen Komponenten visualisiert. Es wird direkt unterhalb der jeweiligen View gerendert (z. B. in `AutocompleteFormView.tsx`).

## Enthaltene POCs

### 01 – Props, State & Validation
Demonstriert:
- Ein `Autocomplete` (MUI) mit Text-Input
- Verschachtelte Komponenten: View → kapselnde Komponente → Input-Logik
- Prop-Drilling und `onChange`-Callbacks nach oben
- Validierung von E-Mail-Adresse und Telefonnummer über reine Validator-Funktionen
- Visualisierung des Datenflusses per Mermaid-Diagramm

## Tech-Stack

- **React** (Functional Components, Hooks)
- **MUI** (Material UI) als Komponentensystem
- **TypeScript**
- **Mermaid** zur Diagramm-Darstellung

## Neue POCs hinzufügen

```bash
pnpm new-poc <slug>
```

(z. B. `pnpm new-poc form-validation`)

Das Skript:
1. **Auto-Nummerierung** — erkennt die höchste existierende Nummer und inkrementiert (01 → 02 → …)
2. **Scaffolding** — erzeugt `src/pocs/NN-name/` mit `meta.ts`, `index.tsx`, `views/`, `components/`, `utils/`
3. **Registry-Eintrag** — registriert den `lazy()`-Import automatisch in `pocRegistry.ts`

Danach die `TODO:`-Marker in den generierten Dateien durch Inhalt ersetzen.

## Ziel

Jedes hinzukommende Pattern soll **isoliert, lesbar und im Code nachvollziehbar** sein – inklusive Verlinkung zu Quelldateien und visueller Darstellung der Prop-/Event-Beziehungen.

## Setup

### Voraussetzungen
- Node.js (>= 18.x empfohlen)
- npm oder yarn

### Installation

```bash
git clone https://github.com/Pangv/reactpocs.git
cd reactpocs
npm install

Entwicklungsserver starten

npm run dev

Die App ist danach unter http://localhost:5173 (Vite-Standardport) erreichbar.
Build

npm run build

Build lokal testen

npm run preview


Passe Ports/Skript-Namen an, falls ihr **Create React App** statt **Vite** nutzt – sag mir kurz, welches Tooling verwendet wird, dann gleiche ich die Befehle an.

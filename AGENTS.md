# react-pattern-cookbook

A focused atlas of reusable React, TypeScript, and MUI component patterns. Each POC is a self-contained, lazily loaded experiment.

## Tech Stack

| Tool | Version |
|------|---------|
| React | 19 |
| TypeScript | (strict mode) |
| MUI | 9 (Material-UI v9 — **Grid2 API**, `sx` for layout props) |
| React Router | 7 |
| Vite | 8 |
| pnpm | 9.9 |
| oxlint | 1.75 (linter) |
| Firebase Hosting | (deploy target) |
| Mermaid | 11 (flowchart rendering) |

## Architecture

```
src/
├── main.tsx              Entry — StrictMode > AppThemeProvider > RouterProvider
├── App.tsx               Layout shell with Outlet
├── router.tsx            createBrowserRouter with / and /pocs/:pocId
├── theme/                MUI v9 theme (createTheme) + AppThemeProvider
├── layout/               AppLayout (sidebar + main) + Sidebar (MUI Drawer)
├── pages/                Top-level routes (HomePage)
├── registry/pocRegistry  Central catalog: PocMeta + lazy-loaded components
├── components/           Shared components (SourceFileTag, PropFlowDiagram)
└── pocs/                 NN-name/ with index.tsx, meta.ts, views/, components/
```

## Registry Pattern

All POCs live in `src/pocs/NN-name/` and are registered in `src/registry/pocRegistry.ts`:

```ts
import metaNN from '../pocs/NN-name/meta';
{
  ...metaNN,
  component: lazy(() => import('../pocs/NN-name')),
}
```

Each POC exports a default React component from `index.tsx` and metadata from `meta.ts` (id, title, description, sourceFiles, propFlowDiagram).

## MUI v9 Conventions

- **Grid2 API:** `<Grid container spacing={N}><Grid size={{ xs: 12, md: 6 }}>`
- **Stack layout:** Use `sx` for `justifyContent`/`alignItems` — these are not direct props
- **Theme:** `createTheme({ palette, typography, shape: { borderRadius: 8 } })`
- **All components** use `sx` prop for styling (emotion-based)

## Code Standards

- **Strict TypeScript** — `strict: true`, `noUnusedLocals`, `noUnusedParameters`
- **No external state** — all state via `useState`/`useMemo`
- **Composition Root** — View layer holds state, passes props/callbacks down
- **Self-documenting** — Components link to their own source via `SourceFileTag`
- **Path alias** — `@/` maps to `src/`

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Type-check + Vite build |
| `pnpm typecheck` | TypeScript check only |
| `pnpm deploy` | Build + Firebase Hosting deploy |
| `pnpm new-poc <slug>` | Scaffold a new POC (auto-numbers, registers in registry) |

## Adding a New POC

Run `pnpm new-poc <slug>` (e.g. `pnpm new-poc form-validation`). The script:

1. Auto-detects the next number (01 → 02 → …)
2. Creates `src/pocs/NN-name/` with `meta.ts`, `index.tsx`, `views/`, `components/`, `utils/`
3. Registers the lazy import in `src/registry/pocRegistry.ts`

Then edit the generated files to replace `TODO` placeholders.
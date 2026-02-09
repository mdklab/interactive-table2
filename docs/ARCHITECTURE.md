# Architecture — CSV → Interactive Table

## Stack Decision (CI/CD-first)

**Chosen stack:** Vite + React + TypeScript + TanStack Table + Papa Parse

**Rationale:**
- TanStack Table provides robust sorting/filtering state and composable rendering.
- Papa Parse supports streaming + `worker: true` for large CSVs.
- Vite builds fast static assets for GitHub Pages.

## High-Level Flow

1. **Upload**: User selects a `.csv` file via file input.
2. **Parse**: Papa Parse runs in a Web Worker (`worker: true`) with `header: true` and `dynamicTyping: true`.
3. **Model**: Parsed data becomes `columns[]` + `rows[]` in app state.
4. **Render**: TanStack Table renders rows; sorting + filtering driven by controlled state.
5. **Virtualize** (optional but recommended for large files): use `@tanstack/react-virtual` for row virtualization.
6. **Export**: App builds to `/dist` for GitHub Pages static hosting.

## Key Components

- **FileUploader**
  - Handles file input and validation (CSV only).
  - Triggers parse and provides progress feedback.

- **TableView**
  - Receives data + column definitions.
  - Uses TanStack Table for sorting/filtering.
  - Renders filter inputs per column.

- **FiltersToolbar**
  - Global search (optional) + per-column filters.
  - Clear/reset state.

- **VirtualizedBody**
  - Renders visible rows only for large datasets.

## Performance Considerations

- CSV parsing in worker thread to keep UI responsive.
- Virtualization for large datasets.
- Memoized column definitions and row models.

## CI/CD

- **CI**: run `npm ci` → `npm run lint` → `npm run build` on PRs.
- **CD**: deploy `dist/` to GitHub Pages on `main` merges.

## Non-Goals

- No backend services.
- No cloud storage (local upload only).

# Delivery Plan (Issues & Stages)

> Use role-prefixed comments in GitHub, e.g., `TechLead:`.

## Stage 0 — CI/CD First (TechLead)

**Issue 0.1 — CI workflow**
- Add GitHub Actions workflow: install, lint, build on PRs.
- Add deploy workflow to GitHub Pages on `main`.

**Issue 0.2 — Repo governance**
- Add `AGENTS.md` and docs skeleton.

## Stage 1 — App Scaffold (Developer)

**Issue 1.1 — Vite + React + TS setup**
- Initialize Vite React TS app.
- Add base layout and global styles.
- Verify local dev + build.

**Issue 1.2 — CSV upload UI (Designer + Developer)**
- Upload area, drag/drop optional.
- Error/empty states.

## Stage 2 — CSV Parsing + Data Model (Developer)

**Issue 2.1 — Papa Parse integration**
- Parse in worker thread, support large files.
- Map headers to columns; rows to data objects.
- Progress indicator.

## Stage 3 — Interactive Table (Developer)

**Issue 3.1 — Table rendering**
- TanStack Table: sorting + filtering state.
- Column-specific filter UI.
- Column visibility toggles (nice-to-have).

**Issue 3.2 — Virtualization**
- Add `@tanstack/react-virtual` for large data.

## Stage 4 — UX Polish (Designer)

**Issue 4.1 — Visual system**
- Table styling, hover/active states, focus states.
- Responsive layout.

**Issue 4.2 — Accessibility**
- Keyboard navigation and ARIA labels.

## Stage 5 — Docs & Release (Developer + TechLead)

**Issue 5.1 — README + usage**
- How to run locally and deploy.

**Issue 5.2 — GitHub Pages config**
- Confirm base path and SPA routing for GH Pages.

## QA & PM Hand-off

- **QA** validates functional requirements after Stage 5 merge.
- **TechLead** notifies **PM** after QA pass.

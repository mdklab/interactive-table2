# AGENTS

## Roles & Responsibilities

- **TechLead**
  - Own architecture, stack decisions, and CI/CD-first delivery.
  - Break work into stages/issues and assign to Developer/Designer.
  - Review PRs and merge only after approval + green CI.
  - Notify QA after merge, then PM after QA pass.

- **Developer**
  - Implement features per assigned issues.
  - Keep PRs scoped, add tests where applicable.
  - Update docs when behavior changes.

- **Designer**
  - Define UI layout, table controls, and interaction states.
  - Provide CSS/token guidance and accessibility notes.

- **QA**
  - Validate acceptance criteria on each merged milestone.
  - Report defects with repro steps + screenshots.

- **PM**
  - Confirms scope and approves delivery.

## Collaboration Rules

- Use English in GitHub.
- Use role-prefixed comments, e.g., `TechLead:`.
- CI must be green before merge.
- No direct pushes to `main` (PRs only).

## Current Delivery Stages (Open Issues)

1. **#1 Document stack options for CSV → Interactive Table** — TechLead (architecture note)
2. **#2 Kick off CSV → Interactive Table project** — TechLead/PM kickoff
3. **#3 Set up Vite + React project scaffold** — Developer
4. **#4 Implement CSV upload + PapaParse worker pipeline** — Developer
5. **#5 Render table with TanStack Table (sorting + filtering UI)** — Developer + Designer
6. **#6 Add virtualization + GitHub Pages deployment config** — Developer + DevOps

# Stack Options for CSV → Interactive Table

## Context and Constraints

We are building a client-side experience that:

- Lets a user pick a local CSV file (upload from disk) without server round-trips.
- Parses that CSV into an in-browser data model, so sorting, filtering, and (optionally) column resizing happen instantly.
- Renders an interactive table that can paginate, virtualize large rows, and provide multi-column filters.
- Ships as a static asset bundle hosted on GitHub Pages, so the stack must compile to static HTML/CSS/JS with no backend requirements.
- Respects the "no size limits" brief by allowing for streaming parse, virtualization, and Web Worker-friendly parsing if the user drops large files.

Each option below identifies the core framework, CSV handling approach, table library, and deployment story.

## Option 1 – Vite + React + TanStack Table + Papa Parse (Recommended)

**What happens in this stack?**
- Build the app with [Vite](https://vitejs.dev/) and React, which gives a fast dev server and static build optimized for GH Pages.
- Let users pick a file with an `<input type="file" accept=".csv" />` and feed it into [Papa Parse](https://www.papaparse.com/) via `parse(file, { worker: true, dynamicTyping: true })` so parsing happens off the main thread for large CSVs.
- Pipe the parsed rows and columns into [TanStack Table](https://tanstack.com/table/v8) (formerly React Table) to render a fully controlled table UI with sorting, filtering, and column visibility plugins.
- Add virtualization with `@tanstack/react-virtual` when row counts soar, and wire up filter controls that update the `state.columnFilters` object before table render.
- Deploy by building `npm run build` and pushing the `dist/` directory through `gh-pages` or via GitHub Pages' root on `main`.

**Pros**
- Most mature ecosystem; TanStack Table already exposes sorting/filtering/state hooks that match the feature set.
- Papa Parse handles streaming and lives in the browser, and the worker option keeps the UI responsive for very large uploads.
- Vite produces a single static bundle easily consumable by GitHub Pages.

**Cons**
- React bundle size is larger than vanilla alternatives, but we can tree-shake and use `React.lazy` if needed.

**Why recommended**: Balanced between developer familiarity, ability to iterate quickly on UX, and support for advanced table features without needing to invent additional infrastructure.

## Option 2 – Vite + Svelte + Svelte Table + Papa Parse

**What happens in this stack?**
- Use Vite with Svelte to keep a small runtime and build pipeline that produces static assets.
- User file uploads are parsed the same way (Papa Parse with `worker: true`), and the resulting data is stored in Svelte stores for reactivity.
- Render the rows with a Svelte-based table component such as [svelte-table](https://github.com/andrelmlins/svelte-table) or a custom `<Table>` that uses `Array.filter`/`Array.sort` before rendering data rows.
- Filtering UI is driven by Svelte bindings (`bind:value`) and reacts immediately because Svelte compiles to DOM updates.
- Deployment is identical to Option 1: build the `dist/` output and target GitHub Pages.

**Pros**
- Svelte has less runtime overhead and smaller bundle sizes.
- It's straightforward to wire filtering and sorting `derived` stores without needing an external table state machine.

**Cons**
- There are fewer battle-tested Svelte table components with advanced features, so we may need to implement sorting/filtering helpers ourselves.
- Less familiarity in the broader community may make future contributors slower to onboard.

## Option 3 – Astro + Solid Components + Tabulator for Presentation

**What happens in this stack?**
- Build the site inside [Astro](https://astro.build/) so the repo is structured around pages/components, but keep the interactive area as a client-side component.
- Inside an Astro component, mount Solid or React and use [Tabulator](https://tabulator.info/) (a feature-rich table library) to render the parsed CSV, since Tabulator already includes filters/sorting/pagination/virtualization.
- Upload handling can happen in a simple Solid/React component mounted from Astro; parse with Papa Parse or `text-encoding` + `new Worker` for streaming.
- Because Astro renders static pages but hydrates the interactive portion to the client, the GH Pages deployment is simply the `astro build` output.

**Pros**
- Tabulator provides built-in UI for filters, sorts, column visibility, and even client-side pagination, so we ship functionality quickly.
- Astro lets us mix static content (project description) with an interactive island for the table.

**Cons**
- Astro adds another layer of tooling, which may be overkill for a single-page experience.
- We still have to configure a client framework inside Astro, which slightly increases complexity.

## Recommendation

Start with **Option 1 (Vite + React + TanStack Table + Papa Parse)** because it gives us out-of-the-box sorting/filtering controls, a familiar React ecosystem, and easy GH Pages deployment. If bundle size becomes a concern, we can pivot to Option 2 (Svelte) at a later milestone, guided by the insights captured in this document.

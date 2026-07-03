# FamilIA

FamilIA is a TanStack Start web app designed to help older adults manage their finances more autonomously while keeping family members informed and preserving a strong safety net around the experience.

The app combines a public landing page, account entry flows, a pricing page, a tutor dashboard, and a copilot experience that sends text, audio, and image inputs to a remote endpoint to obtain agentic responses. The dashboard pages also include mock financial and activity data so the interface can be explored end to end during development.

## What This Repository Contains

- A marketing landing page that explains the product and routes people into the right flow.
- Separate signin and signup entry points for tutors and older adults.
- A pricing page for plan comparison.
- A dashboard shell with overview, activity, finance, and settings pages.
- A copilot page that packages user input and posts it to a remote endpoint for assistant responses.
- A shared component library and utility layer for the UI.

## Tech Stack

The core stack is documented in more detail in [docs/technical-stack.md](docs/technical-stack.md), but the short version is:

- React 19 for UI rendering.
- TanStack Start for the app framework and server integration.
- TanStack Router for file-based routing.
- TanStack Query for shared query context.
- Vite as the dev server and bundler.
- TypeScript for type safety.
- Tailwind CSS 4, Radix UI, Framer Motion, Recharts, Zod, and several focused UI libraries for interactions and presentation.

## Repository Layout

```text
src/
	routes/         File-based routes for landing, auth, pricing, and dashboard pages
	components/     Reusable UI and dashboard-specific components
	lib/            Mock data, localStorage helpers, utilities, and error rendering
	router.tsx      Router creation and shared query context
	start.ts        TanStack Start server bootstrap and request middleware
docs/
	technical-stack.md  Deep technical overview of the stack and architecture
	user-guide.md       Plain-language guide to the site flow and features
```

## Quick Start

### Prerequisites

- Node.js 20+ or Bun
- A modern browser

### Install Dependencies

Use Bun if possible, because the repository includes a `bun.lock` file:

```bash
bun install
```

If you prefer npm, this also works:

```bash
npm install
```

### Run the App Locally

Start the development server:

```bash
bun run dev
```

Open the local URL printed in the terminal. Vite will rebuild on file changes.

### Build and Preview

Create a production build:

```bash
bun run build
```

Preview the production output locally:

```bash
bun run preview
```

### Run Checks

Lint the repository:

```bash
bun run lint
```

Format the repository with Prettier:

```bash
bun run format
```

## Available Scripts

| Script | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Produce a production build |
| `bun run build:dev` | Build with the development mode flag |
| `bun run preview` | Preview the production build |
| `bun run lint` | Run ESLint across the repo |
| `bun run format` | Format files with Prettier |

## Routes and Pages

The app uses file-based routing through TanStack Start. Useful entry points are:

- `/` landing page
- `/pricing` pricing comparison
- `/auth/signin` signin selector
- `/auth/signup` signup selector
- `/dashboard` tutor dashboard shell
- `/dashboard/activity` activity timeline
- `/dashboard/finance` finance and anomaly view
- `/dashboard/settings` profile and subscription settings
- `/copilot` assistant workflow that submits context to the remote endpoint

The route conventions are documented in [src/routes/README.md](src/routes/README.md). In short, each `.tsx` file in `src/routes` becomes a route, and `routeTree.gen.ts` is generated automatically.

## How the App Works

### Public Experience

The home page explains the product, highlights core benefits, and sends users toward signup or pricing. The content emphasizes:

- fraud protection
- plain-language bank summaries
- family alerts
- respectful shared care

### Tutor Experience

The dashboard is for the family member or tutor. It provides:

- a status overview with recent activity and wallet information
- a full activity log with filters
- finance charts, anomalies, and upcoming charges
- settings for the elder profile and subscription

### Elder Profile State

The app stores elder profile details in browser `localStorage` through helpers in `src/lib/elder-profile.ts`. That means the settings page will remember the name and PIN on the current browser, but there is no backend persistence yet.

### Data and Responses

The dashboard is driven by deterministic mock data from `src/lib/dashboard-mocks.ts`, which keeps the product experience stable during development. The copilot experience is different: it performs a real request to a remote endpoint and renders the response returned by the assistant service.

## Where to Edit Things

- Landing page content: `src/routes/index.tsx`
- Pricing page: `src/routes/pricing.tsx`
- Signin/signup choices: `src/routes/auth/*`
- Dashboard shell: `src/routes/dashboard.tsx`
- Dashboard overview: `src/routes/dashboard.index.tsx`
- Activity page: `src/routes/dashboard.activity.tsx`
- Finance page: `src/routes/dashboard.finance.tsx`
- Settings page: `src/routes/dashboard.settings.tsx`
- Copilot assistant: `src/routes/copilot.tsx`
- Shared UI primitives: `src/components/ui/*`
- Dashboard widgets: `src/components/dashboard/*`
- Shared utility and data helpers: `src/lib/*`

## Validation

The main checks for this repository are:

1. `bun run build` to verify the app still compiles and routes correctly.
2. `bun run lint` to catch formatting and code-quality issues.

For a quick smoke test after changes, build first and then open the app in preview mode.

## Troubleshooting

### `bun run dev` does not start

- Make sure dependencies are installed.
- Check that you are using a modern Node.js version or Bun.
- If the port is already in use, stop the other process and rerun the command.

### The page loads but looks empty

- Confirm you are visiting `/` or one of the documented routes.
- Check the browser console for runtime errors.
- Verify that `src/routes/__root.tsx` still renders `<Outlet />`.

### Changes to the dashboard do not persist

- That is expected for now. The dashboard uses mock data and browser storage, not a remote database.

## Related Documentation

- [Technical stack and architecture](docs/technical-stack.md)
- [User guide](docs/user-guide.md)

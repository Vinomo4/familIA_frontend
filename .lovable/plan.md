## Tutor Dashboard — Plan

Create a new `/dashboard` area for the tutor persona. Tutor signin and signup completion already redirect to `/dashboard`, so this fills the missing destination. Pure frontend (mocked data), reusing existing shadcn/UI primitives and the visual language already established (rounded cards, soft borders, `AestheticLayout`-style aesthetic, lucide icons, framer-motion subtle animations).

### 1. Routing structure (TanStack file-based)

Use a layout route with `<Outlet />` so the sidebar persists across sub-pages.

```text
src/routes/
  dashboard.tsx                  -> /dashboard (layout: sidebar + outlet, redirects to overview)
  dashboard.index.tsx            -> /dashboard (Visión General)
  dashboard.activity.tsx         -> /dashboard/activity (Historial)
  dashboard.finance.tsx          -> /dashboard/finance (Monedero)
  dashboard.settings.tsx         -> /dashboard/settings (Configuración)
```

`dashboard.tsx` wraps everything in `SidebarProvider` + `AppSidebar` (new) + main content area with `SidebarTrigger` in a top bar. No auth guard yet (frontend MVP, no backend).

### 2. New components

- `src/components/dashboard/app-sidebar.tsx` — Sidebar using existing `@/components/ui/sidebar` primitives. Items: Visión General (LayoutDashboard), Historial (History), Finanzas (Wallet), Configuración (Settings). Logo + elder name from `getStoredElderName()` at top, logout button at bottom (clears localStorage, navigates `/`). Active route highlighted via `useRouterState`, collapsible `"icon"` mode.
- `src/components/dashboard/status-traffic-light.tsx` — Prominent status card with three states (Verde / Amarillo / Rojo). Mocked state via local toggle for demo. Red state surfaces a big destructive "Llamar a mi familiar ahora" button. Subtle pulse animation on the active dot (framer-motion).
- `src/components/dashboard/metric-card.tsx` — Reusable summary widget (icon, label, value, delta). Built on existing `Card`.
- `src/components/dashboard/activity-feed.tsx` — Anonymized list rendering mocked events with timestamp + descriptive sentence + severity badge. Accepts `limit` prop so Overview shows 4 and Activity page shows full list.
- `src/components/dashboard/sparkline.tsx` — Tiny inline chart using existing `@/components/ui/chart` (Recharts) for the Overview finance preview.

### 3. Page contents

**Overview (`dashboard.index.tsx`)**

- Header: "Hola, [tutor]" + current date.
- `StatusTrafficLight` (full width, prioritized).
- Grid of 3 `MetricCard`: Dudas resueltas (mes), Amenazas bloqueadas, Efectivo estimado a mano.
- Two-column section: `ActivityFeed limit={4}` (link "Ver todo" → /dashboard/activity) and finance preview card with `Sparkline` (link "Ver monedero" → /dashboard/finance).

**Activity (`dashboard.activity.tsx`)**

- Filter bar: `Select` for tipo de evento (Consultas / Emergencias / Documentos / Todos), `Select` for gravedad, date range using existing `Calendar` in a `Popover`.
- Full `ActivityFeed` rendered as `Table` (Fecha, Tipo, Descripción anonimizada, Gravedad badge). Mocked dataset of ~20 entries.

**Finance (`dashboard.finance.tsx`)**

- Main chart card: line chart (Recharts via `@/components/ui/chart`) with two series — Saldo digital (banco simulado) y Efectivo estimado (reportes de voz). 30 días de datos mock.
- Resumen lateral: saldo actual, variación 7d, próximos cargos recurrentes.
- Panel de Anomalías: stacked `Alert` cards (cargos duplicados, comisiones inusuales) con severidad y CTA "Revisar".

**Settings (`dashboard.settings.tsx`)**

- Tabs (`@/components/ui/tabs`):
  - _Mayor_: Input nombre (prellenado desde `localStorage`), `InputOTP` para nuevo PIN de 4 dígitos, botón Guardar (actualiza `storeElderProfile`).
  - _Calibración_: Input numérico "Efectivo a mano" + botón "Resetear línea base" (toast confirm).
  - _Suscripción_: card del plan actual (mock "Pro Mensual"), botón "Cambiar plan" → `/pricing`, lista de facturas mock con botón descarga (dummy), método de pago enmascarado.

### 4. Styling & motion

- Reuse semantic tokens from `src/styles.css` (`bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, sidebar tokens). No hardcoded colors except for the traffic light states (mapped to `emerald-500`, `amber-500`, `red-500` via tailwind utility — consistent with elder hub palette already used).
- Subtle entrance animations using `framer-motion` (already installed): staggered fade-in-up on cards, matching the existing `--animate-fade-in-up` keyframe vibe.
- Cards use `rounded-2xl border border-border/40 bg-white shadow-sm` matching `AestheticLayout` inner cards.

### 5. Mock data

All numbers, events, anomalies, chart series, invoices live in a single `src/lib/dashboard-mocks.ts` so they can later be swapped for real data without touching components.

### 6. Out of scope

- No real WebSockets/Polling (state is local with a demo toggle in the traffic light).
- No real Stripe calls.
- No auth guard middleware (kept consistent with current tutor flow which already navigates straight to `/dashboard`).

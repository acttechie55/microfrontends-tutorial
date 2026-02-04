# Angular MicroFrontEnds Dashboard

A learning project for exploring **Angular Micro Frontends with Native Federation** in an Nx monorepo.

## Background

I built this project to teach myself Angular Micro Frontends. I have 10+ years of experience building classic Angular applications (monolithic, single-repo, NgModule-based), but I had never worked with Module Federation or micro frontend architecture before.

My goal was to start from zero, build a working micro frontend dashboard, and then restructure it into a production-grade folder layout with domain libraries, shared UI components, centralized design tokens, and module boundary enforcement -- learning each concept along the way.

## What This Project Demonstrates

- **Native Federation** (`@angular-architects/native-federation`) for runtime module loading between independently built Angular apps
- **Host/Remote architecture** -- a shell app that dynamically loads 4 remote micro frontends at runtime
- **Nx monorepo** with `apps/` + `libs/` structure following domain-driven library organization
- **Design system principles** -- centralized CSS custom properties (design tokens), shared presentational UI components, and thin feature components that compose them
- **Signal-based state management** -- domain services using Angular signals (`signal()`, `computed()`, `model()`) to manage and share state
- **Module boundary enforcement** via ESLint `@nx/enforce-module-boundaries` with scope and type tags
- **Standalone components** (Angular 21, no NgModules)

## Tech Stack

| Tool | Version |
|---|---|
| Angular | 21.1 |
| Nx | 22.4.4 |
| Native Federation | 21.1 |
| TypeScript | 5.9 |
| Node | 22+ |

## Architecture

```
Shell (host, port 4200)
  |
  |-- loadRemoteModule('user-profile')  --> port 4201
  |-- loadRemoteModule('analytics')     --> port 4202
  |-- loadRemoteModule('settings')      --> port 4203
  |-- loadRemoteModule('notifications') --> port 4204
```

The shell app renders a sidebar with navigation links. When a user clicks a link, the shell uses `loadRemoteModule()` to fetch the remote's routes at runtime from its `remoteEntry.json`. Each remote is a fully independent Angular application that can also run standalone.

## Project Structure

```
mfe-dashboard/
  apps/
    shell/                    # Host app - sidebar + router-outlet
    user-profile/             # Remote - profile card UI
    analytics/                # Remote - stat cards + bar chart
    settings/                 # Remote - toggle switches, dropdowns
    notifications/            # Remote - notification list with mark-as-read
    *-e2e/                    # Playwright e2e test apps
  libs/
    shared/
      ui/                     # Design tokens + reusable components
        design-tokens.css     #   CSS custom properties (colors, spacing, shadows, etc.)
        card/                 #   CardComponent - content projection wrapper
        page-header/          #   PageHeaderComponent - page title
        stat-card/            #   StatCardComponent - metric display
        toggle/               #   ToggleComponent - two-way bound switch
      models/                 # TypeScript interfaces (User, Notification, StatCard, MonthlyData)
      util/                   # Formatting helpers
      data-access/            # Base API service
      auth/                   # Auth service with mock user signal
    user-profile/
      feature/                # Entry component - injects AuthService, composes shared UI
      ui/                     # (uses shared UI directly)
      data-access/            # (user data provided by shared/auth)
    analytics/
      feature/                # Entry component - injects AnalyticsService, composes shared UI
      ui/                     # BarChartComponent - data-driven bar chart
      data-access/            # AnalyticsService - stats + monthly data signals
    settings/
      feature/                # Entry component - injects SettingsService, composes shared UI
      ui/                     # (uses shared UI directly)
      data-access/            # SettingsService - dark mode, notifications, language signals
    notifications/
      feature/                # Entry component - injects NotificationsService, composes shared UI
      ui/                     # (uses shared UI directly)
      data-access/            # NotificationsService - notifications signal, markAsRead, unreadCount
```

## Design System

The project follows a three-layer design system approach:

1. **Design Tokens** (`libs/shared/ui/src/lib/design-tokens.css`) -- 35+ CSS custom properties defining colors, spacing, typography, shadows, radii, and transitions. All apps import this file, so changing a token value updates the entire dashboard.

2. **Shared UI Components** (`libs/shared/ui/`) -- Presentational building blocks that use tokens and accept data via `input()` signals. These are domain-agnostic and reusable across any remote.

3. **Domain Feature Components** (`libs/*/feature/`) -- Thin orchestrators that inject domain services and compose shared UI components. They contain no business logic or duplicated styles -- just layout-specific CSS using token variables.

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Install

```sh
npm install
```

### Run All Apps

```sh
npm run start:all
```

This kills any stale processes on ports 4200-4204, then starts all 5 apps in parallel.

### Run Individual Apps

```sh
# Shell (host)
npx nx serve shell

# Any remote
npx nx serve user-profile
npx nx serve analytics
npx nx serve settings
npx nx serve notifications
```

Note: The shell expects all 4 remotes to be running. If a remote isn't running, navigating to its route will show an error in the console.

### Build

```sh
# Build all
npx nx run-many --target=build --projects=shell,user-profile,analytics,settings,notifications

# Build one
npx nx build shell --configuration=production
```

### Lint

```sh
npx nx run-many --target=lint
```

This runs ESLint across all 27 projects, including module boundary checks.

## Module Boundary Rules

Each project has `scope` and `type` tags in its `project.json`. The ESLint config enforces:

- **Type constraints**: `app` -> `feature` -> `ui`/`data-access` -> `models`/`util` (no reverse dependencies)
- **Scope constraints**: Each domain (e.g., `analytics`) can only import from its own scope + `shared`. No cross-domain imports allowed.

Example: `libs/analytics/feature` can import from `libs/analytics/ui`, `libs/shared/models`, but NOT from `libs/settings/feature`.

## Key Concepts Learned

1. **Federation init before bootstrap** -- `initFederation()` must resolve before Angular bootstraps, hence the `main.ts` -> `bootstrap.ts` split
2. **remoteEntry.json** -- each remote generates this manifest describing its exposed modules and shared dependencies
3. **federation.manifest.json** -- the host's runtime map of remote names to their URLs
4. **`shareAll({ singleton: true })`** -- ensures Angular, RxJS, and other framework packages are shared as singletons to avoid duplicate instances
5. **Dynamic host** -- the shell loads remote URLs from a manifest file, not hardcoded in the build config
6. **Independent deployability** -- each remote can be built and deployed separately; the shell discovers it at runtime
7. **Design tokens as the single source of truth** -- CSS custom properties centralize visual decisions so components never hardcode colors, spacing, or shadows
8. **Thin feature components** -- entry components inject services and compose shared UI rather than owning markup, state, and styles. This keeps each remote's code minimal and consistent.
9. **Module boundaries enforce architecture** -- `type:ui` libraries can only depend on `type:models` and `type:util`, preventing presentational components from importing services or other features

## Ports

| App | Port |
|---|---|
| Shell | 4200 |
| User Profile | 4201 |
| Analytics | 4202 |
| Settings | 4203 |
| Notifications | 4204 |

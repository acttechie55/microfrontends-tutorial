# MFE Dashboard

A learning project for exploring **Angular Micro Frontends with Native Federation** in an Nx monorepo.

## Background

I built this project to teach myself Angular Micro Frontends. I have 10+ years of experience building classic Angular applications (monolithic, single-repo, NgModule-based), but I had never worked with Module Federation or micro frontend architecture before.

My goal was to start from zero, build a working micro frontend dashboard, and then restructure it into a production-grade folder layout with domain libraries and module boundary enforcement -- learning each concept along the way.

## What This Project Demonstrates

- **Native Federation** (`@angular-architects/native-federation`) for runtime module loading between independently built Angular apps
- **Host/Remote architecture** -- a shell app that dynamically loads 4 remote micro frontends at runtime
- **Nx monorepo** with `apps/` + `libs/` structure following domain-driven library organization
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
    notifications/            # Remote - notification page
    *-e2e/                    # Playwright e2e test apps
  libs/
    shared/
      ui/                     # Reusable presentational components
      models/                 # TypeScript interfaces (User, Notification, StatCard)
      util/                   # Formatting helpers
      data-access/            # Base API service
      auth/                   # Auth service with mock user signal
    user-profile/
      feature/                # Entry component for user-profile remote
      ui/                     # UI components scoped to user-profile
      data-access/            # Data services scoped to user-profile
    analytics/
      feature/                # Entry component for analytics remote
      ui/
      data-access/
    settings/
      feature/                # Entry component for settings remote
      ui/
      data-access/
    notifications/
      feature/                # Entry component for notifications remote
      ui/
      data-access/
```

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

## Ports

| App | Port |
|---|---|
| Shell | 4200 |
| User Profile | 4201 |
| Analytics | 4202 |
| Settings | 4203 |
| Notifications | 4204 |

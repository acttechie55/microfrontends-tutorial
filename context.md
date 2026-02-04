# Project Context for AI Assistants

This file provides context so an AI assistant can pick up where the last session left off.

## What This Project Is

An Angular Micro Frontend dashboard built as a learning exercise. The developer is a 10+ year Angular veteran and UX Engineer who has only worked on classic (monolithic, NgModule-based) Angular apps and is using this project to learn Module Federation and MFE UI architecture.

## Tech Stack

- Angular 21.1 with standalone components (no NgModules)
- Nx 22.4.4 monorepo
- `@angular-architects/native-federation` 21.1 (NOT Webpack Module Federation)
- TypeScript 5.9
- Vite-based dev server

## Architecture

**Host/Remote pattern:**
- `apps/shell` (port 4200) -- host app with sidebar navigation and `<router-outlet>`
- `apps/user-profile` (port 4201) -- remote, profile card with data from AuthService
- `apps/analytics` (port 4202) -- remote, stat cards + bar chart from AnalyticsService
- `apps/settings` (port 4203) -- remote, toggle switches and dropdown from SettingsService
- `apps/notifications` (port 4204) -- remote, notification list with mark-as-read from NotificationsService

The shell loads remotes dynamically at runtime via `loadRemoteModule()` in its route config. Remote URLs are defined in `apps/shell/public/federation.manifest.json`.

Each app has a `main.ts` -> `bootstrap.ts` split because `initFederation()` must resolve before Angular bootstraps.

## Folder Structure

```
apps/
  shell/                        # Host, no exposes in federation.config.js
  user-profile/                 # Remote, exposes ./routes
  analytics/                    # Remote, exposes ./routes
  settings/                     # Remote, exposes ./routes
  notifications/                # Remote, exposes ./routes
  *-e2e/                        # Playwright e2e scaffolds (unused)

libs/
  shared/
    ui/
      design-tokens.css         # CSS custom properties (35+ tokens for colors, spacing, etc.)
      card/                     # CardComponent - content projection wrapper with card styling
      page-header/              # PageHeaderComponent - input.required<string>() for title
      stat-card/                # StatCardComponent - inputs: label, value, change, trend
      toggle/                   # ToggleComponent - model<boolean>() for two-way signal binding
    models/                     # User, Notification, StatCard, MonthlyData interfaces
    util/                       # formatCurrency, formatNumber helpers
    data-access/                # ApiService (uses inject(HttpClient))
    auth/                       # AuthService with mock currentUser signal
  user-profile/
    feature/                    # Entry component - injects AuthService, uses computed initials
    ui/                         # (uses shared UI components directly)
    data-access/                # (user data provided by shared/auth)
  analytics/
    feature/                    # Entry component - injects AnalyticsService, uses @for loop
    ui/                         # BarChartComponent - input.required<MonthlyData[]>()
    data-access/                # AnalyticsService - stats signal + monthlyData signal
  settings/
    feature/                    # Entry component - injects SettingsService, uses ToggleComponent
    ui/                         # (uses shared UI components directly)
    data-access/                # SettingsService - darkMode, emailNotifications, pushNotifications, language signals
  notifications/
    feature/                    # Entry component - injects NotificationsService, accessible click handlers
    ui/                         # (uses shared UI components directly)
    data-access/                # NotificationsService - notifications signal, unreadCount computed, markAsRead/markAllAsRead
```

## Design System Architecture

Three layers:

1. **Design Tokens** (`libs/shared/ui/src/lib/design-tokens.css`): CSS custom properties for all visual values. Imported by each app's `styles.css` via `@import`. Tokens include:
   - Colors: `--color-primary`, `--color-bg-card`, `--color-text-primary`, `--color-success`, `--color-danger`, etc.
   - Spacing: `--spacing-xs` through `--spacing-xl`
   - Radii: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
   - Typography: `--font-size-xs` through `--font-size-stat`, `--font-family`
   - Shadows: `--shadow-card`
   - Transitions: `--transition-default`, `--transition-fast`
   - Layout: `--sidebar-width`

2. **Shared UI Components** (`libs/shared/ui/`): Presentational components using tokens. All use `lib-` selector prefix. Exported via barrel `index.ts`.

3. **Domain Services** (`libs/*/data-access/`): Signal-based services with `providedIn: 'root'`. Feature components inject these and pass data to shared UI components.

## Key File Locations

### Shell (Host)
- `apps/shell/src/app/app.routes.ts` -- route config with `loadRemoteModule()` calls
- `apps/shell/src/app/app.html` -- sidebar layout with nav links
- `apps/shell/src/app/app.css` -- sidebar styling (uses design tokens)
- `apps/shell/public/federation.manifest.json` -- maps remote names to URLs
- `apps/shell/federation.config.js` -- no exposes, just shareAll

### Remotes (same pattern for each)
- `apps/{remote}/federation.config.js` -- exposes `./routes` pointing to `./apps/{remote}/src/app/remote-entry/routes.ts`
- `apps/{remote}/src/app/remote-entry/routes.ts` -- imports EntryComponent from `@mfe-dashboard/{remote}/feature`
- `libs/{remote}/feature/src/lib/entry.component.ts` -- the actual component code (thin orchestrator)
- `libs/{remote}/feature/src/index.ts` -- barrel export of EntryComponent

### Design System
- `libs/shared/ui/src/lib/design-tokens.css` -- central CSS custom properties
- `libs/shared/ui/src/lib/card/card.component.ts` -- CardComponent
- `libs/shared/ui/src/lib/page-header/page-header.component.ts` -- PageHeaderComponent
- `libs/shared/ui/src/lib/stat-card/stat-card.component.ts` -- StatCardComponent
- `libs/shared/ui/src/lib/toggle/toggle.component.ts` -- ToggleComponent
- `libs/analytics/ui/src/lib/bar-chart/bar-chart.component.ts` -- BarChartComponent

### Domain Services
- `libs/analytics/data-access/src/lib/analytics.service.ts` -- AnalyticsService
- `libs/settings/data-access/src/lib/settings.service.ts` -- SettingsService
- `libs/notifications/data-access/src/lib/notifications.service.ts` -- NotificationsService
- `libs/shared/auth/src/lib/auth.service.ts` -- AuthService

### Config
- `tsconfig.base.json` -- contains 17 path aliases (`@mfe-dashboard/shared/ui`, `@mfe-dashboard/user-profile/feature`, etc.)
- `eslint.config.mjs` -- module boundary rules with depConstraints
- `package.json` -- has `start:all` script

## Module Boundary Rules (eslint.config.mjs)

Type constraints (what each type can depend on):
- `type:app` -> feature, ui, data-access, models, util, auth
- `type:feature` -> ui, data-access, models, util, auth
- `type:ui` -> models, util
- `type:data-access` -> models, util, auth
- `type:auth` -> models, util

Scope constraints (domain isolation):
- Each domain scope (user-profile, analytics, settings, notifications) can only depend on itself + `scope:shared`
- `scope:shell` can only depend on `scope:shared`

## Tags Applied to project.json Files

- Apps: `["scope:{name}", "type:app"]`
- Domain feature libs: `["scope:{domain}", "type:feature"]`
- Domain ui libs: `["scope:{domain}", "type:ui"]`
- Domain data-access libs: `["scope:{domain}", "type:data-access"]`
- Shared libs: `["scope:shared", "type:{ui|models|util|data-access|auth}"]`

## Commands

```sh
npm run start:all                  # Kill stale ports + serve all 5 apps (parallel=5)
npx nx serve shell                 # Serve just the shell
npx nx build shell                 # Build shell
npx nx run-many --target=lint      # Lint all 27 projects
npx nx graph                       # Visualize project dependency graph
```

## Known Quirks

1. **Stale server processes**: When stopping `nx serve`, child processes sometimes don't die, leaving ports occupied. The `start:all` script handles this with `lsof -ti :4200,...| xargs kill -9` before starting.
2. **Default parallelism**: `nx run-many --parallel` defaults to 3 concurrent tasks. Use `--parallel=5` to run all 5 apps simultaneously.
3. **federation.config.js paths**: The `exposes` paths in each remote's `federation.config.js` are relative to the workspace root (e.g., `./apps/user-profile/src/app/remote-entry/routes.ts`). The Nx move generator doesn't update these because they're plain JS, not TypeScript imports.
4. **Selector prefixes**: Components in `libs/` use `lib-` prefix (e.g., `lib-analytics-entry`). Components in `apps/` use `app-` prefix.
5. **Unused `_` warnings**: The `main.ts` files in each app have `.then(_ => import('./bootstrap'))` which triggers a no-unused-vars warning. This is cosmetic and from the native federation init pattern.
6. **`export type` in models barrel**: `libs/shared/models/src/index.ts` must use `export type` (not `export`) because `isolatedModules` is enabled. Pure interface re-exports require the `type` keyword.

## What's Complete

### Phase A: Restructuring (8 steps)
1. Moved apps into `apps/` directory
2. Generated 5 shared libraries
3. Generated 12 domain libraries (feature, ui, data-access per domain)
4. Moved entry component code from apps into feature libraries
5. Added module boundary tags to all project.json files
6. Configured module boundary rules in eslint.config.mjs
7. Added `npm run start:all` script
8. Verified: all 5 apps build, all 27 projects pass lint, all 5 apps serve correctly

### Phase B: Design System Refactor (6 steps)
1. Created design tokens (`design-tokens.css`) with 35+ CSS custom properties; imported in all 5 app `styles.css` files; updated shell `app.css` to use token variables
2. Built 4 shared UI components: CardComponent (content projection), PageHeaderComponent (title input), StatCardComponent (metric display), ToggleComponent (two-way signal binding via `model()`)
3. Created 3 domain data-access services: AnalyticsService (stats + monthly data signals), SettingsService (preference signals), NotificationsService (notifications signal + computed unreadCount + markAsRead/markAllAsRead)
4. Created BarChartComponent in analytics/ui; cleaned up all domain UI scaffold directories
5. Refactored all 4 entry components to be thin orchestrators: inject services, compose shared UI, use `@for` control flow, all CSS uses `var(--token)` references
6. Cleaned up 12 scaffold placeholder directories; fixed module boundary violation (MonthlyData moved to shared/models), `export type` for isolatedModules, accessibility on notification items; verified lint (0 errors), build (all 5 pass), serve (all 5 respond)

## What Could Be Done Next

- **Cross-MFE state sharing**: Wire up dark mode toggle in settings so it affects the shell sidebar -- tests how singleton services share state across federation boundaries at runtime
- **Storybook for shared UI**: Add Storybook to `libs/shared/ui` to create a living component catalog independent of any MFE
- **Error boundaries & loading states**: Add `@defer` with `@loading` and `@error` blocks for resilience when a remote is unavailable
- **Sub-routing within remotes**: Add nested routes (e.g., analytics/overview, analytics/reports) to learn how shell and remote routers cooperate
- **Real HTTP integration**: Replace mock signal data with actual API calls in data-access services
- **Unit tests**: Test shared UI components and domain services
- **E2e tests**: Use the Playwright scaffolds to test cross-MFE navigation
- **CI/CD pipeline**: Build and deploy remotes independently

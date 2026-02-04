# Project Context for AI Assistants

This file provides context so an AI assistant can pick up where the last session left off.

## What This Project Is

An Angular Micro Frontend dashboard built as a learning exercise. The developer is a 10+ year Angular veteran who has only worked on classic (monolithic, NgModule-based) Angular apps and is using this project to learn Module Federation.

## Tech Stack

- Angular 21.1 with standalone components (no NgModules)
- Nx 22.4.4 monorepo
- `@angular-architects/native-federation` 21.1 (NOT Webpack Module Federation)
- TypeScript 5.9
- Vite-based dev server

## Architecture

**Host/Remote pattern:**
- `apps/shell` (port 4200) -- host app with sidebar navigation and `<router-outlet>`
- `apps/user-profile` (port 4201) -- remote, profile card
- `apps/analytics` (port 4202) -- remote, stat cards + bar chart
- `apps/settings` (port 4203) -- remote, toggle switches and dropdowns using FormsModule
- `apps/notifications` (port 4204) -- remote, simple test page (created by the user as an exercise)

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
    ui/                         # Scaffolded, placeholder components
    models/                     # User, Notification, StatCard interfaces
    util/                       # formatCurrency, formatNumber helpers
    data-access/                # ApiService placeholder (uses inject(HttpClient))
    auth/                       # AuthService with mock currentUser signal
  {domain}/                     # user-profile, analytics, settings, notifications
    feature/                    # Entry component (the actual page content)
    ui/                         # Scaffolded, empty
    data-access/                # Scaffolded, empty
```

## Key File Locations

### Shell (Host)
- `apps/shell/src/app/app.routes.ts` -- route config with `loadRemoteModule()` calls
- `apps/shell/src/app/app.html` -- sidebar layout with nav links
- `apps/shell/src/app/app.css` -- sidebar styling
- `apps/shell/public/federation.manifest.json` -- maps remote names to URLs
- `apps/shell/federation.config.js` -- no exposes, just shareAll

### Remotes (same pattern for each)
- `apps/{remote}/federation.config.js` -- exposes `./routes` pointing to `./apps/{remote}/src/app/remote-entry/routes.ts`
- `apps/{remote}/src/app/remote-entry/routes.ts` -- imports EntryComponent from `@mfe-dashboard/{remote}/feature`
- `libs/{remote}/feature/src/lib/entry.component.ts` -- the actual component code
- `libs/{remote}/feature/src/index.ts` -- barrel export of EntryComponent

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

## What's Complete

All 8 phases of the restructuring plan are done:
1. Moved apps into `apps/` directory
2. Generated 5 shared libraries
3. Generated 12 domain libraries (feature, ui, data-access per domain)
4. Moved entry component code from apps into feature libraries
5. Added module boundary tags to all project.json files
6. Configured module boundary rules in eslint.config.mjs
7. Added `npm run start:all` script
8. Verified: all 5 apps build, all 27 projects pass lint, all 5 apps serve correctly

## What Could Be Done Next

- Populate the domain `ui/` and `data-access/` libraries with extracted components and services (currently scaffolded but empty)
- Have the entry components use the shared models and auth service instead of hardcoded data
- Add real HTTP calls in data-access services
- Add unit tests
- Add e2e tests with Playwright
- Implement inter-remote communication (e.g., shared state via signals or a shared service)
- Set up CI/CD pipeline
- Deploy remotes independently to different servers/CDNs
- Add a new remote as a practice exercise

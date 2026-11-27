# Backend and member-count add-on archive

This directory preserves the backend, database, API client/specification, and original member/line-up functionality removed from the active static website.

## Contents

- legacy/artifacts/api-server/: original Express API, routes, build configuration and package manifest.
- legacy/lib/db/: original Drizzle/PostgreSQL setup and schema.
- legacy/lib/api-client-react/, legacy/lib/api-spec/, legacy/lib/api-zod/: API client, OpenAPI specification and generated Zod types.
- legacy/artifacts/whitehaven-waves/: original website package manifest, Vite config, app shell, About counter, Hero, Nav, Lineup, Team and count-up hook.
- legacy/root-config/: original root package/workspace/TypeScript/Replit configuration and lockfile.

## Restoring later

This is a source archive, not a plug-and-play installer. To restore the old full-stack version, copy the archived files back to their original paths, restore the workspace package globs and TypeScript project references, re-add the website's API-client and XLSX dependencies, then regenerate the lockfile with pnpm install --lockfile-only.

The original lineup implementation fetched a publicly shared OneDrive workbook through an unauthenticated API endpoint. Do not re-enable that endpoint or publish a workbook containing private player information without redesigning its access controls and public-data filtering.

The active site intentionally contains no player roster, player profile list, or squad-member count. Staff information remains in the separate Staff component.

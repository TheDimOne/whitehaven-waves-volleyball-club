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

The original lineup implementation fetched a publicly shared OneDrive workbook through an unauthenticated API endpoint. Its share URL has been redacted from the current source files because it was committed to a public repository. Treat the old share link as compromised and revoke it in OneDrive; redacting the current files does not remove it from Git history. Do not re-enable the endpoint or publish a workbook containing player information. A future roster feature must use a separate, explicitly approved public-data source with server-side field allowlisting and access controls.

The active site intentionally contains no player roster, player profile list, or squad-member count. Staff information remains in the separate Staff component.

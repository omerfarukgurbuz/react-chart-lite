# React Chart Lite demo

Interactive examples of vertical and horizontal bars, line overlays, pie/donut,
and radar charts using React Chart Lite 2.x. The existing gallery also demonstrates
custom palettes, scales, tooltips, and multiple series.

## Run from a fresh clone

Use Node.js 20.19+ or 22.12+ (Node.js 22 LTS recommended).
Run these commands from the repository root:

```bash
npm install
npm run setup:examples
npm run dev:example:package
```

Open the local URL printed by Vite (usually http://localhost:5173).
You should see the React Chart Lite heading and the chart gallery. Hover over
bars or slices to try tooltips. Project links lead to the quick start, npm,
and GitHub.

## Develop the library

```bash
npm run dev:example:local
```

This uses `src/index.ts` from this repository and reloads when library source
changes. Package mode uses the installed npm package instead. The example pins
the supported major version to 2.x, matching the current library API.

## Build a shareable static demo

From the repository root:

```bash
npm run build:examples
npm run preview:examples
```

The build type-checks the demo and bundles the installed npm package by default.
Open the preview URL printed by Vite (usually http://localhost:4173), then verify
the gallery and tooltips. The output is `examples/demo-vite/dist/`.

To bundle local library changes instead:

```bash
npx cross-env RCL_LOCAL=1 npm run build:examples
npm run preview:examples
```

Vite uses relative asset URLs, so the built files can also be served under a
repository subpath. Serve `dist/` over HTTP; do not open `index.html` as a local
file. No secrets, API, or backend are required.

## Publish when ready

Upload the contents of `examples/demo-vite/dist/` to a static host after reviewing
the preview. If the host builds from source, use the repository root, install root
and demo dependencies, run `npm run build:examples`, and select
`examples/demo-vite/dist` as the publish directory.

Once a public URL exists, add it near the top of the main README. There is no
hosted demo URL yet; building and previewing locally does not publish anything.

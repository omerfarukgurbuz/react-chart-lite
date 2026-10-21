# React Chart Lite demo

[Open the live demo](https://omerfarukgurbuz.github.io/react-chart-lite/)

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

## Publish an update

The public demo is hosted on GitHub Pages from the root of the `gh-pages`
branch. That branch contains the built static files, not the library source.

1. Run `npm run build:examples` and review `npm run preview:examples`.
2. In a separate checkout of `gh-pages`, replace the previous build with the
   contents of `examples/demo-vite/dist/`. Keep `LICENSE` and `.nojekyll`.
3. Commit and push that branch. GitHub Pages builds and deploys the update.
4. Check the Pages deployment in GitHub Actions and open the live demo to
   verify the gallery and tooltips.

Source changes in pull requests do not automatically update the public demo.
The first deployment uses the verified 2.0.0 npm package demo prepared in PR #12.

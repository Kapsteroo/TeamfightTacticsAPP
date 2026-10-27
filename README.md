# TeamfightTacticsAPP

Helper app for Teamfight Tactics built with Angular 12 and Firebase (Auth + Firestore).

Features:

- browse champions, traits, classes and items (with item recipes),
- patch notes (logged-in users can add new ones),
- team composition builder with drag & drop and a live synergy counter,
- saving favourite teams for logged-in users.

## Requirements

Node.js 14 (see `engines` in `package.json`). On Node 17+ the Angular 12 build needs
`NODE_OPTIONS=--openssl-legacy-provider`.

## Development

```bash
npm install
npx ng serve          # http://localhost:4200
```

## Build & run

```bash
npm run build         # output in dist/TeamfightTacticsAPP
npm start             # serves the build with Express on $PORT (default 8080)
```

The app can also be deployed to Firebase Hosting with `npx ng deploy`.

## Tests

```bash
npm test              # Karma in watch mode
npm run test:ci       # single headless run
```

## Firestore data

| Collection | Content |
| --- | --- |
| `champions` | champions; `trait`, `trait2`, `class`, `class2` reference trait/class documents |
| `traits`, `classes` | synergies, document id = name |
| `items/baseItems/baseItems`, `items/combinedItems/combinedItems` | items; `component1`/`component2` are base item ids |
| `patches` | patch notes |
| `favorites/{uid}/teams` | saved teams of a user |

Access control (who may write `patches`, that users can only read/write their own
`favorites/{uid}`) must be enforced with Firestore security rules. Hiding a form in the UI
is not a security measure.

# QueueTube Web

The web front-end for QueueTube — a YouTube queue management app built with Next.js 15, React 19, gluestack-ui v3, and NativeWind.

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing

QueueTube uses [Vitest](https://vitest.dev/) as the unit testing framework, paired with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component-level tests.

### Running Tests

| Command | Description |
|---|---|
| `pnpm test` | Watch mode — re-runs affected tests on file change (local development) |
| `pnpm test:run` | Single-pass run — exits with code 0 when all tests pass |
| `pnpm test:coverage` | Full run with V8 coverage report — enforces 80% thresholds |

### Coverage Report

After running `pnpm test:coverage`, three outputs are generated in `./coverage/`:

- **`./coverage/index.html`** — open in a browser for a visual, file-by-file breakdown
- **`./coverage/lcov.info`** — consumed by CI coverage integrations
- **Terminal output** — printed inline at the end of every coverage run

Coverage thresholds are enforced at **80%** on lines, branches, functions, and statements. `pnpm test:coverage` exits with code 1 if any threshold is not met.

> `coverage/` is listed in `.gitignore` — reports are generated artifacts, not source files.

### What Vitest Covers

| Vitest (unit tests) | Playwright — future |
|---|---|
| Synchronous Client Components | Async React Server Components |
| Custom hooks (`use*`) | Full page navigation flows |
| Utility functions (`lib/`) | Auth flows |
| Conditional rendering logic | Cross-browser rendering |
| Error and empty states | Real YouTube API integration |

> Vitest does **not** support async React Server Components. RSC flows will be covered by a dedicated Playwright setup (tracked separately).

### Test Conventions

- Test files are **co-located** with the files they test: `QueueCard.tsx` → `QueueCard.test.tsx`
- `describe` blocks match the component or function name
- `it` / `test` labels describe behaviour, not implementation: `"renders the queue title"`, not `"calls setTitle"`
- Globals (`describe`, `it`, `expect`, `vi`) are available without explicit imports

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: gluestack-ui v3 + NativeWind (Tailwind utility classes)
- **Styling tokens**: see `src/app/gluestack-ui-provider/config.ts`
- **Testing**: Vitest + React Testing Library + jsdom
- **Linting**: ESLint + Prettier (Conventional Commits enforced via commitlint)

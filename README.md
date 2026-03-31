# QueueTube Web

The QueueTube web application — built with Next.js 15 (App Router), gluestack-ui v3, and NativeWind/Tailwind CSS.

---

## Setup Instructions

### Prerequisites

- Node.js ≥ 20
- pnpm (recommended) or npm

### 1. Clone the repository

```bash
git clone https://github.com/spreadcode-dev/queue-tube-web.git
cd queue-tube-web
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Bootstrap the project (first time only)

If setting up from scratch:

```bash
# Create Next.js project
npx create-next-app@latest queue-tube-web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# Initialise gluestack-ui v3
npx gluestack-ui init
```

After running `gluestack-ui init`, apply the QueueTube token overrides in
`src/app/gluestack-ui-provider/config.ts` — see that file for the full token set
(primary accent red `#E94560`, background scale, typography scale, border radius).

### 4. Install additional dev tooling

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/dom \
  @testing-library/user-event \
  vite-tsconfig-paths \
  @vitest/coverage-v8

pnpm add -D prettier \
  prettier-plugin-tailwindcss \
  eslint-config-prettier \
  eslint-plugin-prettier \
  eslint-plugin-tailwindcss

pnpm add -D husky lint-staged \
  @commitlint/cli \
  @commitlint/config-conventional

npx husky init
```

### 5. Start the development server

```bash
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm format` | Format all files with Prettier |
| `pnpm format:check` | Check formatting without writing |
| `pnpm type-check` | TypeScript type check (no emit) |
| `pnpm test` | Run Vitest in watch mode |
| `pnpm test:run` | Run Vitest once |
| `pnpm test:coverage` | Run Vitest with coverage report |

---

## Git Hooks

This project uses [Husky v9](https://typicode.github.io/husky/) to enforce quality gates locally.
Three hooks are configured:

### `pre-commit`

**What it does:** Runs [lint-staged](https://github.com/okonet/lint-staged) on staged files only.

**What it validates:**
- `.ts` / `.tsx` files: ESLint (with auto-fix) + Prettier (with auto-format)
- `.json` / `.css` / `.md` files: Prettier (with auto-format)

**Effect:** Invalid or unformatted code in staged files is either auto-fixed or blocks the commit.

---

### `commit-msg`

**What it does:** Runs [commitlint](https://commitlint.js.org/) to validate the commit message.

**What it validates:** Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <subject in lower-case, ≤ 72 chars>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`, `revert`

**Examples:**
- ✅ `feat(queue): add drag-to-reorder support`
- ✅ `fix(player): resolve null state on load`
- ❌ `fixed stuff` — rejected
- ❌ `WIP` — rejected

---

### `pre-push`

**What it does:** Runs a full type check and full test suite with coverage enforcement before any push.

**What it validates:**
1. `tsc --noEmit` — TypeScript must compile with no errors
2. `vitest run --coverage` — all tests must pass **and** coverage must meet the ≥ 80% threshold
   (lines, branches, functions, statements) configured in `vitest.config.mts`

**Effect:** A push is blocked if there are type errors or if test coverage falls below 80%.

---

### Bypassing hooks in emergencies

All hooks can be bypassed using the `--no-verify` flag:

```bash
# Skip pre-commit and commit-msg hooks
git commit --no-verify -m "chore: emergency hotfix"

# Skip pre-push hook
git push --no-verify
```

> ⚠️ Use `--no-verify` only in genuine emergencies. Bypassed commits must be followed up
> with a clean commit that passes all checks.

---

## Design Tokens

QueueTube uses a custom token set applied via `src/app/gluestack-ui-provider/config.ts`.
Always reference tokens by their Tailwind alias (e.g. `bg-primary-500`, `text-typography-900`) —
never use raw hex values in component classes.

Key tokens:

| Token | Value | Usage |
|---|---|---|
| `primary-500` | `#E94560` | CTAs, FAB, active states, badges |
| `background-dark` | `#181719` | Page background, nav |
| `background-0` | `#121212` | Cards, modals |
| `background-50` | `#272625` | Elevated surfaces, sidebars |
| `typography-900` | `#f5f5f5` | Body text |
| `typography-400` | `#8c8c8c` | Secondary text, labels |
| `outline-300` | `#737474` | Card borders, dividers |

---

## Testing Notes

- Vitest does **not** support async React Server Components. Unit-test synchronous Client Components
  and utility functions.
- Use Playwright (future issue) for E2E and async RSC flows.
- Coverage report is generated in `/coverage` (HTML at `/coverage/index.html`).

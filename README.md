# QueueTube Web

Production-ready Next.js 15 app with gluestack-ui v3, Vitest, ESLint, Prettier, and Git quality gates.

---

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

---

## Setup (in order)

### 1. Clone and install dependencies

```bash
git clone https://github.com/spreadcode-dev/queue-tube-web.git
cd queue-tube-web
pnpm install
```

### 2. Bootstrap Next.js (new repo only)

```bash
npx create-next-app@latest queue-tube-web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

### 3. Initialise gluestack-ui v3

```bash
npx gluestack-ui init
```

After init, apply QueueTube design tokens in `src/app/gluestack-ui-provider/config.ts`:

```ts
"--color-primary-500": "#E94560",
"--color-primary-400": "#f05a72",
"--color-primary-600": "#c73550",
// ... (see config.ts for full token list)
```

### 4. Install Vitest + React Testing Library

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/dom \
  @testing-library/user-event \
  vite-tsconfig-paths \
  @vitest/coverage-v8
```

### 5. Install Prettier + ESLint plugins

```bash
pnpm add -D prettier \
  prettier-plugin-tailwindcss \
  eslint-config-prettier \
  eslint-plugin-prettier \
  eslint-plugin-tailwindcss
```

### 6. Install Git hook toolchain

```bash
pnpm add -D husky lint-staged \
  @commitlint/cli \
  @commitlint/config-conventional
npx husky init
```

### 7. Start the dev server

```bash
pnpm dev
```

---

## Scripts

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

All hooks are managed by **Husky v9** and run automatically.

### `pre-commit`

**What it does:** Runs `lint-staged` on staged `.ts/.tsx` files only.

**What it validates:**
- ESLint — catches code errors and enforces style rules
- Prettier — enforces consistent formatting and Tailwind class ordering

**Effect:** Staged files that fail lint or formatting checks will block the commit.

### `commit-msg`

**What it does:** Runs `commitlint` to validate the commit message.

**What it validates:** Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/).

**Examples:**
- ✅ `feat(queue): add video reordering`
- ✅ `fix(auth): resolve null state on logout`
- ❌ `fixed stuff` — blocked
- ❌ `WIP` — blocked

**Allowed types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`, `revert`

### `pre-push`

**What it does:** Runs full type check and full test suite with coverage enforcement before pushing to remote.

**What it validates:**
1. `tsc --noEmit` — catches TypeScript type errors that may have been bypassed locally
2. `vitest run --coverage` — runs all tests and enforces ≥ 80% coverage on lines, branches, functions, and statements

**Effect:** A push is blocked if type errors exist or if coverage falls below 80%.

### Bypassing hooks (emergency use only)

All hooks can be bypassed with the `--no-verify` flag:

```bash
git commit --no-verify -m "chore: emergency fix"
git push --no-verify
```

> ⚠️ Use `--no-verify` only in genuine emergencies. Bypassed commits should be followed immediately by a fix commit that restores passing checks.

---

## Coverage

Coverage reports are generated in the `/coverage` directory after running `pnpm test:coverage`.

Open `coverage/index.html` in a browser to view the full HTML report.

Thresholds (enforced at push time):
- Lines: ≥ 80%
- Branches: ≥ 80%
- Functions: ≥ 80%
- Statements: ≥ 80%

---

## Design Tokens

QueueTube design tokens are defined in `src/app/gluestack-ui-provider/config.ts`. Always use CSS variable aliases in components (e.g. `bg-primary-500`, `bg-background-0`) — never raw hex values.

See [DESIGN_PIPELINE.md](https://github.com/spreadcode-dev/queue-tube-mcps/blob/main/docs/DESIGN_PIPELINE.md) for the full token specification.

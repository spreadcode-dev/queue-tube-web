# QueueTube Web

Your personal video queue manager — built with Next.js 15, gluestack-ui v3, and NativeWind.

---

## Setup

### Prerequisites

- Node.js 20+
- pnpm (recommended)

### 1. Bootstrap the project

```bash
npx create-next-app@latest queue-tube-web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

### 2. Initialise gluestack-ui v3

```bash
npx gluestack-ui init
```

After init, open `src/app/gluestack-ui-provider/config.ts` and apply the
QueueTube design tokens (primary red, background scale, typography scale, radius).
The full token set is already committed in that file.

### 3. Install dependencies

```bash
pnpm install
```

### 4. Install Git hook toolchain

```bash
pnpm add -D husky lint-staged \
  @commitlint/cli \
  @commitlint/config-conventional
npx husky init
```

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

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
| `pnpm type-check` | Run TypeScript type check |
| `pnpm test` | Run Vitest in watch mode |
| `pnpm test:run` | Run Vitest once |
| `pnpm test:coverage` | Run Vitest with coverage report |

---

## Git Hooks

This project uses [Husky v9](https://typicode.github.io/husky/) to enforce quality gates locally before code reaches CI.

### `pre-commit`

**What it does:** Runs [lint-staged](https://github.com/okonet/lint-staged) on staged files only.

**What it validates:**
- ESLint (with auto-fix) on `*.ts` / `*.tsx` / `*.js` / `*.jsx` files
- Prettier (with auto-write) on `*.ts` / `*.tsx` / `*.js` / `*.jsx` files
- Prettier on `*.json` / `*.css` / `*.md` files

**Effect:** A commit is blocked if ESLint reports unfixable errors after auto-fix.

### `commit-msg`

**What it does:** Runs [commitlint](https://commitlint.js.org/) against the commit message.

**What it validates:** The message must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <subject in lower-case, ≤ 72 chars>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`, `revert`

**Examples:**
- ✅ `feat(queue): add drag-to-reorder support`
- ✅ `fix(auth): resolve null state on token expiry`
- ❌ `fixed stuff` — rejected (no type, wrong case)

### `pre-push`

**What it does:** Runs a full type check and full test suite with coverage enforcement.

**What it validates:**
1. `tsc --noEmit` — TypeScript type errors block the push
2. `vitest run --coverage` — Coverage below 80% (lines / branches / functions / statements) blocks the push

**Effect:** Code with type errors or insufficient test coverage cannot be pushed to remote.

### Bypassing hooks in emergencies

All hooks can be skipped with the `--no-verify` flag:

```bash
# Skip pre-commit and commit-msg
git commit --no-verify -m "chore: emergency hotfix"

# Skip pre-push
git push --no-verify
```

> ⚠️ Use `--no-verify` only in genuine emergencies. CI will still enforce all quality gates.

---

## Testing

Vitest + React Testing Library. Tests are co-located with their components:

```
src/components/QueueCard.tsx
src/components/QueueCard.test.tsx
```

Coverage thresholds (≥ 80% on lines, branches, functions, statements) are enforced on every `pnpm test:coverage` run and on every `git push` via the pre-push hook.

> ⚠️ Vitest does not support async React Server Components. Test synchronous Client Components and utility functions. Use Playwright (tracked separately) for async RSC flows.

HTML coverage report is generated at `./coverage/index.html` after running `pnpm test:coverage`.

---

## Code Style

- **ESLint**: `next/core-web-vitals` + `tailwindcss/recommended` + `prettier`
- **Prettier**: 2-space indent, double quotes, trailing commas (ES5), 100-char print width
- **Tailwind class ordering**: enforced automatically by `prettier-plugin-tailwindcss`
- **Custom token class names** (e.g. `bg-primary-500`, `bg-background-0`): allowed via `tailwindcss/no-custom-classname: off`

---

## Design Tokens

QueueTube's design tokens live in `src/app/gluestack-ui-provider/config.ts`.
See [DESIGN_PIPELINE.md](https://github.com/spreadcode-dev/queue-tube-mcps/blob/main/docs/DESIGN_PIPELINE.md) for the full specification.

Always use CSS variable aliases in components — never raw hex values:

```tsx
// ✅ correct
<Box className="bg-background-0 border-outline-300" />

// ❌ wrong
<Box style={{ backgroundColor: "#121212" }} />
```

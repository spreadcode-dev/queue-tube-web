# QueueTube Web

A YouTube queue management web application built with Next.js 15, React 19, gluestack-ui v3, and NativeWind.

---

## Getting Started

```bash
pnpm install
pnpm dev
```

---

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to manage local Git hooks. Hooks are installed automatically when you run `pnpm install` via the `prepare` script.

### Hook Overview

| Hook         | Runs on      | What it does                                                    |
| ------------ | ------------ | --------------------------------------------------------------- |
| `pre-commit` | `git commit` | Runs lint-staged — ESLint + Prettier on staged files only       |
| `commit-msg` | `git commit` | Validates commit message format via commitlint                  |
| `pre-push`   | `git push`   | Runs TypeScript type checking and full test suite with coverage |

### `pre-commit`

Runs [lint-staged](https://github.com/okonet/lint-staged) against only the files you have staged:

- `*.{ts,tsx}` — `eslint --fix` then `prettier --write`
- `*.{json,css,md}` — `prettier --write`

If ESLint finds an error it cannot auto-fix, the commit is blocked.

### `commit-msg`

Validates the commit message against the [Conventional Commits](https://www.conventionalcommits.org/) specification using [commitlint](https://commitlint.js.org/).

#### Format

```
<type>(<scope>): <issue> - <subject>

[optional body]

[optional footer]
```

#### Valid types

`feat` · `fix` · `docs` · `style` · `refactor` · `test` · `chore` · `ci` · `perf` · `revert`

#### Valid examples

```
feat(queue): #1 - add drag-to-reorder support for queue items
fix(player): #2 - resolve autoplay not triggering on queue switch
chore(deps): #4 - upgrade gluestack-ui to v3.1.0
test(queue-card): #90 - add coverage for empty state rendering
docs(readme): #40 - update git hooks section with bypass instructions
```

#### Invalid examples (blocked by commitlint)

```
updated queue                          ← no type
Fixed bug                              ← no type, uppercase
WIP: working on player                 ← invalid type
feat: Updated Queue List               ← uppercase subject
```

#### Rules

| Rule                   | Setting                 | Reason                                               |
| ---------------------- | ----------------------- | ---------------------------------------------------- |
| `type-enum`            | Strict list (see above) | Prevents freeform types like `update` or `wip`       |
| `subject-max-length`   | `72`                    | Fits in `git log --oneline`                          |
| `subject-case`         | `lower-case`            | Consistent with Code Sync agent commit format        |
| `body-max-line-length` | Disabled                | Code Sync agent generates detailed multi-line bodies |

### `pre-push`

Runs two checks before any push reaches the remote:

1. **`pnpm type-check`** — `tsc --noEmit`. Exits early on type errors.
2. **`pnpm test:coverage`** — Full Vitest suite with coverage. Push is blocked if any metric drops below 80%.

---

## Bypassing Hooks

Hooks can be bypassed in emergencies using `--no-verify`. This should be the **exception**, not the pattern. If hooks are bypassed regularly, they are either too slow or too strict and should be adjusted.

```bash
# Skip pre-commit and commit-msg hooks
git commit --no-verify -m "chore: emergency hotfix"

# Skip pre-push hook
git push --no-verify
```

> ⚠️ **Warning:** Bypassing `pre-push` skips the TypeScript type check and coverage gate. CI is the final safety net — bypassed pushes **must** still pass CI before they can be merged.

---

## Scripts

| Script          | Command                 | Description                    |
| --------------- | ----------------------- | ------------------------------ |
| `dev`           | `next dev --turbo`      | Start development server       |
| `build`         | `next build`            | Production build               |
| `lint`          | `next lint`             | Full ESLint scan               |
| `format`        | `prettier --write .`    | Format entire codebase         |
| `type-check`    | `tsc --noEmit`          | TypeScript type checking       |
| `test`          | `vitest`                | Run tests in watch mode        |
| `test:run`      | `vitest run`            | Run tests once                 |
| `test:coverage` | `vitest run --coverage` | Run tests with coverage report |

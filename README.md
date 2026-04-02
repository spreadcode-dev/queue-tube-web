# QueueTube Web

QueueTube is a React / Next.js 15 web application.

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Code Quality

This project uses **ESLint** for correctness and **Prettier** for formatting. The two tools are
non-overlapping: `eslint-config-prettier` disables every ESLint rule that could conflict with
Prettier's formatting decisions.

### Running the linter

```bash
# Check for ESLint errors
pnpm lint

# Auto-fix safe violations
pnpm lint:fix
```

### Running the formatter

```bash
# Format all files in-place
pnpm format

# Check that all files are already formatted (used in CI)
pnpm format:check
```

### Tailwind class ordering

`prettier-plugin-tailwindcss` automatically sorts Tailwind class names into Tailwind's recommended
order on every `pnpm format` run. No manual sorting is needed.

### VS Code setup

A `.vscode/settings.json` is committed to the repository. Once you have the
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions
installed, files will be formatted and linted automatically on save.

For personal editor overrides, create `.vscode/settings.local.json` — this file is gitignored.

---

## Testing

```bash
# Watch mode
pnpm test

# Single run
pnpm test:run

# Coverage report (≥ 80% required)
pnpm test:coverage
```

---

## Commits

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) — enforced by
commitlint in the `commit-msg` Git hook.

Examples: `feat: add queue card component`, `fix: correct border colour token`, `chore: update deps`

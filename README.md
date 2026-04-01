# QueueTube Web

QueueTube is a YouTube queue management web application built with Next.js 15, TypeScript, Tailwind CSS, and gluestack-ui v3.

---

## Prerequisites

- **Node.js** v20.x or later (LTS recommended)
- **pnpm** v9.x or later

Install pnpm globally if you haven't already:

```bash
npm install -g pnpm
```

---

## Bootstrap

This project was scaffolded with the following command:

```bash
npx create-next-app@latest queue-tube-web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

---

## Development

Install dependencies:

```bash
pnpm install
```

Start the development server with Turbopack:

```bash
pnpm dev --turbo
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev --turbo` | Start the development server with Turbopack |
| `pnpm build` | Build the application for production |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Run Prettier on all files |
| `pnpm type-check` | Run TypeScript type checking (`tsc --noEmit`) |
| `pnpm test` | Run Vitest in watch mode |
| `pnpm test:run` | Run Vitest once |
| `pnpm test:coverage` | Run Vitest with coverage report |

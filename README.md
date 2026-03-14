## Invento – Inventory Management for Local Businesses

**Invento** is a modern inventory and cash-flow management web app for local businesses.  
It helps you track stock levels, manage debtors and creditors, monitor cash movement, and view simple analytics in one clean dashboard.

Built with:
- **Next.js** (App Router) – full-stack React framework
- **Prisma** – type-safe ORM for database access
- **Tailwind CSS** – utility-first styling
- **shadcn/ui** – accessible, themeable UI components

---

## Features (Planned)

- **Inventory management**: products, categories, stock in/out, low-stock alerts (later).
- **Debtor/Creditor management**: record customers/suppliers, outstanding amounts, basic statements.
- **Cash flow**: income/expense entries, daily/weekly/monthly cash summaries.
- **Analytics**: key KPIs (top-selling items, dues, cash balance trends).
- **Multi-user (later)**: basic staff accounts/roles for the business.

---

## Tech Stack

- **Frontend / Backend**: Next.js (TypeScript, App Router)
- **Database**: PostgreSQL via Prisma (start with Prisma)
- **UI**: Tailwind CSS + shadcn/ui

---

## Getting Started (Local Development)

### 1. Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **pnpm** or **yarn**

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure environment

Create a `.env` file in the project root:

```bash
cp .env.example .env  # if .env.example exists, otherwise create .env manually
```

Add a database URL (for example, SQLite):

```env
DATABASE_URL="file:./prisma/dev.db"
```

> For PostgreSQL, use a URL such as  
> `DATABASE_URL="postgresql://user:password@localhost:5432/invento"`

### 4. Initialize Prisma

Run the following to generate the Prisma client and apply initial schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

If Prisma is not installed yet:

```bash
npm install -D prisma
npm install @prisma/client
```

### 5. Start the development server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## UI Stack Setup (Tailwind + shadcn/ui)

This project uses **Tailwind CSS** and **shadcn/ui** for the component library.

- **Tailwind CSS** – configured via `tailwind.config.ts` and `postcss.config.mjs`.
- **shadcn/ui** – reusable components (buttons, tables, dialogs, forms) for consistent UI.

Add more components with shadcn/ui if needed.

---

## High-Level Modules (Planned Structure)

- **Inventory**
  - Product list, create/edit product, stock in/out history.
- **Debtors/Creditors**
  - Parties list, opening balances, transactions, current outstanding.
- **Cash Flow**
  - Cash entries (in/out), categories, running balance.
- **Analytics**
  - Summary charts, KPIs (sales, dues, cash trend).

---

## Scripts

Common npm scripts (check `package.json` for the latest list):

- **`npm run dev`**: start Next.js development server.
- **`npm run build`**: create a production build.
- **`npm start`**: run the production server.
- **`npm run lint`**: run linting.

---

## Deployment

Invento can be deployed to any platform that supports Next.js (e.g. Vercel, Netlify, Render, your own server).

Typical flow:
1. **Set `DATABASE_URL`** for production (PostgreSQL recommended).
2. Run database migrations: `npx prisma migrate deploy`.
3. Build the app: `npm run build`.
4. Start the app: `npm start`.

---

## Roadmap

- **Phase 1**: Core inventory + debtor/creditor + basic cash-flow tracking.
- **Phase 2**: Better analytics, printable/exportable reports.
- **Phase 3**: User roles, audit logs, and improved notifications.

---

## License

Internal project for a local business. Add a formal license here if you plan to open source or distribute Invento.

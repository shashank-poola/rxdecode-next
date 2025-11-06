# RxDecode

![Frontend](./frontendpage.png)

AI-powered helper to generate and understand prescriptions, and search medicines with usage, dosage, side-effects, and warnings.

---

## Features

- AI prescription generator (Gemini)
- Medicine search with structured info
- Clean UI (Tailwind + shadcn/ui)
- Email/password auth with secure httpOnly cookie session

---

## Tech Stack

- Frontend: Vite + React + TypeScript
- Backend: Express (Node 20+), Bun-compatible
- Database: PostgreSQL + Prisma
- Styling: TailwindCSS, shadcn/ui
- Deploy: Vercel (frontend), Render/Railway (backend), Neon/Supabase (DB)

---

## Local Development (Bun)

1) Clone

```bash
git clone https://github.com/shashank-poola/rxdecode-next.git
cd rxdecode-next
```

2) Environment

- Root `.env` (used by Vite and Prisma CLI):

```bash
VITE_API_URL=http://localhost:5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rxdecode_db
```

- `server/.env` (backend runtime):

```bash
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rxdecode_db
JWT_SECRET=replace_with_a_long_random_string
```

3) Database (Docker)

```bash
docker compose up -d postgres
```

4) Prisma (run from project root)

```bash
bunx prisma generate
bunx prisma migrate deploy
```

5) Start backend (server/)

```bash
cd server
bun install
bun run dev
# http://localhost:5000/health
```

6) Start frontend (root)

```bash
bun install
bun run dev
# http://localhost:5173
```

---

## API Endpoints

- `GET /health` → { ok: true }
- `POST /auth/register` → body: { name, email, password } → sets cookie, returns { user }
- `POST /auth/login` → body: { email, password } → sets cookie, returns { user }
- `GET /me` → returns { user } if session cookie is valid
- `POST /auth/logout` → clears session

Frontend calls use `credentials: 'include'` so cookies persist.

---

## Deploy

- Frontend (Vercel): set `VITE_API_URL` to your backend URL.
- Backend (Render/Railway): set `PORT`, `CLIENT_ORIGIN` (your Vercel URL), `DATABASE_URL`, `JWT_SECRET`.
- Prisma on deploy: run `bunx prisma generate && bunx prisma migrate deploy` before `bun run start`.

---

## RXDecode Backend (server/)

Run locally:

1. Copy `.env.example` to `.env` and fill values.
2. Ensure Postgres is running and `DATABASE_URL` is correct.
3. From `server/`:

```
npm i
npm run dev
```

Endpoints:
- `POST /auth/google` body: `{ "credential": "<google_id_token>" }` -> sets `session` cookie, returns `{ user }`.
- `GET /me` -> returns `{ user }` if session cookie is valid.
- `POST /auth/logout` -> clears session cookie.



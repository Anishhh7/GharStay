# GharStay Frontend

Public resort site + admin panel, built with React + React Router, connecting
to your REST API at `http://localhost:3000/api/v1`.

## Setup

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`. Make sure your API is running at
`http://localhost:3000/api/v1` (CORS must allow this origin).

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## What's built

**Public site:** Home, About, Rooms, Room Detail (+ booking form), Restaurant
(+ embedded Menu), Packages, Package Detail, Gallery, Events, Blog, Blog Post,
Contact, FAQ.

**Admin panel** (`/admin`, JWT-protected): Dashboard, Reservations (status
workflow), and CRUD management for Rooms, Packages, Menu, Gallery, Events,
Blog, Testimonials, FAQ, and Users (role assignment).

**Design system:** Fraunces (display) + Manrope (body), forest/earth/beige/gold
palette, custom SVG logo + favicon — all defined in `src/styles/tokens.css`.

## ⚠️ API assumptions to verify against your real backend

I built this without a live connection to your API, so I made reasonable REST
assumptions. Check these against your actual endpoints and adjust
`src/api/*.js` as needed:

1. **Auth** (`src/api/auth.js`) — confirmed against your `authController`:
   - Login: `POST /users/login` with `{ email, password }`, returns exactly
     `{ status, token, data: { user } }` — this is now hardcoded to that
     shape, no more guessing across formats.
   - **No `GET /users/me` exists on this API.** The user object returned by
     login is persisted to `localStorage` (`gharstay_user`) and restored on
     page reload instead of being refetched — see `getStoredUser()` in
     `auth.js` and `AuthContext.jsx`. If the token expires, the next
     protected request will 401 and clear the session automatically.
   - **There's no public self-registration.** User accounts are created by
     an already-logged-in admin via `POST /users/createuser` (the whole
     `userRouter` is behind `protect` + `restrictTo` after `/login`). The
     admin panel's Users page has an "Add user" modal for this.
   - User updates use `PATCH /users/:id` (not `PUT`), matching the real
     router.
   - Role check (`isAdmin` in `AuthContext.jsx`) currently allows
     `role === 'admin' || role === 'staff'` for admin-panel access — this
     is a UI-only convenience gate; your `restrictTo(...permission.users.create)`
     is the real enforcement. Tell me your actual role list/permission
     config if `staff` shouldn't have full admin access and I'll narrow it.

2. **List responses** (`src/api/useApi.js` → `asList()`): I normalize list
   endpoints that return a bare array, `{ data: [...] }`, `{ items: [...] }`,
   or `{ results: [...] }`. If your API wraps lists differently (e.g.
   `{ rooms: [...] }` per-resource), add that key to `asList()`.

3. **CRUD shape** (`src/api/resources.js`): every resource assumes standard
   REST — `GET /rooms`, `GET /rooms/:id`, `POST /rooms`, `PUT /rooms/:id`,
   `DELETE /rooms/:id` — same pattern for packages, menu, gallery, events,
   blog, testimonials, faq, users. If any use `PATCH` instead of `PUT`, or
   nested paths, adjust the `crud()` factory calls.

4. **Field names**: pages read common-sense field names (`name`, `price`,
   `description`, `title`, `date`, `imageUrl`, etc.) with fallbacks where
   plausible (e.g. `excerpt || summary`). Once you share exact response
   shapes, I'll tighten these up so nothing silently falls back to "—".

5. **JWT header**: sent as `Authorization: Bearer <token>` on every request
   once a token exists (`src/api/client.js`). Change this if your API expects
   a different header or scheme.

6. **Photo uploads** (`src/api/client.js` → `uploadFile()`): admin forms for
   Rooms, Packages, Events, Blog, and Gallery now have a real "click or drag
   to upload" photo field (`src/components/ImageUploadField.jsx`) instead of
   a plain URL text box. It assumes `POST /upload` accepting multipart
   `file` and returning `{ url }` (or `{ data: { url } }`). If your API's
   upload endpoint uses a different path, field name, or response shape,
   update the defaults in `uploadFile()` — everything else stays the same.

8. **AI chat assistant** (`src/components/ChatAssistant.jsx`): added — a
   floating chat widget now appears on every public page (bottom-right),
   posting to `POST /assitant` via `aiAssistant.ask()`. I don't have your
   `chatbotController`'s request/response shape, so it currently:
   - sends `{ message, context: undefined }`
   - reads the reply from whichever of `reply` / `answer` / `message`
     (top-level or nested under `data`) is present, or shows a fallback
     string if none match
   - doesn't send an auth token differently than any other request — if
     `/assitant` is a protected route, guests who aren't logged in will get
     a 401 and see the "couldn't reach the assistant" fallback message.
   Send me the controller (or just a sample request/response) and I'll wire
   this up exactly instead of guessing across field names.

9. **Dashboard summary** (`GET /dashboards`): assumed fields like
   `reservationsCount`, `occupancyRate`, `revenue`, `newContacts` — update
   `src/pages/admin/Dashboard.jsx` to match your real payload.

## Imagery

Room/gallery/hero photography uses placeholder Unsplash images (via
`src/components/Photo.jsx`) standing in for real property photography — swap
the `PHOTO_IDS` map for your actual shoot assets, or wire the gallery pages
directly to `imageUrl` fields once your gallery endpoint has real data (the
Gallery page already does this for API-sourced items).

## Structure

```
src/
  api/            REST client, per-resource modules, useApi hook
  context/        AuthContext (JWT session, role check)
  components/     Header, Footer, HeroSlider, Logo, ResourceManager, etc.
  pages/          Public site pages
  pages/admin/    Admin panel pages
  styles/         Design tokens + shared page layout styles
```

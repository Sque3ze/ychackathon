# Multiplayer Infinite Canvas — Development Plan

## Objectives
- Build a persistent, production-ready multiplayer infinite canvas using tldraw with our own FastAPI sync backend.
- Provide a single default room that everyone joins automatically (no room UI in v1).
- Deliver basic drawing/canvas tools and real-time collaboration comparable to `npm create tldraw@latest -- --template multiplayer`.
- Follow design guidelines: canvas-first layout, Inter font, neutral slate grays (#1E293B→#F1F5F9) with blue accents (#2563EB), floating minimal chrome, Shadcn components.
- Ensure all API routes are prefixed with `/api` and backend binds to 0.0.0.0:8001.

## Implementation Steps (by Phases)

### Phase 1: Core Realtime Sync POC (Required)
Goal: Prove WebSocket + persistence loop for a single room works end-to-end.
- Research best-practices: tldraw sync server protocol, message types (snapshot, updates, presence) and delta/patch handling.
- Backend (FastAPI):
  - Add `/api/ws/rooms/default` WebSocket that broadcasts client messages to all peers and acks.
  - Add `/api/sync/rooms/default/snapshot` (GET) to return latest persisted canvas JSON; `/api/sync/rooms/default/apply` (POST) to append updates and merge into snapshot.
  - Persistence: MongoDB collections: `rooms` (roomId, snapshot, version, updatedAt) and `ops` (roomId, op, version, ts) for recovery.
- Frontend:
  - Install and wire `tldraw` and `@tldraw/sync` (or custom adapter) to our backend: load snapshot via REST, stream updates via WS.
  - Show connection status (connected/reconnecting/offline) with Sonner toasts.
- Latency/Resilience: simple retry + exponential backoff on WS, debounce persist calls.
- Testing: open two tabs, draw shapes, verify bi-directional sync and snapshot restore on refresh.

User stories (Phase 1)
1. As a user, when I draw a shape in one tab, it appears in another tab almost instantly.
2. As a user, when I refresh the page, my previous drawings persist and reappear.
3. As a user, I see a clear status if I’m connected, reconnecting, or offline.
4. As a user, if my connection drops, it automatically reconnects without losing changes.
5. As a user, my actions feel responsive (target <300ms end-to-end on LAN).

### Phase 2: V1 App Development (MVP)
Goal: Ship working single-room multiplayer canvas with minimal, polished UI.
- Frontend (React):
  - Canvas page renders full-viewport <Tldraw />; apply design tokens in `index.css` (Inter + color variables).
  - Replace demo hook with our sync client (snapshot bootstrap + WS streaming). Deep links enabled.
  - Floating top-right status chip; minimal left tool palette using Shadcn buttons/tooltips; Sonner Toaster initialized.
  - Presence (ephemeral): broadcast cursor/name over WS; render colored cursors; no user auth (random name/color per session).
- Backend (FastAPI):
  - Validate messages, enforce room `default`, version guard (monotonic int), merge updates into snapshot, persist with UTC timestamps.
  - Housekeeping: prune old ops, cap message size, basic rate limiting per connection.
- Integration: Ensure all URLs come from env; frontend uses REACT_APP_BACKEND_URL with `/api`.
- E2E test: run automated browser test with two clients verifying real-time sync and persistence.

User stories (Phase 2)
1. As a user, I can draw, move, and delete shapes; everyone sees these changes in real-time.
2. As a user, I can pan/zoom on an infinite canvas smoothly.
3. As a user, I can see other users’ cursors with names/colors.
4. As a user, after a reload hours later, my canvas is restored from the server.
5. As a user, I receive friendly toasts for join/leave/connection events.

### Phase 3: Features & Hardening
Goal: Improve robustness, UX, and maintainability while keeping scope focused on single-room.
- Server-side: input schema validation, op-batch apply, idempotent acks, basic metrics logs, per-room lock to avoid race during persist, pagination for ops.
- Client-side: throttle cursor broadcasts (≤60/s), batch outbound ops, retry failed persists with jitter, explicit error UI with retry.
- Data model: add `schemaVersion`, migration hook, and periodic snapshot compaction from ops.
- Observability: basic request logs, WS connection counts, room version.
- E2E: add regression tests for race conditions (concurrent edits), reconnect flows.

User stories (Phase 3)
1. As a user, large edits apply reliably without glitches or duplicate shapes.
2. As a user, rapid actions don’t freeze the app due to smart batching.
3. As a user, if something goes wrong, I see a helpful error and can retry.
4. As a user, presence remains smooth even with several collaborators.
5. As a user, the canvas state remains consistent across tabs under high activity.

### Phase 4: Final Polish & Optional Extensions
Goal: Production readiness and optional niceties (while keeping single-room default).
- UI polish: keyboard shortcuts in tooltips, better focus states, refined shadows; respect reduced motion.
- Export actions: enable PNG/SVG export via tldraw API.
- Backups: periodic snapshot backup to Mongo (separate collection) and rotation.
- Optional: hidden `?room=` param for internal testing (multi-room behind a flag) without UI.
- Comprehensive testing: automated E2E + API tests; verify cold-start recovery from Mongo.

User stories (Phase 4)
1. As a user, I can export my canvas as PNG or SVG from the UI.
2. As a user, I can use keyboard shortcuts for common tools.
3. As a user, I can rely on the app to restore the latest state after server restarts.
4. As a user, the UI feels polished and accessible on desktop and mobile.
5. As a user, I can share the link and collaborators join the same default room seamlessly.

## Next Actions (Immediate)
1. Frontend: yarn add `tldraw @tldraw/sync` and wire <Tldraw /> full-viewport per design tokens.
2. Backend: implement `/api/ws/rooms/default` and snapshot/apply REST endpoints with Mongo persistence.
3. Frontend: implement sync adapter (load snapshot on mount, stream updates via WS, batch outbound ops).
4. Add connection status + Sonner Toaster; seed random presence identity per session.
5. Run first POC test with two browser tabs; iterate until stable; then call testing agent for E2E.

## Success Criteria
- Real-time: Two or more clients observe each other’s edits within 300ms median; updates are ordered and consistent.
- Persistence: Refresh restores latest server snapshot; server restarts recover state from Mongo.
- Stability: Auto-reconnect works; no crashes on malformed input; rate limits prevent abuse.
- UX: Canvas-first minimal UI with Inter + tokenized colors; presence cursors visible; accessible focus states.
- Tests: Automated E2E for realtime + persistence pass; logs show healthy WS connections; no critical console errors.

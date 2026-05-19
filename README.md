# WorkspacePro — monis.rent Workspace Designer

> **Decent Solutions Developer Challenge submission**

An interactive workspace design tool built for [monis.rent](https://monis.rent). Users pick a template, drag furniture onto a canvas, preview their setup in 3D, and check out — all in one fluid experience.

**Live URL:** https://workspace-proworkspace-pro-app.vercel.app

---

## What It Does

- **Choose a template** — Home Office, Collaborative Studio, or Executive Suite, each pre-loaded with a starter layout
- **Drag & drop furniture** — chairs, desks, storage, and accessories (monitor, lamp, plant, whiteboard) from a categorised sidebar onto the 2D canvas
- **3D preview** — switch to a real-time 3D view using React Three Fiber; drag items to reposition them in 3D space
- **Checkout** — review selected items, pick a rental period (1 / 3 / 6 / 12 months), see the total, and confirm the order

---

## Tech Stack

| Layer       | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | Next.js 14 (App Router, TypeScript)                |
| Styling     | Tailwind CSS v3 with custom brand palette          |
| State       | Zustand with `persist` middleware                  |
| Drag & Drop | `@dnd-kit/core`                                    |
| 3D          | React Three Fiber + `@react-three/drei` + Three.js |
| Monorepo    | Turborepo + pnpm workspaces                        |
| Deployment  | Vercel                                             |

---

## Project Structure

```
decent-solution/
├── apps/
│   └── web/                  # Next.js app
│       └── src/
│           ├── app/          # Pages: / (landing), /design, /checkout
│           ├── components/   # Layout + workspace components
│           ├── application/  # Zustand store
│           ├── domain/       # Furniture catalog & templates
│           └── lib/          # Utilities (cn, formatCurrency)
└── packages/
    └── shared/               # Shared TypeScript types
```

---

## Running Locally

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Production build
pnpm build
```

> Requires Node ≥ 18 and pnpm 9.

---

## What I'd Improve With More Time

- **Rotation controls** — right-click or toolbar button to rotate placed items on the 2D canvas
- **Snap-to-grid** — align items cleanly to a configurable grid
- **Persistent rooms** — save named layouts to a backend so users can return to their design
- **Real Rupiah pricing** — integrate a live exchange rate API for accurate IDR values
- **Full keyboard a11y** — keyboard navigation for the canvas drag-and-drop
- **Mobile canvas drag** — touch-based dragging on the 2D floorplan (3D drag already works on touch)

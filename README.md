# CODIVIA — Landing App

A single-page, conversion-focused landing application for CODIVIA, built with
React, Tailwind CSS, and Framer Motion.

## Stack

- **React 18 + Vite** — component architecture, fast dev server
- **Tailwind CSS** — design tokens for the CODIVIA palette (`charcoal`,
  `bone`, `tint`, `accent`) live in `tailwind.config.js`
- **Framer Motion** — scroll-triggered animation, the animated counters, and
  the interactive timeline/accordion transitions
- **Firebase** (Auth + Firestore) — shared SSO with the existing
  `codivia-platform` project
- **Razorpay** — server-verified payment flow via Cloud Functions

## Sections (in order)

| # | Section | File |
|---|---------|------|
| A | Hero — animated CV mark, dual CTA | `src/components/sections/Hero.jsx` |
| B | Stat counter | `src/components/sections/StatCounter.jsx` |
| C | Departments matrix (accordion, 22 rows) | `src/components/sections/DepartmentsMatrix.jsx` |
| D | 5-step journey timeline | `src/components/sections/JourneyTimeline.jsx` |
| E | Live coding micro-demo | `src/components/sections/CodingTeaser.jsx` |
| F | Pricing + Auth→Razorpay gate | `src/components/sections/PricingGate.jsx` |
| G/H | Trust stats + FAQ accordion | `src/components/sections/TrustFAQ.jsx` |
| I | Footer | `src/components/sections/Footer.jsx` |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Firebase + Razorpay key id
npm run dev                  # http://localhost:5173
npm run build                # production build to dist/
```

The app renders and builds even without `.env.local` filled in — Firebase
initialization is wrapped in a try/catch so the UI never breaks in preview
mode. Auth and payment CTAs simply fall back to smooth-scrolling until real
credentials are present.

## Firebase Auth strategy (SSO)

`src/firebase.js` initializes the Firebase SDK using the **same project**
as `codivia-platform.web.app` — same `apiKey`/`projectId`, not a new
project. Because Firebase Auth session persistence is scoped per-project
(via `browserLocalPersistence`, the default), a learner who signs in on
this landing app is already signed in on the main platform, and vice versa,
with zero extra token-bridging code.

Two things to configure on the Firebase side for this to hold:

1. Add the landing app's deployed origin to **Authentication → Settings →
   Authorized domains**.
2. If landing and platform live on different subdomains, note that plain
   client-SDK persistence is per-origin — true cross-subdomain cookie SSO
   needs Firebase Hosting multi-site config or a shared parent domain. This
   is called out as a comment in `firebase.js`.

## Firestore schema hook

On first sign-in, `ensureStudentDoc()` creates:

```js
students/{uid} = {
  studentId: uid,
  name: string | null,
  email: string | null,
  paid: false,
  paymentId: null,
  enrolledAt: null,
  createdAt: serverTimestamp(),
}
```

`paid`, `paymentId`, and `enrolledAt` are **never** writable from the
client — see `firestore.rules`, which restricts client `update` calls to
the `name`/`email` fields only. Only the Cloud Functions Admin SDK (which
bypasses security rules) can flip those fields, and only after verifying a
Razorpay signature.

## Razorpay integration (server-verified)

Flow: **Auth → createOrder (Cloud Function) → Razorpay Checkout → webhook
verifies signature → Firestore `paid: true`.**

- `functions/index.js` — `createOrder` (callable) creates a Razorpay order
  with a **server-fixed amount** (never trusts a client-supplied price),
  and `razorpayWebhook` (HTTP function) is the actual source of truth: it
  verifies the `X-Razorpay-Signature` header via HMAC-SHA256 against the
  raw request body using `crypto.timingSafeEqual`, and only then updates
  the matching `students/{uid}` document.
- `src/lib/razorpay.js` — client helper that loads the Razorpay checkout
  script, calls `createOrder`, and opens the checkout modal. The client
  `handler` callback is UX-only (closing the modal, showing "processing")
  — it never sets `paid: true` itself.

### Deploying the functions

```bash
cd functions
npm install
firebase functions:secrets:set RAZORPAY_KEY_ID
firebase functions:secrets:set RAZORPAY_KEY_SECRET
firebase functions:secrets:set RAZORPAY_WEBHOOK_SECRET
firebase deploy --only functions,firestore:rules
```

Then set the deployed `razorpayWebhook` URL as the webhook endpoint in the
Razorpay Dashboard (**Settings → Webhooks**), subscribed to the
`payment.captured` event, using the same value as
`RAZORPAY_WEBHOOK_SECRET`.

## Design notes

- No rectangular card grids: the departments matrix is an alternating
  split-list/accordion, the journey is a horizontal interactive timeline,
  and the coding demo is a split two-panel drawer.
- No glow/blur box-shadows anywhere. Depth comes from sharp 1px borders,
  `backdrop-blur` glass panels with hard contrast edges, and linear/conic
  gradients (see `.glass-panel` and `bg-conic-accent` in
  `src/index.css` / `tailwind.config.js`).
- Palette tokens: `charcoal` `#141210`, `bone` `#F5F1EC`, `tint` `#FDEBD9`,
  `accent` `#F26722` — all defined once in `tailwind.config.js`, referenced
  everywhere else by name.

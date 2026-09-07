// Shared Firebase Auth strategy
// -------------------------------------------------------------------------
// CODIVIA's landing app deliberately reuses the SAME Firebase project as the
// main platform (codivia-platform.web.app), instead of spinning up its own.
// Firebase Auth sessions are scoped per-project, not per-subdomain: as long
// as both the landing app and the platform app initialize the Firebase SDK
// with this project's config, a user who signs in here is automatically
// recognized as signed in there (and vice versa) via the shared
// IndexedDB-backed persistence layer, giving true SSO without a separate
// auth server or token-bridging step.
//
// Practical requirements for SSO to hold:
//   1. Both apps use the identical firebaseConfig (same apiKey/projectId).
//   2. Both apps are served from origins added to the Firebase Auth
//      "Authorized domains" allowlist (Console > Authentication > Settings).
//   3. Both apps use the default `browserLocalPersistence` (the default),
//      so the session survives tab closes and is shared across same-site
//      origins.
//   4. If landing and platform live on different subdomains
//      (e.g. get.codivia.in vs codivia-platform.web.app), true cookie-level
//      SSO across origins additionally requires Firebase Hosting's
//      multi-site setup or a shared custom domain — plain client SDK
//      persistence alone is per-origin. Document this in your infra plan
//      if landing and platform are NOT on the same origin/site.
// -------------------------------------------------------------------------

import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'

// Populate these from your existing codivia-platform Firebase project
// settings (Project settings > General > Your apps). Never hardcode real
// values in source — read from Vite env vars instead.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // e.g. "codivia-platform.firebaseapp.com"
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,   // "codivia-platform"
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider)
  await ensureStudentDoc(result.user)
  return result.user
}

export async function signOut() {
  return firebaseSignOut(auth)
}

// -------------------------------------------------------------------------
// Firestore schema hook: students/{uid}
// -------------------------------------------------------------------------
// Shape (per spec):
//   {
//     studentId: string,        // == auth uid, denormalized for query convenience
//     name: string | null,
//     email: string | null,
//     paid: boolean,            // flips to true only via verified webhook
//     paymentId: string | null, // Razorpay payment id, set server-side
//     enrolledAt: Timestamp | null,
//     createdAt: Timestamp,     // serverTimestamp(), set once on first write
//   }
//
// This function is idempotent and safe to call on every sign-in: it creates
// the doc on first login and never overwrites `paid` / `paymentId` /
// `enrolledAt` on subsequent calls, since only the server (Cloud Functions)
// is trusted to flip those fields after verifying payment.
// -------------------------------------------------------------------------
export async function ensureStudentDoc(user) {
  if (!user) return
  const ref = doc(db, 'students', user.uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    await setDoc(ref, {
      studentId: user.uid,
      name: user.displayName || null,
      email: user.email || null,
      paid: false,
      paymentId: null,
      enrolledAt: null,
      createdAt: serverTimestamp(),
    })
  } else {
    // Keep name/email fresh without touching payment-state fields.
    await setDoc(
      ref,
      { name: user.displayName || null, email: user.email || null },
      { merge: true }
    )
  }
}

export async function getStudentDoc(uid) {
  const snap = await getDoc(doc(db, 'students', uid))
  return snap.exists() ? snap.data() : null
}

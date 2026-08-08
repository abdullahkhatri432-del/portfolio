import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase initialisation.
 *
 * Next.js hot-reloads modules in development and evaluates them in both the
 * server and client bundles, so `getApps()` guards against re-initialising an
 * app that already exists.
 *
 * Config values are public by design — Firebase web keys identify the project
 * rather than authenticate it. Access is controlled by Firestore security
 * rules, not by hiding these values.
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True when the project has been configured. */
export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
}

let cachedApp: FirebaseApp | null = null;
let cachedDb: Firestore | null = null;

/**
 * Get the Firestore instance.
 * Returns null when unconfigured so callers can fall back rather than throw.
 */
export function getDb(): Firestore | null {
  if (!isFirebaseConfigured()) return null;

  if (!cachedDb) {
    cachedApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
    cachedDb = getFirestore(cachedApp);
  }

  return cachedDb;
}

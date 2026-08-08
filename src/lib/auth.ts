import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseAuth } from "./firebase";
import { getDb } from "./firebase";

/**
 * Roles across all projects.
 * A user has one role per project, stored in their profile.
 */
export type UserRole =
  | "admin"
  | "candidate"
  | "user"
  | "patient"
  | "doctor"
  | "vendor"
  | "customer"
  | "student"
  | "faculty"
  | "team-member"
  | "traveler";

/**
 * A user's profile stored in Firestore.
 * The Firebase Auth record holds email/password; this holds everything else.
 */
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  projectId: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  lastLogin: string;
  status: "active" | "inactive" | "suspended";
  metadata?: Record<string, unknown>;
}

/**
 * Sign up a new user with email and password.
 * Creates both the Auth record and the Firestore profile.
 */
export async function signUp(params: {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
  projectId: string;
  phone?: string;
  metadata?: Record<string, unknown>;
}): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Auth not initialized");

  const credential = await createUserWithEmailAndPassword(auth, params.email, params.password);

  await updateProfile(credential.user, { displayName: params.displayName });

  const profile: UserProfile = {
    uid: credential.user.uid,
    email: params.email,
    displayName: params.displayName,
    role: params.role,
    projectId: params.projectId,
    phone: params.phone,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    status: "active",
    metadata: params.metadata,
  };

  const db = getDb();
  if (db) {
    await setDoc(doc(db, "auth_users", credential.user.uid), profile);
  }

  return credential.user;
}

/**
 * Log in with email and password.
 */
export async function logIn(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Auth not initialized");

  const credential = await signInWithEmailAndPassword(auth, email, password);

  const db = getDb();
  if (db) {
    await setDoc(
      doc(db, "auth_users", credential.user.uid),
      { lastLogin: new Date().toISOString() },
      { merge: true },
    );
  }

  return credential.user;
}

/**
 * Log out the current user.
 */
export async function logOut(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Auth not initialized");
  await signOut(auth);
}

/**
 * Send a password reset email.
 */
export async function resetPassword(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Auth not initialized");
  await sendPasswordResetEmail(auth, email);
}

/**
 * Get a user's profile from Firestore.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getDb();
  if (!db) return null;

  const snap = await getDoc(doc(db, "auth_users", uid));
  if (!snap.exists()) return null;

  return snap.data() as UserProfile;
}

/**
 * Subscribe to auth state changes.
 */
export function onAuthChange(callback: (user: User | null) => void): (() => void) | undefined {
  const auth = getFirebaseAuth();
  if (!auth) return undefined;
  return onAuthStateChanged(auth, callback);
}

/**
 * Check if a role has admin privileges for a project.
 */
export function isAdmin(role: UserRole): boolean {
  return role === "admin";
}

/**
 * Check if a role can manage other users (admin or manager-level).
 */
export function canManage(role: UserRole): boolean {
  return ["admin", "doctor", "faculty", "vendor"].includes(role);
}

/**
 * Seeds Firebase Auth users for every project.
 *
 * Firebase Auth is separate from Firestore. Each user has:
 *   - An Auth record (email + password) managed by Firebase
 *   - A profile document in /auth_users/{uid} managed by us
 *
 * The passwords below are for local demo only. In production each user
 * signs up through the app (or invited by an admin).
 *
 * Run with: npm run seed:auth
 */

import { readFileSync } from "node:fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(readFileSync("serviceAccountKey.json", "utf8"));
if (!getApps().length) initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();
const auth = getAuth();

const cyan = (t) => `\x1b[36m${t}\x1b[0m`;
const dim = (t) => `\x1b[2m${t}\x1b[0m`;
const green = (t) => `\x1b[32m${t}\x1b[0m`;
const yellow = (t) => `\x1b[33m${t}\x1b[0m`;

/**
 * Each user's email, password, role, and which project they belong to.
 * 5-6 users per project — one admin + several role-appropriate users.
 */
const USERS = [
  // ─── AI Interview Simulator ─────────────────────────────────────────
  { email: "admin@interview.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "ai-interview-simulator", phone: "+92-300-1234567" },
  { email: "ali.khan@mail.com", password: "demo1234", displayName: "Ali Khan", role: "candidate", projectId: "ai-interview-simulator", phone: "+92-300-1111111" },
  { email: "sara.ahmed@mail.com", password: "demo1234", displayName: "Sara Ahmed", role: "candidate", projectId: "ai-interview-simulator", phone: "+92-321-2222222" },
  { email: "usman.tariq@mail.com", password: "demo1234", displayName: "Usman Tariq", role: "candidate", projectId: "ai-interview-simulator", phone: "+92-333-3333333" },
  { email: "fatima.noor@mail.com", password: "demo1234", displayName: "Fatima Noor", role: "candidate", projectId: "ai-interview-simulator", phone: "+92-312-4444444" },

  // ─── GameVault Pro ───────────────────────────────────────────────────
  { email: "admin@gamevault.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "gamevault-pro", phone: "+92-300-1234567" },
  { email: "gamer.pro@mail.com", password: "demo1234", displayName: "Gamer Pro", role: "user", projectId: "gamevault-pro", phone: "+92-300-1111111" },
  { email: "pixel.queen@mail.com", password: "demo1234", displayName: "Pixel Queen", role: "user", projectId: "gamevault-pro", phone: "+92-321-2222222" },
  { email: "noob.slayer@mail.com", password: "demo1234", displayName: "Noob Slayer", role: "user", projectId: "gamevault-pro", phone: "+92-333-3333333" },
  { email: "retro.fan@mail.com", password: "demo1234", displayName: "Retro Fan", role: "user", projectId: "gamevault-pro", phone: "+92-312-4444444" },

  // ─── Hospital ERP ────────────────────────────────────────────────────
  { email: "admin@hospital.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "hospital-erp", phone: "+92-300-1234567" },
  { email: "ayesha.malik@mail.com", password: "demo1234", displayName: "Ayesha Malik", role: "patient", projectId: "hospital-erp", phone: "+92-300-1234567" },
  { email: "bilal.hussain@mail.com", password: "demo1234", displayName: "Bilal Hussain", role: "patient", projectId: "hospital-erp", phone: "+92-321-9876543" },
  { email: "dr.saira@hospital.io", password: "demo1234", displayName: "Dr. Saira Iqbal", role: "doctor", projectId: "hospital-erp", phone: "+92-300-1112233" },
  { email: "dr.imran@hospital.io", password: "demo1234", displayName: "Dr. Imran Shah", role: "doctor", projectId: "hospital-erp", phone: "+92-321-2223344" },
  { email: "nadia.pervez@mail.com", password: "demo1234", displayName: "Nadia Pervez", role: "patient", projectId: "hospital-erp", phone: "+92-345-2223344" },

  // ─── Multi-Vendor Marketplace ─────────────────────────────────────────
  { email: "admin@marketplace.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "multi-vendor-marketplace", phone: "+92-300-1234567" },
  { email: "hamza.vendor@mail.com", password: "demo1234", displayName: "Hamza Ali", role: "vendor", projectId: "multi-vendor-marketplace", phone: "+92-300-1111111" },
  { email: "mehreen.vendor@mail.com", password: "demo1234", displayName: "Mehreen Khan", role: "vendor", projectId: "multi-vendor-marketplace", phone: "+92-321-2222222" },
  { email: "ali.customer@mail.com", password: "demo1234", displayName: "Ali Raza", role: "customer", projectId: "multi-vendor-marketplace", phone: "+92-333-3333333" },
  { email: "sana.customer@mail.com", password: "demo1234", displayName: "Sana Malik", role: "customer", projectId: "multi-vendor-marketplace", phone: "+92-312-4444444" },

  // ─── Next Build ──────────────────────────────────────────────────────
  { email: "admin@nextbuild.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "next-build", phone: "+92-300-1234567" },
  { email: "ayesha.design@mail.com", password: "demo1234", displayName: "Ayesha Siddiqui", role: "team-member", projectId: "next-build", phone: "+92-321-2345678" },
  { email: "hassan.dev@mail.com", password: "demo1234", displayName: "Hassan Raza", role: "team-member", projectId: "next-build", phone: "+92-333-3456789" },

  // ─── ShopSphere ──────────────────────────────────────────────────────
  { email: "admin@shopsphere.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "shopsphere", phone: "+92-300-1234567" },
  { email: "ahmed.customer@mail.com", password: "demo1234", displayName: "Ahmed Raza", role: "customer", projectId: "shopsphere", phone: "+92-300-1111111" },
  { email: "zainab.customer@mail.com", password: "demo1234", displayName: "Zainab Fatima", role: "customer", projectId: "shopsphere", phone: "+92-321-2222222" },
  { email: "kamran.customer@mail.com", password: "demo1234", displayName: "Kamran Yousaf", role: "customer", projectId: "shopsphere", phone: "+92-333-3333333" },

  // ─── ShopVerse Ecommerce ─────────────────────────────────────────────
  { email: "admin@shopverse.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "shopverse-ecommerce", phone: "+92-300-1234567" },
  { email: "usama.customer@mail.com", password: "demo1234", displayName: "Usama Tariq", role: "customer", projectId: "shopverse-ecommerce", phone: "+92-300-1111111" },
  { email: "rabia.customer@mail.com", password: "demo1234", displayName: "Rabia Khalid", role: "customer", projectId: "shopverse-ecommerce", phone: "+92-321-2222222" },

  // ─── University Management System ────────────────────────────────────
  { email: "admin@university.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "university-management-system", phone: "+92-300-1234567" },
  { email: "abdullah.student@university.io", password: "demo1234", displayName: "Abdullah Khatri", role: "student", projectId: "university-management-system", phone: "+92-300-1234567" },
  { email: "ayesha.student@university.io", password: "demo1234", displayName: "Ayesha Siddiqui", role: "student", projectId: "university-management-system", phone: "+92-321-2345678" },
  { email: "hassan.student@university.io", password: "demo1234", displayName: "Hassan Raza", role: "student", projectId: "university-management-system", phone: "+92-333-3456789" },
  { email: "dr.saira@university.io", password: "demo1234", displayName: "Dr. Saira Iqbal", role: "faculty", projectId: "university-management-system", phone: "+92-300-1112233" },
  { email: "dr.imran@university.io", password: "demo1234", displayName: "Dr. Imran Shah", role: "faculty", projectId: "university-management-system", phone: "+92-321-2223344" },

  // ─── World Explorer ──────────────────────────────────────────────────
  { email: "admin@worldexplorer.io", password: "demo1234", displayName: "Abdullah Khatri", role: "admin", projectId: "world-explorer", phone: "+92-300-1234567" },
  { email: "ali.traveler@mail.com", password: "demo1234", displayName: "Ali Hassan", role: "traveler", projectId: "world-explorer", phone: "+92-300-1111111" },
  { email: "sara.traveler@mail.com", password: "demo1234", displayName: "Sara Qureshi", role: "traveler", projectId: "world-explorer", phone: "+92-321-2222222" },
  { email: "omar.traveler@mail.com", password: "demo1234", displayName: "Omar Sheikh", role: "traveler", projectId: "world-explorer", phone: "+92-333-3333333" },
];

let created = 0;
let skipped = 0;
let currentProject = "";

for (const user of USERS) {
  if (user.projectId !== currentProject) {
    currentProject = user.projectId;
    console.log(cyan(`\n${currentProject}`));
  }

  try {
    // Try to create the Auth user.
    let uid;
    try {
      const record = await auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName,
      });
      uid = record.uid;
      created++;
      console.log(`  ${user.displayName} (${user.role}) — created`);
    } catch (err) {
      // User already exists — fetch instead.
      const code = (err)?.code;
      if (code === "auth/email-already-in-use") {
        const record = await auth.getUserByEmail(user.email);
        uid = record.uid;
        skipped++;
        console.log(`  ${user.displayName} (${user.role}) — already exists`);
      } else {
        throw err;
      }
    }

    // Upsert the Firestore profile.
    await db.collection("auth_users").doc(uid).set(
      {
        uid,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        projectId: user.projectId,
        phone: user.phone,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: "active",
      },
      { merge: true },
    );
  } catch (err) {
    console.log(`  ${user.displayName} — ERROR: ${(err).message}`);
  }
}

console.log(green(`\n✓ Created ${created} users, skipped ${skipped} (already existed).`));
console.log(yellow("\n  Demo password for all accounts: demo1234"));
console.log(dim("  Log in at any project's auth page using the email + password above.\n"));

process.exit(0);

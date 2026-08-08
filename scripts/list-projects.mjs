/**
 * List every project in Firestore, in display order.
 *
 * Useful for checking what is live without opening the console, and for
 * spotting missing cover images before they show up on the site.
 *
 * Run with: npm run list:projects
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Namespaced per app: collection(apps)/doc(portfolio)/collection(projects).
const PROJECTS_PATH = "projects";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const keyPath = resolve(root, "serviceAccountKey.json");

if (!existsSync(keyPath)) {
  console.error(
    "\nserviceAccountKey.json not found.\n" +
      "Firebase Console → Project Settings → Service accounts → Generate new private key\n",
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

const dim = (text) => `\x1b[2m${text}\x1b[0m`;
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const amber = (text) => `\x1b[33m${text}\x1b[0m`;

const snapshot = await db.collection(PROJECTS_PATH).orderBy("order", "asc").get();

console.log(`\n${snapshot.size} projects in ${serviceAccount.project_id}\n`);

let missingImages = 0;

snapshot.docs.forEach((document, index) => {
  const data = document.data();

  const link = data.demo ? green("live") : data.github ? dim("repo") : dim("—");
  const featured = data.featured ? "" : dim(" (hidden)");

  console.log(
    `  ${String(index + 1).padStart(2)}. ${String(data.title ?? document.id).padEnd(30)} ` +
      `${String(data.category ?? "").padEnd(26)} ${link}${featured}`,
  );

  // Flag cover art that would render broken.
  const imagePath = data.image?.startsWith("/")
    ? resolve(root, "public", data.image.slice(1))
    : null;

  if (imagePath && !existsSync(imagePath)) {
    console.log(`      ${amber("!")} missing image: public${data.image}`);
    missingImages += 1;
  }
});

if (missingImages > 0) {
  console.log(
    `\n${amber(`${missingImages} project(s) reference a cover image that does not exist.`)}`,
  );
}

console.log("");
process.exit(0);

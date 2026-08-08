/**
 * One-time migration of the local project list into Firestore.
 *
 * Uses the Firebase Admin SDK, which authenticates with a service account and
 * bypasses security rules. That means the public rules can stay locked down
 * (`allow write: if false`) permanently — only this script, run locally with
 * the key file present, can write.
 *
 * Setup:
 *   1. Firebase Console → Project Settings → Service accounts
 *   2. "Generate new private key" → save as serviceAccountKey.json in the
 *      project root (already gitignored)
 *   3. npm run seed:firestore
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Namespaced per app: collection(apps)/doc(portfolio)/collection(projects).
const PROJECTS_PATH = "projects";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

/* -------------------------------------------------------------------------- */
/*  Credentials                                                               */
/* -------------------------------------------------------------------------- */

const keyPath = resolve(root, "serviceAccountKey.json");

if (!existsSync(keyPath)) {
  console.error(
    "\nserviceAccountKey.json not found.\n\n" +
      "  1. Firebase Console → Project Settings → Service accounts\n" +
      '  2. Click "Generate new private key"\n' +
      `  3. Save the downloaded file as:\n     ${keyPath}\n\n` +
      "The file is gitignored, so it will not be committed.\n",
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

console.log(`Connected to project: ${serviceAccount.project_id}`);

/* -------------------------------------------------------------------------- */
/*  Load the local project list                                               */
/* -------------------------------------------------------------------------- */

/**
 * Extract the PROJECTS array from the TypeScript source.
 *
 * The file uses a template literal for GitHub URLs, so it cannot simply be
 * imported in a plain Node context. Substituting the template and evaluating
 * the array literal is simpler and more robust than parsing the AST.
 */
function loadProjects() {
  const source = readFileSync(
    resolve(root, "src", "data", "projects.ts"),
    "utf8",
  );

  const declaration = "export const PROJECTS: Project[] = [";
  const start = source.indexOf(declaration);
  if (start === -1) throw new Error("Could not locate the PROJECTS array.");

  // Start at the array's own opening bracket, not the one inside the
  // `Project[]` type annotation, which appears earlier on the same line.
  const arrayStart = start + declaration.length - 1;

  // Walk the source counting brackets to find the matching close.
  let depth = 0;
  let end = -1;
  for (let i = arrayStart; i < source.length; i++) {
    if (source[i] === "[") depth += 1;
    else if (source[i] === "]") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }

  if (end === -1) throw new Error("Unbalanced brackets in the PROJECTS array.");

  const literal = source
    .slice(arrayStart, end)
    .replace(
      /`\$\{siteConfig\.links\.github\}\/([a-z0-9-]+)`/g,
      (_, repo) => `"https://github.com/abdullahkhatri432-del/${repo}"`,
    );

  return new Function(`return ${literal};`)();
}

const projects = loadProjects();
console.log(`Loaded ${projects.length} projects from src/data/projects.ts\n`);

/* -------------------------------------------------------------------------- */
/*  Write                                                                     */
/* -------------------------------------------------------------------------- */

// A batch is atomic: either every document lands or none does.
const batch = db.batch();

projects.forEach((project, index) => {
  // `id` and `links` are dropped — Firestore keys by slug and stores the
  // links as flat fields, which are simpler to query.
  const { links, id: _ignored, ...rest } = project;
  void _ignored;

  const document = {
    ...rest,
    order: index,
    github: links?.github ?? null,
    demo: links?.demo ?? null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  // Keyed by slug so re-running updates rather than duplicating.
  batch.set(db.collection(PROJECTS_PATH).doc(project.slug), document, {
    merge: true,
  });

  const link = links?.demo ? "live" : links?.github ? "repo" : "—";
  console.log(
    `  ${String(index + 1).padStart(2)}. ${project.title.padEnd(28)} ${link}`,
  );
});

await batch.commit();

const snapshot = await db.collection(PROJECTS_PATH).get();

console.log(`\nCommitted ${projects.length} documents.`);
console.log(`Collection now holds ${snapshot.size} projects.`);
console.log("\nPublic write rules can stay locked — this script bypasses them.");

process.exit(0);

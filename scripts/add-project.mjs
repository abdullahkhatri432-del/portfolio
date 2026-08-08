/**
 * Add or update a project in Firestore, interactively.
 *
 * Uses the Admin SDK so the public write rules can stay locked down. Prompts
 * for each field, offers sensible defaults, and generates the cover art
 * placeholder path automatically.
 *
 * Run with: npm run add:project
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

/* -------------------------------------------------------------------------- */
/*  Credentials                                                               */
/* -------------------------------------------------------------------------- */

const keyPath = resolve(root, "serviceAccountKey.json");

if (!existsSync(keyPath)) {
  console.error(
    "\nserviceAccountKey.json not found.\n" +
      "Firebase Console → Project Settings → Service accounts → Generate new private key\n" +
      `Save it as: ${keyPath}\n`,
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

/* -------------------------------------------------------------------------- */
/*  Prompt helpers                                                            */
/* -------------------------------------------------------------------------- */

const rl = createInterface({ input: stdin, output: stdout });

const dim = (text) => `\x1b[2m${text}\x1b[0m`;
const cyan = (text) => `\x1b[36m${text}\x1b[0m`;
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;

/** Ask a question, returning the default when the answer is blank. */
async function ask(question, fallback = "") {
  const suffix = fallback ? dim(` (${fallback})`) : "";
  const answer = (await rl.question(`  ${question}${suffix}: `)).trim();
  return answer || fallback;
}

/** Ask until a non-empty answer is given. */
async function askRequired(question) {
  for (;;) {
    const answer = (await rl.question(`  ${question}: `)).trim();
    if (answer) return answer;
    console.log(red("    Required."));
  }
}

/** Ask for a comma-separated list. */
async function askList(question, fallback = "") {
  const raw = await ask(question, fallback);
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Present numbered choices. */
async function askChoice(question, choices, defaultIndex = 0) {
  console.log(`  ${question}`);
  choices.forEach((choice, index) => {
    const marker = index === defaultIndex ? cyan("→") : " ";
    console.log(`   ${marker} ${index + 1}. ${choice}`);
  });

  const raw = (await rl.question(`  Choose ${dim(`(${defaultIndex + 1})`)}: `)).trim();
  const index = raw ? Number(raw) - 1 : defaultIndex;

  return choices[Number.isInteger(index) && choices[index] ? index : defaultIndex];
}

async function askYesNo(question, fallback = true) {
  const raw = await ask(`${question} ${dim(fallback ? "[Y/n]" : "[y/N]")}`, "");
  if (!raw) return fallback;
  return /^y/i.test(raw);
}

/** URL-safe slug from a title. */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* -------------------------------------------------------------------------- */
/*  Presets                                                                   */
/* -------------------------------------------------------------------------- */

/** Accent colour and gradient paired per category, so cards stay coherent. */
const THEMES = {
  Ecommerce: { accent: "#7C3AED", gradient: "from-violet-600/25 via-fuchsia-500/10 to-transparent" },
  Marketplace: { accent: "#06B6D4", gradient: "from-cyan-500/25 via-sky-500/10 to-transparent" },
  "Database Design": { accent: "#22C55E", gradient: "from-emerald-500/25 via-teal-500/10 to-transparent" },
  "Computer Vision": { accent: "#8B5CF6", gradient: "from-violet-500/25 via-cyan-500/10 to-transparent" },
  "3D / Data Visualisation": { accent: "#22D3EE", gradient: "from-sky-500/25 via-cyan-500/10 to-transparent" },
  "Enterprise / Healthcare": { accent: "#14B8A6", gradient: "from-teal-500/25 via-sky-500/10 to-transparent" },
  "AI / Machine Learning": { accent: "#F472B6", gradient: "from-pink-500/25 via-purple-500/10 to-transparent" },
  "Developer Tool": { accent: "#F59E0B", gradient: "from-amber-500/25 via-orange-500/10 to-transparent" },
  Other: { accent: "#94A3B8", gradient: "from-slate-500/20 via-slate-400/5 to-transparent" },
};

const CATEGORIES = Object.keys(THEMES);
const STATUSES = ["Live", "Completed", "In Development", "Planned"];

/* -------------------------------------------------------------------------- */
/*  Main                                                                      */
/* -------------------------------------------------------------------------- */

console.log(`\n${cyan("Add a project")} — ${serviceAccount.project_id}\n`);

const existing = await db.collection("projects").get();
console.log(dim(`  ${existing.size} projects currently in the collection\n`));

const title = await askRequired("Title");
const slug = await ask("Slug", slugify(title));

// Warn rather than silently overwriting.
const duplicate = existing.docs.find((doc) => doc.id === slug);
if (duplicate) {
  console.log(
    `\n  ${red("!")} A project with slug "${slug}" already exists (${duplicate.data().title}).`,
  );
  const overwrite = await askYesNo("  Update it instead of creating a new one?", true);
  if (!overwrite) {
    console.log("\n  Cancelled.\n");
    rl.close();
    process.exit(0);
  }
}

const tagline = await askRequired("Tagline (one short line)");
const category = await askChoice("Category", CATEGORIES, 0);
const year = await ask("Year", String(new Date().getFullYear()));
const status = await askChoice("Status", STATUSES, 1);

console.log("");
const description = await askRequired("Short description (shown on the card)");
const longDescription = await ask("Long description (modal)", description);

console.log("");
const stack = await askList("Tech stack, comma separated");
const features = await askList("Key features, comma separated");

console.log("");
const github = await ask("GitHub URL", "");
const demo = await ask("Live demo URL", "");

console.log("");
const metrics = [];
for (let index = 1; index <= 3; index++) {
  const label = await ask(`Metric ${index} label`, "");
  if (!label) break;
  const value = await ask(`Metric ${index} value`, "");
  metrics.push({ label, value });
}

console.log("");
const featured = await askYesNo("Show in the featured list?", true);
const image = await ask("Cover image path", `/projects/${slug}.svg`);

const theme = THEMES[category] ?? THEMES.Other;

// New projects go before the "Next Project" placeholder, which sits last.
const placeholder = existing.docs.find((doc) => doc.id === "next-build");
const order = duplicate
  ? (duplicate.data().order ?? existing.size)
  : placeholder
    ? (placeholder.data().order ?? existing.size - 1)
    : existing.size;

const document = {
  slug,
  title,
  tagline,
  category,
  year,
  status,
  featured,
  order,
  description,
  longDescription,
  features,
  stack,
  metrics,
  gradient: theme.gradient,
  accent: theme.accent,
  image,
  github: github || null,
  demo: demo || null,
  updatedAt: FieldValue.serverTimestamp(),
};

if (!duplicate) {
  document.createdAt = FieldValue.serverTimestamp();
}

/* -- Confirm -------------------------------------------------------------- */

console.log(`\n${cyan("Review")}`);
console.log(`  ${title} ${dim(`(${slug})`)}`);
console.log(`  ${tagline}`);
console.log(`  ${category} · ${year} · ${status}${featured ? " · featured" : ""}`);
console.log(`  Stack:    ${stack.join(", ") || dim("none")}`);
console.log(`  Features: ${features.length} listed`);
console.log(`  Metrics:  ${metrics.map((m) => `${m.label} ${m.value}`).join(" · ") || dim("none")}`);
console.log(`  GitHub:   ${github || dim("none")}`);
console.log(`  Demo:     ${demo || dim("none")}`);
console.log(`  Image:    ${image}`);

const confirmed = await askYesNo(`\n  Save to Firestore?`, true);

if (!confirmed) {
  console.log("\n  Cancelled — nothing written.\n");
  rl.close();
  process.exit(0);
}

/* -- Write ---------------------------------------------------------------- */

// If this pushes past the placeholder, move the placeholder to the end.
if (!duplicate && placeholder) {
  await db
    .collection("projects")
    .doc("next-build")
    .update({ order: order + 1 });
}

await db.collection("projects").doc(slug).set(document, { merge: true });

const after = await db.collection("projects").get();

console.log(`\n  ${green("✓")} ${duplicate ? "Updated" : "Added"} "${title}"`);
console.log(dim(`  Collection now holds ${after.size} projects.`));

if (image.startsWith("/projects/") && !existsSync(resolve(root, "public", image.slice(1)))) {
  console.log(
    `\n  ${red("!")} Cover image not found at public${image}\n` +
      dim("    The card will render with a broken image until you add it.\n"),
  );
}

console.log(dim("\n  Redeploy or wait for revalidation (1 hour) to see it live.\n"));

rl.close();
process.exit(0);

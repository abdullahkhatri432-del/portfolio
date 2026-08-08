﻿import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { getDb } from "./firebase";
import type { Project } from "@/types";

/**
 * Firestore data access for the `projects` collection.
 *
 * Documents are ordered by an explicit `order` field rather than by creation
 * time, so the display sequence on the portfolio is controlled independently
 * of when a project was added.
 *
 * Every read is defensive: Firestore stores loosely-typed documents, and a
 * missing field must not crash the page.
 */

/**
 * Every project lives as a document in the top-level `projects` collection.
 *
 * A project that has its own application data keeps it in subcollections
 * beneath its own document -- for example projects/talentos/organizations --
 * so nothing belonging to one project ever sits outside it.
 */
const COLLECTION = "projects";

/** Firestore document shape, before normalisation. */
interface ProjectDoc {
  slug?: string;
  title?: string;
  tagline?: string;
  category?: string;
  year?: string;
  status?: string;
  featured?: boolean;
  order?: number;
  description?: string;
  longDescription?: string;
  features?: string[];
  stack?: string[];
  metrics?: { label: string; value: string }[];
  gradient?: string;
  accent?: string;
  image?: string;
  github?: string | null;
  demo?: string | null;
}

const VALID_STATUS = new Set([
  "Live",
  "In Development",
  "Completed",
  "Planned",
]);

/** Coerce a Firestore document into the strict Project type. */
function normalise(id: string, data: ProjectDoc): Project {
  const status = VALID_STATUS.has(data.status ?? "")
    ? (data.status as Project["status"])
    : "Completed";

  return {
    id,
    slug: data.slug ?? id,
    title: data.title ?? "Untitled project",
    tagline: data.tagline ?? "",
    category: data.category ?? "Project",
    year: data.year ?? "",
    status,
    featured: data.featured ?? true,
    description: data.description ?? "",
    longDescription: data.longDescription ?? data.description ?? "",
    features: Array.isArray(data.features) ? data.features : [],
    stack: Array.isArray(data.stack) ? data.stack : [],
    metrics: Array.isArray(data.metrics) ? data.metrics : [],
    gradient: data.gradient ?? "from-slate-500/20 via-slate-400/5 to-transparent",
    accent: data.accent ?? "#7C3AED",
    image: data.image ?? "/projects/coming-soon.svg",
    links: {
      // Firestore stores these flat; the app expects them nested.
      ...(data.github ? { github: data.github } : {}),
      ...(data.demo ? { demo: data.demo } : {}),
    },
  };
}

/**
 * Fetch every project, ordered for display.
 *
 * Returns an empty array when Firebase is not configured or the request
 * fails, so the page renders rather than erroring.
 */
export async function fetchProjects(): Promise<Project[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const snapshot = await getDocs(
      query(collection(db, COLLECTION), orderBy("order", "asc")),
    );

    return snapshot.docs.map((document) =>
      normalise(document.id, document.data() as ProjectDoc),
    );
  } catch (error) {
    console.error("[projects] fetch failed", error);
    return [];
  }
}

/** Fetch only the featured projects. */
export async function fetchFeaturedProjects(): Promise<Project[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const snapshot = await getDocs(
      query(
        collection(db, COLLECTION),
        where("featured", "==", true),
        orderBy("order", "asc"),
      ),
    );

    return snapshot.docs.map((document) =>
      normalise(document.id, document.data() as ProjectDoc),
    );
  } catch (error) {
    console.error("[projects] featured fetch failed", error);
    return [];
  }
}

/** Fetch one project by its slug. */
export async function fetchProjectBySlug(
  slug: string,
): Promise<Project | null> {
  const db = getDb();
  if (!db) return null;

  try {
    const snapshot = await getDocs(
      query(collection(db, COLLECTION), where("slug", "==", slug)),
    );

    const document = snapshot.docs[0];
    if (!document) return null;

    return normalise(document.id, document.data() as ProjectDoc);
  } catch (error) {
    console.error("[projects] slug fetch failed", error);
    return null;
  }
}

/** Fetch one project by document id. */
export async function fetchProjectById(id: string): Promise<Project | null> {
  const db = getDb();
  if (!db) return null;

  try {
    const snapshot = await getDoc(doc(db, COLLECTION, id));
    if (!snapshot.exists()) return null;

    return normalise(snapshot.id, snapshot.data() as ProjectDoc);
  } catch (error) {
    console.error("[projects] id fetch failed", error);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Writes                                                                    */
/* -------------------------------------------------------------------------- */

export interface ProjectInput {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status: Project["status"];
  featured: boolean;
  order: number;
  description: string;
  longDescription: string;
  features: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  gradient: string;
  accent: string;
  image: string;
  github?: string | null;
  demo?: string | null;
}

/** Add a project. Returns the new document id. */
export async function addProject(input: ProjectInput): Promise<string> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");

  const ref = await addDoc(collection(db, COLLECTION), {
    ...input,
    github: input.github ?? null,
    demo: input.demo ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return ref.id;
}

/** Update an existing project. */
export async function updateProject(
  id: string,
  patch: Partial<ProjectInput>,
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");

  await updateDoc(doc(db, COLLECTION, id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

/** Delete a project. */
export async function deleteProject(id: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured.");

  await deleteDoc(doc(db, COLLECTION, id));
}
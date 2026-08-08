"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

import type { Project } from "@/types";

export function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section border-b border-slate-200 bg-slate-50">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Production platforms and technical builds.
        </p>

        {projects.length === 0 && (
          <div className="card text-center text-slate-500">
            No projects loaded. Check Firestore connection.
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="card cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all"
              onClick={() => setSelected(project)}
            >
              {project.image && (
                <div className="relative -mx-6 -mt-6 mb-4 aspect-video overflow-hidden rounded-t-lg bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-900">
                  {project.title}
                </h3>
                <span
                  className={`badge ${
                    project.status === "Live"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Simple modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                {selected.title}
              </h3>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-slate-600">{selected.description}</p>

            {selected.metrics?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
                {selected.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-lg font-bold text-slate-900">
                      {m.value}
                    </div>
                    <div className="text-xs text-slate-500">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {selected.stack.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              {selected.links.demo && (
                <a
                  href={selected.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              {selected.links.github && (
                <a
                  href={selected.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <span className="text-xs font-medium">Code</span>
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

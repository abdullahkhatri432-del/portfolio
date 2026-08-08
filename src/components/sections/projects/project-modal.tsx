"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { Project } from "@/types";
import { premiumEase } from "@/utils/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/** Accessible detail dialog for a single project. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close details"
            onClick={onClose}
            className="bg-background/85 absolute inset-0 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.45, ease: premiumEase }}
            className="hide-scrollbar relative max-h-[88dvh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-white/12 bg-[#080d1f]/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          >
            {/* Cover */}
            <div className="relative aspect-[2/1] w-full overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d1f] via-[#080d1f]/40 to-transparent" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/80"
              >
                <X className="size-4" />
              </button>

              <div className="absolute bottom-5 left-6 sm:left-8">
                <Badge variant="secondary" size="sm" className="mb-2">
                  {project.category} · {project.year}
                </Badge>
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {project.title}
                </h3>
                <p className="text-muted text-sm">{project.tagline}</p>
              </div>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              {/* Metrics */}
              {project.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-center"
                    >
                      <p className="font-display text-xl font-bold text-white">
                        {metric.value}
                      </p>
                      <p className="text-subtle mt-0.5 text-[11px]">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div>
                <h4 className="font-display mb-3 text-sm font-semibold tracking-[0.18em] text-white uppercase">
                  Overview
                </h4>
                <p className="text-muted text-sm leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-display mb-3 text-sm font-semibold tracking-[0.18em] text-white uppercase">
                  Key Features
                </h4>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-muted flex items-start gap-2.5 text-sm"
                    >
                      <span
                        className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full"
                        style={{ background: `${project.accent}22` }}
                      >
                        <Check
                          className="size-2.5"
                          style={{ color: project.accent }}
                        />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div>
                <h4 className="font-display mb-3 text-sm font-semibold tracking-[0.18em] text-white uppercase">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline" size="md">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {(project.links.github || project.links.demo) && (
                <div className="flex flex-wrap gap-3 border-t border-white/8 pt-6">
                  {project.links.demo && (
                    <Button variant="primary" asChild>
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                        <ArrowUpRight />
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button variant="secondary" asChild>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

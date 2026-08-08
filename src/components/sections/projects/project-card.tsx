"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Info, Lock, LogIn } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { LoginSheet } from "./login-sheet";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

const statusVariant = {
  Live: "accent",
  "In Development": "secondary",
  Completed: "primary",
  Planned: "default",
} as const;

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const isPlanned = project.status === "Planned";
  const [showLogin, setShowLogin] = React.useState(false);
  // Alternate layout direction for a magazine-style rhythm.
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: premiumEase }}
      className="group relative"
    >
      <TiltCard intensity={5} sheen={false}>
        <div
          className={cn(
            "glass relative grid overflow-hidden rounded-[28px] transition-all duration-500",
            "hover:border-white/20 hover:shadow-[0_36px_100px_-40px_rgba(124,58,237,0.55)]",
            "lg:grid-cols-2",
          )}
        >
          {/* Gradient wash */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-100",
              project.gradient,
            )}
          />

          {/* ------------------------------------------------------- */}
          {/* Visual                                                   */}
          {/* ------------------------------------------------------- */}
          <div
            className={cn(
              "relative min-h-[240px] overflow-hidden sm:min-h-[300px] lg:min-h-[420px]",
              reversed && "lg:order-2",
            )}
          >
            <Image
              src={project.image}
              alt={`${project.title} interface preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading={index < 2 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            />

            {/* Scrim */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#050816]/85 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#050816]/60"
            />

            {/* Scan line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <div
                className="animate-scan h-16 w-full"
                style={{
                  background: `linear-gradient(180deg, transparent, ${project.accent}22, transparent)`,
                }}
              />
            </div>

            {/* Index */}
            <span className="absolute top-5 left-5 font-mono text-xs text-white/45">
              /{String(index + 1).padStart(2, "0")}
            </span>

            {/* Status */}
            <div className="absolute top-4 right-4">
              <Badge variant={statusVariant[project.status]} size="sm">
                {project.status === "Live" && (
                  <span className="relative flex size-1.5">
                    <span className="bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                    <span className="bg-accent relative inline-flex size-1.5 rounded-full" />
                  </span>
                )}
                {project.status}
              </Badge>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* Content                                                  */}
          {/* ------------------------------------------------------- */}
          <div
            className={cn(
              "relative flex flex-col justify-center gap-5 p-7 sm:p-9 lg:p-10",
              reversed && "lg:order-1",
            )}
          >
            <div>
              <div className="text-subtle mb-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-medium" style={{ color: project.accent }}>
                  {project.category}
                </span>
                <span aria-hidden>·</span>
                <span>{project.year}</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {project.title}
              </h3>
              <p className="text-secondary-soft mt-1.5 text-sm font-medium">
                {project.tagline}
              </p>
            </div>

            <p className="text-muted text-sm leading-relaxed sm:text-[15px]">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics.length > 0 && (
              <dl className="flex flex-wrap gap-x-8 gap-y-3 border-y border-white/8 py-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dd className="font-display text-lg font-bold text-white">
                      {metric.value}
                    </dd>
                    <dt className="text-subtle text-[11px]">{metric.label}</dt>
                  </div>
                ))}
              </dl>
            )}

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 6).map((tech) => (
                <Badge key={tech} size="sm">
                  {tech}
                </Badge>
              ))}
              {project.stack.length > 6 && (
                <Badge size="sm" variant="outline">
                  +{project.stack.length - 6}
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Button
                size="sm"
                variant="primary"
                onClick={() => onOpen(project)}
                data-cursor-label="Details"
              >
                <Info />
                Details
              </Button>

              {project.links.demo ? (
                <Button size="sm" variant="secondary" asChild>
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="Visit"
                    className="group/link"
                  >
                    Live Demo
                    <ArrowUpRight className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </Button>
              ) : (
                <Button size="sm" variant="outline" disabled>
                  <Lock />
                  {isPlanned ? "Coming Soon" : "Private"}
                </Button>
              )}

              {project.links.github && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                    data-cursor-label="Code"
                  >
                    <FaGithub />
                    Code
                  </a>
                </Button>
              )}

              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowLogin(true)}
                data-cursor-label="Login"
              >
                <LogIn />
                Login
              </Button>
            </div>
          </div>
        </div>
      </TiltCard>

      <LoginSheet
        open={showLogin}
        onOpenChange={setShowLogin}
        projectId={project.id}
        projectTitle={project.title}
      />
    </motion.article>
  );
}

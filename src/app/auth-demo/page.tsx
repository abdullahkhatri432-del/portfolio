"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGate } from "@/components/AuthGate";
import { LogoutButton } from "@/components/LogoutButton";

const PROJECTS = [
  { id: "ai-interview-simulator", label: "AI Interview Simulator" },
  { id: "gamevault-pro", label: "GameVault Pro" },
  { id: "hospital-erp", label: "Hospital ERP" },
  { id: "multi-vendor-marketplace", label: "Multi-Vendor Marketplace" },
  { id: "next-build", label: "Next Build" },
  { id: "shopsphere", label: "ShopSphere" },
  { id: "shopverse-ecommerce", label: "ShopVerse Ecommerce" },
  { id: "university-management-system", label: "University Management" },
  { id: "world-explorer", label: "World Explorer" },
];

export default function AuthDemoPage() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0].id);
  const { user } = useAuth();

  const current = PROJECTS.find((p) => p.id === activeProject)!;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
          Auth Demo
        </h1>
        <p style={{ color: "var(--color-muted)", margin: "0.25rem 0 0" }}>
          Firebase Auth + Firestore profiles. Each project has its own roles.
        </p>
        {user && (
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ color: "var(--color-muted)", fontSize: "0.875rem" }}>
              Logged in as <strong>{user.email}</strong>
            </span>
            <LogoutButton />
          </div>
        )}
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveProject(p.id)}
            style={{
              padding: "0.375rem 0.875rem",
              borderRadius: "0.5rem",
              border: "1px solid",
              borderColor: activeProject === p.id ? "var(--color-primary)" : "var(--color-border)",
              background: activeProject === p.id ? "var(--color-primary)" : "transparent",
              color: activeProject === p.id ? "white" : "var(--color-muted)",
              fontSize: "0.8125rem",
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <AuthGate projectId={current.id} projectLabel={current.label}>
        <div style={{ color: "var(--color-muted)", textAlign: "center", padding: "2rem 0" }}>
          <p>You are authenticated for <strong>{current.label}</strong>.</p>
          <p>Project-specific content would render here.</p>
        </div>
      </AuthGate>
    </div>
  );
}

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "./LoginForm";
import type { UserRole } from "@/lib/auth";

interface AuthGateProps {
  projectId: string;
  projectLabel: string;
  defaultRole?: UserRole;
  children: React.ReactNode;
}

/**
 * Shows the login form when signed out, children when signed in.
 * Use this to wrap any section that requires authentication.
 */
export function AuthGate({ projectId, projectLabel, defaultRole, children }: AuthGateProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-gate">
        <LoginForm
          projectId={projectId}
          projectLabel={projectLabel}
          defaultRole={defaultRole}
        />
      </div>
    );
  }

  return <>{children}</>;
}

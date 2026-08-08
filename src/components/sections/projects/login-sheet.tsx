"use client";

import * as React from "react";
import { X } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutButton } from "@/components/LogoutButton";

interface LoginSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectTitle: string;
}

/**
 * A slide-over panel that shows the auth form for a single project.
 * Triggered by the Login button on each project card.
 */
export function LoginSheet({ open, onOpenChange, projectId, projectTitle }: LoginSheetProps) {
  const { user } = useAuth();

  if (!open) return null;

  return (
    <div className="login-sheet-overlay" onClick={() => onOpenChange(false)}>
      <div className="login-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="login-sheet-header">
          <div>
            <h3>{projectTitle}</h3>
            <p>{user ? `Signed in as ${user.email}` : "Sign in or create an account"}</p>
          </div>
          <div className="login-sheet-actions">
            {user && <LogoutButton />}
            <button className="login-sheet-close" onClick={() => onOpenChange(false)} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        <LoginForm projectId={projectId} projectLabel={projectTitle} />
      </div>
    </div>
  );
}

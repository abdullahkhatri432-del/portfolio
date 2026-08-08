"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { logIn, signUp, resetPassword } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";

interface LoginFormProps {
  projectId: string;
  projectLabel: string;
  defaultRole?: UserRole;
  onSuccess?: () => void;
}

/**
 * Login / Signup / Forgot Password form.
 *
 * Everything happens client-side via Firebase Auth. The parent page decides
 * where to redirect through `onSuccess`.
 */
export function LoginForm({ projectId, projectLabel, defaultRole = "user", onSuccess }: LoginFormProps) {
  const { user, profile } = useAuth();
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(email, password);
      onSuccess?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!displayName.trim()) {
      setError("Name is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await signUp({ email, password, displayName, role, projectId });
      onSuccess?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email.trim()) {
      setError("Enter your email first");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setInfo("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // Already logged in — show the profile summary instead.
  if (user && profile) {
    return (
      <div className="auth-card">
        <div className="auth-profile">
          <div className="auth-avatar">{profile.displayName?.charAt(0).toUpperCase()}</div>
          <div>
            <p className="auth-name">{profile.displayName}</p>
            <p className="auth-meta">{profile.email}</p>
            <p className="auth-meta">
              {profile.role} &middot; {projectLabel}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>{projectLabel}</h2>
        <p className="auth-subtitle">
          {mode === "login" && "Log in to your account"}
          {mode === "signup" && "Create an account"}
          {mode === "reset" && "Reset your password"}
        </p>
      </div>

      {error && <div className="auth-error">{error}</div>}
      {info && <div className="auth-info">{info}</div>}

      {mode === "login" && (
        <form onSubmit={handleLogin} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
          <div className="auth-links">
            <button type="button" onClick={() => { setMode("signup"); setError(""); }}>
              Create account
            </button>
            <button type="button" onClick={() => { setMode("reset"); setError(""); }}>
              Forgot password?
            </button>
          </div>
        </form>
      )}

      {mode === "signup" && (
        <form onSubmit={handleSignUp} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Ali Khan"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Min 6 characters"
            />
          </label>
          <label>
            I am a
            <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              {getRoleOptions(projectId).map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
          <div className="auth-links">
            <button type="button" onClick={() => { setMode("login"); setError(""); }}>
              Already have an account?
            </button>
          </div>
        </form>
      )}

      {mode === "reset" && (
        <form onSubmit={handleReset} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </button>
          <div className="auth-links">
            <button type="button" onClick={() => { setMode("login"); setError(""); setInfo(""); }}>
              Back to login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Returns the role choices that make sense for each project.
 */
function getRoleOptions(projectId: string): { value: UserRole; label: string }[] {
  const common: { value: UserRole; label: string }[] = [
    { value: "user", label: "General User" },
  ];

  switch (projectId) {
    case "ai-interview-simulator":
      return [
        { value: "candidate", label: "Candidate" },
        { value: "admin", label: "Admin / Recruiter" },
      ];
    case "gamevault-pro":
      return [
        { value: "user", label: "Gamer / Customer" },
        { value: "admin", label: "Admin" },
      ];
    case "hospital-erp":
      return [
        { value: "patient", label: "Patient" },
        { value: "doctor", label: "Doctor" },
        { value: "admin", label: "Admin" },
      ];
    case "multi-vendor-marketplace":
      return [
        { value: "customer", label: "Customer" },
        { value: "vendor", label: "Vendor" },
        { value: "admin", label: "Admin" },
      ];
    case "next-build":
      return [
        { value: "team-member", label: "Team Member" },
        { value: "admin", label: "Admin / PM" },
      ];
    case "shopsphere":
    case "shopverse-ecommerce":
      return [
        { value: "customer", label: "Customer" },
        { value: "admin", label: "Admin" },
      ];
    case "university-management-system":
      return [
        { value: "student", label: "Student" },
        { value: "faculty", label: "Faculty" },
        { value: "admin", label: "Admin" },
      ];
    case "world-explorer":
      return [
        { value: "traveler", label: "Traveler" },
        { value: "admin", label: "Admin" },
      ];
    default:
      return common;
  }
}

/**
 * Translate Firebase error codes into human-readable messages.
 */
function getErrorMessage(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";

  const messages: Record<string, string> = {
    "auth/invalid-email": "That email address looks wrong.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/invalid-api-key": "Authentication is not configured correctly.",
  };

  return messages[code] ?? "Something went wrong. Please try again.";
}

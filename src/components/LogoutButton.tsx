"use client";

import { logOut } from "@/lib/auth";

export function LogoutButton({ onLogout }: { onLogout?: () => void }) {
  async function handleLogout() {
    await logOut();
    onLogout?.();
  }

  return (
    <button onClick={handleLogout} className="auth-logout">
      Log out
    </button>
  );
}

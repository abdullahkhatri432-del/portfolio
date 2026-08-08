"use client";

import * as React from "react";
import { Toaster } from "sonner";

/** Composes every client-side provider and global overlay. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        closeButton
        toastOptions={{
          style: {
            background: "#fff",
            border: "1px solid #e2e8f0",
            color: "#0f172a",
          },
        }}
      />
    </>
  );
}

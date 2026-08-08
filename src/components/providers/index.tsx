"use client";

import * as React from "react";
import { Toaster } from "sonner";

import { Cursor } from "./cursor";
import { LoadingScreen } from "./loading-screen";
import { PageTransition } from "./page-transition";
import { ScrollProgress } from "./scroll-progress";
import { SmoothScrollProvider } from "./smooth-scroll-provider";


/** Composes every client-side provider and global overlay. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (

      <SmoothScrollProvider>
        <LoadingScreen />
        <ScrollProgress />
        <Cursor />
        <PageTransition>{children}</PageTransition>
        <Toaster
        position="bottom-right"
        theme="dark"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "rgba(10, 15, 36, 0.92)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(18px)",
            color: "#fff",
          },
        }}

      />
      </SmoothScrollProvider>

  );
}

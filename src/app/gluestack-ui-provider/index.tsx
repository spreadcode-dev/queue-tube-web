"use client";

import React, { useEffect } from "react";

interface GluestackUIProviderProps {
  mode?: "light" | "dark";
  children: React.ReactNode;
}

export function GluestackUIProvider({
  mode = "dark",
  children,
}: GluestackUIProviderProps) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return <>{children}</>;
}

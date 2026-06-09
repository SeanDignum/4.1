"use client";

import type { ReactNode } from "react";
import { AppProvider, useAppContext } from "@/lib/app-context";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

function AppShellContent({ children }: { children: ReactNode }) {
  const { sidebarCollapsed } = useAppContext();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] pt-16 transition-all duration-300",
          sidebarCollapsed ? "pl-16" : "pl-64"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <AppShellContent>{children}</AppShellContent>
    </AppProvider>
  );
}

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ViewMode, DateRange } from "./types";

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("hr");
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        dateRange,
        setDateRange,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

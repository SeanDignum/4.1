"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  Lightbulb,
  Bot,
  DollarSign,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/app-context";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    mode: "all" as const,
  },
  {
    label: "Risk Analytics",
    href: "/risk-analytics",
    icon: AlertTriangle,
    mode: "all" as const,
  },
  {
    label: "Teams",
    href: "/teams",
    icon: Users,
    mode: "all" as const,
  },
  {
    label: "Recommendations",
    href: "/recommendations",
    icon: Lightbulb,
    mode: "all" as const,
  },
  {
    label: "AI Assistant Insights",
    href: "/ai-insights",
    icon: Bot,
    mode: "all" as const,
  },
  {
    label: "Executive Dashboard",
    href: "/executive",
    icon: DollarSign,
    mode: "executive" as const,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { viewMode, sidebarCollapsed, setSidebarCollapsed } = useAppContext();

  const visibleItems = navItems.filter(
    (item) => item.mode === "all" || item.mode === viewMode
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] flex-col border-r border-[#1E293B] bg-[#111827] transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <nav className="flex-1 space-y-1 p-3">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-[#1F2937] hover:text-white"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#1E293B] p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full justify-start gap-3 text-gray-300 hover:bg-[#1F2937] hover:text-white"
        >
          {sidebarCollapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <>
              <PanelLeftClose className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

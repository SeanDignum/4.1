"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Building2,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/lib/app-context";
import { currentUser, notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Header() {
  const { viewMode, setViewMode, dateRange, setDateRange } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-[#1E293B] bg-[#0F172A] px-6">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-white">
            Workforce Health OS
          </span>
        </div>

        <div className="relative hidden w-80 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams, risks, metrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-[#1E293B] bg-[#1E293B] pl-10 text-white placeholder:text-gray-400 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* View Mode Toggle */}
        <div className="hidden items-center gap-2 rounded-lg bg-[#1E293B] p-1 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("hr")}
            className={cn(
              "h-8 px-3 text-sm",
              viewMode === "hr"
                ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                : "text-gray-300 hover:bg-[#374151] hover:text-white"
            )}
          >
            HR View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("executive")}
            className={cn(
              "h-8 px-3 text-sm",
              viewMode === "executive"
                ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                : "text-gray-300 hover:bg-[#374151] hover:text-white"
            )}
          >
            Executive View
          </Button>
        </div>

        {/* Date Range Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hidden border-[#1E293B] bg-[#1E293B] text-white hover:bg-[#374151] hover:text-white sm:flex"
            >
              {dateRange === "today"
                ? "Today"
                : dateRange === "7d"
                  ? "Last 7 Days"
                  : dateRange === "30d"
                    ? "Last 30 Days"
                    : "Custom"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => setDateRange("today")}>
              Today
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("7d")}>
              Last 7 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("30d")}>
              Last 30 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("custom")}>
              Custom Range
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-300 hover:bg-[#1E293B] hover:text-white"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="border-b p-4">
              <h4 className="font-semibold">Notifications</h4>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "border-b p-4 last:border-0",
                    !notification.read && "bg-muted/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                    {notification.type === "risk" && (
                      <Badge variant="destructive" className="shrink-0">
                        Risk
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 text-gray-300 hover:bg-[#1E293B] hover:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium text-white">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {currentUser.role}
                </p>
              </div>
              <ChevronDown className="hidden h-4 w-4 lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{currentUser.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {currentUser.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building2 className="mr-2 h-4 w-4" />
              {currentUser.company}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

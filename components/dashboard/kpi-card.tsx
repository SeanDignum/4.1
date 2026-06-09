"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  status?: "success" | "warning" | "danger" | "neutral";
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  status = "neutral",
  icon,
  action,
  className,
}: KPICardProps) {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
    neutral: "text-foreground",
  };

  const trendColors = {
    positive: "text-success bg-success/10",
    negative: "text-destructive bg-destructive/10",
    neutral: "text-muted-foreground bg-muted",
  };

  const getTrendType = () => {
    if (trend === undefined || trend === 0) return "neutral";
    return trend > 0 ? "positive" : "negative";
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className={cn("text-3xl font-bold", statusColors[status])}>
              {value}
            </div>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {trend !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                trendColors[getTrendType()]
              )}
            >
              {trend > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : trend < 0 ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
              <span>
                {trend > 0 ? "+" : ""}
                {trend}%
              </span>
              {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
            </div>
          )}
        </div>
        {action && <div className="mt-4">{action}</div>}
      </CardContent>
    </Card>
  );
}

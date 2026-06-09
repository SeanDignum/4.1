"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, TrendingUp, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RiskAlert } from "@/lib/types";

interface RiskAlertsCardProps {
  alerts: RiskAlert[];
}

export function RiskAlertsCard({ alerts }: RiskAlertsCardProps) {
  const severityColors = {
    low: "bg-success/10 text-success border-success/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    critical: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Risk Alerts
        </CardTitle>
        <AlertTriangle className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.slice(0, 4).map((alert) => (
            <Link
              key={alert.id}
              href={`/risk-analytics?team=${alert.teamId}`}
              className="block"
            >
              <div className="group rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary">
                      {alert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">
                      {alert.teamName}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("shrink-0", severityColors[alert.severity])}
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    Impact: <span className="font-medium text-foreground">{alert.productivityImpact}%</span>
                  </span>
                  <span>
                    Cost: <span className="font-medium text-foreground">${(alert.costImpact / 1000).toFixed(0)}K</span>
                  </span>
                  {alert.trend === "rising" && (
                    <span className="flex items-center gap-1 text-destructive">
                      <TrendingUp className="h-3 w-3" />
                      Rising
                    </span>
                  )}
                  {alert.trend === "stable" && (
                    <span className="flex items-center gap-1">
                      <Minus className="h-3 w-3" />
                      Stable
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Button variant="outline" className="mt-4 w-full" asChild>
          <Link href="/risk-analytics">
            Go to Risks
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

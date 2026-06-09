"use client";

import { useState } from "react";
import { Activity, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { HealthMetrics } from "@/lib/types";

interface HealthIndexCardProps {
  metrics: HealthMetrics;
}

export function HealthIndexCard({ metrics }: HealthIndexCardProps) {
  const [open, setOpen] = useState(false);

  const getStatusColor = (value: number) => {
    if (value >= 75) return "text-success";
    if (value >= 50) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (value: number) => {
    if (value >= 75) return "bg-success";
    if (value >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const TrendIcon = metrics.trend > 0 ? TrendingUp : metrics.trend < 0 ? TrendingDown : Minus;
  const trendColor = metrics.trend > 0 ? "text-success" : metrics.trend < 0 ? "text-destructive" : "text-muted-foreground";

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Health Index
        </CardTitle>
        <Activity className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className={cn("text-4xl font-bold", getStatusColor(metrics.overall))}>
              {metrics.overall}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">out of 100</p>
          </div>
          <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
            <TrendIcon className="h-4 w-4" />
            <span>{metrics.trend > 0 ? "+" : ""}{metrics.trend}%</span>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4 w-full">
              View Breakdown
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Health Index Breakdown</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Chronic Health Risk</span>
                  <span className="font-medium">{metrics.chronic}%</span>
                </div>
                <Progress 
                  value={100 - metrics.chronic} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Lower is better - {metrics.chronic}% at elevated risk
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Stress Levels</span>
                  <span className="font-medium">{metrics.stress}%</span>
                </div>
                <Progress 
                  value={100 - metrics.stress} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Lower is better - {metrics.stress}% reporting high stress
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Activity Level</span>
                  <span className="font-medium">{metrics.activity}%</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div 
                    className={cn("h-full transition-all", getProgressColor(metrics.activity))} 
                    style={{ width: `${metrics.activity}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Higher is better - {metrics.activity}% meeting activity goals
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

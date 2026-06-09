"use client";

import { Bot, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AIAdoptionMetrics } from "@/lib/types";

interface AIAdoptionCardProps {
  metrics: AIAdoptionMetrics;
}

export function AIAdoptionCard({ metrics }: AIAdoptionCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          AI Assistant Adoption
        </CardTitle>
        <Bot className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-primary">
              {metrics.adoptionRate}%
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {metrics.activeUsers} of {metrics.totalUsers} users active
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            <span>+{metrics.trend}%</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Adoption Progress</span>
            <span className="font-medium">{metrics.adoptionRate}%</span>
          </div>
          <Progress value={metrics.adoptionRate} className="h-2" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">DAU/WAU Ratio</p>
            <p className="text-lg font-semibold">{(metrics.dauWau * 100).toFixed(0)}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Weekly Growth</p>
            <p className="text-lg font-semibold text-success">+{metrics.trend}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

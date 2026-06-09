"use client";

import Link from "next/link";
import { Users, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { teams } from "@/lib/mock-data";

export default function TeamsPage() {
  const severityColors = {
    low: "bg-success/10 text-success border-success/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    critical: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const getHealthColor = (value: number) => {
    if (value >= 75) return "bg-success";
    if (value >= 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">
            Overview of all teams and their health metrics
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{teams.length} teams</span>
          <span className="mx-2">|</span>
          <span>{teams.reduce((acc, t) => acc + t.headCount, 0)} total employees</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id} className="group relative overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{team.department}</p>
              </div>
              <Badge
                variant="outline"
                className={severityColors[team.riskLevel]}
              >
                {team.riskLevel}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {team.headCount} members
                </span>
                <div
                  className={cn(
                    "flex items-center gap-1",
                    team.trend > 0
                      ? "text-destructive"
                      : team.trend < 0
                        ? "text-success"
                        : "text-muted-foreground"
                  )}
                >
                  {team.trend > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : team.trend < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : (
                    <Minus className="h-3 w-3" />
                  )}
                  <span>
                    {team.trend > 0 ? "+" : ""}
                    {team.trend}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Health Index</span>
                  <span className="font-medium">{team.healthIndex}</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn("h-full transition-all", getHealthColor(team.healthIndex))}
                    style={{ width: `${team.healthIndex}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Stress</p>
                  <p className={cn(
                    "text-sm font-semibold",
                    team.stressLevel > 60 ? "text-destructive" : "text-foreground"
                  )}>
                    {team.stressLevel}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Activity</p>
                  <p className={cn(
                    "text-sm font-semibold",
                    team.activityLevel < 50 ? "text-warning" : "text-foreground"
                  )}>
                    {team.activityLevel}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">AI Usage</p>
                  <p className="text-sm font-semibold">{team.aiAdoption}%</p>
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/teams/${team.id}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

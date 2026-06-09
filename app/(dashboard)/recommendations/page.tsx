"use client";

import { useState } from "react";
import { Check, X, Lightbulb, TrendingUp, DollarSign, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { recommendations as initialRecommendations } from "@/lib/mock-data";
import type { Recommendation } from "@/lib/types";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [activeTab, setActiveTab] = useState("all");

  const priorityColors = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20",
  };

  const statusColors = {
    pending: "bg-muted text-muted-foreground",
    applied: "bg-success/10 text-success border-success/20",
    dismissed: "bg-muted text-muted-foreground line-through",
  };

  const handleApply = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, status: "applied" as const } : rec
      )
    );
  };

  const handleDismiss = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, status: "dismissed" as const } : rec
      )
    );
  };

  const filteredRecommendations = recommendations.filter((rec) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return rec.status === "pending";
    if (activeTab === "applied") return rec.status === "applied";
    if (activeTab === "dismissed") return rec.status === "dismissed";
    return true;
  });

  const stats = {
    total: recommendations.length,
    pending: recommendations.filter((r) => r.status === "pending").length,
    applied: recommendations.filter((r) => r.status === "applied").length,
    totalImpact: recommendations
      .filter((r) => r.status === "applied")
      .reduce((acc, r) => acc + r.impact.cost, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recommendations</h1>
          <p className="text-muted-foreground">
            AI-powered actions to improve workforce health
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Recommendations</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Lightbulb className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Actions</p>
                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              </div>
              <Zap className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applied</p>
                <p className="text-2xl font-bold text-success">{stats.applied}</p>
              </div>
              <Check className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projected Savings</p>
                <p className="text-2xl font-bold text-primary">
                  ${(stats.totalImpact / 1000).toFixed(0)}K
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({recommendations.length})</TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({recommendations.filter((r) => r.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="applied">
            Applied ({recommendations.filter((r) => r.status === "applied").length})
          </TabsTrigger>
          <TabsTrigger value="dismissed">
            Dismissed ({recommendations.filter((r) => r.status === "dismissed").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredRecommendations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No recommendations in this category</p>
                </CardContent>
              </Card>
            ) : (
              filteredRecommendations.map((rec) => (
                <Card
                  key={rec.id}
                  className={cn(
                    "transition-opacity",
                    rec.status === "dismissed" && "opacity-60"
                  )}
                >
                  <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                          <Badge
                            variant="outline"
                            className={priorityColors[rec.priority]}
                          >
                            {rec.priority} priority
                          </Badge>
                          {rec.status !== "pending" && (
                            <Badge
                              variant="outline"
                              className={statusColors[rec.status]}
                            >
                              {rec.status}
                            </Badge>
                          )}
                        </div>
                        {rec.teamName && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {rec.teamName}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span>
                            <span className="text-muted-foreground">Productivity: </span>
                            <span className="font-medium">+{rec.impact.productivity}%</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>
                            <span className="text-muted-foreground">Impact: </span>
                            <span className="font-medium text-primary">
                              ${(rec.impact.cost / 1000).toFixed(0)}K
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Problem
                        </p>
                        <p className="text-sm">{rec.problem}</p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Recommended Action
                        </p>
                        <p className="text-sm">{rec.action}</p>
                      </div>

                      {rec.status === "pending" && (
                        <div className="flex gap-2 pt-2">
                          <Button onClick={() => handleApply(rec.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            Apply
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleApply(rec.id)}
                          >
                            Mark as Done
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleDismiss(rec.id)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

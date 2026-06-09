"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  Lightbulb,
  Calendar,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { cn, formatNumber } from "@/lib/utils";
import { teams, healthTrendData } from "@/lib/mock-data";
import type { Team } from "@/lib/types";

export default function RiskAnalyticsPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  const sortedTeams = [...teams].sort((a, b) => b.riskScore - a.riskScore);

  const severityColors = {
    low: "bg-success/10 text-success border-success/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    critical: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return "text-destructive";
    if (score >= 40) return "text-warning";
    return "text-success";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Risk Analytics</h1>
          <p className="text-muted-foreground">
            Where are the problems and why?
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCompareDialogOpen(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Compare Periods
          </Button>
          <Button asChild>
            <Link href="/recommendations">
              <Lightbulb className="mr-2 h-4 w-4" />
              View Recommendations
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Risk by Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead className="hidden md:table-cell">Risk Type</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead className="hidden sm:table-cell">Productivity</TableHead>
                    <TableHead className="hidden lg:table-cell">Financial Impact</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTeams.map((team) => (
                    <TableRow
                      key={team.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedTeam?.id === team.id && "bg-muted/50"
                      )}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={cn("font-bold", getRiskScoreColor(team.riskScore))}>
                            {team.riskScore}
                          </span>
                          <Badge
                            variant="outline"
                            className={severityColors[team.riskLevel]}
                          >
                            {team.riskLevel}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{team.riskType}</TableCell>
                      <TableCell>
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
                            <TrendingUp className="h-4 w-4" />
                          ) : team.trend < 0 ? (
                            <TrendingDown className="h-4 w-4" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                          <span className="text-sm">
                            {team.trend > 0 ? "+" : ""}
                            {team.trend}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="text-destructive">-{team.productivityImpact}%</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        ${formatNumber(team.financialImpact)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/teams/${team.id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Detail Panel */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedTeam ? selectedTeam.name : "Select a Team"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTeam ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Why Risk Increased
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">Activity Level</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedTeam.activityLevel}%</span>
                        {selectedTeam.activityLevel < 60 && (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">Stress Signals</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedTeam.stressLevel}%</span>
                        {selectedTeam.stressLevel > 50 && (
                          <TrendingUp className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">Absenteeism Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedTeam.absenteeismRate}%</span>
                        {selectedTeam.absenteeismRate > 8 && (
                          <TrendingUp className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href={`/teams/${selectedTeam.id}`}>
                      Open Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/recommendations?team=${selectedTeam.id}`}>
                      <Lightbulb className="mr-2 h-4 w-4" />
                      View Recommendations
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center text-center text-muted-foreground">
                <p>Click on a team row to see detailed risk analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Compare Periods Dialog */}
      <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compare Periods</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="health"
                    stroke="var(--chart-2)"
                    strokeWidth={2}
                    dot={false}
                    name="Health Index"
                  />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="var(--chart-4)"
                    strokeWidth={2}
                    dot={false}
                    name="Stress Level"
                  />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={false}
                    name="Activity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Trend comparison over the last 6 months
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

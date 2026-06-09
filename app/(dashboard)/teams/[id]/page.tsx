"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Lightbulb,
  Download,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Brain,
  Calendar,
  Bot,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { cn } from "@/lib/utils";
import { teams, healthTrendData, aiUsageTrendData } from "@/lib/mock-data";

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const team = teams.find((t) => t.id === id);

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Team not found</h1>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

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
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{team.name}</h1>
              <Badge variant="outline" className={severityColors[team.riskLevel]}>
                {team.riskLevel} risk
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {team.department} &bull; {team.headCount} members
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/recommendations?team=${team.id}`}>
              <Lightbulb className="mr-2 h-4 w-4" />
              Get Recommendations
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Health Index
            </CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{team.healthIndex}</div>
            <div className="mt-2">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn("h-full transition-all", getHealthColor(team.healthIndex))}
                  style={{ width: `${team.healthIndex}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Absenteeism Rate
            </CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-3xl font-bold",
              team.absenteeismRate > 10 ? "text-destructive" : "text-foreground"
            )}>
              {team.absenteeismRate}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {team.absenteeismRate > 10 ? "Above" : "Within"} benchmark
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Productivity Index
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {100 - team.productivityImpact}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              -{team.productivityImpact}% from baseline
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Signals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Current Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Stress Level</span>
                {team.stressLevel > 50 ? (
                  <TrendingUp className="h-4 w-4 text-destructive" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-success" />
                )}
              </div>
              <div className="text-2xl font-bold">{team.stressLevel}%</div>
              <Progress value={team.stressLevel} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {team.stressLevel > 60 ? "Elevated - intervention needed" : "Within acceptable range"}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Activity Level</span>
                {team.activityLevel < 60 ? (
                  <TrendingDown className="h-4 w-4 text-warning" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-success" />
                )}
              </div>
              <div className="text-2xl font-bold">{team.activityLevel}%</div>
              <Progress value={team.activityLevel} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {team.activityLevel < 50 ? "Below target - encourage movement" : "Meeting activity goals"}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">AI Assistant Usage</span>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="text-2xl font-bold">{team.aiAdoption}%</div>
              <Progress value={team.aiAdoption} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {team.aiAdoption < 40 ? "Low adoption - needs promotion" : "Good engagement"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Health & Stress Trends</CardTitle>
          </CardHeader>
          <CardContent>
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
                    name="Health"
                  />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="var(--chart-4)"
                    strokeWidth={2}
                    name="Stress"
                  />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    name="Activity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Assistant Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aiUsageTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
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
                    dataKey="users"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    name="Active Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="var(--chart-5)"
                    strokeWidth={2}
                    name="Engagement %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t">
        <Button asChild>
          <Link href={`/recommendations?team=${team.id}`}>
            <Lightbulb className="mr-2 h-4 w-4" />
            Get Recommendations
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/teams">
            <Users className="mr-2 h-4 w-4" />
            Compare Teams
          </Link>
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
    </div>
  );
}

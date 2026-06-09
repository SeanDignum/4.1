"use client";

import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Users,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  ArrowRight,
  Shield,
  Percent,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  financialMetrics,
  financialTrendData,
  correlationData,
  teams,
  recommendations,
} from "@/lib/mock-data";

const benchmarkData = [
  { category: "Health Index", company: 72, industry: 68 },
  { category: "Absenteeism", company: 7.2, industry: 8.5 },
  { category: "Productivity", company: 88, industry: 82 },
  { category: "AI Adoption", company: 66, industry: 45 },
];

const correlationScatterData = [
  { health: 85, productivity: 95, team: "HR", size: 12 },
  { health: 79, productivity: 88, team: "Marketing", size: 24 },
  { health: 74, productivity: 82, team: "Finance", size: 18 },
  { health: 71, productivity: 78, team: "Engineering", size: 78 },
  { health: 68, productivity: 72, team: "Product", size: 28 },
  { health: 62, productivity: 65, team: "Sales", size: 45 },
  { health: 58, productivity: 58, team: "Support", size: 32 },
];

export default function ExecutiveDashboardPage() {
  const highRiskTeams = teams.filter((t) => t.riskLevel === "high" || t.riskLevel === "critical");
  const pendingRecommendations = recommendations.filter((r) => r.status === "pending" && r.priority === "high");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground">
            Financial impact and ROI of workforce health initiatives
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cost Impact
            </CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              ${(financialMetrics.totalCostImpact / 1000000).toFixed(2)}M
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Annual workforce health costs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Productivity Loss Cost
            </CardTitle>
            <TrendingDown className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(financialMetrics.productivityLossCost / 1000000).toFixed(2)}M
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Lost productivity value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Absenteeism Cost
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(financialMetrics.absenteeismCost / 1000).toFixed(0)}K
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Direct absence costs
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Program ROI
            </CardTitle>
            <Percent className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {financialMetrics.roi}%
            </div>
            <div className="flex items-center gap-1 text-sm text-success mt-1">
              <TrendingUp className="h-4 w-4" />
              <span>Above target (250%)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cost & Savings Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialTrendData}>
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
                  tickFormatter={(value) => `$${value / 1000}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, ""]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="var(--destructive)"
                  strokeWidth={2}
                  name="Health-related Costs"
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="var(--success)"
                  strokeWidth={2}
                  name="Program Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Savings & Impact */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Savings & Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Prevented Losses</span>
                <span className="text-lg font-bold text-success">
                  ${(financialMetrics.preventedLosses / 1000).toFixed(0)}K
                </span>
              </div>
              <Progress value={75} className="mt-2 h-2" />
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Productivity Improvement</span>
                <span className="text-lg font-bold text-success">
                  +{financialMetrics.productivityImprovement}%
                </span>
              </div>
              <Progress value={financialMetrics.productivityImprovement * 5} className="mt-2 h-2" />
            </div>

            {financialMetrics.claimsReduction && (
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Claims Reduction</span>
                  <span className="text-lg font-bold text-success">
                    ${(financialMetrics.claimsReduction / 1000).toFixed(0)}K
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Self-insured benefit</p>
              </div>
            )}

            {financialMetrics.highCostAvoidance && (
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">High-Cost Avoidance</span>
                  <span className="text-lg font-bold text-success">
                    ${(financialMetrics.highCostAvoidance / 1000).toFixed(0)}K
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Prevented high-cost cases</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Correlations */}
        <Card>
          <CardHeader>
            <CardTitle>Health vs Productivity Correlation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    type="number"
                    dataKey="health"
                    name="Health Index"
                    domain={[50, 100]}
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="productivity"
                    name="Productivity"
                    domain={[50, 100]}
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ZAxis type="number" dataKey="size" range={[50, 400]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-2 text-sm">
                            <p className="font-medium">{data.team}</p>
                            <p>Health: {data.health}</p>
                            <p>Productivity: {data.productivity}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter
                    data={correlationScatterData}
                    fill="var(--chart-1)"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-center text-muted-foreground">
              Bubble size indicates team size
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Risks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Financial Risk Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highRiskTeams.map((team) => (
              <div
                key={team.id}
                className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-sm text-muted-foreground">{team.riskType}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      team.riskLevel === "critical"
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                    )}
                  >
                    {team.riskLevel}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost Impact:</span>
                    <span className="font-medium text-destructive">
                      ${(team.financialImpact / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Productivity Loss:</span>
                    <span className="font-medium">{team.productivityImpact}%</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <Link href={`/teams/${team.id}`}>
                      Open Team
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/recommendations?team=${team.id}`}>
                      Mitigate
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations & Narrative */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Priority Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRecommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{rec.problem}</p>
                    </div>
                    <span className="text-sm font-medium text-primary shrink-0">
                      ${(rec.impact.cost / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="default" className="flex-1">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Postpone
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/recommendations">
                View All Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              AI Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="text-foreground font-medium">
                Key Insights for Q2 2024:
              </p>
              <ul className="space-y-2 mt-3">
                <li>
                  <strong>Cost drivers:</strong> Customer Support absenteeism and Sales team stress 
                  account for 58% of total workforce health costs this quarter.
                </li>
                <li>
                  <strong>ROI trajectory:</strong> Program ROI has improved from 280% to 342% 
                  over the past 3 months, primarily driven by reduced high-cost claims.
                </li>
                <li>
                  <strong>Risk forecast:</strong> Without intervention, projected Q3 costs will 
                  increase by 15% due to growing chronic health risks in Engineering.
                </li>
                <li>
                  <strong>Opportunity:</strong> Implementing the top 3 recommendations would 
                  generate $340K in annual savings with a 4-month payback period.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmarking */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Benchmarking</CardTitle>
          <CardDescription>How your organization compares to industry averages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="company" fill="var(--chart-1)" name="Your Company" radius={[0, 4, 4, 0]} />
                <Bar dataKey="industry" fill="var(--muted)" name="Industry Average" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t md:grid-cols-4">
            {benchmarkData.map((item) => (
              <div key={item.category} className="text-center">
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <p className={cn(
                  "text-lg font-bold",
                  item.company > item.industry ? "text-success" : "text-warning"
                )}>
                  {item.company > item.industry ? "+" : ""}
                  {((item.company - item.industry) / item.industry * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground">vs industry</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

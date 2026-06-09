"use client";

import {
  Bot,
  Users,
  TrendingUp,
  MessageSquare,
  Rocket,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { aiAdoptionMetrics, aiUsageTrendData, correlationData } from "@/lib/mock-data";

const topicDistribution = [
  { name: "Stress Management", value: 892, color: "var(--chart-1)" },
  { name: "Sleep Improvement", value: 654, color: "var(--chart-2)" },
  { name: "Nutrition", value: 421, color: "var(--chart-3)" },
  { name: "Exercise", value: 389, color: "var(--chart-4)" },
  { name: "Work-Life Balance", value: 356, color: "var(--chart-5)" },
];

const teamAdoption = [
  { team: "HR", adoption: 72 },
  { team: "Engineering", adoption: 67 },
  { team: "Product", adoption: 61 },
  { team: "Marketing", adoption: 56 },
  { team: "Finance", adoption: 45 },
  { team: "Sales", adoption: 34 },
  { team: "Support", adoption: 28 },
];

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Assistant Insights</h1>
          <p className="text-muted-foreground">
            Usage analytics and impact of the AI wellness assistant
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Rocket className="mr-2 h-4 w-4" />
            Boost Adoption
          </Button>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Launch Campaign
          </Button>
        </div>
      </div>

      {/* Adoption Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{aiAdoptionMetrics.activeUsers}</div>
            <p className="text-sm text-muted-foreground">
              of {aiAdoptionMetrics.totalUsers} total users
            </p>
            <Progress value={aiAdoptionMetrics.adoptionRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Adoption Rate
            </CardTitle>
            <Bot className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {aiAdoptionMetrics.adoptionRate}%
            </div>
            <div className="flex items-center gap-1 text-sm text-success mt-1">
              <TrendingUp className="h-4 w-4" />
              <span>+{aiAdoptionMetrics.trend}% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              DAU/WAU Ratio
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(aiAdoptionMetrics.dauWau * 100).toFixed(0)}%
            </div>
            <p className="text-sm text-muted-foreground">
              Strong daily engagement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Conversations
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,712</div>
            <p className="text-sm text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
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
                    stroke="var(--chart-2)"
                    strokeWidth={2}
                    name="Engagement %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {topicDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} conversations`, "Count"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {topicDistribution.map((topic) => (
                <div key={topic.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: topic.color }}
                  />
                  <span className="truncate text-muted-foreground">{topic.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Adoption by Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamAdoption} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="team"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Adoption"]}
                  />
                  <Bar
                    dataKey="adoption"
                    fill="var(--chart-1)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact: Usage vs Health Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="healthIndex"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Health Index", position: "bottom", offset: -5 }}
                  />
                  <YAxis
                    dataKey="productivity"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Productivity", angle: -90, position: "left" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="productivity"
                    stroke="var(--chart-2)"
                    strokeWidth={2}
                    dot={{ fill: "var(--chart-2)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Strong positive correlation: Higher AI usage correlates with better health outcomes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

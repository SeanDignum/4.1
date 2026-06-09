"use client";

import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import type { ProductivityMetrics } from "@/lib/types";
import { productivityByDeptData } from "@/lib/mock-data";

interface ProductivityCardProps {
  metrics: ProductivityMetrics;
}

export function ProductivityCard({ metrics }: ProductivityCardProps) {
  const getBarColor = (value: number) => {
    if (value >= 15) return "var(--destructive)";
    if (value >= 8) return "var(--warning)";
    return "var(--success)";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Productivity Impact
        </CardTitle>
        <Zap className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-3xl font-bold text-destructive">
            -{metrics.productivityLoss}%
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            productivity loss across workforce
          </p>
        </div>

        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productivityByDeptData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="department"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value}% loss`, "Impact"]}
              />
              <Bar dataKey="loss" radius={[0, 4, 4, 0]}>
                {productivityByDeptData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.loss)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2">
          <p className="text-xs font-medium text-muted-foreground">
            High Impact Teams:
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {metrics.highImpactTeams.slice(0, 3).map((team) => (
              <span
                key={team.name}
                className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive"
              >
                {team.name} ({team.loss}%)
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

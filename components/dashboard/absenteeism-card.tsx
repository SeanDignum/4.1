"use client";

import { Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { cn, formatNumber } from "@/lib/utils";
import type { AbsenteeismMetrics } from "@/lib/types";
import { absenteeismTrendData } from "@/lib/mock-data";

interface AbsenteeismCardProps {
  metrics: AbsenteeismMetrics;
}

export function AbsenteeismCard({ metrics }: AbsenteeismCardProps) {
  const TrendIcon = metrics.trend > 0 ? TrendingUp : TrendingDown;
  const trendColor = metrics.trend > 0 ? "text-destructive" : "text-success";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Absenteeism
        </CardTitle>
        <Calendar className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <div className="text-3xl font-bold">
                    {formatNumber(metrics.totalDaysLost)}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    days lost this period
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="w-64 p-4">
                <p className="mb-2 font-semibold">Top Reasons:</p>
                <ul className="space-y-1 text-sm">
                  {metrics.topReasons.map((reason) => (
                    <li key={reason.reason} className="flex justify-between">
                      <span>{reason.reason}</span>
                      <span className="font-medium">{reason.count} days</span>
                    </li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
            <TrendIcon className="h-4 w-4" />
            <span>{metrics.trend > 0 ? "+" : ""}{metrics.trend}%</span>
          </div>
        </div>

        <div className="mt-4 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={absenteeismTrendData}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="shortTerm"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={false}
                name="Short-term"
              />
              <Line
                type="monotone"
                dataKey="longTerm"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                dot={false}
                name="Long-term"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-chart-1" />
            <span>Short-term: {metrics.shortTerm} days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-chart-3" />
            <span>Long-term: {metrics.longTerm} days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import Link from "next/link";
import { Download, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HealthIndexCard } from "@/components/dashboard/health-index-card";
import { AbsenteeismCard } from "@/components/dashboard/absenteeism-card";
import { ProductivityCard } from "@/components/dashboard/productivity-card";
import { RiskAlertsCard } from "@/components/dashboard/risk-alerts-card";
import { AIAdoptionCard } from "@/components/dashboard/ai-adoption-card";
import {
  healthMetrics,
  absenteeismMetrics,
  productivityMetrics,
  riskAlerts,
  aiAdoptionMetrics,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            What&apos;s happening to the workforce?
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/teams">
              <Users className="mr-2 h-4 w-4" />
              View Teams
            </Link>
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <HealthIndexCard metrics={healthMetrics} />
        <AbsenteeismCard metrics={absenteeismMetrics} />
        <ProductivityCard metrics={productivityMetrics} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RiskAlertsCard alerts={riskAlerts} />
        <AIAdoptionCard metrics={aiAdoptionMetrics} />
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline" size="lg" asChild>
          <Link href="/risk-analytics">
            View Full Risk Analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

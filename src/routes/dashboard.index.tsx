import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Brain, ShieldCheck, Wallet, ArrowRight, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Sparkline } from "@/components/dashboard/sparkline";
import { StatusTrafficLight } from "@/components/dashboard/status-traffic-light";
import { mockMetrics } from "@/lib/dashboard-mocks";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{today}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Visión general</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Una mirada rápida al bienestar y la actividad reciente de tu familiar.
        </p>
      </motion.div>

      <StatusTrafficLight />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          icon={Brain}
          label="Dudas resueltas este mes"
          value={mockMetrics.dudasResueltas}
          delta={{ value: "+12 vs mes anterior", positive: true }}
          accent="text-blue-600"
          delay={0.05}
        />
        <MetricCard
          icon={ShieldCheck}
          label="Amenazas bloqueadas"
          value={mockMetrics.amenazasBloqueadas}
          delta={{ value: "2 críticas esta semana", positive: false }}
          accent="text-emerald-600"
          delay={0.1}
        />
        <MetricCard
          icon={Wallet}
          label="Efectivo estimado a mano"
          value={`${mockMetrics.efectivoEstimado} €`}
          delta={{ value: "Actualizado hace 2 h", positive: true }}
          accent="text-violet-600"
          delay={0.15}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border-border/40 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Actividad reciente</h3>
                <p className="text-xs text-muted-foreground">Últimas interacciones del asistente.</p>
              </div>
              <Link
                to="/dashboard/activity"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Ver todo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ActivityFeed limit={4} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="lg:col-span-2"
        >
          <Card className="flex h-full flex-col rounded-2xl border-border/40 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Monedero</h3>
                <p className="text-xs text-muted-foreground">Saldo digital — últimos 30 días.</p>
              </div>
              <Link
                to="/dashboard/finance"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Ver monedero
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-gray-900">2.310 €</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                +1,8%
              </span>
            </div>
            <div className="mt-auto">
              <Sparkline />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

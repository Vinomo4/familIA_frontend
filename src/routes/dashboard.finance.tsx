import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import {
  Area,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mockAnomalies, mockFinanceSeries, mockUpcomingCharges } from "@/lib/dashboard-mocks";

export const Route = createFileRoute("/dashboard/finance")({
  component: FinancePage,
});

function FinancePage() {
  const last = mockFinanceSeries[mockFinanceSeries.length - 1];
  const first = mockFinanceSeries[mockFinanceSeries.length - 8];
  const diffPct = (((last.digital - first.digital) / first.digital) * 100).toFixed(1);
  const positive = Number(diffPct) >= 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Monedero cruzado</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Saldo digital y efectivo estimado consolidados en una sola vista.
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border-border/40 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Evolución — últimos 30 días
                </h3>
                <p className="text-xs text-muted-foreground">
                  Saldo digital vs. efectivo estimado.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-500" />
                  Digital
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-violet-500" />
                  Efectivo
                </span>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockFinanceSeries}
                  margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    tickFormatter={(d) => d.slice(5)}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
                    formatter={(v: number) => `${v} €`}
                  />
                  <Line
                    type="monotone"
                    dataKey="digital"
                    stroke="hsl(217 91% 60%)"
                    strokeWidth={2}
                    dot={false}
                    name="Digital"
                  />
                  <Line
                    type="monotone"
                    dataKey="efectivo"
                    stroke="hsl(262 83% 58%)"
                    strokeWidth={2}
                    dot={false}
                    name="Efectivo"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="space-y-4 lg:col-span-2"
        >
          <Card className="rounded-2xl border-border/40 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Wallet className="h-3.5 w-3.5" />
              Saldo consolidado
            </div>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
              {(last.digital + last.efectivo).toLocaleString("es-ES")} €
            </p>
            <p
              className={cn(
                "mt-1 inline-flex items-center gap-1 text-xs font-medium",
                positive ? "text-emerald-600" : "text-red-600",
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {diffPct}% últimos 7 días
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-muted/60 p-3">
                <p className="text-xs text-muted-foreground">Digital</p>
                <p className="mt-1 font-semibold text-gray-900">{last.digital} €</p>
              </div>
              <div className="rounded-lg bg-muted/60 p-3">
                <p className="text-xs text-muted-foreground">Efectivo</p>
                <p className="mt-1 font-semibold text-gray-900">{last.efectivo} €</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-border/40 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Próximos cargos</h3>
            <ul className="mt-3 divide-y divide-border/50">
              {mockUpcomingCharges.map((c) => (
                <li key={c.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-gray-900">{c.concept}</p>
                    <p className="text-xs text-muted-foreground">{c.date}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{c.amount}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
      >
        <Card className="rounded-2xl border-border/40 p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Panel de anomalías</h3>
              <p className="text-xs text-muted-foreground">
                Detectadas por la auditoría automática nocturna.
              </p>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
              {mockAnomalies.length} sin revisar
            </Badge>
          </div>
          <div className="space-y-3">
            {mockAnomalies.map((a) => (
              <Alert
                key={a.id}
                className={cn(
                  "rounded-xl border",
                  a.severity === "critical"
                    ? "border-red-200 bg-red-50"
                    : "border-amber-200 bg-amber-50",
                )}
              >
                <AlertTriangle
                  className={cn(
                    "h-4 w-4",
                    a.severity === "critical" ? "text-red-600" : "text-amber-600",
                  )}
                />
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div>
                    <AlertTitle className="text-sm font-semibold">{a.title}</AlertTitle>
                    <AlertDescription className="text-xs text-gray-700">
                      {a.description} · <span className="text-muted-foreground">{a.date}</span>
                    </AlertDescription>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 rounded-lg bg-white">
                    Revisar
                  </Button>
                </div>
              </Alert>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

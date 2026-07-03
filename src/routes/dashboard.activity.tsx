import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { mockActivity, type EventType, type Severity } from "@/lib/dashboard-mocks";

export const Route = createFileRoute("/dashboard/activity")({
  component: ActivityPage,
});

function ActivityPage() {
  const [typeFilter, setTypeFilter] = useState<EventType | "all">("all");
  const [sevFilter, setSevFilter] = useState<Severity | "all">("all");

  const filtered = useMemo(() => {
    return mockActivity.filter((e) => {
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      if (sevFilter !== "all" && e.severity !== sevFilter) return false;
      return true;
    });
  }, [typeFilter, sevFilter]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Historial de actividad
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Auditoría cronológica y anonimizada de las interacciones del asistente.
        </p>
      </motion.div>

      <Card className="rounded-2xl border-border/40 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Tipo</label>
              <Select
                value={typeFilter}
                onValueChange={(v) => setTypeFilter(v as typeof typeFilter)}
              >
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="consulta">Consultas</SelectItem>
                  <SelectItem value="emergencia">Emergencias</SelectItem>
                  <SelectItem value="documento">Documentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Gravedad</label>
              <Select value={sevFilter} onValueChange={(v) => setSevFilter(v as typeof sevFilter)}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Aviso</SelectItem>
                  <SelectItem value="critical">Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{filtered.length} eventos</p>
        </div>
      </Card>

      <Card className="rounded-2xl border-border/40 p-5 shadow-sm">
        <ActivityFeed events={filtered} />
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No hay eventos que coincidan con los filtros.
          </p>
        )}
      </Card>
    </div>
  );
}

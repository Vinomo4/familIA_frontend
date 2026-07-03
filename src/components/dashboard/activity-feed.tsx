import { FileText, MessageCircle, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  mockActivity,
  type ActivityEvent,
  type EventType,
  type Severity,
} from "@/lib/dashboard-mocks";

const TYPE_META: Record<EventType, { label: string; icon: typeof FileText; color: string }> = {
  consulta: { label: "Consulta", icon: MessageCircle, color: "text-blue-600 bg-blue-50" },
  documento: { label: "Documento", icon: FileText, color: "text-violet-600 bg-violet-50" },
  emergencia: { label: "Emergencia", icon: ShieldAlert, color: "text-red-600 bg-red-50" },
};

const SEVERITY_META: Record<Severity, { label: string; className: string }> = {
  info: { label: "Info", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" },
  warning: { label: "Aviso", className: "bg-amber-100 text-amber-700 hover:bg-amber-100" },
  critical: { label: "Crítico", className: "bg-red-100 text-red-700 hover:bg-red-100" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface ActivityFeedProps {
  limit?: number;
  events?: ActivityEvent[];
}

export function ActivityFeed({ limit, events = mockActivity }: ActivityFeedProps) {
  const list = limit ? events.slice(0, limit) : events;

  return (
    <ul className="divide-y divide-border/50">
      {list.map((event) => {
        const meta = TYPE_META[event.type];
        const sev = SEVERITY_META[event.severity];
        const Icon = meta.icon;
        return (
          <li key={event.id} className="flex items-start gap-3 py-3">
            <div
              className={cn(
                "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
                meta.color,
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs text-muted-foreground">
                  {formatDate(event.timestamp)}
                </p>
                <Badge variant="secondary" className={cn("text-[10px]", sev.className)}>
                  {sev.label}
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-gray-900">{event.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

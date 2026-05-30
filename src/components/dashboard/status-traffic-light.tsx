import { motion } from "framer-motion";
import { Phone, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "verde" | "amarillo" | "rojo";

const STATUS_CONFIG: Record<
  Status,
  { label: string; description: string; dot: string; ring: string; icon: typeof CheckCircle2; bg: string }
> = {
  verde: {
    label: "Todo en orden",
    description: "No hay incidencias. El asistente acompaña con normalidad.",
    dot: "bg-emerald-500",
    ring: "shadow-[0_0_0_8px_rgba(16,185,129,0.15)]",
    icon: CheckCircle2,
    bg: "from-emerald-50 to-white",
  },
  amarillo: {
    label: "Atención leve",
    description: "Se ha detectado una incidencia menor o una duda resuelta por la IA.",
    dot: "bg-amber-500",
    ring: "shadow-[0_0_0_8px_rgba(245,158,11,0.18)]",
    icon: AlertTriangle,
    bg: "from-amber-50 to-white",
  },
  rojo: {
    label: "Alerta crítica activa",
    description: "Posible intento de estafa en curso. Contacta cuanto antes con tu familiar.",
    dot: "bg-red-500",
    ring: "shadow-[0_0_0_8px_rgba(239,68,68,0.2)]",
    icon: ShieldAlert,
    bg: "from-red-50 to-white",
  },
};

export function StatusTrafficLight() {
  const [status, setStatus] = useState<Status>("verde");
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br p-6 shadow-sm sm:p-8",
        cfg.bg,
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative flex size-16 shrink-0 items-center justify-center">
            <motion.span
              className={cn("absolute inline-flex h-full w-full rounded-full", cfg.dot, "opacity-30")}
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className={cn("relative inline-flex size-10 rounded-full", cfg.dot, cfg.ring)} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              Estado en vivo
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{cfg.label}</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">{cfg.description}</p>
          </div>
        </div>

        {status === "rojo" ? (
          <Button size="lg" variant="destructive" className="h-12 gap-2 rounded-xl px-6 text-base font-semibold">
            <Phone className="h-5 w-5" />
            Llamar a mi familiar ahora
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Demo:</span>
            {(["verde", "amarillo", "rojo"] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "rounded-full border border-border/60 bg-white px-3 py-1 text-xs capitalize transition hover:border-foreground/40",
                  status === s && "border-foreground/60 font-semibold",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {status === "rojo" && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Cambiar estado demo:</span>
          {(["verde", "amarillo", "rojo"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-full border border-border/60 bg-white px-3 py-1 text-xs capitalize transition hover:border-foreground/40",
                status === s && "border-foreground/60 font-semibold",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

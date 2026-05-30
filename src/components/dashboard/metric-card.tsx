import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delta?: { value: string; positive?: boolean };
  accent?: string;
  delay?: number;
}

export function MetricCard({ icon: Icon, label, value, delta, accent = "text-primary", delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card className="rounded-2xl border-border/40 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{value}</p>
            {delta && (
              <p
                className={cn(
                  "mt-1 text-xs font-medium",
                  delta.positive ? "text-emerald-600" : "text-red-600",
                )}
              >
                {delta.value}
              </p>
            )}
          </div>
          <div className={cn("flex size-10 items-center justify-center rounded-xl bg-muted", accent)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

"use client";

import React, { useState } from "react";
import { CircleCheck, PlusIcon, ShieldCheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

import { Badge } from "./badge";
import { Button } from "./button";
import { AestheticLayout } from "@/components/ui/aesthetic-layout";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface PricingComparisonProps {
  activePlan?: string | null;
  onSelectPlan: (planId: "basico" | "pro") => void;
  showBackButton?: boolean;
  showBackground?: boolean;
}

export function PricingComparison({
  activePlan,
  onSelectPlan,
  showBackButton = true,
  showBackground = true,
}: PricingComparisonProps) {
  const [isYearly, setIsYearly] = useState(false);

  const basicFeatures = [
    "Acceso completo a Voz, Visión y Alertas",
    "1 Mayor y 1 Tutor vinculado",
    "50 consultas mensuales",
    "Modelos de IA estándar",
  ];

  const proFeatures = [
    "Acceso completo a Voz, Visión y Alertas",
    "Hasta 4 Mayores y 4 Tutores vinculados",
    "150 consultas mensuales por persona",
    "Modelos de IA de última generación",
  ];

  return (
    <AestheticLayout
      maxWidthClassName="max-w-2xl"
      className="relative"
      showBackButton={showBackButton}
      showBackground={showBackground}
    >
      <motion.div
        animate={{ scale: activePlan ? 0.97 : 1, opacity: activePlan ? 0.35 : 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
        style={{ pointerEvents: activePlan ? "none" : "auto" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-4 text-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border bg-white px-4 py-1 font-mono text-xs shadow-sm">
              Precios
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
            Planes adaptados a tu familia
          </h2>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            Elige el nivel de protección y acompañamiento financiero ideal para tus mayores
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 text-sm font-medium">
            <span
              className={cn(
                "transition-colors",
                !isYearly ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              Mensual
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-zinc-900"
            />
            <span
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                isYearly ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              Anual
              <span className="pl-0.5 font-mono text-[11px] font-medium tracking-tight text-emerald-600">
                (Ahorra 2 meses)
              </span>
            </span>
          </div>
        </motion.div>

        <div className="relative grid gap-2 rounded-[1.75rem] border border-white/70 bg-white/55 p-3 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.28)] backdrop-blur-sm md:grid-cols-2 md:gap-0">
          <Card className="flex w-full flex-col justify-between rounded-[1.4rem] border border-white/40 bg-white/35 px-4 pb-4 pt-5 shadow-none backdrop-blur-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900">Básico</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Ideal para asegurar la tranquilidad y el día a día financiero de un progenitor
                </p>
              </div>

              <div className="flex min-h-[72px] flex-col justify-center text-left">
                {isYearly ? (
                  <motion.div
                    key="basico-anual"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col text-left"
                  >
                    <span className="text-xs font-medium text-muted-foreground line-through">
                      95,88 €
                    </span>
                    <div className="relative flex items-end gap-1.5 text-xl text-muted-foreground">
                      <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                        79
                        <span className="align-super ml-0.5 text-xl font-bold tracking-normal md:text-2xl">
                          ,99
                        </span>
                      </span>
                      <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                        €
                      </span>
                      <span className="pb-0.5 text-sm text-muted-foreground">/año</span>
                      <span className="animate-pulse whitespace-nowrap pb-1.5 pl-1.5 text-xs font-bold tracking-tight text-emerald-600">
                        ¡Ahorras 16€!
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="basico-mensual"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full items-center gap-1.5 pt-4 text-xl text-muted-foreground"
                  >
                    <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                      7
                      <span className="align-super ml-0.5 text-xl font-bold tracking-normal md:text-2xl">
                        ,99
                      </span>
                    </span>
                    <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                      €
                    </span>
                    <span className="pb-0.5 text-sm text-muted-foreground">/mes</span>
                  </motion.div>
                )}
              </div>

              <Separator className="mt-2 bg-gray-100" />

              <ul className="space-y-3 pt-1 text-sm text-gray-600">
                {basicFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 md:min-h-[40px]">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Button
                className="w-full cursor-pointer font-medium"
                variant="outline"
                onClick={() => onSelectPlan("basico")}
              >
                Da el primer paso
              </Button>
            </div>
          </Card>

          <Card className="relative flex w-full flex-col justify-between rounded-[1.4rem] border border-white/40 bg-white/45 px-4 pb-4 pt-5 shadow-none backdrop-blur-sm">
            <div className="z-10 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Profesional</h3>
                  <Badge
                    variant="default"
                    className="bg-zinc-900 px-2 py-0 text-[10px] text-white shadow-sm hover:bg-zinc-900"
                  >
                    Popular
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  La solución completa para gestionar a toda la familia desde un mismo lugar
                </p>
              </div>

              <div className="flex min-h-[72px] flex-col justify-center text-left">
                {isYearly ? (
                  <motion.div
                    key="pro-anual"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col text-left"
                  >
                    <span className="text-xs font-medium text-muted-foreground line-through">
                      239,88 €
                    </span>
                    <div className="relative flex items-end gap-1.5 text-xl text-muted-foreground">
                      <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                        199
                        <span className="align-super ml-0.5 text-xl font-bold tracking-normal md:text-2xl">
                          ,99
                        </span>
                      </span>
                      <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                        €
                      </span>
                      <span className="pb-0.5 text-sm text-muted-foreground">/año</span>
                      <span className="animate-pulse whitespace-nowrap pb-1.5 pl-1.5 text-xs font-bold tracking-tight text-emerald-600">
                        ¡Ahorras 40€!
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pro-mensual"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full items-center gap-1.5 pt-4 text-xl text-muted-foreground"
                  >
                    <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                      19
                      <span className="align-super ml-0.5 text-xl font-bold tracking-normal md:text-2xl">
                        ,99
                      </span>
                    </span>
                    <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                      €
                    </span>
                    <span className="pb-0.5 text-sm text-muted-foreground">/mes</span>
                  </motion.div>
                )}
              </div>

              <Separator className="mt-2 bg-gray-100" />

              <ul className="space-y-3 text-sm text-gray-600">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 md:min-h-[40px]">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="z-10 mt-8">
              <Button
                className="w-full cursor-pointer font-medium shadow-sm"
                onClick={() => onSelectPlan("pro")}
              >
                Empieza ahora
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-x-2 pt-2 text-sm text-muted-foreground">
          <ShieldCheckIcon className="size-4 text-emerald-500" />
          <span>Acceso a todas las características sin costes ocultos.</span>
        </div>
      </motion.div>
    </AestheticLayout>
  );
}

export function Pricing() {
  const navigate = useNavigate();

  return <PricingComparison onSelectPlan={() => navigate({ to: "/auth/signup" })} />;
}

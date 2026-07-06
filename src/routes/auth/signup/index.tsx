import { createFileRoute } from "@tanstack/react-router";
import { Pricing as PricingComplete } from "@/components/ui/pricing-complete";
import { z } from "zod";

const pricingSearchSchema = z.object({
  plan: z.enum(["basico_mensual", "basico_anual", "pro_mensual", "pro_anual"]).optional(),
});

export const Route = createFileRoute("/auth/signup/")({
  validateSearch: (search) => pricingSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "FamilIA — Elegir plan" },
      {
        name: "description",
        content: "Elige tu plan para continuar con tu experiencia en FamilIA.",
      },
    ],
  }),
  component: AuthSignup,
});

function AuthSignup() {
  return <PricingComplete />;
}

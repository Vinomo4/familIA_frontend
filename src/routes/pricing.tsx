import { createFileRoute } from "@tanstack/react-router";
import { Pricing } from "@/components/ui/pricing";
import { z } from "zod";

// 1. Updated validation schema supporting combined product and period selectors
const pricingSearchSchema = z.object({
  plan: z.enum(["basico_mensual", "basico_anual", "pro_mensual", "pro_anual"]).optional(),
});

export const Route = createFileRoute("/pricing")({
  validateSearch: (search) => pricingSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "FamilIA — Precios" },
      {
        name: "description",
        content: "Conoce los planes de FamilIA y elige la opción ideal para tu familia.",
      },
    ],
  }),
  component: PricingRoute,
});

function PricingRoute() {
  return <Pricing />;
}
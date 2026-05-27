import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Users, Heart } from "lucide-react";
import HeroSection from "@/components/ui/hero-section-9";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FamilIA — Protección y tranquilidad para tu familia" },
      {
        name: "description",
        content:
          "Inclusión financiera y protección contra fraudes para personas mayores. Cuida a quien más quieres con FamilIA.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <HeroSection
        title={
          <>
            Protege a quien más quieres{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">
              de las estafas
            </span>
          </>
        }
        subtitle="FamilIA acompaña a las personas mayores con una asistente de voz sencilla y avisa a la familia ante cualquier intento de fraude. Tranquilidad para todos, todos los días."
        actions={[
          {
            text: "Proteger ahora — Prueba gratuita",
            onClick: () => alert("Próximamente"),
            variant: "default",
          },
          {
            text: "Vista Mayor (demo)",
            onClick: () => navigate({ to: "/elder" }),
            variant: "outline",
          },
        ]}
        stats={[
          { value: "+12K", label: "Familias protegidas", icon: <Users className="h-5 w-5" /> },
          { value: "98%", label: "Estafas detectadas", icon: <ShieldCheck className="h-5 w-5" /> },
          { value: "24/7", label: "Acompañamiento", icon: <Heart className="h-5 w-5" /> },
        ]}
        images={[
          "https://images.unsplash.com/photo-1556889882-73ea40694a86?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop",
        ]}
      />
    </main>
  );
}

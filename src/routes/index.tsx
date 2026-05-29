import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, MessageCircle, Heart } from "lucide-react";
import HeroSection from "@/components/ui/hero-section-9";
import { SimpleHeader } from "@/components/ui/simple-header";

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
      <SimpleHeader />
      <HeroSection
        title="Protege el dinero de tus padres sin quitarles su independencia."
        subtitle="Ellos usan una herramienta de voz muy sencilla para entender el banco. Tú recibes alertas en tiempo real ante comisiones abusivas o fraudes."
        actions={[
          // Primary CTA: familiar -> pricing/register flow
          // Secondary CTA: elder -> share with family via WhatsApp or Web Share API
          {
            text: "Proteger a mis padres ahora - Prueba gratuita",
            onClick: () => navigate({ to: "/auth/register" }),
            variant: "default",
          },
          {
            text: "Quiero que mi familia me lo instale",
            onClick: () => {
              const message = `Hola, me gustaría que me instales FamilIA, un asistente de voz que me ayuda con mis gestiones bancarias y me protege de fraudes. ¿Podrías ayudarme? ${window.location.origin}/auth/register`;
              if (navigator.share) {
                navigator
                  .share({ title: "FamilIA — Ayúdame a instalarlo", text: message })
                  .catch(() => {
                    window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
                  });
              } else {
                window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
              }
            },
            variant: "outline",
          },
        ]}
        stats={[
          {
            value: "Bloqueo Anti-Fraude",
            label: "Detectamos y bloqueamos fraudes y enlaces maliciosos.",
            icon: <ShieldCheck className="h-5 w-5" />,
          },
          {
            value: "Traductor Bancario",
            label: "Convertimos cartas y recibos en mensajes de voz claros.",
            icon: <MessageCircle className="h-5 w-5" />,
          },
          {
            value: "Cero Barreras Digitales",
            label: "Interfaz para la tercera edad: sin teclados ni contraseñas.",
            icon: <Heart className="h-5 w-5" />,
          },
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

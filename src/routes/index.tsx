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
        highlightWord="independencia" // Le indicamos al componente qué palabra pintar de verde
        subtitle="Ellos usan una herramienta de voz muy sencilla para entender el banco. Tú recibes alertas en tiempo real ante comisiones abusivas o fraudes."
        actions={[
          {
            text: "Comenzar",
            onClick: () => navigate({ to: "/auth/signup" }),
            variant: "default",
            className: "bg-[#34d399] hover:bg-[#2ebc89] text-gray-900",
          },
          {
            text: "Quiero que mi familia me lo instale",
            onClick: () => {
              const message = `Hola, me gustaría que me instales FamilIA, un asistente para ayudarme con el banco.`;
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
            icon: <ShieldCheck className="h-6 w-6" />,
          },
          {
            value: "Traductor Bancario",
            label: "Convertimos cartas y recibos en mensajes de voz claros.",
            icon: <MessageCircle className="h-6 w-6" />,
          },
          {
            value: "Cero Barreras Digitales",
            label: "Interfaz para la tercera edad: sin teclados ni contraseñas.",
            icon: <Heart className="h-6 w-6" />,
          },
        ]}
        images={[
          "https://images.unsplash.com/photo-1580869318757-a6c605b061ed?q=80&w=687&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1758523668802-53f1e40977ba?q=80&w=1332&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1758686254247-af5bc1f195a5?q=80&w=1332&auto=format&fit=crop",
        ]}
      />
    </main>
  );
}
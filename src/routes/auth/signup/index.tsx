// src/routes/auth/signup/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PortalSelection } from "@/components/ui/portal-selection";

export const Route = createFileRoute("/auth/signup/")({
  head: () => ({
    meta: [
      { title: "Acceso a FamilIA" },
      {
        name: "description",
        content: "Elige el tipo de acceso para continuar con tu experiencia en FamilIA.",
      },
    ],
  }),
  component: AuthSignup,
});

function AuthSignup() {
  const handleElderShare = () => {
    // Usamos la misma estructura de tracking con ?ref=elder de tu landing page
    const message = `Hola, me gustaría que me instales FamilIA, un asistente de voz que me ayuda con mis gestiones bancarias y me protege de fraudes. ¿Podrías ayudarme? ${window.location.origin}/?ref=elder`;

    if (navigator.share) {
      navigator.share({ title: "FamilIA — Ayúdame a instalarlo", text: message }).catch(() => {
        window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
      });
    } else {
      window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
    }
  };

  return (
    <PortalSelection
      pageTitle="Únete a FamilIA"
      pageSubtitle="Selecciona el tipo de cuenta que deseas crear para comenzar"
      tutorConfig={{
        title: "Registro Tutor",
        description:
          "Crea tu perfil para configurar el espacio seguro de tus padres, gestionar su suscripción y coordinar alertas de seguridad.",
        linkText: "Registrarme como familiar",
        linkTo: "/auth/signup/tutor",
      }}
      elderConfig={{
        title: "Registro para Mayores",
        description:
          "Pide ayuda a tu familia para empezar a disfrutar de tu propio asistente de voz sin lidiar con contraseñas ni procesos complejos.",
        linkText: "Quiero que mi familia me lo instale",
        onClick: handleElderShare, // 👈 Pasamos la función nativa en lugar de linkTo
      }}
    />
  );
}

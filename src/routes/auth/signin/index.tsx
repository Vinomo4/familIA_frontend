// src/routes/auth/signin.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PortalSelection } from "@/components/ui/portal-selection";

export const Route = createFileRoute("/auth/signin/")({
  head: () => ({
    meta: [
      { title: "Iniciar Sesión - FamilIA" },
      {
        name: "description",
        content: "Inicia sesión en tu cuenta de FamilIA.",
      },
    ],
  }),
  component: AuthSignin,
});

function AuthSignin() {
  return (
    <PortalSelection
      pageTitle="Bienvenido de nuevo"
      pageSubtitle="¿Cómo deseas acceder hoy?"
      tutorConfig={{
        title: "Portal del Tutor",
        description:
          "Entra a tu panel para comprobar el estado de tus familiares, revisar el monedero cruzado y atender alertas de seguridad pendientes.",
        linkText: "Entrar como Tutor",
        linkTo: "/auth/signin/tutor", // Adjust this to your actual login routes
      }}
      elderConfig={{
        title: "Portal del Mayor",
        description:
          "Accede directamente a tu asistente de voz para resolver tus dudas cotidianas y comunicarte con tu entorno al instante.",
        linkText: "Entrar como Mayor",
        linkTo: "/auth/signin/elder", // Adjust this to your actual login routes
      }}
    />
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, UsersRound } from "lucide-react";

import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Acceso a FamilIA" },
      {
        name: "description",
        content: "Elige el tipo de acceso para continuar con tu experiencia en FamilIA.",
      },
    ],
  }),
  component: AuthLogin,
});

function AuthLogin() {
  const familyAccent = "from-primary/20 via-primary/5 to-transparent";
  const elderAccent = "from-emerald-400/30 via-emerald-200/10 to-transparent";
  const cardBaseClass =
    "group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-8 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)] backdrop-blur transition hover:-translate-y-1 hover:border-border/90 hover:bg-card/90";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnimatedGridBackground className="min-h-screen">
        <section className="relative flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-6xl px-6 pt-8 pb-14 md:pt-10 md:pb-16">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Bienvenido a FamilIA
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                ¿Cómo deseas acceder?
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className={cardBaseClass}>
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%)]",
                  )}
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-70",
                    "bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_50%)]",
                  )}
                />
                <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br", familyAccent)} />

                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 ring-1 ring-border">
                    <UsersRound className="h-6 w-6 text-foreground" />
                  </span>
                  <h2 className="text-2xl font-semibold md:text-3xl">Acceso Familiar / Tutor</h2>
                </div>
                <p className="text-sm text-muted-foreground md:text-base">
                  Gestiona la suscripción de tus padres, revisa el monedero cruzado y supervisa las
                  alertas de seguridad.
                </p>
                <Link
                  to="/auth/tutor"
                  className="group inline-flex items-center gap-2 text-base font-semibold text-primary"
                >
                  Entrar como familiar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className={cardBaseClass}>
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%)]",
                  )}
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-70",
                    "bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_50%)]",
                  )}
                />
                <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br", elderAccent)} />

                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 ring-1 ring-border">
                    <HeartHandshake className="h-6 w-6 text-foreground" />
                  </span>
                  <h2 className="text-2xl font-semibold md:text-3xl">Acceso para Mayores</h2>
                </div>
                <p className="text-sm text-muted-foreground md:text-base">
                  Accede a tu asistente de voz. Traduce las cartas de tu banco y resuelve tus dudas
                  al instante.
                </p>
                <Link
                  to="/auth/elder"
                  className="group inline-flex items-center gap-2 text-base font-semibold text-primary"
                >
                  Entrar como mayor
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedGridBackground>
    </main>
  );
}

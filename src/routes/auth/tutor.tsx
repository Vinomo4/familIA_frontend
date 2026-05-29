import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useId } from "react";

import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignUp2 from "@/components/SignUp2";

export const Route = createFileRoute("/auth/tutor")({
  head: () => ({
    meta: [
      { title: "Acceso Familiar / Tutor" },
      {
        name: "description",
        content: "Crea tu cuenta familiar para gestionar y proteger a quienes más quieres.",
      },
    ],
  }),
  component: TutorSignup,
});

function TutorSignup() {
  const id = useId();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnimatedGridBackground className="min-h-screen">
        <section className="relative flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-md px-6 py-16">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-white px-3 py-1 text-sm font-medium text-foreground shadow-sm transition hover:border-border/70"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>

            <div className="mt-6 rounded-2xl border border-border/40 bg-white p-8 shadow-md">
              <div className="flex flex-col items-center gap-2 text-center">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
                  aria-hidden="true"
                >
                  <svg
                    className="stroke-zinc-800 dark:stroke-zinc-100"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                  </svg>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Crea tu cuenta familiar</h1>
                <p className="text-sm text-muted-foreground">
                  Solo necesitamos algunos datos para empezar a proteger a tu familia.
                </p>
              </div>

              <form className="mt-6 space-y-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-name`}>Nombre completo</Label>
                    <Input id={`${id}-name`} placeholder="María López" type="text" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-email`}>Correo</Label>
                    <Input
                      id={`${id}-email`}
                      placeholder="hola@familia.com"
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-password`}>Contraseña</Label>
                    <Input
                      id={`${id}-password`}
                      placeholder="Introduce tu contraseña"
                      type="password"
                      required
                    />
                  </div>
                </div>
                <Button type="button" className="w-full">
                  Crear cuenta
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                <span className="text-xs text-muted-foreground">O</span>
              </div>
              <Button variant="outline" className="mt-5 w-full">
                Continuar con Google
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Al registrarte aceptas nuestros{" "}
                <a className="underline hover:no-underline" href="#">
                  Términos
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </AnimatedGridBackground>
    </main>
  );
}

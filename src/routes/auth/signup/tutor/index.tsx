import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GooeySpinner } from "@/components/ui/gooey-spinner";
import { AestheticLayout } from "@/components/ui/aesthetic-layout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/signup/tutor/")({
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

interface SocialLoginsProps {
  className?: string;
  isLoading: boolean;
  onAction: () => void;
}

export function SocialLogins({ className, isLoading, onAction }: SocialLoginsProps) {
  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <button
        type="button"
        disabled={isLoading}
        onClick={onAction}
        aria-label="Continuar con Apple"
        className="w-full bg-black hover:bg-stone-900 disabled:opacity-50 disabled:pointer-events-none text-white flex items-center justify-center gap-3 h-12 rounded-full font-medium text-sm transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z" />
        </svg>
        <span className="whitespace-nowrap leading-none">Continuar con Apple</span>
      </button>

      <button
        type="button"
        disabled={isLoading}
        onClick={onAction}
        aria-label="Continuar con Google"
        className="w-full bg-white hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none text-gray-700 border border-gray-300/70 flex items-center justify-center gap-3 h-12 rounded-full font-medium text-sm transition-colors shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span className="whitespace-nowrap leading-none">Continuar con Google</span>
      </button>
    </div>
  );
}

function TutorSignup() {
  const id = useId();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthTrigger = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      navigate({ to: "/pricing" });
    }, 2500);
  };

  return (
    <AestheticLayout maxWidthClassName="max-w-md">
      <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-white p-8 shadow-md">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center gap-6">
              <GooeySpinner />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Estamos configurando todo</h2>
                <p className="text-sm text-gray-500 max-w-[280px] mx-auto">
                  Por favor, espera un momento mientras preparamos tu cuenta.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-2 text-center">
          <img src="/logo.png" alt="FamilIA Logo" className="mb-2 h-12 w-auto object-contain" />
          <h1 className="text-2xl font-semibold tracking-tight">Crea tu cuenta</h1>
          <p className="text-sm text-muted-foreground">
            Solo necesitamos algunos datos para empezar a proteger a tu familia.
          </p>
        </div>

        <form onSubmit={handleAuthTrigger} className="mt-6 space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Nombre completo</Label>
              <Input
                id={`${id}-name`}
                placeholder="María López"
                type="text"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Correo</Label>
              <Input
                id={`${id}-email`}
                placeholder="hola@familia.com"
                type="email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password`}>Contraseña</Label>
              <Input
                id={`${id}-password`}
                placeholder="Introduce tu contraseña"
                type="password"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Crear cuenta
          </Button>
        </form>

        <div className="mt-6 flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">O</span>
        </div>

        <SocialLogins className="mt-5" isLoading={isLoading} onAction={() => handleAuthTrigger()} />

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Al registrarte aceptas nuestros{" "}
          <a className="underline hover:no-underline" href="#">
            Términos
          </a>
          .
        </p>
      </div>
    </AestheticLayout>
  );
}

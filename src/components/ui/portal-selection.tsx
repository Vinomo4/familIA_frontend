// src/components/auth/PortalSelection.tsx
import { Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, UsersRound } from "lucide-react";
import { AestheticLayout } from "@/components/ui/aesthetic-layout";
import { cn } from "@/lib/utils";

interface CardConfig {
  title: string;
  description: string;
  linkText: string;
  linkTo?: string;      // 
  onClick?: () => void; // 
}

interface PortalSelectionProps {
  pageTitle: string;
  pageSubtitle: string;
  tutorConfig: CardConfig;
  elderConfig: CardConfig;
}

export function PortalSelection({
  pageTitle,
  pageSubtitle,
  tutorConfig,
  elderConfig,
}: PortalSelectionProps) {
  const familyAccent = "from-primary/20 via-primary/5 to-transparent";
  const elderAccent = "from-emerald-400/30 via-emerald-200/10 to-transparent";
  const cardBaseClass =
    "group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-8 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)] backdrop-blur transition hover:-translate-y-1 hover:border-border/90 hover:bg-card/90";

  const actionClass = "group inline-flex items-center gap-2 text-base font-semibold text-primary cursor-pointer text-left bg-transparent p-0 border-none outline-none";

  return (
    <AestheticLayout maxWidthClassName="max-w-6xl" className="pt-2 pb-6">
      {/* Header section */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {pageTitle}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          {pageSubtitle}
        </p>
      </div>

      {/* Grid containing both portal choices */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Tutor Choice Card */}
        <div className={cardBaseClass}>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-70 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_50%)]" />
          <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br", familyAccent)} />

          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 ring-1 ring-border">
              <UsersRound className="h-6 w-6 text-foreground" />
            </span>
            <h2 className="text-2xl font-semibold md:text-3xl">{tutorConfig.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground md:text-base">
            {tutorConfig.description}
          </p>
          
          {/* Renderizado Condicional: Botón o Enlace de Ruta */}
          {tutorConfig.onClick ? (
            <button type="button" onClick={tutorConfig.onClick} className={actionClass}>
              {tutorConfig.linkText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <Link to={tutorConfig.linkTo || "/"} className={actionClass}>
              {tutorConfig.linkText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Elder Choice Card */}
        <div className={cardBaseClass}>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-70 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_50%)]" />
          <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br", elderAccent)} />

          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 ring-1 ring-border">
              <HeartHandshake className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
            </span>
            <h2 className="text-2xl font-semibold md:text-3xl">{elderConfig.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground md:text-base">
            {elderConfig.description}
          </p>
          
          {/* Renderizado Condicional: Botón o Enlace de Ruta */}
          {elderConfig.onClick ? (
            <button type="button" onClick={elderConfig.onClick} className={actionClass}>
              {elderConfig.linkText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <Link to={elderConfig.linkTo || "/"} className={actionClass}>
              {elderConfig.linkText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </AestheticLayout>
  );
}
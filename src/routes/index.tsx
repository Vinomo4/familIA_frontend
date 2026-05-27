import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FamilIA — Protección y tranquilidad para tu familia" },
      { name: "description", content: "Inclusión financiera y protección contra fraudes para personas mayores." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">FamilIA</h1>
        <p className="text-lg text-muted-foreground">
          Protección y tranquilidad para tu familia. Detecta estafas y cuida a quien más quieres.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="#" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90">
            Proteger ahora — Prueba gratuita
          </a>
          <Link to="/elder" className="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-base font-medium hover:bg-accent">
            Vista Mayor (demo)
          </Link>
        </div>
      </div>
    </div>
  );
}

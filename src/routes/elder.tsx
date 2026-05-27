import { createFileRoute } from "@tanstack/react-router";
import { Mic, Camera, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/elder")({
  head: () => ({
    meta: [
      { title: "FamilIA" },
      { name: "description", content: "Asistente de confianza" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
    ],
  }),
  component: ElderHub,
});

function ElderHub() {
  return (
    <main className="elder-root">
      <button type="button" className="elder-btn elder-btn--talk" aria-label="Hablar">
        <Mic className="elder-icon" strokeWidth={2.5} />
        <span className="elder-label elder-label--light">Hablar</span>
      </button>

      <div className="elder-bottom-row">
        <button type="button" className="elder-btn elder-btn--read" aria-label="Leer carta o pantalla">
          <Camera className="elder-icon elder-icon--sm" strokeWidth={2.5} />
          <span className="elder-label elder-label--dark">Leer Carta / Pantalla</span>
        </button>
        <button type="button" className="elder-btn elder-btn--help" aria-label="Ayuda o estafa">
          <ShieldAlert className="elder-icon elder-icon--sm" strokeWidth={2.5} />
          <span className="elder-label elder-label--light">Ayuda / Estafa</span>
        </button>
      </div>
    </main>
  );
}

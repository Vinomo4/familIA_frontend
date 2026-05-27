import { createFileRoute } from "@tanstack/react-router";
import { Mic, Camera, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/elder")({
  head: () => ({
    meta: [
      { title: "FamilIA" },
      { name: "description", content: "Tu asistente de confianza" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
    ],
  }),
  component: ElderHub,
});

function useClock() {
  const [now, setNow] = useState<string>(() => formatTime(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(formatTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}
function formatTime(d: Date) {
  return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

function ElderHub() {
  const time = useClock();
  return (
    <main className="elder-root">
      <header className="elder-header">
        <div className="elder-greeting">
          {greeting()}, <span>María</span>
        </div>
        <div className="elder-time" aria-hidden>{time}</div>
      </header>

      <div className="elder-stage">
        <div className="elder-talk-wrap">
          <button type="button" className="elder-btn elder-btn--talk" aria-label="Hablar">
            <span className="elder-icon-wrap">
              <Mic className="elder-icon" strokeWidth={2} />
            </span>
            <span className="elder-label">Hablar</span>
          </button>
        </div>

        <div className="elder-bottom-row">
          <button type="button" className="elder-btn elder-btn--read" aria-label="Leer carta o pantalla">
            <span className="elder-icon-wrap">
              <Camera className="elder-icon" strokeWidth={2} />
            </span>
            <span className="elder-label">Leer Carta</span>
            <span className="elder-sublabel">Haz una foto</span>
          </button>

          <button type="button" className="elder-btn elder-btn--help" aria-label="Ayuda o posible estafa">
            <span className="elder-icon-wrap">
              <ShieldAlert className="elder-icon" strokeWidth={2} />
            </span>
            <span className="elder-label">Ayuda</span>
            <span className="elder-sublabel">¿Posible estafa?</span>
          </button>
        </div>
      </div>
    </main>
  );
}

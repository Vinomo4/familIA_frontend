import { createFileRoute } from "@tanstack/react-router";
import { Mic, Camera, ShieldAlert, ArrowLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "FamilIA Copilot" },
      { name: "description", content: "Tu asistente de confianza" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
    ],
  }),
  component: Copilot,
});

function useClock() {
  const [now, setNow] = useState<string>("--:--");
  useEffect(() => {
    setNow(formatTime(new Date()));
    const id = setInterval(() => setNow(formatTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

type InteractionMode = "idle" | "listening" | "responding";

const mockResponses: Record<string, string> = {
  talk: "¡Hola! Soy tu asistente FamilIA. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre tus finanzas, tus cartas o cualquier duda que tengas.",
  camera: "He revisado la carta que me has mostrado. No te preocupes, es solo un aviso de actualización del banco. No tienes que pagar nada ni hacer ninguna transferencia. Puedes guardarla con tranquilidad.",
  scam: "He analizado el mensaje y detecto varias señales de alerta. El remitente no coincide con tu banco y piden datos personales. Mi recomendación: no respondas y bloquea el número. He notificado a tu familiar de confianza.",
};

function Copilot() {
  const time = useClock();
  const [greetingText, setGreetingText] = useState("Hola");
  const [mode, setMode] = useState<InteractionMode>("idle");
  const [response, setResponse] = useState("");
  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreetingText("Buenos días");
    else if (h < 20) setGreetingText("Buenas tardes");
    else setGreetingText("Buenas noches");
  }, []);

  const handleButtonClick = useCallback((buttonId: string) => {
    setActiveButton(buttonId);
    setMode("listening");

    setTimeout(() => {
      setResponse(mockResponses[buttonId] ?? mockResponses.talk);
      setMode("responding");
    }, 3000);
  }, []);

  const handleBack = useCallback(() => {
    setMode("idle");
    setResponse("");
    setActiveButton(null);
  }, []);

  const isInteracting = mode !== "idle";

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="flex w-full items-center justify-between p-6">
        <div className="text-2xl font-semibold text-gray-900">
          {greetingText}, <span className="font-normal text-gray-500">Carmen</span>
        </div>
        <div className="text-sm font-medium text-gray-400" aria-hidden="true">
          {time}
        </div>
      </header>

      {/* Center Area */}
      <section className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        {mode === "idle" && (
          <p className="text-2xl leading-relaxed text-gray-400 transition-opacity duration-300">
            Toca un botón abajo para empezar.
          </p>
        )}

        {mode === "listening" && (
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-emerald-400 opacity-20" />
              <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 text-white">
                <Mic className="h-8 w-8" strokeWidth={2.5} />
              </span>
            </div>
            <p className="text-3xl font-semibold leading-relaxed text-gray-900 animate-pulse">
              Escuchando…
            </p>
            <p className="text-lg text-gray-400">
              Habla ahora o muestra la carta
            </p>
          </div>
        )}

        {mode === "responding" && (
          <div className="flex flex-col items-center gap-8">
            <div className="max-w-xl text-2xl font-medium leading-relaxed text-gray-900 sm:text-3xl">
              {response}
            </div>
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-2xl bg-gray-100 px-8 py-4 text-xl font-semibold text-gray-700 transition-colors hover:bg-gray-200 active:bg-gray-300"
              aria-label="Volver al menú principal"
            >
              <ArrowLeft className="h-6 w-6" />
              Volver
            </button>
          </div>
        )}
      </section>

      {/* Bottom Action Area */}
      {!isInteracting && (
        <div className="flex w-full flex-col gap-4 p-6 pb-10 transition-all duration-300">
          <button
            type="button"
            onClick={() => handleButtonClick("talk")}
            className="flex w-full items-center justify-center gap-4 rounded-2xl bg-[#34d399] py-6 text-xl font-semibold text-gray-900 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] active:bg-emerald-400 focus-visible:outline focus-visible:outline-4 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
            aria-label="Hablar con el asistente"
          >
            <Mic className="h-7 w-7" strokeWidth={2.5} />
            Hablar con el asistente
          </button>

          <button
            type="button"
            onClick={() => handleButtonClick("camera")}
            className="flex w-full items-center justify-center gap-4 rounded-2xl border-2 border-gray-200 bg-white py-6 text-xl font-semibold text-gray-800 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] active:bg-gray-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-gray-400 focus-visible:outline-offset-2"
            aria-label="Leer una carta o foto"
          >
            <Camera className="h-7 w-7" strokeWidth={2.5} />
            Leer una carta o foto
          </button>

          <button
            type="button"
            onClick={() => handleButtonClick("scam")}
            className="flex w-full items-center justify-center gap-4 rounded-2xl bg-red-100 py-6 text-xl font-semibold text-red-700 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] active:bg-red-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-red-400 focus-visible:outline-offset-2"
            aria-label="Analizar posible estafa"
          >
            <ShieldAlert className="h-7 w-7" strokeWidth={2.5} />
            Analizar posible estafa
          </button>
        </div>
      )}
    </main>
  );
}

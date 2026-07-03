import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type JSX, useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  Camera,
  ArrowLeft,
  Loader2,
  Radio,
  Send,
  Image as ImageIcon,
  FileAudio,
  Trash2,
  LogOut,
  FileText,
  RotateCcw,
  Volume2,
  Pause,
  Square,
} from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";
import { VoiceInput } from "@/components/ui/voice-input";
import { FileUploadCard, UploadedFile } from "@/components/ui/file-upload-card";
import { AnimatePresence, motion, useInView, MotionProps } from "framer-motion";
import { getStoredElderName } from "@/lib/elder-profile";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "FamilIA Copilot" },
      { name: "description", content: "Tu asistente de confianza" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      },
    ],
  }),
  component: Copilot,
});

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

const DEFAULT_ELDER_NAME = "Carmen";

// COMPONENTE: EFECTO DE ESCRITURA CON OCULTACIÓN DE CURSOR AL FINALIZAR
interface TypingEffectProps {
  texts: string[];
  className?: string;
  rotationInterval?: number;
  typingSpeed?: number;
}

function TypingEffect({
  texts,
  className,
  rotationInterval = 2800,
  typingSpeed = 75,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const currentText = texts[currentTextIndex % texts.length];

  useEffect(() => {
    if (!isInView) return;

    if (charIndex < currentText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText.charAt(charIndex));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(typingTimeout);
    } else {
      if (texts.length === 1) return;

      const changeLabelTimeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, rotationInterval);
      return () => clearTimeout(changeLabelTimeout);
    }
  }, [charIndex, currentText, isInView, rotationInterval, typingSpeed, texts.length]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center text-center font-bold tracking-wide px-4 ${className || ""}`}
    >
      {displayedText}
      {charIndex < currentText.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="ml-1.5 h-[1em] w-1 rounded-sm bg-current inline-block"
        />
      )}
    </div>
  );
}

// COMPONENTE: TEXT SCRAMBLE
type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);

  useEffect(() => {
    if (!trigger) return;

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = "";
      const progress = step / steps;

      for (let i = 0; i < children.length; i++) {
        if (children[i] === " ") {
          scrambled += " ";
          continue;
        }

        if (progress * children.length > i) {
          scrambled += children[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(children);
        onScrambleComplete?.();
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [trigger, children, duration, speed, characterSet, onScrambleComplete]);

  return (
    <motion.p className={className} {...props}>
      {displayText}
    </motion.p>
  );
}

interface AnimatedHeartsProps {
  text?: string;
  count?: number;
  colors?: string[];
  animationDuration?: number;
  fontSize?: string;
  staggerDelay?: number;
  heightFactor?: number;
}

function AnimatedHearts({
  text = "✦",
  count = 4,
  colors = [
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#d946ef",
    "#f43f5e",
    "#34d399",
    "#a7f3d0",
  ],
  animationDuration = 2,
  fontSize = "5rem",
  staggerDelay = 200,
  heightFactor = 0.4,
}: AnimatedHeartsProps) {
  const { rainbowEnd, rainbowEnd2 } = useMemo(() => {
    let end1 = "";
    let end2 = "";

    colors
      .slice()
      .reverse()
      .forEach((c, i) => {
        end1 += `,0 ${(i - 5) * heightFactor}vh ${i * 2}px ${c}`;
      });

    colors.forEach((c, i) => {
      end2 += `,0 ${(i - 5) * -heightFactor}vh ${i * 2}px ${c}`;
    });

    return {
      rainbowEnd: end1.substring(1),
      rainbowEnd2: end2.substring(1),
    };
  }, [colors, heightFactor]);

  return (
    <div className="w-full flex gap-3 items-center justify-center h-24 my-2">
      <h1
        className="font-black tracking-widest animate-pulse"
        style={{
          fontSize: fontSize,
          color: "transparent",
        }}
      >
        {Array.from({ length: count }, (_, i) => (
          <motion.span
            key={i}
            className="px-1 inline-block"
            animate={{
              textShadow: [rainbowEnd, rainbowEnd2],
            }}
            transition={{
              duration: animationDuration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: (i * staggerDelay) / 1000 - 1,
            }}
          >
            {text}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}

type InteractionMode = "idle" | "listening" | "draft" | "processing" | "responding";

function Copilot() {
  const navigate = useNavigate();
  const [greetingText] = useState(getGreeting);
  const [mode, setMode] = useState<InteractionMode>("idle");
  const [response, setResponse] = useState("");
  const [elderName, setElderName] = useState(DEFAULT_ELDER_NAME);

  const [hasAudio, setHasAudio] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // Remove markdown characters to make speech synthesis cleaner
    const cleanText = text.replace(/[*_#`~>]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "es-ES";

    const selectVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find((v) => v.lang.startsWith("es"));
      if (esVoice) {
        utterance.voice = esVoice;
      }
    };

    selectVoice();
    // Chrome loads voices asynchronously, so attach event just in case
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = selectVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = (e) => {
      console.warn("Speech synthesis error event:", e);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const toggleSpeak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      speakText(response);
    }
  }, [isSpeaking, isPaused, response, speakText]);

  // Trigger TTS automatically when response is displayed
  useEffect(() => {
    if (mode === "responding" && response) {
      speakText(response);
    } else {
      stopSpeech();
    }
    return () => {
      stopSpeech();
    };
  }, [mode, response, speakText, stopSpeech]);
  const [audioBlob, setAudioBlob] = useState<Blob | File | null>(null);
  const [hasImage, setHasImage] = useState(false);

  const [textInput, setTextInput] = useState("");
  const [draftedText, setDraftedText] = useState("");

  const [showUploader, setShowUploader] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [isIntro, setIsIntro] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  useEffect(() => {
    const storedName = getStoredElderName();
    if (storedName?.trim()) {
      setElderName(storedName.trim());
    }

    const introTimer = setTimeout(() => {
      setIsIntro(false);
    }, 3200);

    return () => clearTimeout(introTimer);
  }, [getStoredElderName]);

  const processingTexts = useMemo(
    () => [
      "Analizando la información...",
      "Leyendo con atención...",
      "Pensando en la mejor respuesta...",
      "Preparando la contestación...",
      `Casi listo, ${elderName}...`,
    ],
    [elderName],
  );

  const handleLogout = useCallback(() => {
    navigate({ to: "/" });
  }, [navigate]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);

      const newUpload: UploadedFile = {
        id: Math.random().toString(36).substring(7),
        file,
        progress: 100,
        status: "completed",
        previewUrl,
      };

      setUploadedFile(newUpload);
      setHasImage(true);
      setMode("draft");
    }
    if (event.target) event.target.value = "";
  }, []);

  const handleVoiceStart = useCallback(() => {
    setMode("listening");
  }, []);

  const handleVoiceStop = useCallback((audioData?: Blob | File) => {
    if (audioData) {
      setAudioBlob(audioData);
    }
    setHasAudio(true);
    setMode("draft");
  }, []);

  const handleImageFilesChange = useCallback((files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);

    const newUpload: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: "uploading",
      previewUrl,
    };

    setUploadedFile(newUpload);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 15;

      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadedFile((prev) => (prev ? { ...prev, progress: 100, status: "completed" } : null));
        setHasImage(true);

        setTimeout(() => {
          setShowUploader(false);
          setMode("draft");
        }, 1000);
      } else {
        setUploadedFile((prev) => (prev ? { ...prev, progress: currentProgress } : null));
      }
    }, 200);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setUploadedFile(null);
    setHasImage(false);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    if (draftedText.trim() === "" && !hasAudio) setMode("idle");
  }, [hasAudio, draftedText, imagePreviewUrl]);

  const handleRemoveAudio = useCallback(() => {
    setHasAudio(false);
    setAudioBlob(null);
    if (!hasImage && draftedText.trim() === "") setMode("idle");
  }, [hasImage, draftedText]);

  const handleRemoveText = useCallback(() => {
    setDraftedText("");
    if (!hasImage && !hasAudio) setMode("idle");
  }, [hasImage, hasAudio]);

  const handleResetScreen = useCallback(() => {
    setMode("idle");
    setResponse("");
    setHasAudio(false);
    setAudioBlob(null);
    setHasImage(false);
    setTextInput("");
    setDraftedText("");
    setUploadedFile(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  }, [imagePreviewUrl]);

  const handleSendPayload = useCallback(async () => {
    setMode("processing");

    try {
      const formData = new FormData();

      if (hasImage && uploadedFile?.file) {
        formData.append("image", uploadedFile.file);
      }

      if (hasAudio && audioBlob) {
        const filename = audioBlob instanceof File ? audioBlob.name : "navigation.m4a";
        formData.append("audio", audioBlob, filename);
      }

      if (draftedText.trim() !== "") {
        formData.append("text", draftedText.trim());
      }

      const res = await fetch(
        "https://209.38.213.186.sslip.io/webhook/c92e60c4-c6e8-4e46-9685-15a72025d50a",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      let dataText = "";

      if (contentType && contentType.includes("application/json")) {
        const json = await res.json();

        if (json.spoke === "SCAM_DETECTION") {
          dataText =
            json.evaluation?.user_defense_guidance ||
            "Hemos detectado un riesgo. Por favor, mantén la calma y no realices ninguna acción económica.";
        } else if (json.spoke === "C2_INTERFACE") {
          dataText =
            json.elderly_guidance_es ||
            "He analizado la pantalla de tu aplicación bancaria. Sigue las indicaciones reflejadas.";
        } else if (json.spoke === "MANAGEMENT") {
          dataText = json.answer || "He procesado tu consulta financiera.";
        } else if (json.spoke === "C1_DOCUMENT") {
          dataText = json.easy_explanation || "He analizado tu documento.";
        } else {
          dataText =
            json.answer ||
            json.elderly_guidance_es ||
            json.evaluation?.user_defense_guidance ||
            json.output ||
            json.text ||
            json.response ||
            json.message ||
            (typeof json === "string" ? json : JSON.stringify(json));
        }
      } else {
        dataText = await res.text();
      }

      setResponse(dataText);
      setMode("responding");
    } catch (error) {
      console.error("Workflow transmission error:", error);
      setResponse(
        "Lo siento, hubo un problema al conectarse con el asistente. Por favor, vuelve a intentarlo.",
      );
      setMode("responding");
    }
  }, [hasAudio, audioBlob, hasImage, uploadedFile, draftedText]);

  const handleTextSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (textInput.trim() !== "") {
      setDraftedText((prev) => (prev ? prev + " " + textInput.trim() : textInput.trim()));
      setTextInput("");
      setMode("draft");
    }
  };

  const isInputDisabled = mode === "listening" || mode === "processing";

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(52,211,153,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <AnimatePresence>
        {showUploader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4"
          >
            <FileUploadCard
              files={uploadedFile ? [uploadedFile] : []}
              onFilesChange={handleImageFilesChange}
              onFileRemove={handleRemoveImage}
              onClose={() => setShowUploader(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 ease-in-out z-50
          ${isIntro ? "opacity-100 scale-100 translate-y-0" : "opacity-100 scale-[0.6] -translate-y-[40vh] md:-translate-y-[42vh]"}`}
      >
        <h1
          className={`text-6xl sm:text-7xl md:text-8xl font-normal text-gray-900 text-center px-4 leading-tight transition-opacity duration-1000 ${isIntro ? "animate-fade-in-up" : ""}`}
        >
          {greetingText}, <br className={isIntro ? "block md:hidden" : "hidden"} />
          <span className="font-bold text-[#34d399]">{elderName}</span>
        </h1>

        <div className="mt-6 text-3xl sm:text-4xl text-gray-500 font-medium">
          <TextEffect per="word" preset="blur" delay={0.8}>
            ¿En qué te puedo ayudar hoy?
          </TextEffect>
        </div>
      </div>

      <header
        className={`flex w-full items-center justify-between p-6 transition-opacity duration-1000 ${isIntro ? "opacity-0" : "opacity-100"}`}
      >
        <div className="h-20 w-1/2 opacity-0 pointer-events-none" aria-hidden="true">
          Espacio reservado
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full bg-red-50 px-5 py-2.5 text-base font-semibold text-red-600 transition-colors hover:bg-red-100 active:bg-red-200"
          aria-label="Cerrar sesión"
        >
          <LogOut className="h-5 w-5" />
          Salir
        </button>
      </header>

      {/* ÁREA CENTRAL DE CONVERSACIÓN */}
      <section
        className={`flex flex-1 flex-col items-center justify-start pt-32 sm:pt-40 p-6 text-center transition-opacity duration-700 delay-500 overflow-y-auto ${isIntro ? "opacity-0" : "opacity-100"}`}
      >
        {mode === "idle" && !isIntro && (
          <TypingEffect
            texts={["Escribe, habla o sube una foto con los botones inferiores."]}
            /* CALIBRACIÓN DE UX: Se agrega max-w-none y whitespace-nowrap para mantener la frase fija en una sola línea */
            className="text-3xl sm:text-4xl md:text-5xl text-gray-700 max-w-none mx-auto mt-16 leading-relaxed text-center tracking-tight whitespace-nowrap"
            typingSpeed={60}
          />
        )}

        {mode === "listening" && (
          <div className="flex flex-col items-center gap-6 mt-8 animate-in fade-in zoom-in duration-300">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-28 w-28 animate-ping rounded-full bg-red-400 opacity-20" />
              <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                <Radio className="h-10 w-10 animate-pulse" strokeWidth={2} />
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">Te escucho, {elderName}...</p>
              <p className="text-lg text-gray-500">
                Vuelve a pulsar el botón rojo cuando termines.
              </p>
            </div>
          </div>
        )}

        {mode === "draft" && (
          <div className="flex flex-col items-center gap-6 mt-4 animate-in fade-in zoom-in duration-300 w-full max-w-md">
            <p className="text-2xl font-semibold text-gray-900">Esto es lo que voy a analizar:</p>

            <div className="flex flex-wrap gap-4 w-full justify-center">
              {draftedText.trim() !== "" && (
                <div className="relative flex flex-col items-center justify-center gap-2 p-4 border-2 border-blue-300 bg-blue-50 rounded-2xl w-32 aspect-square shadow-sm">
                  <button
                    onClick={handleRemoveText}
                    className="absolute -top-2 -right-2 bg-white text-red-500 border p-1.5 rounded-full shadow-md z-10 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <FileText className="h-8 w-8 text-blue-500" />
                  <span className="font-semibold text-blue-800 text-base">Texto</span>
                </div>
              )}

              {hasImage && (
                <div className="relative flex flex-col items-center justify-center gap-2 p-4 border-2 border-[#34d399] bg-emerald-50 rounded-2xl w-32 aspect-square shadow-sm">
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-white text-red-500 border p-1.5 rounded-full shadow-md z-10 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-emerald-200 bg-white">
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-emerald-400" />
                    )}
                  </div>
                  <span className="font-semibold text-emerald-800 text-base">Foto</span>
                </div>
              )}

              {hasAudio && (
                <div className="relative flex flex-col items-center justify-center gap-2 p-4 border-2 border-[#34d399] bg-emerald-50 rounded-2xl w-32 aspect-square shadow-sm">
                  <button
                    onClick={handleRemoveAudio}
                    className="absolute -top-2 -right-2 bg-white text-red-500 border p-1.5 rounded-full shadow-md z-10 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <FileAudio className="h-8 w-8 text-emerald-500" />
                  <span className="font-semibold text-emerald-800 text-base">Audio</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSendPayload}
              className="w-full flex justify-center items-center gap-3 rounded-full bg-[#34d399] px-8 py-4 text-xl font-bold text-gray-900 shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <Send className="h-6 w-6" />
              Preguntar al asistente
            </button>
          </div>
        )}

        {mode === "processing" && (
          <div className="flex flex-col items-center justify-center mt-6 animate-in fade-in duration-300 w-full gap-4">
            <AnimatedHearts />
            <TypingEffect texts={processingTexts} className="text-2xl sm:text-3xl text-gray-800" />
          </div>
        )}

        {mode === "responding" && (
          <div className="flex flex-col items-center gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500 w-full max-w-6xl px-6 sm:px-12">
            {/* Controles de lectura por voz (TTS) */}
            <div className="flex gap-4 items-center">
              <button
                type="button"
                onClick={toggleSpeak}
                className="flex items-center gap-2.5 rounded-full bg-emerald-50 border-2 border-emerald-200 px-6 py-3 text-lg font-bold text-emerald-800 hover:bg-emerald-100 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                aria-label={isSpeaking && !isPaused ? "Pausar lectura" : "Escuchar respuesta"}
              >
                {isSpeaking && !isPaused ? (
                  <>
                    <Pause className="h-5 w-5 text-emerald-700" strokeWidth={2.5} />
                    Pausar lectura
                  </>
                ) : (
                  <>
                    <Volume2 className="h-5 w-5 text-emerald-700" strokeWidth={2.5} />
                    {isPaused ? "Reanudar lectura" : "Escuchar de nuevo"}
                  </>
                )}
              </button>

              {(isSpeaking || isPaused) && (
                <button
                  type="button"
                  onClick={stopSpeech}
                  className="flex items-center gap-2.5 rounded-full bg-red-50 border-2 border-red-200 px-6 py-3 text-lg font-bold text-red-800 hover:bg-red-100 hover:scale-105 active:scale-95 transition-all shadow-sm animate-in fade-in duration-200 cursor-pointer"
                  aria-label="Detener lectura"
                >
                  <Square className="h-4 w-4 fill-red-700 text-red-700" />
                  Detener
                </button>
              )}
            </div>

            <TextEffect
              per="word"
              preset="fade"
              delay={0.05}
              className="w-full text-3xl sm:text-4xl md:text-5xl font-medium leading-relaxed tracking-tight text-gray-900 text-center whitespace-pre-wrap"
            >
              {response}
            </TextEffect>

            <button
              type="button"
              onClick={handleResetScreen}
              className="inline-flex items-center gap-3 rounded-full bg-[#34d399] text-gray-900 px-8 py-4 text-xl font-bold shadow-md transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95 mt-4"
            >
              <RotateCcw className="h-6 w-6" strokeWidth={2.5} />
              Nueva consulta
            </button>
          </div>
        )}
      </section>

      {/* BARRA DE CONTROL MULTIMODAL INFERIOR PERMANENTE */}
      <div
        className={`w-full flex flex-col gap-4 p-6 pb-10 transition-all duration-700 delay-700 ${isIntro ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
      >
        <form onSubmit={handleTextSubmit} className="relative w-full">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            disabled={isInputDisabled}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-5 text-xl font-medium text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#34d399] focus:outline-none disabled:opacity-40 transition-colors"
          />
          {textInput.trim() !== "" && !isInputDisabled && (
            <button
              type="button"
              onClick={handleTextSubmit}
              className="absolute right-3 top-3 bottom-3 flex aspect-square items-center justify-center rounded-xl bg-[#34d399] text-gray-900 transition-transform hover:scale-[1.02] shadow-sm"
              aria-label="Añadir texto escrito"
            >
              <Send className="h-6 w-6" />
            </button>
          )}
        </form>

        <div className="grid w-full grid-cols-2 gap-4">
          <VoiceInput onStart={handleVoiceStart} onStop={handleVoiceStop} isSaved={hasAudio} />

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={() => setShowUploader(true)}
            disabled={isInputDisabled}
            className={`flex w-full items-center justify-center gap-4 rounded-2xl border-2 py-6 text-xl font-semibold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none
              ${
                hasImage
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
              }`}
            aria-label="Subir una imagen"
          >
            <ImageIcon className="h-7 w-7" strokeWidth={2.5} />
            {hasImage ? "Cambiar imagen" : "Subir imagen"}
          </button>
        </div>
      </div>
    </div>
  );
}

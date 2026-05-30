import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, ArrowLeft, Loader2, Radio, Send, Image as ImageIcon, FileAudio, Trash2, LogOut, FileText } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { TextEffect } from "@/components/ui/text-effect";
import { VoiceInput } from "@/components/ui/voice-input";
import { FileUploadCard, UploadedFile } from "@/components/ui/file-upload-card"; 
import { AnimatePresence, motion } from "framer-motion";

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

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

type InteractionMode = "idle" | "listening" | "draft" | "processing" | "responding";

const mockResponses: Record<string, string> = {
  audioOnly: "¡Hola! He escuchado tu mensaje. ¿En qué más puedo ayudarte hoy?",
  imageOnly: "He revisado la imagen que me has subido. No te preocupes, es solo un aviso de actualización del banco. Puedes guardarla.",
  textOnly: "He leído tu mensaje. El proceso que mencionas es completamente seguro. ¿Necesitas ayuda con algo más?",
  combined: "He revisado la información que me has enviado. Todo está en orden, es solo un aviso rutinario del banco. No tienes que hacer nada.",
};

function Copilot() {
  const navigate = useNavigate(); 
  const [greetingText] = useState(getGreeting);
  const [mode, setMode] = useState<InteractionMode>("idle");
  const [response, setResponse] = useState("");
  
  const [hasAudio, setHasAudio] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [textInput, setTextInput] = useState("");
  
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
    const introTimer = setTimeout(() => {
      setIsIntro(false);
    }, 3200); 

    return () => clearTimeout(introTimer);
  }, []);

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
    if (event.target) event.target.value = '';
  }, []);

  const handleVoiceStart = useCallback(() => {
    setMode("listening");
  }, []);

  const handleVoiceStop = useCallback(() => {
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
        setUploadedFile(prev => prev ? { ...prev, progress: 100, status: "completed" } : null);
        setHasImage(true);
        
        setTimeout(() => {
          setShowUploader(false);
          setMode("draft");
        }, 1000);
      } else {
        setUploadedFile(prev => prev ? { ...prev, progress: currentProgress } : null);
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
    if (!hasAudio && textInput.trim() === "") setMode("idle");
  }, [hasAudio, textInput, imagePreviewUrl]);

  const handleRemoveAudio = useCallback(() => {
    setHasAudio(false);
    if (!hasImage && textInput.trim() === "") setMode("idle");
  }, [hasImage, textInput]);

  const handleSendPayload = useCallback(() => {
    setMode("processing");
    
    setTimeout(() => {
      if ((hasAudio || textInput.trim() !== "") && hasImage) {
        setResponse(mockResponses.combined);
      } else if (hasImage) {
        setResponse(mockResponses.imageOnly);
      } else if (textInput.trim() !== "") {
        setResponse(mockResponses.textOnly);
      } else {
        setResponse(mockResponses.audioOnly);
      }
      setMode("responding");
    }, 2500);
  }, [hasAudio, hasImage, textInput]);

  const handleBack = useCallback(() => {
    setMode("idle");
    setResponse("");
    setHasAudio(false);
    setHasImage(false);
    setTextInput("");
    setUploadedFile(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  }, [imagePreviewUrl]);

  const handleTextSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (textInput.trim() !== "" || hasImage || hasAudio) {
      setMode("draft");
    }
  };

  const showInputArea = mode === "idle" || mode === "listening" || mode === "draft";

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">

     <div className="fixed inset-0 -z-10 h-full w-full bg-white">
        <div
          className="absolute inset-0
                    bg-[radial-gradient(rgba(52,211,153,0.5)_1px,transparent_1px)]
                    [background-size:28px_28px]"
        />
      </div>
      {/* Modal de subida de imagen */}
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
          ${isIntro ? 'opacity-100 scale-100 translate-y-0' : 'opacity-100 scale-[0.6] -translate-y-[40vh] md:-translate-y-[42vh]'}`}
      >
        <h1 className={`text-6xl sm:text-7xl md:text-8xl font-normal text-gray-900 text-center px-4 leading-tight transition-opacity duration-1000 ${isIntro ? 'animate-fade-in-up' : ''}`}>
          {greetingText}, <br className={isIntro ? 'block md:hidden' : 'hidden'} /><span className="font-bold text-[#34d399]">Carmen</span>
        </h1>
        
        <div className="mt-6 text-3xl sm:text-4xl text-gray-500 font-medium">
          <TextEffect per="word" preset="blur" delay={0.8}>
            ¿En qué te puedo ayudar hoy?
          </TextEffect>
        </div>
      </div>

      <header className={`flex w-full items-center justify-between p-6 transition-opacity duration-1000 ${isIntro ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-20 w-1/2 opacity-0 pointer-events-none" aria-hidden="true">Espacio reservado</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full bg-red-50 px-5 py-2.5 text-base font-semibold text-red-600 transition-colors hover:bg-red-100 active:bg-red-200"
          aria-label="Cerrar sesión"
        >
          <LogOut className="h-5 w-5" />
          Salir
        </button>
      </header>

      <section className={`flex flex-1 flex-col items-center justify-center p-6 text-center transition-opacity duration-700 delay-500 overflow-y-auto ${isIntro ? 'opacity-0' : 'opacity-100'}`}>
        
        {mode === "idle" && (
          <p className="text-2xl leading-relaxed text-gray-400 transition-opacity duration-300">
            Escribe, habla o sube una foto.
          </p>
        )}

        {mode === "listening" && (
          <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-32 w-32 animate-ping rounded-full bg-red-400 opacity-20" />
              <span className="absolute inline-flex h-24 w-24 animate-pulse rounded-full bg-red-300 opacity-40" />
              <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30">
                <Radio className="h-10 w-10 animate-pulse" strokeWidth={2} />
              </span>
            </div>
            
            <div className="space-y-3">
              <p className="text-3xl font-bold tracking-tight text-gray-900">
                Te escucho, Carmen...
              </p>
              <p className="text-xl font-medium text-red-500 animate-pulse">
                Grabando audio
              </p>
              <p className="text-lg text-gray-500 max-w-xs mx-auto pt-2">
                Habla con tranquilidad. Cuando termines, vuelve a tocar el botón de micrófono.
              </p>
            </div>
          </div>
        )}

        {mode === "draft" && (
          <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300 w-full max-w-md">
            <div className="space-y-2">
              <p className="text-3xl font-semibold text-gray-900">
                ¡Listo para enviar!
              </p>
              <p className="text-xl text-gray-500">
                Esto es lo que voy a analizar:
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 w-full justify-center mt-2">
              {textInput.trim() !== "" && (
                <div className="relative flex flex-col items-center justify-center gap-3 p-4 border-2 border-blue-300 bg-blue-50 rounded-3xl w-36 sm:w-40 aspect-square shadow-sm animate-in pop-in duration-300">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center bg-white shadow-inner border border-blue-200">
                    <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                  </div>
                  <span className="font-semibold text-blue-800 text-lg">Mensaje</span>
                </div>
              )}

              {hasImage && (
                <div className="relative flex flex-col items-center justify-center gap-3 p-4 border-2 border-[#34d399] bg-emerald-50 rounded-3xl w-36 sm:w-40 aspect-square shadow-sm animate-in pop-in duration-300">
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-3 -right-3 bg-white text-red-500 border border-red-100 p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 hover:scale-110 transition-all z-10"
                    aria-label="Eliminar foto"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-inner border border-emerald-200 bg-white flex items-center justify-center">
                    {imagePreviewUrl ? (
                      <img src={imagePreviewUrl} className="w-full h-full object-cover" alt="Tu documento" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-emerald-400" />
                    )}
                  </div>
                  <span className="font-semibold text-emerald-800 text-lg">Foto</span>
                </div>
              )}
              
              {hasAudio && (
                <div className="relative flex flex-col items-center justify-center gap-3 p-4 border-2 border-[#34d399] bg-emerald-50 rounded-3xl w-36 sm:w-40 aspect-square shadow-sm animate-in pop-in duration-300">
                  <button
                    onClick={handleRemoveAudio}
                    className="absolute -top-3 -right-3 bg-white text-red-500 border border-red-100 p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 hover:scale-110 transition-all z-10"
                    aria-label="Eliminar audio"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-white shadow-inner border border-emerald-200">
                    <FileAudio className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500" />
                  </div>
                  <span className="font-semibold text-emerald-800 text-lg">Audio</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSendPayload}
              className="mt-4 w-full flex justify-center items-center gap-3 rounded-full bg-[#34d399] px-10 py-5 text-2xl font-bold text-gray-900 shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 active:scale-95"
            >
              <Send className="h-7 w-7" />
              Enviar al asistente
            </button>
          </div>
        )}

        {mode === "processing" && (
          <div className="flex flex-col items-center gap-6 animate-in fade-in duration-300">
            <Loader2 className="h-16 w-16 text-[#34d399] animate-spin" strokeWidth={2} />
            <p className="text-2xl font-medium text-gray-700">Pensando...</p>
          </div>
        )}

        {mode === "responding" && (
          <div className="flex flex-col items-center gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="max-w-xl text-2xl font-medium leading-relaxed text-gray-900 sm:text-3xl bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              {response}
            </div>
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-2xl bg-gray-100/80 px-8 py-4 text-xl font-semibold text-gray-700 transition-colors hover:bg-gray-200 active:bg-gray-300"
              aria-label="Volver al inicio"
            >
              <ArrowLeft className="h-6 w-6" />
              Volver
            </button>
          </div>
        )}
      </section>

      {/* ÁREA DE ENTRADA DE DATOS */}
      {showInputArea && (
        <div className={`w-full flex flex-col gap-4 p-6 pb-10 transition-all duration-700 delay-700 ${isIntro ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          
          {/* Componente de Texto */}
          <form onSubmit={handleTextSubmit} className="relative w-full">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              disabled={mode === "listening"}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-5 text-xl font-medium text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#34d399] focus:outline-none disabled:opacity-50 transition-colors"
            />
            {textInput.trim() !== "" && (
              <button
                type="button"
                onClick={handleTextSubmit}
                className="absolute right-3 top-3 bottom-3 flex aspect-square items-center justify-center rounded-xl bg-[#34d399] text-gray-900 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                aria-label="Añadir texto escrito"
              >
                <Send className="h-6 w-6" />
              </button>
            )}
          </form>

          {/* Botones de Voz e Imagen en Grid (Tamaño Original) */}
          <div className="grid w-full grid-cols-2 gap-4">
            <VoiceInput 
              onStart={handleVoiceStart}
              onStop={handleVoiceStop}
              isSaved={hasAudio} 
            />

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
              disabled={mode === "listening"}
              className={`flex w-full items-center justify-center gap-4 rounded-2xl border-2 py-6 text-xl font-semibold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none
                ${hasImage 
                  ? "bg-blue-100 text-blue-700 border-blue-300 focus-visible:outline-blue-400" 
                  : "bg-white text-gray-800 border-gray-200 focus-visible:outline-gray-400 hover:bg-gray-50"
                }`}
              aria-label="Subir una imagen"
            >
              <ImageIcon className="h-7 w-7" strokeWidth={2.5} />
              {hasImage ? "Cambiar imagen" : "Subir imagen"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
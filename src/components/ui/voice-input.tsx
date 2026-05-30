"use client"

import React, { useRef } from "react"
import { Mic, Check } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface VoiceInputProps {
  onStart?: () => void
  // Updated signature to yield the audio blob downstream
  onStop?: (audioBlob: Blob) => void
  className?: string
  isSaved?: boolean 
}

export function VoiceInput({
  className,
  onStart,
  onStop,
  isSaved = false,
}: VoiceInputProps) {
  const [_listening, _setListening] = React.useState<boolean>(false)
  const [_time, _setTime] = React.useState<number>(0)
  
  // Hardware references persistent across renders
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (_listening) {
      intervalId = setInterval(() => {
        _setTime((t) => t + 1)
      }, 1000)
    } else {
      _setTime(0)
    }

    return () => clearInterval(intervalId)
  }, [_listening])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const onClickHandler = async () => {
    if (!_listening) {
      try {
        // Request browser microphone authorization
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream

        // Cross-browser container compatibility checks (Chrome/Firefox webm vs Safari mp4)
        let options = { mimeType: "audio/webm" }
        if (!MediaRecorder.isTypeSupported("audio/webm")) {
          options = { mimeType: "audio/mp4" }
        }
        
        let recorder: MediaRecorder
        try {
          recorder = new MediaRecorder(stream, options)
        } catch (e) {
          recorder = new MediaRecorder(stream) // Standard uncompressed fallback
        }

        mediaRecorderRef.current = recorder
        audioChunksRef.current = []

        // Push data buffers as the hardware populates them
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data)
          }
        }

        // Finalize chunk array into a single cohesive binary asset upon completion
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { 
            type: recorder.mimeType || "audio/webm" 
          })
          
          // Trigger the state lift back up to copilot.tsx
          onStop?.(audioBlob)

          // Explicitly kill the microphone hardware connection indicator
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
            streamRef.current = null
          }
        }

        recorder.start()
        onStart?.()
        _setListening(true)
      } catch (err) {
        console.error("Microphone hardware connection rejected:", err)
        alert("No se pudo acceder al micrófono. Por favor comprueba los permisos de tu navegador.")
      }
    } else {
      // Gracefully cease hardware pipeline
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop()
      }
      _setListening(false)
    }
  }

  let buttonStyle = "bg-[#34d399] text-gray-900 focus-visible:outline-emerald-500 hover:bg-emerald-400";
  let Icon = Mic;
  let text = "Hablar con el asistente";

  if (_listening) {
    buttonStyle = "bg-red-100 text-red-700 focus-visible:outline-red-500 border-2 border-red-300";
  } else if (isSaved) {
    buttonStyle = "bg-blue-100 text-blue-700 focus-visible:outline-blue-500 border-2 border-blue-300";
    Icon = Check;
    text = "Audio guardado (Toca para repetir)";
  }

  return (
    <motion.button
      type="button"
      layout
      onClick={onClickHandler}
      className={cn(
        "flex w-full items-center justify-center gap-4 rounded-2xl py-6 text-xl font-semibold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2",
        buttonStyle,
        className
      )}
      aria-label={_listening ? "Detener grabación" : "Hablar con el asistente"}
    >
      <div className="flex items-center justify-center">
        {_listening ? (
          <motion.div
            className="w-5 h-5 bg-red-600 rounded-sm"
            animate={{ rotate: [0, 180, 360] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ) : (
          <Icon className="h-7 w-7" strokeWidth={2.5} />
        )}
      </div>

      <AnimatePresence mode="wait">
        {_listening ? (
          <motion.div
            key="recording"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="flex gap-1 items-center justify-center px-2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-red-500 rounded-full"
                  initial={{ height: 4 }}
                  animate={{ height: [4, 12 + Math.random() * 12, 4] }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <div className="text-lg font-bold w-12 text-center tabular-nums">
              {formatTime(_time)}
            </div>
          </motion.div>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="whitespace-nowrap"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
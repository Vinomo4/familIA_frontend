"use client"

import React from "react"
import { Mic } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface VoiceInputProps {
  onStart?: () => void
  onStop?: () => void
  className?: string
}

export function VoiceInput({
  className,
  onStart,
  onStop,
}: VoiceInputProps) {
  const [_listening, _setListening] = React.useState<boolean>(false)
  const [_time, _setTime] = React.useState<number>(0)

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (_listening) {
      onStart?.()
      intervalId = setInterval(() => {
        _setTime((t) => t + 1)
      }, 1000)
    } else {
      // Solo lanzamos onStop si el tiempo es mayor a 0 para evitar que se lance al renderizar
      if (_time > 0) {
        onStop?.()
      }
      _setTime(0)
    }

    return () => clearInterval(intervalId)
  }, [_listening])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const onClickHandler = () => {
    _setListening(!_listening)
  }

  return (
    <motion.button
      type="button"
      layout
      onClick={onClickHandler}
      className={cn(
        "flex w-full items-center justify-center gap-4 rounded-2xl py-6 text-xl font-semibold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2",
        _listening 
          ? "bg-red-100 text-red-700 focus-visible:outline-red-500 border-2 border-red-300" // Estilo al grabar
          : "bg-[#34d399] text-gray-900 focus-visible:outline-emerald-500 hover:bg-emerald-400", // Estilo normal
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
          <Mic className="h-7 w-7" strokeWidth={2.5} />
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
            {/* Animación de frecuencia ajustada para verse bien en el botón */}
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
            {/* Temporizador */}
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
            Hablar con el asistente
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
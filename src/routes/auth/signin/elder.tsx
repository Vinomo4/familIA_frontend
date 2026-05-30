'use client';

import React, { useId, useState } from "react";
import { createFileRoute, useNavigate, getRouteApi } from "@tanstack/react-router";
import { Phone, ArrowRight, ArrowLeft, ChevronsUpDown, Check, Delete, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

import flags from 'react-phone-number-input/flags';

import { AestheticLayout } from "@/components/ui/aesthetic-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GooeySpinner } from "@/components/ui/gooey-spinner";
import { cn } from "@/lib/utils";
import { buildStoredPhone, getStoredElderCredentials } from "@/lib/elder-profile";

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

const COUNTRIES = [
  { code: 'ES', prefix: '+34', name: 'España' },
  { code: 'US', prefix: '+1', name: 'Estados Unidos' },
  { code: 'MX', prefix: '+52', name: 'México' },
  { code: 'AR', prefix: '+54', name: 'Argentina' },
  { code: 'CL', prefix: '+56', name: 'Chile' },
  { code: 'CO', prefix: '+57', name: 'Colombia' },
  { code: 'PE', prefix: '+51', name: 'Perú' },
  { code: 'GB', prefix: '+44', name: 'Reino Unido' },
  { code: 'FR', prefix: '+33', name: 'Francia' },
  { code: 'DE', prefix: '+49', name: 'Alemania' },
  { code: 'PT', prefix: '+351', name: 'Portugal' },
] as const;

type CountryType = typeof COUNTRIES[number];

const elderSigninSearchSchema = z.object({
  step: z.coerce.number().min(1).max(2).catch(1),
});

export const Route = createFileRoute("/auth/signin/elder")({
  validateSearch: (search) => elderSigninSearchSchema.parse(search),
  component: ElderSigninRoute,
});

const routeApi = getRouteApi("/auth/signin/elder");

function ElderSigninRoute() {
  const id = useId();
  const navigate = useNavigate({ from: "/auth/signin/elder" });
  const { step: currentStep } = routeApi.useSearch();

  const [isLoading, setIsLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  // Estados del formulario
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(COUNTRIES[0]);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [credentialError, setCredentialError] = useState("");

  // Formateador automático centralizado para la entrada del teclado numérico
  const formatAndSetPhone = (raw: string) => {
    let formatted = raw;
    if (raw.length > 3) formatted = `${raw.slice(0, 3)} ${raw.slice(3)}`;
    if (raw.length > 5) formatted = `${raw.slice(0, 3)} ${raw.slice(3, 5)} ${raw.slice(5)}`;
    if (raw.length > 7) formatted = `${raw.slice(0, 3)} ${raw.slice(3, 5)} ${raw.slice(5, 7)} ${raw.slice(7)}`;
    setPhone(formatted);
  };

  // Manejadores del Teclado Numérico en pantalla
  const handleKeyPress = (num: string) => {
    if (credentialError) setCredentialError("");
    if (currentStep === 1) {
      const raw = phone.replace(/\s/g, "");
      if (raw.length >= 9) return;
      formatAndSetPhone(raw + num);
    } else if (currentStep === 2) {
      const filledLength = otp.filter(Boolean).length;
      if (filledLength >= 4) return;
      const newOtp = [...otp];
      newOtp[filledLength] = num;
      setOtp(newOtp);
    }
  };

  const handleBackspace = () => {
    if (credentialError) setCredentialError("");
    if (currentStep === 1) {
      const raw = phone.replace(/\s/g, "");
      if (raw.length === 0) return;
      formatAndSetPhone(raw.slice(0, -1));
    } else if (currentStep === 2) {
      const filledLength = otp.filter(Boolean).length;
      if (filledLength === 0) return;
      const newOtp = [...otp];
      newOtp[filledLength - 1] = "";
      setOtp(newOtp);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) return phone.replace(/\s/g, "").length === 9;
    if (currentStep === 2) return otp.filter(Boolean).length === 4;
    return true;
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isStepValid()) return;

    if (currentStep < 2) {
      if (credentialError) setCredentialError("");
      navigate({ search: { step: currentStep + 1 } });
    } else {
      const storedCredentials = getStoredElderCredentials();
      if (storedCredentials) {
        const enteredPhone = buildStoredPhone(selectedCountry.prefix, phone);
        const enteredPin = otp.join("");

        if (storedCredentials.phone !== enteredPhone || storedCredentials.pin !== enteredPin) {
          setCredentialError("El teléfono o el PIN no coinciden con los configurados durante el alta.");
          return;
        }
      }

      triggerSubmit();
    }
  };

  const triggerSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Redirección actualizada hacia la página de copilot
      navigate({ to: "/copilot" }); 
    }, 2500);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      navigate({ search: { step: currentStep - 1 } });
    }
  };

  const getStepCategory = () => {
    return currentStep === 1 ? "Identificación" : "Seguridad";
  };

  const hasCredentialError = credentialError !== "";

  return (
    <AestheticLayout maxWidthClassName="max-w-md">
      <div className="w-full bg-white border border-gray-100 shadow-md rounded-2xl relative overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Capa de carga */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 p-6 text-center">
            <GooeySpinner />
            <div className="space-y-2 mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Iniciando sesión</h2>
              <p className="text-sm text-gray-500 max-w-[280px]">
                Verificando tus credenciales de acceso seguro...
              </p>
            </div>
          </div>
        )}

        {/* Barra de progreso */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <span>{getStepCategory()}</span>
            <span className="text-gray-900 font-semibold">Paso {currentStep} de 2</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            {[1, 2].map((index) => (
              <div key={index} className={cn("h-full rounded-full transition-all duration-300", index <= currentStep ? "bg-zinc-900" : "bg-gray-100")} />
            ))}
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleNextStep} className="space-y-6 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step-1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 text-left">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Introduce tu número de móvil</h2>
                <div className="space-y-2 pt-2">
                  <Label htmlFor={`${id}-phone`}>Teléfono móvil</Label>
                  <div className="flex gap-2">
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="outline" className="flex rounded-xl px-3 h-11 border border-gray-200 shrink-0 gap-2 items-center justify-between bg-white text-gray-800 focus-visible:ring-[#34d399]/20 focus-visible:border-[#34d399]">
                          <FlagComponent country={selectedCountry.code} countryName={selectedCountry.name} />
                          <ChevronsUpDown className="h-3 w-3 opacity-50 shrink-0" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Buscar país..." />
                          <CommandList>
                            <CommandEmpty>No se encontraron países.</CommandEmpty>
                            <CommandGroup>
                              {COUNTRIES.map((country) => (
                                <CommandItem
                                  key={country.code}
                                  className="gap-3 cursor-pointer py-2 px-3 flex items-center justify-between"
                                  onSelect={() => {
                                    setSelectedCountry(country);
                                    setPopoverOpen(false);
                                    if (credentialError) setCredentialError("");
                                  }}
                                >
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <FlagComponent country={country.code} countryName={country.name} />
                                    <span className="text-sm font-medium text-gray-900 truncate">{country.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-muted-foreground text-xs font-mono">{country.prefix}</span>
                                    <Check className={cn('h-3.5 w-3.5 text-zinc-900', country.code === selectedCountry.code ? 'opacity-100' : 'opacity-0')} />
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <div className="relative flex-1">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                      <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800 tracking-tight pointer-events-none select-none z-10">
                        {selectedCountry.prefix}
                      </span>
                      <Input
                        id={`${id}-phone`}
                        placeholder="600 000 000"
                        type="text"
                        readOnly
                        value={phone}
                        className={cn("h-11 w-full bg-gray-50/50 pointer-events-none selection:bg-transparent", selectedCountry.prefix.length === 3 ? "pl-18" : "pl-20")}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/90 leading-normal">
                    Toca los números de abajo para escribir el teléfono con el que tu tutor te dio de alta.
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 text-left">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Introduce tu clave de acceso</h2>
                <div className="space-y-2 pt-2">
                  <Label>PIN de 4 dígitos</Label>
                  <div className="flex gap-2.5 justify-start">
                    {otp.map((digit, idx) => (
                      <Input
                        key={idx}
                        type="password"
                        readOnly
                        value={digit}
                        className="w-12 h-12 text-center text-lg font-bold p-0 bg-gray-50/50 pointer-events-none selection:bg-transparent"
                      />
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    {hasCredentialError ? (
                      <motion.p
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -2 }}
                        className="text-xs font-semibold text-red-600 flex items-center gap-1.5 pt-1.5"
                      >
                        <AlertCircle className="size-3.5" />
                        {credentialError}
                      </motion.p>
                    ) : (
                      <p className="text-xs text-muted-foreground/90 leading-normal pt-1">
                        Usa las teclas de abajo para poner tus 4 números secretos.
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Teclado numérico en pantalla */}
          <Keypad onKeyPress={handleKeyPress} onBackspace={handleBackspace} />

          {/* Panel inferior de navegación */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevStep} 
                className="cursor-pointer h-10 px-4 text-xs font-medium text-gray-600 border-gray-200"
              >
                <ArrowLeft className="mr-2 size-3.5" />
                Atrás
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-6 ml-auto">
              <Button
                type="submit"
                disabled={!isStepValid()}
                className={cn(
                  "cursor-pointer h-10 px-5 text-xs font-medium shadow-sm flex items-center gap-1.5 text-white transition-colors",
                  currentStep === 2 ? "bg-[#00966d] hover:bg-[#007d5a]" : "bg-zinc-900 hover:bg-zinc-800"
                )}
              >
                {currentStep === 2 ? "Entrar" : "Continuar"}
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AestheticLayout>
  );
}

function Keypad({ onKeyPress, onBackspace }: { onKeyPress: (num: string) => void; onBackspace: () => void }) {
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
  return (
    <div className="w-full max-w-[320px] mx-auto grid grid-cols-3 gap-3 pt-2 bg-zinc-50/50 p-3 rounded-2xl border border-gray-100">
      {digits.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onKeyPress(num)}
          className="h-14 text-xl font-bold bg-white border border-gray-200/80 rounded-xl active:bg-zinc-100 active:scale-[0.98] transition-all text-gray-800 shadow-xs flex items-center justify-center cursor-pointer select-none"
        >
          {num}
        </button>
      ))}
      <div className="h-14" />
      <button
        type="button"
        onClick={() => onKeyPress("0")}
        className="h-14 text-xl font-bold bg-white border border-gray-200/80 rounded-xl active:bg-zinc-100 active:scale-[0.98] transition-all text-gray-800 shadow-xs flex items-center justify-center cursor-pointer select-none"
      >
        0
      </button>
      <button
        type="button"
        onClick={onBackspace}
        className="h-14 text-lg bg-zinc-100 hover:bg-zinc-200/70 active:scale-[0.98] rounded-xl transition-all text-gray-600 flex items-center justify-center cursor-pointer select-none"
        aria-label="Borrar número"
      >
        <Delete className="size-5" />
      </button>
    </div>
  );
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-all placeholder:text-muted-foreground/70 focus-visible:border-[#34d399] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#34d399]/20 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const FlagComponent = ({ country, countryName }: { country: keyof typeof flags; countryName: string }) => {
  const Flag = flags[country];
  return (
    <span className="flex h-3.5 w-5 overflow-hidden rounded-xs border border-zinc-200/50 shrink-0 select-none items-center justify-center bg-zinc-100">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = 'FlagComponent';
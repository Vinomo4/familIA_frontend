'use client';

import React, { useId, useState, useRef } from "react";
import { createFileRoute, useNavigate, getRouteApi } from "@tanstack/react-router";
import { Phone, UserRound, Wallet, ArrowRight, ArrowLeft, ChevronsUpDown, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

import flags from 'react-phone-number-input/flags';

import { AestheticLayout } from "@/components/ui/aesthetic-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GooeySpinner } from "@/components/ui/gooey-spinner";
import { cn } from "@/lib/utils";

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

const elderSetupSearchSchema = z.object({
  step: z.coerce.number().min(1).max(5).catch(1),
});

export const Route = createFileRoute("/auth/signup/tutor/elder-setup")({
  validateSearch: (search) => elderSetupSearchSchema.parse(search),
  component: ElderSetupRoute,
});

const routeApi = getRouteApi("/auth/signup/tutor/elder-setup");

function ElderSetupRoute() {
  const id = useId();
  const navigate = useNavigate({ from: "/auth/signup/tutor/elder-setup" });
  const { step: currentStep } = routeApi.useSearch();

  const [isLoading, setIsLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  // Estados del formulario
  const [firstName, setFirstName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(COUNTRIES[0]);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [confirmOtp, setConfirmOtp] = useState(["", "", "", ""]);
  const [cash, setCash] = useState("");

  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const confirmInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  // Formateador automático del número de móvil: XXX XX XX XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").substring(0, 9);
    let formatted = raw;
    if (raw.length > 3) formatted = `${raw.slice(0, 3)} ${raw.slice(3)}`;
    if (raw.length > 5) formatted = `${raw.slice(0, 3)} ${raw.slice(3, 5)} ${raw.slice(5)}`;
    if (raw.length > 7) formatted = `${raw.slice(0, 3)} ${raw.slice(3, 5)} ${raw.slice(5, 7)} ${raw.slice(7)}`;
    setPhone(formatted);
  };

  const handleOtpChange = (val: string, index: number) => {
    const cleanVal = val.replace(/\D/g, "");
    if (!cleanVal) return;
    const newOtp = [...otp];
    newOtp[index] = cleanVal.substring(cleanVal.length - 1);
    setOtp(newOtp);
    if (index < 3) inputRefs[index + 1].current?.focus();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const handleConfirmOtpChange = (val: string, index: number) => {
    const cleanVal = val.replace(/\D/g, "");
    if (!cleanVal) return;
    const newConfirm = [...confirmOtp];
    newConfirm[index] = cleanVal.substring(cleanVal.length - 1);
    setConfirmOtp(newConfirm);
    if (index < 3) confirmInputRefs[index + 1].current?.focus();
  };

  const handleConfirmOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newConfirm = [...confirmOtp];
      if (confirmOtp[index]) {
        newConfirm[index] = "";
        setConfirmOtp(newConfirm);
      } else if (index > 0) {
        newConfirm[index - 1] = "";
        setConfirmOtp(newConfirm);
        confirmInputRefs[index - 1].current?.focus();
      }
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) return firstName.trim().length >= 2;
    if (currentStep === 2) return phone.replace(/\s/g, "").length === 9;
    if (currentStep === 3) return otp.join("").length === 4;
    if (currentStep === 4) return confirmOtp.join("").length === 4 && confirmOtp.join("") === otp.join("");
    return true;
  };

  const pinMismatch = currentStep === 4 && confirmOtp.join("").length === 4 && confirmOtp.join("") !== otp.join("");

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isStepValid()) return;

    if (currentStep < 5) {
      navigate({ search: { step: currentStep + 1 } });
    } else {
      triggerSubmit();
    }
  };

  const triggerSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate({ to: "/" }); 
    }, 2500);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      navigate({ search: { step: currentStep - 1 } });
    }
  };

  const getStepCategory = () => {
    if (currentStep === 1) return "Personalización";
    if (currentStep === 2) return "Identificación";
    if (currentStep === 3 || currentStep === 4) return "Seguridad";
    return "Calibración";
  };

  return (
    <AestheticLayout maxWidthClassName="max-w-md">
      <div className="w-full bg-white border border-gray-100 shadow-md rounded-2xl relative overflow-hidden p-8 space-y-6">
        
        {/* Capa de carga procesando el setup */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 p-6 text-center">
            <GooeySpinner />
            <div className="space-y-2 mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Guardando configuración</h2>
              <p className="text-sm text-gray-500 max-w-[280px]">
                Enlazando monedero cruzado y generando credenciales de acceso seguro.
              </p>
            </div>
          </div>
        )}

        {/* Barra de progreso de 5 segmentos */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <span>{getStepCategory()}</span>
            <span className="text-gray-900 font-semibold">Paso {currentStep} de 5</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className={cn("h-full rounded-full transition-all duration-300", index <= currentStep ? "bg-zinc-900" : "bg-gray-100")} />
            ))}
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleNextStep} className="space-y-6 min-h-[180px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step-1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 text-left">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">¿Cómo se llama tu familiar?</h2>
                <div className="space-y-2 pt-2">
                  <Label htmlFor={`${id}-first-name`}>Nombre de pila</Label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id={`${id}-first-name`} placeholder="ej. Carmen" type="text" autoFocus required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="pl-9 h-11" />
                  </div>
                  <p className="text-xs text-muted-foreground/90 leading-normal">
                    El asistente le saludará así: "Hola, Carmen. ¿En qué te puedo ayudar?"
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 text-left">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">¿Cuál es su número de móvil?</h2>
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
                        type="tel"
                        inputMode="numeric"
                        autoFocus
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        className={cn("h-11 w-full", selectedCountry.prefix.length === 3 ? "pl-18" : "pl-20")}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/90 leading-normal">
                    Será su identificador único. Cero correos electrónicos.
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step-3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 text-left">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Crea su clave de acceso</h2>
                <div className="space-y-2 pt-2">
                  <Label>PIN de 4 dígitos</Label>
                  <div className="flex gap-2.5 justify-start">
                    {otp.map((digit, idx) => (
                      <Input
                        key={idx}
                        ref={inputRefs[idx]}
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        autoFocus={idx === 0}
                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className="w-12 h-12 text-center text-lg font-bold p-0 focus-visible:ring-[#34d399]/20 focus-visible:border-[#34d399]"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground/90 leading-normal pt-1">
                    Exactamente igual que en el cajero automático. Podrás cambiarlo después.
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="step-4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 text-left">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Confirma su clave de acceso</h2>
                <div className="space-y-2 pt-2">
                  <Label>Repite el PIN de 4 dígitos</Label>
                  <div className="flex gap-2.5 justify-start">
                    {confirmOtp.map((digit, idx) => (
                      <Input
                        key={idx}
                        ref={confirmInputRefs[idx]}
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        autoFocus={idx === 0}
                        onChange={(e) => handleConfirmOtpChange(e.target.value, idx)}
                        onKeyDown={(e) => handleConfirmOtpKeyDown(e, idx)}
                        className={cn(
                          "w-12 h-12 text-center text-lg font-bold p-0 focus-visible:ring-[#34d399]/20 focus-visible:border-[#34d399]",
                          pinMismatch && "border-red-500 bg-red-50/20 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                        )}
                      />
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    {pinMismatch ? (
                      <motion.p initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -2 }} className="text-xs font-semibold text-red-600 flex items-center gap-1.5 pt-1.5">
                        <AlertCircle className="size-3.5" />
                        Los códigos PIN introducidos no coinciden.
                      </motion.p>
                    ) : (
                      <p className="text-xs text-muted-foreground/90 leading-normal pt-1">
                        Vuelve a introducir los 4 números para asegurarnos de que es correcto.
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div key="step-5" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 text-left">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Efectivo inicial estimado</h2>
                <div className="space-y-2 pt-2">
                  <Label htmlFor={`${id}-cash`}>Efectivo a mano (Opcional)</Label>
                  <div className="relative">
                    <Wallet className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id={`${id}-cash`} placeholder="150 €" type="number" min={0} step="1" autoFocus value={cash} onChange={(e) => setCash(e.target.value)} className="pl-9 h-11" />
                  </div>
                  <p className="text-xs text-muted-foreground/90 leading-normal">
                    Fija el punto de partida para que la gráfica de gastos sea precisa hoy.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

{/* Panel inferior de navegación con texto actualizado */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
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
              {currentStep === 5 && (
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={triggerSubmit} 
                  className="h-10 px-4 text-xs font-semibold text-gray-500 hover:text-zinc-900 transition-colors"
                >
                  Omitir
                </Button>
              )}
              
              <Button
                type="submit"
                disabled={!isStepValid()}
                className={cn(
                  "cursor-pointer h-10 px-5 text-xs font-medium shadow-sm flex items-center gap-1.5 text-white transition-colors",
                  currentStep === 5 ? "bg-[#00966d] hover:bg-[#007d5a]" : "bg-zinc-900 hover:bg-zinc-800"
                )}
              >
                {currentStep === 5 ? "Completar" : "Continuar"}
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AestheticLayout>
  );
}

// Input optimizado para usar el color de acento #34d399 al recibir foco
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
      {Flag && <Flag title={countryName} className="w-full h-full object-cover" />}
    </span>
  );
};
FlagComponent.displayName = 'FlagComponent';
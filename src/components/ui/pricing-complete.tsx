'use client';

import React, { useState } from 'react';
import { PlusIcon, ShieldCheckIcon, CheckCircle2, CircleCheck, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, getRouteApi } from '@tanstack/react-router';
import * as DialogPrimitive from '@radix-ui/react-dialog';

// Icon imports for the checkout system
import { FaPaypal, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdCheckmark } from "react-icons/io";

// UI Components
import { Badge } from './badge';
import { Button } from './button';
import { BorderTrail } from './border-trail';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AestheticLayout } from "@/components/ui/aesthetic-layout";
import { GooeySpinner } from "@/components/ui/gooey-spinner";
import { cn } from '@/lib/utils';

const routeApi = getRouteApi('/auth/signup/');

type PricingSearch = {
	plan?: 'basico_mensual' | 'basico_anual' | 'pro_mensual' | 'pro_anual';
};

export function Pricing() {
	const navigate = useNavigate({ from: '/auth/signup/' });
	const { plan } = routeApi.useSearch() as PricingSearch;

	// Global billing cycle state (False = Mensual, True = Anual)
	const [isYearly, setIsYearly] = useState(false);

	// Checkout workflow and validation states
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [cardName, setCardName] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [expiry, setExpiry] = useState('');
	const [cvv, setCvv] = useState('');

	// Dynamic label values based on active checkout state
	const getPlanLabel = () => {
		if (!plan) return '';
		if (plan.startsWith('basico')) return 'Plan Básico';
		return 'Plan Profesional';
	};

	const getPriceLabel = () => {
		if (!plan) return '';
		if (plan === 'basico_mensual') return '7,99 €/mes';
		if (plan === 'basico_anual') return '79,99 €/año';
		if (plan === 'pro_mensual') return '19,99 €/mes';
		return '199,99 €/año';
	};

	// Input fields inline thresholds
	const isNameValid = cardName.trim().length >= 4;
	const isCardValid = cardNumber.replace(/\s/g, '').length >= 16;
	const isExpiryValid = expiry.length === 5; 
	const isCvvValid = cvv.length >= 3;

	// Injects combination key parameter directly into router search parameters stack
	const handleSelectPlan = (planId: 'basico' | 'pro') => {
		const combinedKey = `${planId}_${isYearly ? 'anual' : 'mensual'}` as const;
		navigate({
			search: { plan: combinedKey }
		});
	};

	const handlePaymentProcess = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			setIsSuccess(true);
		}, 2500);
	};

	const handleProceedToSetup = () => {
		setIsSuccess(false);
		navigate({ to: "/auth/signup/tutor/elder-setup", search: { step: 1 } });
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '');
		const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
		setCardNumber(formatted.substring(0, 19));
	};

	const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '');
		if (value.length > 2) {
			value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
		}
		setExpiry(value.substring(0, 5));
	};

	return (
		<AestheticLayout maxWidthClassName="max-w-2xl" className="relative">
			{/* BACKGROUND LAYER: Pricing Selection Panel */}
			<motion.div 
				animate={{
					scale: plan ? 0.97 : 1,
					opacity: plan ? 0.35 : 1
				}}
				transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
				className="space-y-6"
				style={{ pointerEvents: plan ? 'none' : 'auto' }}
			>
				{/* Animated Header Area */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: true }}
					className="mx-auto max-w-xl space-y-4 text-center"
				>
					<div className="flex justify-center">
						<div className="rounded-lg border px-4 py-1 font-mono bg-white text-xs shadow-sm">Precios</div>
					</div>
					<h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
						Planes adaptados a tu familia
					</h2>
					<p className="text-muted-foreground text-sm max-w-md mx-auto">
						Elige el nivel de protección y acompañamiento financiero ideal para tus mayores
					</p>

					{/* Global Billing Switch Control */}
					<div className="flex items-center justify-center gap-3 text-sm font-medium pt-2">
						<span className={cn("transition-colors", !isYearly ? "text-foreground font-semibold" : "text-muted-foreground")}>
							Mensual
						</span>
						<Switch
							checked={isYearly}
							onCheckedChange={setIsYearly}
							className="data-[state=checked]:bg-zinc-900"
						/>
						<span className={cn("transition-colors flex items-center gap-1.5", isYearly ? "text-foreground font-semibold" : "text-muted-foreground")}>
							Anual
							<span className="text-[11px] text-emerald-600 font-medium font-mono tracking-tight pl-0.5">
								(Ahorra 2 meses)
							</span>
						</span>
					</div>
				</motion.div>

				{/* Dual Plan Choice Grid Container */}
				<div className="grid md:grid-cols-2 bg-white relative border p-4 shadow-md rounded-2xl gap-2 md:gap-0">
					<PlusIcon className="absolute -top-3 -left-3 size-5.5 text-gray-300" />
					<PlusIcon className="absolute -top-3 -right-3 size-5.5 text-gray-300" />
					<PlusIcon className="absolute -bottom-3 -left-3 size-5.5 text-gray-300" />
					<PlusIcon className="absolute -right-3 -bottom-3 size-5.5 text-gray-300" />

					{/* PLAN 1: Básico */}
					<div className="w-full px-4 pt-5 pb-4 flex flex-col justify-between">
						<div className="space-y-4">
							<div className="space-y-1">
								<h3 className="font-bold text-xl text-gray-900">Básico</h3>
								<p className="text-muted-foreground text-xs leading-relaxed">
									Ideal para asegurar la tranquilidad y el día a día financiero de un progenitor
								</p>
							</div>

							{/* Cost tracking with clean typographic layout and hardware-accelerated text styles */}
							<div className="min-h-[72px] flex flex-col justify-center text-left">
								<AnimatePresence mode="wait">
									{isYearly ? (
										<motion.div 
											key="basico-anual"
											initial={{ opacity: 0, y: 5 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -5 }}
											transition={{ duration: 0.2 }}
											className="flex flex-col text-left"
										>
											<span className="text-xs text-muted-foreground line-through font-medium">
												95,88 €
											</span>
											<div className="text-muted-foreground flex items-end gap-1.5 text-xl relative">
												<span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
													79
													<span className="text-xl md:text-2xl font-bold tracking-normal align-super ml-0.5">,99</span>
												</span>
												<span className="font-bold text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">€</span>
												<span className="text-sm text-muted-foreground pb-0.5">/año</span>
												
												{/* Boxless inline savings annotation */}
												<span className="text-xs font-bold text-emerald-600 pb-1.5 pl-1.5 tracking-tight animate-pulse whitespace-nowrap">
													¡Ahorras 16€!
												</span>
											</div>
										</motion.div>
									) : (
										<motion.div 
											key="basico-mensual"
											initial={{ opacity: 0, y: 5 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -5 }}
											transition={{ duration: 0.2 }}
											className="text-muted-foreground flex items-end gap-1.5 text-xl h-full items-center pt-4 relative"
										>
											<span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
												7
												<span className="text-xl md:text-2xl font-bold tracking-normal align-super ml-0.5">,99</span>
											</span>
											<span className="font-bold text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">€</span>
											<span className="text-sm text-muted-foreground pb-0.5">/mes</span>
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							<Separator className="bg-gray-100 mt-2" />

							{/* Added explicit min-height hooks across column list elements to preserve parallel alignment lines */}
							<ul className="space-y-3 text-sm text-gray-600 pt-1">
								<li className="flex items-start gap-2.5 md:min-h-[40px]">
									<CircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
									<span>Acceso completo a todas las herramientas (Voz, Visión y Alertas)</span>
								</li>
								{/* Points 2, 3 and 4 customized to be soft gray */}
								<li className="flex items-start gap-2.5 md:min-h-[40px] text-muted-foreground">
									<CircleCheck className="size-4 text-gray-400 shrink-0 mt-0.5" />
									<span>1 Mayor y 1 Tutor vinculado</span>
								</li>
								<li className="flex items-start gap-2.5 md:min-h-[40px] text-muted-foreground">
									<CircleCheck className="size-4 text-gray-400 shrink-0 mt-0.5" />
									<span>50 consultas mensuales</span>
								</li>
								<li className="flex items-start gap-2.5 md:min-h-[40px] text-muted-foreground">
									<CircleCheck className="size-4 text-gray-400 shrink-0 mt-0.5" />
									<span>Modelos de IA estándar</span>
								</li>
							</ul>
						</div>

						<div className="mt-8">
							<Button 
								className="w-full cursor-pointer font-medium" 
								variant="outline" 
								onClick={() => handleSelectPlan('basico')}
							>
								Da el primer paso
							</Button>
						</div>
					</div>
					
					{/* PLAN 2: Profesional */}
					<div className="relative w-full rounded-xl border border-gray-100 bg-white px-4 pt-5 pb-4 flex flex-col justify-between shadow-inner">
						<BorderTrail
							style={{
								boxShadow:
									'0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
							}}
							size={100}
						/>
						<div className="space-y-4 z-10">
							<div className="space-y-1">
								<div className="flex items-center justify-between">
									<h3 className="font-bold text-xl text-gray-900">Profesional</h3>
									<Badge variant="default" className="shadow-sm bg-zinc-900 text-white hover:bg-zinc-900 text-[10px] px-2 py-0">Popular</Badge>
								</div>
								<p className="text-muted-foreground text-xs leading-relaxed">
									La solución completa para gestionar a toda la familia desde un mismo lugar
								</p>
							</div>

							{/* Cost tracking with clean typographic layout and hardware-accelerated text styles */}
							<div className="min-h-[72px] flex flex-col justify-center text-left">
								<AnimatePresence mode="wait">
									{isYearly ? (
										<motion.div 
											key="pro-anual"
											initial={{ opacity: 0, y: 5 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -5 }}
											transition={{ duration: 0.2 }}
											className="flex flex-col text-left"
										>
											<span className="text-xs text-muted-foreground line-through font-medium">
												239,88 €
											</span>
											<div className="text-muted-foreground flex items-end gap-1.5 text-xl relative">
												<span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
													199
													<span className="text-xl md:text-2xl font-bold tracking-normal align-super ml-0.5">,99</span>
												</span>
												<span className="font-bold text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">€</span>
												<span className="text-sm text-muted-foreground pb-0.5">/año</span>
												
												{/* Boxless inline savings annotation */}
												<span className="text-xs font-bold text-emerald-600 pb-1.5 pl-1.5 tracking-tight animate-pulse whitespace-nowrap">
													¡Ahorras 40€!
												</span>
											</div>
										</motion.div>
									) : (
										<motion.div 
											key="pro-mensual"
											initial={{ opacity: 0, y: 5 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -5 }}
											transition={{ duration: 0.2 }}
											className="text-muted-foreground flex items-end gap-1.5 text-xl h-full items-center pt-4 relative"
										>
											<span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
												19
												<span className="text-xl md:text-2xl font-bold tracking-normal align-super ml-0.5">,99</span>
											</span>
											<span className="font-bold text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">€</span>
											<span className="text-sm text-muted-foreground pb-0.5">/mes</span>
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							<Separator className="bg-gray-100 mt-2" />

							{/* Added explicit min-height hooks across column list elements to preserve parallel alignment lines */}
							<ul className="space-y-3 text-sm text-gray-600">
								<li className="flex items-start gap-2.5 md:min-h-[40px]">
									<CircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
									<span>Acceso completa a todas las herramientas (Voz, Visión y Alertas)</span>
								</li>
								<li className="flex items-start gap-2.5 md:min-h-[40px]">
									<CircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
									<span>Hasta 4 Mayores y 4 Tutores vinculados</span>
								</li>
								<li className="flex items-start gap-2.5 md:min-h-[40px]">
									<CircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
									<span>150 consultas mensuales por persona</span>
								</li>
								<li className="flex items-start gap-2.5 md:min-h-[40px]">
									<CircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
									<span>Modelos de IA de última generación</span>
								</li>
							</ul>
						</div>

						<div className="mt-8 z-10">
							<Button 
								className="w-full cursor-pointer shadow-sm font-medium"
								onClick={() => handleSelectPlan('pro')}
							>
								Empieza ahora
							</Button>
						</div>
					</div>
				</div>

				{/* Assurance Footer Label */}
				<div className="text-muted-foreground flex items-center justify-center gap-x-2 text-sm pt-2">
					<ShieldCheckIcon className="size-4 text-emerald-500" />
					<span>Acceso a todas las características sin costes ocultos.</span>
				</div>
			</motion.div>

			{/* OVERLAY LAYER: Checkout Form Interface */}
			<AnimatePresence>
				{plan && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						// Adjusted flex positioning to top layout context matching close proximity requests
						className="absolute inset-0 z-20 flex items-start justify-center p-2 pt-4 backdrop-blur-[3px] bg-background/5"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 10 }}
							transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
							className="w-full max-w-md drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
						>
							<div className="text-center space-y-1 mb-4">
								<h2 className="text-2xl font-bold tracking-tight text-gray-900">
									Finalizar Compra
								</h2>
								<p className="text-xs text-muted-foreground">
									<span className="font-semibold text-foreground">{getPlanLabel()}</span> —{' '}
									<span className="font-bold text-emerald-600 dark:text-emerald-500">{getPriceLabel()}</span>
								</p>
							</div>

							<Card className="w-full rounded-2xl border border-gray-100 bg-white relative overflow-hidden shadow-sm">
								{/* Loader backdrop mask view */}
								{isLoading && (
									<div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 p-6 text-center animate-in fade-in zoom-in-95 duration-200">
										<div className="flex flex-col items-center gap-6">
											<GooeySpinner />
											<div className="space-y-2">
												<h2 className="text-xl font-semibold text-gray-900">Procesando pago</h2>
												<p className="text-sm text-gray-500 max-w-[280px] mx-auto">
													Por favor, espera un momento mientras confirmamos tu suscripción familiar.
												</p>
											</div>
										</div>
									</div>
								)}

								<CardContent className="p-6 text-left">
									<div className="space-y-6">
										{/* Express payment buttons */}
										<div className="grid grid-cols-3 gap-4">
											<Button 
												variant="outline" 
												type="button" 
												disabled={isLoading}
												onClick={() => handlePaymentProcess()}
												className="h-14 p-0 flex flex-col items-center justify-center gap-1 cursor-pointer"
											>
												<FaPaypal className="text-xl text-[#003087]" />
												<span className="text-xs font-medium">PayPal</span>
											</Button>
											<Button 
												variant="outline" 
												type="button" 
												disabled={isLoading}
												onClick={() => handlePaymentProcess()}
												className="h-14 p-0 flex flex-col items-center justify-center gap-1 cursor-pointer"
											>
												<FaApple className="text-xl text-black" />
												<span className="text-xs font-medium">Pay</span>
											</Button>
											<Button 
												variant="outline" 
												type="button" 
												disabled={isLoading}
												onClick={() => handlePaymentProcess()}
												className="h-14 p-0 flex flex-col items-center justify-center gap-1 cursor-pointer"
											>
												<FcGoogle className="text-2xl" />
												<span className="text-xs font-medium">Pay</span>
											</Button>
										</div>

										{/* Separator */}
										<div className="flex items-center text-gray-400">
											<hr className="flex-grow border-t border-gray-200" />
											<span className="mx-2 text-[11px] font-medium whitespace-nowrap">o paga usando tarjeta de crédito</span>
											<hr className="flex-grow border-t border-gray-200" />
										</div>

										{/* Input form fields */}
										<form onSubmit={handlePaymentProcess} className="space-y-4">
											<div className="space-y-1">
												<Label htmlFor="cardholder-name" className="text-xs font-medium text-gray-700">Nombre completo del titular</Label>
												<div className="relative flex items-center">
													<Input 
														id="cardholder-name" 
														name="cardholderName" 
														placeholder="María López" 
														value={cardName}
														disabled={isLoading}
														onChange={(e) => setCardName(e.target.value)}
														className="h-10 text-sm pr-10 w-full" 
													/>
													<div className="absolute right-3 flex items-center">
														<AnimatePresence>
															{isNameValid && <AnimatedCheckmarkCircle />}
														</AnimatePresence>
													</div>
												</div>
											</div>

											<div className="space-y-1">
												<Label htmlFor="card-number" className="text-xs font-medium text-gray-700">Número de tarjeta</Label>
												<div className="relative flex items-center">
													<Input
														id="card-number"
														name="cardNumber"
														placeholder="0000 0000 0000 0000"
														inputMode="numeric"
														value={cardNumber}
														disabled={isLoading}
														onChange={handleCardNumberChange}
														className="h-10 text-sm pr-10 w-full"
													/>
													<div className="absolute right-3 flex items-center">
														<AnimatePresence>
															{isCardValid && <AnimatedCheckmarkCircle />}
														</AnimatePresence>
													</div>
												</div>
											</div>

											<div className="space-y-1">
												<Label htmlFor="expiry" className="text-xs font-medium text-gray-700">Fecha de Vencimiento / CVV</Label>
												<div className="flex gap-4 w-full grid grid-cols-2">
													<div className="relative flex items-center">
														<Input
															id="expiry"
															name="expiryDate"
															placeholder="MM/AA"
															value={expiry}
															disabled={isLoading}
															onChange={handleExpiryChange}
															className="h-10 text-sm pr-10 w-full"
														/>
														<div className="absolute right-3 flex items-center">
															<AnimatePresence>
																{isExpiryValid && <AnimatedCheckmarkCircle />}
															</AnimatePresence>
														</div>
													</div>
													<div className="relative flex items-center">
														<Input
															id="cvv"
															name="cvv"
															placeholder="CVV"
															inputMode="numeric"
															type="password"
															value={cvv}
															disabled={isLoading}
															onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
															className="h-10 text-sm pr-10 w-full"
														/>
														<div className="absolute right-3 flex items-center">
															<AnimatePresence>
																{isCvvValid && <AnimatedCheckmarkCircle />}
															</AnimatePresence>
														</div>
													</div>
												</div>
											</div>

											<Button 
												type="submit" 
												className="w-full mt-4 cursor-pointer shadow-sm font-medium" 
												size="lg" 
												disabled={isLoading || !isNameValid || !isCardValid || !isExpiryValid || !isCvvValid}
											>
												Pagar Ahora
											</Button>
										</form>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* ========================================== */}
			{/* SUCCESS POPUP RADIX DIALOG MODAL INTERFACE        */}
			{/* ========================================== */}
			<Dialog open={isSuccess} onOpenChange={setIsSuccess}>
				<DialogContent className="sm:max-w-md border-none overflow-hidden rounded-2xl bg-white shadow-xl">
					<DialogHeader hideCloseButton={true} className="border-b border-gray-100 bg-zinc-50/50 flex flex-col items-center justify-center p-6 text-center">
						<motion.div
							initial={{ scale: 0.4, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ type: "spring", stiffness: 260, damping: 15 }}
							className="mb-1"
						>
							<CheckCircle2 className="size-14 text-emerald-500 stroke-[1.5px]" />
						</motion.div>
						<DialogTitle className="text-xl font-bold tracking-tight text-gray-900 mt-2">
							¡Suscripción Activa!
						</DialogTitle>
						<DialogDescription className="text-xs text-muted-foreground mt-1">
							{getPlanLabel()} — <span className="font-semibold text-emerald-600 font-mono">{getPriceLabel()}</span>
						</DialogDescription>
					</DialogHeader>
					
					<DialogBody className="px-6 py-6 text-center space-y-4">
						<h3 className="text-base font-semibold text-gray-800">¡Muchas gracias por tu confianza!</h3>
						<p className="text-sm text-muted-foreground max-w-[310px] mx-auto leading-relaxed">
							El pago se ha procesado correctamente. Tu cuenta familiar ya se encuentra completamente operativa para comenzar.
						</p>
					</DialogBody>
					
					<DialogFooter className="border-t border-gray-100 bg-zinc-50/50 px-6 py-4 flex sm:flex-row sm:justify-end">
						<Button 
							onClick={handleProceedToSetup} 
							className="w-full cursor-pointer h-11 text-sm shadow-sm bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-medium rounded-xl"
							size="lg"
						>
							Comenzar configuración
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AestheticLayout>
	);
}

// Input internal verification checkmarks
export const AnimatedCheckmarkCircle = () => {
	const strokeCircumference = 2 * Math.PI * 7;

	return (
		<motion.div 
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.2 }}
			className="relative w-5 h-5 flex items-center justify-center"
		>
			<svg width="20" height="20" className="rotate-[-90deg] absolute inset-0">
				<motion.circle
					cx="10"
					cy="10"
					r="7"
					stroke="#22c55e"
					strokeWidth="2"
					fill="transparent"
					strokeDasharray={strokeCircumference}
					initial={{ strokeDashoffset: strokeCircumference }}
					animate={{ strokeDashoffset: 0 }}
					transition={{ duration: 0.35, ease: "easeOut" }}
				/>
				<motion.circle
					cx="10"
					cy="10"
					r="7"
					fill="#22c55e"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.15, delay: 0.25 }}
				/>
			</svg>
			<motion.div
				className="absolute flex items-center justify-center text-white z-10"
				initial={{ opacity: 0, scale: 0.4 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: "spring", damping: 12, stiffness: 300, delay: 0.3 }}
			>
				<IoMdCheckmark className="size-3 stroke-[2px]" />
			</motion.div>
		</motion.div>
	);
};

// ========================================== 
// RADIX DIALOG MODAL BUILDING BLOCKS
// ========================================== 
function Dialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-black/40 fixed inset-0 z-50 backdrop-blur-md transition-all duration-300',
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-gray-100 shadow-2xl duration-300 ease-[0.16,1,0.3,1] sm:max-w-lg',
					className,
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-body"
			className={cn('px-4 py-6 text-center', className)}
			{...props}
		/>
	);
}

function DialogHeader({
	className,
	children,
	hideCloseButton = false,
	...props
}: React.ComponentProps<'div'> & { hideCloseButton?: boolean }) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				'bg-muted/10 flex flex-col gap-2 rounded-t-2xl border-b border-gray-100 p-4 text-center items-center justify-center relative',
				className,
			)}
			{...props}
		>
			{children}
			{!hideCloseButton && (
				<DialogPrimitive.Close className="absolute top-4 right-4 rounded-full opacity-70 transition-opacity hover:opacity-100 cursor-pointer p-1 hover:bg-gray-100 text-gray-500">
					<XIcon className="size-4" />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'bg-muted/10 flex flex-col gap-2 rounded-b-2xl border-t border-gray-100 px-4 py-3 sm:flex-row sm:justify-end',
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn('text-lg font-bold leading-none text-gray-900', className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}
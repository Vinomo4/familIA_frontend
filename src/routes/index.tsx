import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  BellRing,
  Heart,
  MessageCircle,
  Mic,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/ui/hero-section-9";
import { Card } from "@/components/ui/card";
import { SimpleHeader } from "@/components/ui/simple-header";
import { PricingComparison } from "@/components/ui/pricing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FamilIA — Protección y tranquilidad para tu familia" },
      {
        name: "description",
        content:
          "Inclusión financiera y protección contra fraudes para personas mayores. Cuida a quien más quieres con FamilIA.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShieldCheck,
      title: "Escudo contra fraudes",
      description:
        "FamilIA detecta cobros inusuales, enlaces sospechosos y señales de estafa antes de que afecten a la cuenta.",
      accent: "from-emerald-100 via-white to-lime-50",
    },
    {
      icon: Mic,
      title: "Lectura en voz natural",
      description:
        "La app convierte movimientos, cartas y recibos bancarios en una voz clara y cercana para la persona mayor.",
      accent: "from-amber-100 via-white to-orange-50",
    },
    {
      icon: BellRing,
      title: "Avisos al instante",
      description:
        "Tú recibes alertas en tiempo real cuando el banco cambie algo importante o aparezca una posible comisión abusiva.",
      accent: "from-sky-100 via-white to-cyan-50",
    },
    {
      icon: Users,
      title: "Cuidado compartido",
      description:
        "La familia acompaña sin invadir: cada perfil ve lo justo para cuidar, entender y actuar con respeto.",
      accent: "from-rose-100 via-white to-pink-50",
    },
    {
      icon: ScrollText,
      title: "Resumen bancario simple",
      description:
        "Cada operación queda resumida en palabras simples para que revisar el banco no dependa de tecnicismos.",
      accent: "from-zinc-100 via-white to-stone-50",
    },
  ];

  const teamMembers = [
    {
      name: "Víctor Novelle",
      image: "/team/victor.jpg",
      linkedin: "https://www.linkedin.com/in/vinomo4/",
    },
    {
      name: "Aleix Juan",
      image: "/team/aleix.jpg",
      linkedin: "https://www.linkedin.com/in/aleix-juan-mora/",
    },
    {
      name: "Alejandra Villamizar",
      image: "/team/alejandra.jpg",
      linkedin: "https://www.linkedin.com/in/alejandra-villamizar-98083b392/",
    },
    {
      name: "Joaquín Ayala",
      image: "/team/joaquin.jpg",
      linkedin: "https://www.linkedin.com/in/joaquinhayala/",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <SimpleHeader />
      <HeroSection
        title="Protege el dinero de tus padres sin quitarles su independencia."
        highlightWord="independencia"
        subtitle="Ellos usan una herramienta de voz muy sencilla para entender el banco. Tú recibes alertas en tiempo real ante comisiones abusivas o fraudes."
        actions={[
          {
            text: "Comenzar",
            onClick: () => navigate({ to: "/auth/signup" }),
            variant: "default",
            className: "bg-[#34d399] hover:bg-[#2ebc89] text-gray-900",
          },
          {
            text: "Quiero que mi familia me lo instale",
            onClick: () => {
              const message = `Hola, me gustaría que me instales FamilIA, un asistente para ayudarme con el banco.`;
              if (navigator.share) {
                navigator
                  .share({ title: "FamilIA — Ayúdame a instalarlo", text: message })
                  .catch(() => {
                    window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
                  });
              } else {
                window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
              }
            },
            variant: "outline",
          },
        ]}
        stats={[
          {
            value: "Bloqueo Anti-Fraude",
            label: "Detectamos y bloqueamos fraudes y enlaces maliciosos.",
            icon: <ShieldCheck className="h-6 w-6" />,
          },
          {
            value: "Traductor Bancario",
            label: "Convertimos cartas y recibos en mensajes de voz claros.",
            icon: <MessageCircle className="h-6 w-6" />,
          },
          {
            value: "Cero Barreras Digitales",
            label: "Interfaz para la tercera edad: sin teclados ni contraseñas.",
            icon: <Heart className="h-6 w-6" />,
          },
        ]}
        images={[
          "https://images.unsplash.com/photo-1580869318757-a6c605b061ed?q=80&w=687&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1758523668802-53f1e40977ba?q=80&w=1332&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1758686254247-af5bc1f195a5?q=80&w=1332&auto=format&fit=crop",
        ]}
      />
      <section id="funciones" className="scroll-mt-24 px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(236,253,245,0.92),rgba(255,255,255,0.98))] shadow-[0_30px_90px_-40px_rgba(16,185,129,0.45)]">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-10 lg:px-10 lg:py-10">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Funciones
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                FamilIA convierte la banca en algo claro, acompañado y seguro.
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                Estas funciones están pensadas para que la persona mayor use la app con facilidad y la familia reciba contexto útil sin perder tiempo.
              </p>
            </div>

            <div className="-mx-2 overflow-x-auto px-2 pb-2">
              <div className="flex min-w-max gap-4 snap-x snap-mandatory">
                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="w-[18rem] snap-start sm:w-[19.5rem] lg:w-[20.5rem]"
                    >
                      <Card className="group h-full overflow-hidden rounded-[1.75rem] border-emerald-100 bg-white/80 p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                        <div className={`rounded-[1.4rem] bg-gradient-to-br ${feature.accent} p-4`}>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-950 text-white shadow-lg shadow-emerald-900/10">
                                <Icon className="h-5 w-5" />
                              </div>
                              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                                0{index + 1}
                              </p>
                              <h3 className="mt-2 text-xl font-semibold tracking-tight text-gray-950">
                                {feature.title}
                              </h3>
                            </div>
                            <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                              Activo
                            </span>
                          </div>

                          <p className="mt-6 max-w-xs text-sm leading-6 text-gray-700">
                            {feature.description}
                          </p>

                          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-900">
                            <span className="inline-flex size-2 rounded-full bg-emerald-500" />
                            {[
                              "Protección clara para cada movimiento",
                              "Voz simple para entender el banco",
                              "Alertas inmediatas para tu familia",
                              "Acompañamiento respetuoso y visible",
                              "Resumen fácil para revisar decisiones",
                            ][index]}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="precios" className="scroll-mt-24 px-4 pb-12 pt-8 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
              Precios
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
              Elige el plan que acompaña a tu familia con la misma claridad que el producto.
            </h2>
            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              Compara los planes aquí mismo y sigue explorando la landing sin salir a otra página.
            </p>
          </div>

          <PricingComparison
            showBackButton={false}
            showBackground={false}
            onSelectPlan={() => navigate({ to: "/auth/signup" })}
          />
        </div>
      </section>

      <section
        id="nosotros"
        className="scroll-mt-24 px-4 pt-16 pb-24 sm:pt-24 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-emerald-50/80 to-emerald-100/80"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 sm:gap-16">
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Nuestra misión
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl leading-tight">
                La tecnología debe sumar,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  no dejar a nadie atrás.
                </span>
              </h2>
              <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg max-w-2xl">
                Queremos ayudar a las personas mayores a entrar en esta nueva era digital con confianza y autonomía. FamilIA convierte lo complejo en una experiencia cercana, clara y tranquila.
              </p>
            </motion.div>

            <div className="flex flex-col gap-8 sm:gap-12">
              <motion.h3 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center text-2xl font-semibold tracking-tight text-emerald-700 sm:text-3xl"
              >
                Conoce al equipo
              </motion.h3>

              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 w-full">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group relative flex flex-col w-full items-center text-center"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white shadow-sm">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-emerald-950 shadow-sm opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-emerald-600 hover:text-white"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>

                    <div className="mt-4 flex flex-col px-1 w-full items-center">
                      <h3 className="text-lg font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-emerald-800">
                        {member.name}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
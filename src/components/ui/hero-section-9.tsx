import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ActionProps {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: ButtonProps["variant"];
  className?: string;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  stats: StatProps[];
  images: string[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const titleContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const HeroSection = ({ title, subtitle, actions, stats, images, className }: HeroSectionProps) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/40",
        className,
      )}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-16"
      >
        {/* Left: Text */}
        <div className="flex flex-col gap-8">
          <motion.h1
            variants={titleContainerVariants}
            className="text-3xl font-bold leading-[1.05] tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {(() => {
              const text = typeof title === "string"
                ? title
                : React.Children.toArray(title)
                    .map((c) => (typeof c === "string" ? c : React.isValidElement(c) && typeof c.props.children === "string" ? c.props.children : ""))
                    .join(" ");

              const words = text.split(" ");

              return words.map((word, i) => {
                const plain = word.replace(/\s+/g, "");
                const needsGradient = /Independencia|Tranquilidad|Patrimonio/i.test(plain);
                return (
                  <motion.span key={i} variants={wordVariants} className="inline-block mr-2">
                    {needsGradient ? (
                      <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">{word}</span>
                    ) : (
                      word
                    )}
                    {i !== words.length - 1 ? " " : ""}
                  </motion.span>
                );
              });
            })()}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                size="lg"
                variant={action.variant ?? "default"}
                onClick={action.onClick}
                className={cn("h-12 rounded-full px-7 text-base", action.className)}
                asChild={!!action.href}
              >
                {action.href ? <a href={action.href}>{action.text}</a> : <span>{action.text}</span>}
              </Button>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Image collage */}
        <div className="relative h-[460px] w-full md:h-[560px]">
          {/* Decorative shapes */}
          <div className="absolute right-6 top-6 h-24 w-24 rounded-2xl bg-amber-300/40 blur-2xl" />
          <div className="absolute bottom-10 left-2 h-28 w-28 rounded-full bg-emerald-300/40 blur-2xl" />
          <div className="absolute right-1/3 bottom-1/4 h-16 w-16 rounded-xl bg-primary/30 blur-xl" />

          {images[0] && (
            <motion.div
              variants={imageVariants}
              className="absolute left-0 top-4 h-64 w-52 overflow-hidden rounded-3xl shadow-xl ring-1 ring-border md:h-72 md:w-60"
            >
              <motion.img
                variants={floatingVariants}
                animate="animate"
                src={images[0]}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
          {images[1] && (
            <motion.div
              variants={imageVariants}
              className="absolute right-2 top-0 h-56 w-44 overflow-hidden rounded-3xl shadow-xl ring-1 ring-border md:h-64 md:w-52"
            >
              <img src={images[1]} alt="" className="h-full w-full object-cover" />
            </motion.div>
          )}
          {images[2] && (
            <motion.div
              variants={imageVariants}
              className="absolute bottom-0 left-12 h-56 w-64 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border md:h-64 md:w-80"
            >
              <motion.img
                variants={floatingVariants}
                animate="animate"
                src={images[2]}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

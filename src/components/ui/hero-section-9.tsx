'use client';

import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface StatProps {
  /** Short stat title shown alongside the icon. */
  value: string;
  /** Supporting description for the stat. */
  label: string;
  /** Decorative icon rendered inside the stat badge. */
  icon: React.ReactNode;
}

export interface ActionProps {
  /** Button label shown to the user. */
  text: string;
  /** Click handler used for action buttons. */
  onClick?: () => void;
  /** Visual variant forwarded to the button component. */
  variant?: ButtonProps["variant"];
  /** Extra utility classes for layout-specific styling. */
  className?: string;
}

export interface HeroSectionProps {
  /** Main heading displayed in the hero. */
  title: string;
  /** Word to highlight inside the title. */
  highlightWord?: string;
  /** Supporting summary below the heading. */
  subtitle: string;
  /** Primary and secondary call-to-action buttons. */
  actions: ActionProps[];
  /** Summary stats shown beneath the actions. */
  stats: StatProps[];
  /** Collage images rendered on the right side. */
  images: string[];
  /** Optional wrapper classes for page-specific spacing. */
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
} as const;

const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
} as const;

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
} as const;

const floatingVariants = {
  animate: {
    y: [0, -12, 0] as const,
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  },
} as const;

export default function HeroSection({
  title,
  highlightWord,
  subtitle,
  actions,
  stats,
  images,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("w-full overflow-hidden bg-background py-12 sm:py-24", className)}>
      <motion.div
        className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8 px-4"
        variants={containerVariants as any}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl flex flex-wrap justify-center lg:justify-start"
            variants={titleContainerVariants as any}
          >
            {title.split(" ").map((word, index) => {
              const isHighlighted = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
              
              return (
                <motion.span
                  key={index}
                  variants={wordVariants as any}
                  className={cn("mr-[0.25em]", isHighlighted ? "text-[#34d399]" : "")}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p className="mt-6 max-w-md text-lg text-muted-foreground" variants={itemVariants as any}>
            {subtitle}
          </motion.p>
          
          <motion.div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start" variants={itemVariants as any}>
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant}
                size="lg"
                className={action.className}
              >
                {action.text}
              </Button>
            ))}
          </motion.div>

          <motion.div className="mt-12 flex flex-col gap-6 lg:justify-start" variants={itemVariants as any}>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4 text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative h-[450px] w-full sm:h-[550px] max-w-xl mx-auto lg:mx-0">
          <motion.div
            className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-[#34d399]/20"
            variants={floatingVariants as any}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-blue-200/50"
            variants={floatingVariants as any}
            animate="animate"
            style={{ transitionDelay: "0.5s" }}
          />

          {images[0] && (
            <motion.div
              className="absolute left-1/2 top-0 h-52 w-48 -translate-x-1/2 rounded-3xl overflow-hidden shadow-xl ring-1 ring-border sm:h-72 sm:w-60 z-10"
              style={{ transformOrigin: "bottom center" }}
              variants={imageVariants as any}
            >
              <img src={images[0]} alt="" className="h-full w-full object-cover" />
            </motion.div>
          )}
          {images[1] && (
            <motion.div
              className="absolute right-0 top-1/3 h-48 w-44 rounded-3xl overflow-hidden shadow-xl ring-1 ring-border sm:h-64 sm:w-56 z-20"
              style={{ transformOrigin: "left center" }}
              variants={imageVariants as any}
            >
              <img src={images[1]} alt="" className="h-full w-full object-cover" />
            </motion.div>
          )}
          {images[2] && (
            <motion.div
              className="absolute bottom-4 left-4 h-48 w-52 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border sm:h-60 sm:w-72 z-30"
              style={{ transformOrigin: "top right" }}
              variants={imageVariants as any}
            >
              <img src={images[2]} alt="" className="h-full w-full object-cover" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  type MotionValue,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

type AnimatedGridBackgroundProps = {
  children: React.ReactNode;
  className?: string;
  glowAClassName?: string;
  glowBClassName?: string;
};

export function AnimatedGridBackground({
  children,
  className,
  glowAClassName = "bg-emerald-400/35",
  glowBClassName = "bg-emerald-200/35",
}: AnimatedGridBackgroundProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div onMouseMove={handleMouseMove} className={cn("relative overflow-hidden", className)}>
      <style>{`
        @keyframes grid-float {
          0% { transform: translate3d(0, 0, 0); opacity: 0.3; }
          50% { transform: translate3d(0, -18px, 0); opacity: 0.7; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.3; }
        }
        @keyframes grid-drift {
          0% { transform: translate3d(0, 0, 0); opacity: 0.2; }
          50% { transform: translate3d(16px, -22px, 0); opacity: 0.6; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.2; }
        }
      `}</style>
      <div className="absolute inset-0 z-0 opacity-[0.06]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className={cn(
            "absolute right-[-15%] top-[-20%] h-[40%] w-[40%] rounded-full blur-[120px]",
            glowAClassName,
          )}
        />
        <div
          className={cn(
            "absolute left-[-10%] bottom-[-20%] h-[45%] w-[45%] rounded-full blur-[140px]",
            glowBClassName,
          )}
        />
        <span
          className="absolute left-[12%] top-[24%] h-2.5 w-2.5 rounded-full bg-emerald-400/50 blur-[1px]"
          style={{ animation: "grid-float 8s ease-in-out infinite" }}
        />
        <span
          className="absolute left-[30%] top-[70%] h-1.5 w-1.5 rounded-full bg-emerald-300/60"
          style={{ animation: "grid-drift 10s ease-in-out infinite", animationDelay: "0.8s" }}
        />
        <span
          className="absolute right-[18%] top-[28%] h-2 w-2 rounded-full bg-emerald-400/40 blur-[1px]"
          style={{ animation: "grid-float 9s ease-in-out infinite", animationDelay: "1.6s" }}
        />
        <span
          className="absolute right-[30%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-emerald-200/70"
          style={{ animation: "grid-drift 11s ease-in-out infinite", animationDelay: "0.4s" }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function GridPattern({
  offsetX,
  offsetY,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) {
  return (
    <svg className="h-full w-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}

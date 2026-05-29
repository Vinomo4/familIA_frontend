import { cn } from "@/lib/utils";

interface GooeySpinnerProps {
  className?: string;
}

export const GooeySpinner = ({ className }: GooeySpinnerProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <style>{`
        .gooey-container {
          filter: url(#goo-accent);
          position: relative;
          width: 120px;
          height: 120px;
        }
        
        .gooey-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 22px;
          height: 22px;
          margin-top: -11px;
          margin-left: -11px;
          border-radius: 50%;
        }

        /* Premium Cohesive Palette: Indigo, Violet, and Cyan.
          These colors blend beautifully into fluid gradients when they touch!
        */
        .gooey-dot-1 {
        background-color: #10b981; /* Base Green */
        animation: gooey-orbit-1 2.4s infinite ease-in-out;
        }
        .gooey-dot-2 {
        background-color: #34d399; /* Deep Teal */
        animation: gooey-orbit-2 2.4s infinite ease-in-out;
        }
        .gooey-dot-3 {
        background-color: #a7f3d0; /* Electric Cyan */
        animation: gooey-orbit-3 2.4s infinite ease-in-out;
}

        @keyframes gooey-orbit-1 {
          0% { transform: rotate(0deg) translateY(-35px) scale(1); }
          50% { transform: rotate(180deg) translateY(0px) scale(0.9); }
          100% { transform: rotate(360deg) translateY(-35px) scale(1); }
        }

        @keyframes gooey-orbit-2 {
          0% { transform: rotate(120deg) translateY(-35px) scale(1); }
          50% { transform: rotate(300deg) translateY(0px) scale(0.9); }
          100% { transform: rotate(480deg) translateY(-35px) scale(1); }
        }

        @keyframes gooey-orbit-3 {
          0% { transform: rotate(240deg) translateY(-35px) scale(1); }
          50% { transform: rotate(420deg) translateY(0px) scale(0.9); }
          100% { transform: rotate(600deg) translateY(-35px) scale(1); }
        }
      `}</style>

      <div className="gooey-container">
        <div className="gooey-dot gooey-dot-1"></div>
        <div className="gooey-dot gooey-dot-2"></div>
        <div className="gooey-dot gooey-dot-3"></div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="goo-accent">
            <feGaussianBlur result="blur" stdDeviation="8" in="SourceGraphic" />
            {/* Slightly adjusted matrix values to maintain clean, crisp color 
              edges during high-speed color blending.
            */}
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8" mode="matrix" in="blur" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
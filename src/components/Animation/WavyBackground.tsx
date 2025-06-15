
import React from "react";
import { cn } from "@/lib/utils";

interface WavyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  waveOpacity?: number;
  waveWidth?: number;
  blur?: number;
}

export function WavyBackground({
  children,
  className,
  containerClassName,
  waveOpacity = 0.5,
  waveWidth = 50,
  blur = 10,
  ...props
}: WavyBackgroundProps) {
  return (
    <div className={cn("relative flex flex-col", containerClassName)}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className={cn(
            "absolute left-0 top-0 h-full w-full",
            "opacity-50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
          )}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="wave-pattern"
              x="0"
              y="0"
              width={waveWidth}
              height="200"
              patternUnits="userSpaceOnUse"
              fill="transparent"
            >
              <path
                d="M 0 100 Q 25 120 50 100 Q 75 80 100 100"
                stroke="rgba(59, 130, 246, 0.4)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 0 100 Q 25 120 50 100 Q 75 80 100 100"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="2"
                fill="none"
                transform="translate(25, 10)"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>
      <div
        className={cn("relative z-10 flex flex-col", className)}
        style={{
          backdropFilter: `blur(${blur}px)`,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

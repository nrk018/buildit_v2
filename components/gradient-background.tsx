"use client"

import { GrainGradient } from "@paper-design/shaders-react"

type GradientBackgroundProps = {
  /** When true, uses dots shape (small dots). When false/undefined, uses original corners shape. */
  noBalls?: boolean
}

/**
 * Fills its parent. Parent must be fixed and viewport-sized so the gradient is fixed to the screen;
 * content scrolls over it.
 */
export function GradientBackground({ noBalls = false }: GradientBackgroundProps) {
  return (
    <div
      className="absolute inset-0 h-full w-full"
      style={{
        minHeight: "100%",
        minWidth: "100%",
        background: "linear-gradient(135deg, hsl(198, 60%, 18%) 0%, hsl(195, 70%, 25%) 40%, hsl(193, 85%, 45%) 70%, hsl(196, 100%, 70%) 100%)",
      }}
      aria-hidden
    >
      <GrainGradient
        style={{ width: "100%", height: "100%" }}
        colorBack="hsl(198, 60%, 18%)"
        softness={noBalls ? 0.9 : 0.85}
        intensity={noBalls ? 0.4 : 0.7}
        noise={noBalls ? 0.12 : 0.08}
        shape={noBalls ? "dots" : "corners"}
        offsetX={0}
        offsetY={0}
        scale={noBalls ? 0.35 : 1}
        rotation={0}
        speed={1}
        colors={["hsl(193, 85%, 66%)", "hsl(196, 100%, 83%)", "hsl(195, 100%, 50%)", "hsl(200, 90%, 40%)"]}
      />
    </div>
  )
}

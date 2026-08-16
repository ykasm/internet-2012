"use client"

import { motion } from "framer-motion"
import { usePlayer } from "@/components/player-provider"

export function HeroScene() {
  const { isPlaying } = usePlayer()

  return (
    <div className="vignette grain pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base scene */}
      <motion.div
        className="ambient-drift absolute inset-0"
        animate={{ filter: isPlaying ? "brightness(1)" : "brightness(0.82)" }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      >
        <img
          src="/scene-2012.png"
          alt="A teenage Indian bedroom at night around 2012, lit by an old computer monitor with rain on the window"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Warm amber ambient glow, intensifies while playing */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 46% 58%, var(--amber-glow), transparent 70%)",
          mixBlendMode: "soft-light",
        }}
        animate={{ opacity: isPlaying ? 0.5 : 0.22 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />

      {/* Faded blue monitor glow */}
      <motion.div
        className={isPlaying ? "glow-pulse absolute inset-0" : "absolute inset-0"}
        style={{
          background:
            "radial-gradient(38% 34% at 52% 46%, var(--screen-blue), transparent 68%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: isPlaying ? 0.16 : 0.09 }}
        transition={{ duration: 2.8, ease: "easeInOut" }}
      />

      {/* Readability gradient from the bottom for the player */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.09 0.01 60 / 0.82) 0%, transparent 42%), linear-gradient(to bottom, oklch(0.09 0.01 60 / 0.55) 0%, transparent 30%)",
        }}
      />
    </div>
  )
}

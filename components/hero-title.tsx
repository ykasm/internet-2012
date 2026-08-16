"use client"

import { motion } from "framer-motion"

export function HeroTitle() {
  return (
    <div className="pointer-events-none flex flex-col items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="text-shadow-soft font-serif leading-[0.86] text-foreground"
      >
        <span className="block text-[clamp(1.75rem,5vw,3.4rem)] font-medium tracking-tight">
          THE INTERNET,
        </span>
        <span className="block text-[clamp(4.5rem,15vw,10rem)] font-semibold italic tracking-tight text-primary">
          2012
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.72, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 1 }}
        className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.42em] text-muted-foreground sm:text-xs"
      >
        before everything became an app.
      </motion.p>
    </div>
  )
}

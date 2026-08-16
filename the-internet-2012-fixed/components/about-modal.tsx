"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

export function AboutModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label="About"
            className="vignette relative w-full max-w-lg rounded-md border border-border bg-popover/95 p-8 shadow-[0_30px_80px_-30px_oklch(0.05_0.01_60/0.9)] backdrop-blur-xl sm:p-10"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-serif text-3xl font-medium text-foreground">
              THE INTERNET, <span className="italic text-primary">2012</span>
            </h2>

            <div className="mt-6 space-y-4 text-pretty font-mono text-[0.72rem] leading-relaxed tracking-wide text-muted-foreground sm:text-sm">
              <p>A collection of songs from a strange little moment in time.</p>
              <p className="text-foreground/80">
                Before reels.
                <br />
                Before stories.
                <br />
                Before everyone was permanently online.
              </p>
              <p>
                Just Facebook, YouTube, 3G, MP3 downloads, cyber cafés, wired
                earphones and songs you somehow still remember every word to.
              </p>
            </div>

            <div className="mt-8 border-t border-border/60 pt-4 font-mono text-[0.56rem] uppercase tracking-[0.34em] text-muted-foreground/70">
              Somewhere between Orkut and Instagram · India · 2012
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

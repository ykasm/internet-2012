"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { languageLabel, type LanguageChoice } from "@/lib/playlist"
import { cn } from "@/lib/utils"

const BOOT_STEPS = ["Connecting...", "Connected.", "Internet Explorer"] as const

const OPTIONS: LanguageChoice[] = ["english", "hindi", "punjabi", "mix"]

const OPTION_HINT: Record<LanguageChoice, string> = {
  english: "Radio pop · 2012",
  hindi: "Bollywood nights",
  punjabi: "Bhangra & beats",
  mix: "A little of everything",
}

type Mode = "boot" | "resume" | "select" | "connecting"

export function EnterScreen({
  onChoose,
  savedChoice,
}: {
  onChoose: (choice: LanguageChoice) => void
  savedChoice: LanguageChoice | null
}) {
  const [mode, setMode] = useState<Mode>("boot")
  const [bootStep, setBootStep] = useState(0)
  const [selected, setSelected] = useState<LanguageChoice | null>(null)
  const [connectStep, setConnectStep] = useState(0) // 0: connecting, 1: welcome

  // Boot sequence
  useEffect(() => {
    if (mode !== "boot") return
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setBootStep(1), 1000))
    timers.push(setTimeout(() => setBootStep(2), 1850))
    timers.push(
      setTimeout(() => setMode(savedChoice ? "resume" : "select"), 2700),
    )
    return () => timers.forEach(clearTimeout)
  }, [mode, savedChoice])

  const pick = (choice: LanguageChoice) => {
    setSelected(choice)
    setConnectStep(0)
    setMode("connecting")
  }

  // Connecting -> Welcome back -> enter
  useEffect(() => {
    if (mode !== "connecting" || !selected) return
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setConnectStep(1), 1150))
    timers.push(setTimeout(() => onChoose(selected), 2150))
    return () => timers.forEach(clearTimeout)
  }, [mode, selected, onChoose])

  return (
    <motion.div
      className="vignette grain fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* faint, darker scene behind the boot / selection screen */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/scene-2012.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(7px) brightness(0.32)",
          transform: "scale(1.06)",
        }}
      />
      <div className="absolute inset-0 bg-background/40" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8 px-6 text-center">
        <AnimatePresence mode="wait">
          {mode === "boot" && (
            <motion.div
              key={`boot-${bootStep}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
                {BOOT_STEPS[bootStep]}
              </span>
              <ConnectingBar />
            </motion.div>
          )}

          {mode === "resume" && savedChoice && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <Wordmark />
              <div className="flex flex-col items-center gap-1">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
                  Playing
                </span>
                <span className="font-serif text-4xl font-semibold italic text-primary">
                  {languageLabel(savedChoice)}
                </span>
              </div>
              <button
                onClick={() => pick(savedChoice)}
                className="rounded-sm border border-primary/40 bg-primary/5 px-10 py-3 font-mono text-xs uppercase tracking-[0.4em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Continue
              </button>
              <button
                onClick={() => setMode("select")}
                className="font-mono text-[0.58rem] uppercase tracking-[0.36em] text-muted-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Change
              </button>
            </motion.div>
          )}

          {mode === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col items-center gap-8"
            >
              <div className="flex flex-col items-center gap-2">
                <Wordmark />
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.42em] text-muted-foreground">
                  What do you want to hear?
                </p>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 sm:gap-4">
                {OPTIONS.map((opt, i) => (
                  <motion.button
                    key={opt}
                    onClick={() => pick(opt)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-sm border border-border bg-popover/40 px-4 py-6 text-left backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-primary/10"
                  >
                    <span className="block font-serif text-2xl font-medium text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                      {languageLabel(opt)}
                    </span>
                    <span className="mt-1 block font-mono text-[0.55rem] uppercase tracking-[0.24em] text-muted-foreground">
                      {OPTION_HINT[opt]}
                    </span>
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {mode === "connecting" && selected && (
            <motion.div
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-5"
            >
              <span className="font-serif text-4xl font-semibold italic text-primary">
                {languageLabel(selected)}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={connectStep}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-[0.66rem] uppercase tracking-[0.42em] text-muted-foreground"
                >
                  {connectStep === 0 ? "Connecting..." : "Welcome back."}
                </motion.span>
              </AnimatePresence>
              <ConnectingBar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 font-mono text-[0.58rem] uppercase tracking-[0.35em] text-muted-foreground/60">
        India · 2012
      </div>
    </motion.div>
  )
}

function Wordmark() {
  return (
    <div className="font-serif leading-none">
      <div className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        The Internet,
      </div>
      <div className="mt-1 text-6xl font-semibold italic text-primary sm:text-7xl">
        2012
      </div>
    </div>
  )
}

function ConnectingBar() {
  return (
    <div className="h-[3px] w-44 overflow-hidden rounded-full bg-border">
      <motion.div
        className={cn("h-full w-1/3 bg-primary")}
        animate={{ x: ["-120%", "360%"] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

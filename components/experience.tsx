"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useState } from "react"
import { AboutModal } from "@/components/about-modal"
import { EnterScreen } from "@/components/enter-screen"
import { HeroScene } from "@/components/hero-scene"
import { HeroTitle } from "@/components/hero-title"
import { MusicPlayer } from "@/components/music-player"
import { usePlayer } from "@/components/player-provider"
import { PlaylistDrawer } from "@/components/playlist-drawer"
import { TopStatus } from "@/components/top-status"
import { languageLabel, type LanguageChoice } from "@/lib/playlist"
import { cn } from "@/lib/utils"

const MOODS: LanguageChoice[] = ["english", "hindi", "punjabi", "mix"]

export function Experience() {
  const { started, chooseLanguage, savedChoice } = usePlayer()
  const [entered, setEntered] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const [moodOpen, setMoodOpen] = useState(false)

  const handleChoose = useCallback((choice: LanguageChoice) => {
    setEntered(true)
    chooseLanguage(choice)
  }, [chooseLanguage])

  const changeMood = useCallback((choice: LanguageChoice) => {
    chooseLanguage(choice, true)
    setMoodOpen(false)
  }, [chooseLanguage])

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-background">
      <HeroScene />
      <TopStatus onOpenAbout={() => setAboutOpen(true)} onOpenPlaylist={() => setPlaylistOpen(true)} onChangeMood={() => setMoodOpen(true)} />

      <div className="relative z-20 flex h-full flex-col items-center px-4 pb-6 pt-[13vh] sm:pt-[15vh]">
        <HeroTitle />
        <div className="flex-1" />
        <div className="w-full flex-none flex justify-center pb-[8vh] sm:pb-[10vh]"><MusicPlayer /></div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-1 pb-4 text-center font-mono">
        <p className="text-[0.58rem] uppercase tracking-[0.34em] text-muted-foreground/70">Somewhere between Orkut and Instagram.</p>
        <p className="text-[0.54rem] uppercase tracking-[0.38em] text-muted-foreground/50">India · 2012</p>
        <p className="mt-1 text-[0.54rem] uppercase tracking-[0.34em] text-muted-foreground/60">Made with <span className="text-primary">{"❤"}</span> by asm</p>
      </div>

      <PlaylistDrawer open={playlistOpen} onClose={() => setPlaylistOpen(false)} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      <AnimatePresence>
        {moodOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-background/55 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMoodOpen(false)} />
            <motion.div className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 border border-border bg-popover/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8" initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }}>
              <div className="mb-6 text-center">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.4em] text-muted-foreground">Change the radio</p>
                <h2 className="mt-2 font-serif text-3xl italic text-primary">What do you want to hear?</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {MOODS.map((mood) => (
                  <button key={mood} onClick={() => changeMood(mood)} className={cn("border border-border px-4 py-5 text-left transition-all hover:border-primary/60 hover:bg-primary/10", savedChoice === mood && "border-primary/60 bg-primary/10")}>
                    <span className="block font-serif text-2xl text-foreground">{languageLabel(mood)}</span>
                    <span className="mt-1 block font-mono text-[0.52rem] uppercase tracking-[0.2em] text-muted-foreground">{mood === "mix" ? "All three" : mood === "punjabi" ? "Bhangra & beats" : mood === "hindi" ? "Bollywood nights" : "Radio pop"}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setMoodOpen(false)} className="mt-5 w-full font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">Cancel</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!entered && !started && <EnterScreen onChoose={handleChoose} savedChoice={savedChoice} />}
      </AnimatePresence>
    </main>
  )
}

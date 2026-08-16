"use client"

import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { AboutModal } from "@/components/about-modal"
import { EnterScreen } from "@/components/enter-screen"
import { HeroScene } from "@/components/hero-scene"
import { HeroTitle } from "@/components/hero-title"
import { MusicPlayer } from "@/components/music-player"
import { usePlayer } from "@/components/player-provider"
import { PlaylistDrawer } from "@/components/playlist-drawer"
import { TopStatus } from "@/components/top-status"

export function Experience() {
  const { started, chooseLanguage, savedChoice } = usePlayer()
  const [entered, setEntered] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [playlistOpen, setPlaylistOpen] = useState(false)

  const handleChoose = (choice: Parameters<typeof chooseLanguage>[0]) => {
    setEntered(true)
    chooseLanguage(choice)
  }

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-background">
      <HeroScene />

      <TopStatus
        onOpenAbout={() => setAboutOpen(true)}
        onOpenPlaylist={() => setPlaylistOpen(true)}
      />

      {/* Content column: title near upper-center, player at lower-middle */}
      <div className="relative z-20 flex h-full flex-col items-center px-4 pb-6 pt-[13vh] sm:pt-[15vh]">
        <HeroTitle />

        <div className="flex-1" />

        <div className="w-full flex-none flex justify-center pb-[8vh] sm:pb-[10vh]">
          <MusicPlayer />
        </div>
      </div>

      {/* Bottom nostalgic captions */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-1 pb-4 text-center font-mono">
        <p className="text-[0.58rem] uppercase tracking-[0.34em] text-muted-foreground/70">
          Somewhere between Orkut and Instagram.
        </p>
        <p className="text-[0.54rem] uppercase tracking-[0.38em] text-muted-foreground/50">
          India · 2012
        </p>
        <p className="mt-1 text-[0.54rem] uppercase tracking-[0.34em] text-muted-foreground/60">
          Made with <span className="text-primary">{"❤"}</span> by asm
        </p>
      </div>

      <PlaylistDrawer open={playlistOpen} onClose={() => setPlaylistOpen(false)} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      <AnimatePresence>
        {!entered && !started && <EnterScreen onEnter={handleEnter} />}
      </AnimatePresence>
    </main>
  )
}

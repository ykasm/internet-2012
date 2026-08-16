"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Pause, Play, X } from "lucide-react"
import { useMemo, useState } from "react"
import { usePlayer } from "@/components/player-provider"
import { formatTime, type Language } from "@/lib/playlist"
import { cn } from "@/lib/utils"

type Filter = "ALL" | Language

export function PlaylistDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { tracks, currentTrack, isPlaying, selectTrack, toggle } = usePlayer()
  const [filter, setFilter] = useState<Filter>("ALL")

  const rows = useMemo(() => tracks.map((t, index) => ({ t, index })).filter(({ t }) => filter === "ALL" || t.language === filter), [tracks, filter])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="scrim" className="fixed inset-0 z-40 bg-background/50 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside key="drawer" role="dialog" aria-label="Playlist" className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-popover/95 backdrop-blur-xl max-sm:inset-x-0 max-sm:left-0 max-sm:top-auto max-sm:h-[82vh] max-sm:max-w-none max-sm:rounded-t-xl max-sm:border-l-0 max-sm:border-t" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 260, damping: 32 }}>
            <div className="flex items-start justify-between border-b border-border/60 p-5">
              <div>
                <h2 className="font-serif text-2xl font-medium italic text-primary">The Internet, 2012</h2>
                <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">A curated mixtape · {tracks.length} tracks</p>
              </div>
              <button onClick={onClose} aria-label="Close playlist" className="p-1 text-muted-foreground transition-colors hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex flex-wrap gap-5 border-b border-border/60 px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.3em]">
              {(["ALL", "ENGLISH", "HINDI", "PUNJABI"] as Filter[]).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={cn("relative pb-1 transition-colors", filter === f ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                  {f}
                  {filter === f && <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-[1px] h-px bg-primary" />}
                </button>
              ))}
            </div>

            <ul className="flex-1 overflow-y-auto px-2 py-2">
              {rows.map(({ t, index }, i) => {
                const active = currentTrack?.id === t.id
                const unavailable = !t.youtubeId
                return (
                  <li key={t.id}>
                    <button onClick={() => (active ? toggle() : selectTrack(index))} className={cn("group flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left transition-colors", active ? "bg-primary/10" : "hover:bg-foreground/5")}>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center font-mono text-[0.62rem] tabular-nums text-muted-foreground">
                        {active ? (isPlaying ? <Pause className="h-3.5 w-3.5 text-primary" fill="currentColor" /> : <Play className="h-3.5 w-3.5 text-primary" fill="currentColor" />) : <span className="group-hover:hidden">{(i + 1).toString().padStart(2, "0")}</span>}
                        {!active && <Play className="hidden h-3.5 w-3.5 text-foreground group-hover:block" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={cn("block truncate font-serif text-[0.98rem] leading-tight", active ? "text-primary" : "text-foreground")}>{t.title}</span>
                        <span className="block truncate font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground">{t.artist} · {t.album}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[0.58rem] tabular-nums text-muted-foreground">{unavailable ? "—" : formatTime(t.duration)}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

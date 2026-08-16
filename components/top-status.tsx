"use client"

import { useEffect, useState } from "react"

function useClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function TopStatus({ onOpenAbout, onOpenPlaylist, onChangeMood }: { onOpenAbout: () => void; onOpenPlaylist: () => void; onChangeMood: () => void }) {
  const time = useClock()
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 font-mono sm:p-6">
      <div className="pointer-events-auto flex flex-col gap-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--amber-glow)]" />{time || "11:47 PM"}</span>
        <span className="hidden items-center gap-1 sm:flex"><span className="opacity-60">3G</span><span className="flex items-end gap-[1px]" aria-hidden><span className="h-1.5 w-[2px] bg-foreground/70" /><span className="h-2 w-[2px] bg-foreground/70" /><span className="h-2.5 w-[2px] bg-foreground/40" /></span></span>
        <span className="opacity-70">127 online</span>
      </div>
      <div className="pointer-events-auto flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.18em] sm:gap-5 sm:text-[0.62rem]">
        <button onClick={onOpenAbout} className="text-muted-foreground transition-colors hover:text-foreground">About</button>
        <button onClick={onChangeMood} className="text-primary/90 transition-colors hover:text-primary">Change Mood</button>
        <button onClick={onOpenPlaylist} className="text-foreground/90 transition-colors hover:text-primary">Playlist</button>
        <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
        <a href="https://open.spotify.com/search/2012" target="_blank" rel="noreferrer" className="hidden text-muted-foreground/70 transition-colors hover:text-foreground sm:inline">Spotify</a>
        <a href="https://music.youtube.com/search?q=2012" target="_blank" rel="noreferrer" className="hidden text-muted-foreground/70 transition-colors hover:text-foreground sm:inline">YT&nbsp;Music</a>
      </div>
    </header>
  )
}

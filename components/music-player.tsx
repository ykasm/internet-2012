"use client"

import { motion } from "framer-motion"
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useRef, useState } from "react"
import { usePlayer } from "@/components/player-provider"
import { artworkFor, formatTime } from "@/lib/playlist"
import { cn } from "@/lib/utils"

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    shuffle,
    repeat,
    toggle,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
  } = usePlayer()

  const [volOpen, setVolOpen] = useState(false)
  const barRef = useRef<HTMLDivElement | null>(null)

  if (!currentTrack) return null

  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

  const handleSeek = (clientX: number) => {
    const el = barRef.current
    if (!el || duration <= 0) return
    const rect = el.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    seek(ratio * duration)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="w-full max-w-xl"
    >
      <div className="rounded-md border border-border bg-popover/70 p-3 shadow-[0_18px_60px_-24px_oklch(0.05_0.01_60/0.9)] backdrop-blur-md sm:p-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Artwork */}
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-border sm:h-16 sm:w-16">
            <img
              key={currentTrack.id}
              src={artworkFor(currentTrack) || "/placeholder.svg"}
              alt={`Artwork for ${currentTrack.title}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div
              className={cn(
                "absolute inset-0 bg-primary/10 transition-opacity duration-700",
                isPlaying ? "opacity-100" : "opacity-0",
              )}
            />
          </div>

          {/* Meta + progress */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.34em] text-primary/90">
                Now Playing
              </span>
              {isPlaying && <PlayingDots />}
            </div>
            <h2 className="truncate font-serif text-lg font-medium leading-tight text-foreground sm:text-xl">
              {currentTrack.title}
            </h2>
            <p className="truncate font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
              {currentTrack.artist} · {currentTrack.album}
            </p>

            {/* Progress */}
            <div className="mt-2 flex items-center gap-2">
              <span className="w-9 shrink-0 font-mono text-[0.58rem] tabular-nums text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <div
                ref={barRef}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(currentTime)}
                tabIndex={0}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId)
                  handleSeek(e.clientX)
                }}
                onPointerMove={(e) => {
                  if (e.buttons === 1) handleSeek(e.clientX)
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") seek(Math.min(duration, currentTime + 5))
                  if (e.key === "ArrowLeft") seek(Math.max(0, currentTime - 5))
                }}
                className="group relative h-4 flex-1 cursor-pointer"
              >
                <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-[0_0_8px_var(--amber-glow)] transition-opacity group-hover:opacity-100"
                  style={{ left: `${pct}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right font-mono text-[0.58rem] tabular-nums text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
          <button
            onClick={toggleShuffle}
            aria-label="Shuffle"
            aria-pressed={shuffle}
            className={cn(
              "p-1.5 transition-colors",
              shuffle ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Shuffle className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-5 sm:gap-6">
            <button
              onClick={previous}
              aria-label="Previous track"
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              <SkipBack className="h-5 w-5" fill="currentColor" />
            </button>
            <button
              onClick={toggle}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
              )}
            </button>
            <button
              onClick={next}
              aria-label="Next track"
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              <SkipForward className="h-5 w-5" fill="currentColor" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={cycleRepeat}
              aria-label={`Repeat: ${repeat}`}
              className={cn(
                "p-1.5 transition-colors",
                repeat !== "off"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {repeat === "one" ? (
                <Repeat1 className="h-4 w-4" />
              ) : (
                <Repeat className="h-4 w-4" />
              )}
            </button>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setVolOpen(true)}
              onMouseLeave={() => setVolOpen(false)}
            >
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : volume < 50 ? (
                  <Volume1 className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{ width: volOpen ? 72 : 0, opacity: volOpen ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={muted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="h-1 w-[68px] cursor-pointer appearance-none rounded-full bg-border accent-primary"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PlayingDots() {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-primary"
          animate={{ height: ["3px", "9px", "3px"] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.18,
          }}
        />
      ))}
    </span>
  )
}

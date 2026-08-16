"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  PLAYLIST,
  tracksForChoice,
  type LanguageChoice,
  type Track,
} from "@/lib/playlist"
import { loadYouTubeAPI, YT_STATE } from "@/lib/youtube"

type Repeat = "off" | "all" | "one"

interface PlayerContextValue {
  tracks: Track[]
  currentTrack: Track | null
  currentIndex: number
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  shuffle: boolean
  repeat: Repeat
  ready: boolean
  started: boolean
  choice: LanguageChoice
  savedChoice: LanguageChoice | null
  activeCount: number
  radioTrouble: boolean
  unavailableIds: Set<string>
  // controls
  chooseLanguage: (choice: LanguageChoice, autoplay?: boolean) => void
  tryAgain: () => void
  play: () => void
  pause: () => void
  toggle: () => void
  next: () => void
  previous: () => void
  seek: (seconds: number) => void
  setVolume: (v: number) => void
  toggleMute: () => void
  toggleShuffle: () => void
  cycleRepeat: () => void
  selectTrack: (index: number) => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

const LS = {
  choice: "i2012:choice",
  volume: "i2012:volume",
  shuffle: "i2012:shuffle",
}

/**
 * Build the ordered list of *candidate* tracks for a choice: only tracks that
 * have a source and are not marked unavailable this session.
 */
function buildQueue(choice: LanguageChoice, unavailable: Set<string>): Track[] {
  return tracksForChoice(choice).filter(
    (t) => t.youtubeId && !unavailable.has(t.id),
  )
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<any>(null)
  const hostRef = useRef<HTMLDivElement | null>(null)

  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(80)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<Repeat>("off")
  const [choice, setChoice] = useState<LanguageChoice>("mix")
  const [savedChoice, setSavedChoice] = useState<LanguageChoice | null>(null)
  const [unavailableIds, setUnavailableIds] = useState<Set<string>>(new Set())
  const [radioTrouble, setRadioTrouble] = useState(false)

  const currentTrack = currentIndex >= 0 ? (PLAYLIST[currentIndex] ?? null) : null
  const activeCount = useMemo(
    () => buildQueue(choice, unavailableIds).length,
    [choice, unavailableIds],
  )

  // Mutable snapshot for use inside YouTube callbacks (which close over state).
  const dataRef = useRef({
    choice,
    unavailable: unavailableIds,
    shuffle,
    repeat,
    currentId: null as string | null,
    volume,
  })
  dataRef.current = {
    choice,
    unavailable: unavailableIds,
    shuffle,
    repeat,
    currentId: currentTrack?.id ?? null,
    volume,
  }

  // ---- core loaders -----------------------------------------------------
  const loadTrack = useCallback((track: Track, autoplay: boolean) => {
    const p = playerRef.current
    if (!p || !track?.youtubeId) return
    const nextIndex = PLAYLIST.findIndex((t) => t.id === track.id)
    setCurrentIndex(nextIndex)
    dataRef.current.currentId = track.id
    setCurrentTime(0)
    setRadioTrouble(false)
    try {
      if (autoplay) p.loadVideoById(track.youtubeId)
      else p.cueVideoById(track.youtubeId)
    } catch {}
  }, [])

  /**
   * Find the next playable track relative to a given track id, within the
   * current choice's queue. Returns null when nothing is playable.
   */
  const findNextPlayableTrack = useCallback(
    (
      fromId: string | null,
      dir: 1 | -1,
      opts?: { shuffle?: boolean; unavailable?: Set<string>; choice?: LanguageChoice },
    ): Track | null => {
      const ch = opts?.choice ?? dataRef.current.choice
      const unavail = opts?.unavailable ?? dataRef.current.unavailable
      const useShuffle = opts?.shuffle ?? dataRef.current.shuffle
      const queue = buildQueue(ch, unavail)
      if (queue.length === 0) return null
      if (queue.length === 1) return queue[0]

      if (useShuffle) {
        const pool = queue.filter((t) => t.id !== fromId)
        return pool[Math.floor(Math.random() * pool.length)] ?? queue[0]
      }
      const i = fromId ? queue.findIndex((t) => t.id === fromId) : -1
      if (i < 0) return dir === 1 ? queue[0] : queue[queue.length - 1]
      const ni = (((i + dir) % queue.length) + queue.length) % queue.length
      return queue[ni]
    },
    [],
  )

  const markTrackUnavailable = useCallback((trackId: string): Set<string> => {
    const nextSet = new Set(dataRef.current.unavailable)
    nextSet.add(trackId)
    dataRef.current.unavailable = nextSet
    setUnavailableIds(nextSet)
    return nextSet
  }, [])

  const advance = useCallback(
    (dir: 1 | -1) => {
      const track = findNextPlayableTrack(dataRef.current.currentId, dir)
      if (!track) {
        setRadioTrouble(true)
        setIsPlaying(false)
        return
      }
      loadTrack(track, true)
    },
    [findNextPlayableTrack, loadTrack],
  )

  // ---- initialize the YouTube player once -------------------------------
  useEffect(() => {
    let cancelled = false
    let poll: ReturnType<typeof setInterval> | null = null

    // restore persisted prefs
    try {
      const savedVol = localStorage.getItem(LS.volume)
      const savedShuffle = localStorage.getItem(LS.shuffle)
      const savedCh = localStorage.getItem(LS.choice) as LanguageChoice | null
      if (savedVol != null) setVolumeState(Number(savedVol))
      if (savedShuffle != null) setShuffle(savedShuffle === "true")
      if (savedCh && ["english", "hindi", "punjabi", "mix"].includes(savedCh)) {
        setSavedChoice(savedCh)
        setChoice(savedCh)
      }
    } catch {}

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !hostRef.current) return
      playerRef.current = new YT.Player(hostRef.current, {
        width: "320",
        height: "180",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e: any) => {
            if (cancelled) return
            setReady(true)
            try {
              const v = Number(localStorage.getItem(LS.volume) ?? 80)
              e.target.setVolume(v)
            } catch {}
          },
          onStateChange: (e: any) => {
            const s = e.data
            if (s === YT_STATE.PLAYING) {
              setIsPlaying(true)
              setDuration(e.target.getDuration() || 0)
            } else if (s === YT_STATE.PAUSED) {
              setIsPlaying(false)
            } else if (s === YT_STATE.ENDED) {
              setIsPlaying(false)
              if (dataRef.current.repeat === "one") {
                e.target.seekTo(0)
                e.target.playVideo()
              } else {
                advance(1)
              }
            }
          },
          onError: () => {
            // Video unavailable/private/deleted/region-blocked. Mark this one
            // and move to the next playable track — never retry the same one.
            const failedId = dataRef.current.currentId
            const nextUnavail = failedId
              ? markTrackUnavailable(failedId)
              : dataRef.current.unavailable
            const track = findNextPlayableTrack(failedId, 1, {
              unavailable: nextUnavail,
            })
            if (!track) {
              setRadioTrouble(true)
              setIsPlaying(false)
              return
            }
            loadTrack(track, true)
          },
        },
      })
    })

    poll = setInterval(() => {
      const p = playerRef.current
      if (p && typeof p.getCurrentTime === "function") {
        try {
          setCurrentTime(p.getCurrentTime() || 0)
          const d = p.getDuration()
          if (d) setDuration(d)
        } catch {}
      }
    }, 500)

    return () => {
      cancelled = true
      if (poll) clearInterval(poll)
      try {
        playerRef.current?.destroy?.()
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---- language selection ----------------------------------------------
  const chooseLanguage = useCallback(
    (nextChoice: LanguageChoice, autoplay = true) => {
      setChoice(nextChoice)
      setSavedChoice(nextChoice)
      setStarted(true)
      setRadioTrouble(false)
      dataRef.current.choice = nextChoice
      try {
        localStorage.setItem(LS.choice, nextChoice)
      } catch {}

      const p = playerRef.current
      if (p) {
        try {
          p.unMute()
          p.setVolume(dataRef.current.volume)
        } catch {}
      }
      // Pick a random playable track from the new language and start it.
      const track = findNextPlayableTrack(null, 1, {
        choice: nextChoice,
        shuffle: true,
      })
      if (!track) {
        setRadioTrouble(true)
        setIsPlaying(false)
        return
      }
      loadTrack(track, autoplay)
    },
    [findNextPlayableTrack, loadTrack],
  )

  const tryAgain = useCallback(() => {
    // Clear this session's unavailable marks and try the current language again.
    const empty = new Set<string>()
    dataRef.current.unavailable = empty
    setUnavailableIds(empty)
    setRadioTrouble(false)
    const track = findNextPlayableTrack(null, 1, {
      choice: dataRef.current.choice,
      shuffle: true,
      unavailable: empty,
    })
    if (!track) {
      setRadioTrouble(true)
      return
    }
    loadTrack(track, true)
  }, [findNextPlayableTrack, loadTrack])

  // ---- controls ---------------------------------------------------------
  const play = useCallback(() => playerRef.current?.playVideo?.(), [])
  const pause = useCallback(() => playerRef.current?.pauseVideo?.(), [])
  const toggle = useCallback(() => {
    if (radioTrouble) {
      tryAgain()
      return
    }
    if (isPlaying) pause()
    else play()
  }, [radioTrouble, tryAgain, isPlaying, pause, play])

  const next = useCallback(() => advance(1), [advance])
  const previous = useCallback(() => {
    const p = playerRef.current
    if (p && p.getCurrentTime && p.getCurrentTime() > 3) {
      p.seekTo(0)
      return
    }
    advance(-1)
  }, [advance])

  const seek = useCallback((seconds: number) => {
    playerRef.current?.seekTo?.(seconds, true)
    setCurrentTime(seconds)
  }, [])

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(100, v))
    setVolumeState(clamped)
    setMuted(clamped === 0)
    try {
      playerRef.current?.setVolume?.(clamped)
      if (clamped > 0) playerRef.current?.unMute?.()
      localStorage.setItem(LS.volume, String(clamped))
    } catch {}
  }, [])

  const toggleMute = useCallback(() => {
    const p = playerRef.current
    if (!p) return
    if (muted || volume === 0) {
      p.unMute?.()
      const restore = volume === 0 ? 60 : volume
      p.setVolume?.(restore)
      setVolumeState(restore)
      setMuted(false)
    } else {
      p.mute?.()
      setMuted(true)
    }
  }, [muted, volume])

  const toggleShuffle = useCallback(() => {
    setShuffle((s) => {
      const nv = !s
      try {
        localStorage.setItem(LS.shuffle, String(nv))
      } catch {}
      return nv
    })
  }, [])

  const cycleRepeat = useCallback(() => {
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"))
  }, [])

  const selectTrack = useCallback(
    (index: number) => {
      const track = PLAYLIST[index]
      if (!track || !track.youtubeId) return
      setStarted(true)
      loadTrack(track, true)
    },
    [loadTrack],
  )

  const value = useMemo<PlayerContextValue>(
    () => ({
      tracks: PLAYLIST,
      currentTrack,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      muted,
      shuffle,
      repeat,
      ready,
      started,
      choice,
      savedChoice,
      activeCount,
      radioTrouble,
      unavailableIds,
      chooseLanguage,
      tryAgain,
      play,
      pause,
      toggle,
      next,
      previous,
      seek,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
      selectTrack,
    }),
    [
      currentTrack,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      muted,
      shuffle,
      repeat,
      ready,
      started,
      choice,
      savedChoice,
      activeCount,
      radioTrouble,
      unavailableIds,
      chooseLanguage,
      tryAgain,
      play,
      pause,
      toggle,
      next,
      previous,
      seek,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
      selectTrack,
    ],
  )

  return (
    <PlayerContext.Provider value={value}>
      {/* Hidden YouTube iframe host, moved off-screen so audio keeps playing. */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: 320,
          height: 180,
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <div ref={hostRef} />
      </div>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider")
  return ctx
}

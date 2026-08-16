// Minimal typings + singleton loader for the YouTube IFrame Player API.

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<any> | null = null

export function loadYouTubeAPI(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube API is only available in the browser"))
  }
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT)
  }
  if (apiPromise) return apiPromise

  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(window.YT)
    }
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script")
      tag.id = "youtube-iframe-api"
      tag.src = "https://www.youtube.com/iframe_api"
      document.head.appendChild(tag)
    }
  })

  return apiPromise
}

// PlayerState constants from the IFrame API.
export const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const

export {}

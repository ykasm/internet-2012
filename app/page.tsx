import { Experience } from "@/components/experience"
import { PlayerProvider } from "@/components/player-provider"

export default function Page() {
  return (
    <PlayerProvider>
      <Experience />
    </PlayerProvider>
  )
}

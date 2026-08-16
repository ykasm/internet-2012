import { PLAYLIST } from "@/lib/playlist"

// Emraan Hashmi-era Hindi hits around the 2012 nostalgia window.
// This module intentionally extends the shared playlist so the songs appear
// everywhere the existing Hindi playlist is consumed.
const EMRAAN_TRACKS = [
  { id: "eh1", title: "Pee Loon", artist: "Mohit Chauhan", album: "Once Upon a Time in Mumbaai", year: 2010, language: "hindi" as const, youtubeId: "D8XFTglfSMg", duration: 287 },
  { id: "eh2", title: "Tum Jo Aaye", artist: "Rahat Fateh Ali Khan, Tulsi Kumar", album: "Once Upon a Time in Mumbaai", year: 2010, language: "hindi" as const, youtubeId: "y2O44HDZWws", duration: 305 },
  { id: "eh3", title: "I Am in Love", artist: "K.K., Dominique Cerejo", album: "Once Upon a Time in Mumbaai", year: 2010, language: "hindi" as const, youtubeId: "", duration: 194 },
  { id: "eh4", title: "Hale Dil", artist: "Harshit Saxena", album: "Murder 2", year: 2011, language: "hindi" as const, youtubeId: "vN57t0QGF90", duration: 317 },
  { id: "eh5", title: "Phir Mohabbat", artist: "Mohammed Irfan, Arijit Singh, Saim Bhat", album: "Murder 2", year: 2011, language: "hindi" as const, youtubeId: "LC8Lln7-glM", duration: 300 },
  { id: "eh6", title: "Ishq Sufiyana", artist: "Kamal Khan", album: "The Dirty Picture", year: 2011, language: "hindi" as const, youtubeId: "NVANDjFcX8w", duration: 291 },
  { id: "eh7", title: "Tu Hi Mera", artist: "Shafqat Amanat Ali", album: "Jannat 2", year: 2012, language: "hindi" as const, youtubeId: "yBa3FVQKAvY", duration: 271 },
  { id: "eh8", title: "Sang Hoon Tere", artist: "Nikhil D'Souza", album: "Jannat 2", year: 2012, language: "hindi" as const, youtubeId: "", duration: 270 },
  { id: "eh9", title: "Lazy Lad", artist: "Richa Sharma", album: "Ghanchakkar", year: 2013, language: "hindi" as const, youtubeId: "tQC7rO8cjLs", duration: 260 },
  { id: "eh10", title: "Dance Basanti", artist: "Vishal Dadlani, Anushka Manchanda", album: "Ungli", year: 2014, language: "hindi" as const, youtubeId: "juZN67BA_5w", duration: 230 },
  { id: "eh11", title: "Pakeezah", artist: "Gulraj Singh", album: "Ungli", year: 2014, language: "hindi" as const, youtubeId: "8_oeXm_5RyE", duration: 137 },
]

for (const track of EMRAAN_TRACKS) {
  if (!PLAYLIST.some((existing) => existing.id === track.id)) {
    PLAYLIST.push({
      ...track,
      artwork: `https://img.youtube.com/vi/${track.youtubeId}/mqdefault.jpg`,
    })
  }
}

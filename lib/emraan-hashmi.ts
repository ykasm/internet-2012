import { PLAYLIST } from "@/lib/playlist"

// Emraan Hashmi classics across his major music eras, not limited to 2010–2014.
const EMRAAN_TRACKS = [
  { id: "eh1", title: "Aashiq Banaya Aapne", artist: "Himesh Reshammiya", album: "Aashiq Banaya Aapne", year: 2005, language: "hindi" as const, youtubeId: "0bAVd9", duration: 250 },
  { id: "eh2", title: "Kaho Na Kaho", artist: "Amir Jamal", album: "Murder", year: 2004, language: "hindi" as const, youtubeId: "", duration: 330 },
  { id: "eh3", title: "Bheege Hont Tere", artist: "Kunal Ganjawala", album: "Murder", year: 2004, language: "hindi" as const, youtubeId: "", duration: 300 },
  { id: "eh4", title: "Woh Lamhe Woh Baatein", artist: "Atif Aslam", album: "Zeher", year: 2005, language: "hindi" as const, youtubeId: "br_RJ0-rlbY", duration: 300 },
  { id: "eh5", title: "Aap Ki Kashish", artist: "Himesh Reshammiya", album: "Aashiq Banaya Aapne", year: 2005, language: "hindi" as const, youtubeId: "", duration: 290 },
  { id: "eh6", title: "Ya Ali", artist: "Zubeen Garg", album: "Gangster", year: 2006, language: "hindi" as const, youtubeId: "dpl9o_0Dtb4", duration: 290 },
  { id: "eh7", title: "Tu Hi Meri Shab Hai", artist: "K.K.", album: "Gangster", year: 2006, language: "hindi" as const, youtubeId: "2bVo3ID_UpU", duration: 360 },
  { id: "eh8", title: "Lamha Lamha", artist: "Abhijeet, Sunidhi Chauhan", album: "Gangster", year: 2006, language: "hindi" as const, youtubeId: "dJscz7bJ080", duration: 310 },
  { id: "eh9", title: "Bheegi Bheegi", artist: "James", album: "Gangster", year: 2006, language: "hindi" as const, youtubeId: "j9iR0-tUVKw", duration: 320 },
  { id: "eh10", title: "Jal Jal Ke", artist: "Zubeen Garg", album: "Aksar", year: 2006, language: "hindi" as const, youtubeId: "F_MYsiA3YY0", duration: 285 },
  { id: "eh11", title: "Tera Mera Rishta", artist: "Mustafa Zahid", album: "Awarapan", year: 2007, language: "hindi" as const, youtubeId: "", duration: 320 },
  { id: "eh12", title: "Toh Phir Aao", artist: "Mustafa Zahid", album: "Awarapan", year: 2007, language: "hindi" as const, youtubeId: "", duration: 330 },
  { id: "eh13", title: "Zara Sa", artist: "K.K.", album: "Jannat", year: 2008, language: "hindi" as const, youtubeId: "", duration: 300 },
  { id: "eh14", title: "Haan Tu Hain", artist: "K.K.", album: "Jannat", year: 2008, language: "hindi" as const, youtubeId: "", duration: 290 },
  { id: "eh15", title: "Tu Hi Haqeeqat", artist: "Javed Ali", album: "Tum Mile", year: 2009, language: "hindi" as const, youtubeId: "", duration: 310 },
  { id: "eh16", title: "Dil Ibaadat", artist: "K.K.", album: "Tum Mile", year: 2009, language: "hindi" as const, youtubeId: "", duration: 330 },
  { id: "eh17", title: "Pee Loon", artist: "Mohit Chauhan", album: "Once Upon a Time in Mumbaai", year: 2010, language: "hindi" as const, youtubeId: "D8XFTglfSMg", duration: 287 },
  { id: "eh18", title: "Tum Jo Aaye", artist: "Rahat Fateh Ali Khan, Tulsi Kumar", album: "Once Upon a Time in Mumbaai", year: 2010, language: "hindi" as const, youtubeId: "y2O44HDZWws", duration: 305 },
  { id: "eh19", title: "Hale Dil", artist: "Harshit Saxena", album: "Murder 2", year: 2011, language: "hindi" as const, youtubeId: "vN57t0QGF90", duration: 317 },
  { id: "eh20", title: "Phir Mohabbat", artist: "Mohammed Irfan, Arijit Singh, Saim Bhat", album: "Murder 2", year: 2011, language: "hindi" as const, youtubeId: "LC8Lln7-glM", duration: 300 },
  { id: "eh21", title: "Ishq Sufiyana", artist: "Kamal Khan", album: "The Dirty Picture", year: 2011, language: "hindi" as const, youtubeId: "NVANDjFcX8w", duration: 291 },
  { id: "eh22", title: "Tu Hi Mera", artist: "Shafqat Amanat Ali", album: "Jannat 2", year: 2012, language: "hindi" as const, youtubeId: "yBa3FVQKAvY", duration: 271 },
  { id: "eh23", title: "Sang Hoon Tere", artist: "Nikhil D'Souza", album: "Jannat 2", year: 2012, language: "hindi" as const, youtubeId: "", duration: 270 },
  { id: "eh24", title: "Lazy Lad", artist: "Richa Sharma", album: "Ghanchakkar", year: 2013, language: "hindi" as const, youtubeId: "tQC7rO8cjLs", duration: 260 },
  { id: "eh25", title: "Dance Basanti", artist: "Vishal Dadlani, Anushka Manchanda", album: "Ungli", year: 2014, language: "hindi" as const, youtubeId: "juZN67BA_5w", duration: 230 },
  { id: "eh26", title: "Pakeezah", artist: "Gulraj Singh", album: "Ungli", year: 2014, language: "hindi" as const, youtubeId: "8_oeXm_5RyE", duration: 137 },
]

for (const track of EMRAAN_TRACKS) {
  if (track.youtubeId && !PLAYLIST.some((existing) => existing.id === track.id)) {
    PLAYLIST.push({
      ...track,
      artwork: `https://img.youtube.com/vi/${track.youtubeId}/mqdefault.jpg`,
    })
  }
}

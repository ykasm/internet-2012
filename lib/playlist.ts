export type Language = "english" | "hindi" | "punjabi"
export type LanguageChoice = Language | "mix"

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  year: number
  language: Language
  youtubeId: string
  duration: number
  artwork: string
}

type RawTrack = Omit<Track, "artwork">

const RAW: RawTrack[] = [
  // HINDI
  { id: "h1", title: "Pareshaan", artist: "Shalmali Kholgade", album: "Ishaqzaade", year: 2012, language: "hindi", youtubeId: "TfWM6NkELdA", duration: 292 },
  { id: "h2", title: "Paani Da Rang", artist: "Ayushmann Khurrana", album: "Vicky Donor", year: 2012, language: "hindi", youtubeId: "rBt02QCPMWc", duration: 296 },
  { id: "h3", title: "Aashiyan", artist: "Shreya Ghoshal, Nikhil Paul George", album: "Barfi!", year: 2012, language: "hindi", youtubeId: "9jY5MFN3Kd4", duration: 258 },
  { id: "h4", title: "Phir Le Aya Dil", artist: "Arijit Singh", album: "Barfi!", year: 2012, language: "hindi", youtubeId: "Kp7eSUU9oy8", duration: 320 },
  { id: "h5", title: "Saawali Si Raat", artist: "Arijit Singh", album: "Barfi!", year: 2012, language: "hindi", youtubeId: "wtBt9j5CQ7Y", duration: 285 },
  { id: "h6", title: "Main Kya Karoon", artist: "Nikhil Paul George", album: "Barfi!", year: 2012, language: "hindi", youtubeId: "wqQ6BF50AT4", duration: 260 },
  { id: "h7", title: "Kyon", artist: "Papon, Sunidhi Chauhan", album: "Barfi!", year: 2012, language: "hindi", youtubeId: "_oyI0C2kBRc", duration: 265 },
  { id: "h8", title: "Tumhi Ho Bandhu", artist: "Neeraj Shridhar, Kavita Seth", album: "Cocktail", year: 2012, language: "hindi", youtubeId: "Yn7fCyIrByg", duration: 254 },
  { id: "h9", title: "Yaariyaan", artist: "Shefali Alvares", album: "Cocktail", year: 2012, language: "hindi", youtubeId: "", duration: 271 },
  { id: "h10", title: "Challa", artist: "Rabbi Shergill", album: "Jab Tak Hai Jaan", year: 2012, language: "hindi", youtubeId: "TWgup4wnWJk", duration: 280 },
  { id: "h11", title: "Saans", artist: "Shreya Ghoshal, Mohit Chauhan", album: "Jab Tak Hai Jaan", year: 2012, language: "hindi", youtubeId: "1_zR_L9y9tw", duration: 289 },
  { id: "h12", title: "Ishq Shava", artist: "Raghav, Shilpa Rao", album: "Jab Tak Hai Jaan", year: 2012, language: "hindi", youtubeId: "", duration: 275 },
  { id: "h13", title: "Jee Le Zaraa", artist: "Vishal Dadlani", album: "Talaash", year: 2012, language: "hindi", youtubeId: "MzY7Nd7ay1Q", duration: 300 },
  { id: "h14", title: "Ishq Wala Love", artist: "Salim Merchant, Shekhar Ravjiani, Neeti Mohan", album: "Student of the Year", year: 2012, language: "hindi", youtubeId: "iyc2QU3ZDLY", duration: 258 },
  { id: "h15", title: "Radha", artist: "Vishal Dadlani, Shreya Ghoshal", album: "Student of the Year", year: 2012, language: "hindi", youtubeId: "3Itm-EJVjNU", duration: 246 },
  { id: "h16", title: "Abhi Mujh Mein Kahin", artist: "Sonu Nigam", album: "Agneepath", year: 2012, language: "hindi", youtubeId: "9Ylpx1Jk4RY", duration: 341 },
  { id: "h17", title: "Chikni Chameli", artist: "Shreya Ghoshal", album: "Agneepath", year: 2012, language: "hindi", youtubeId: "dEHK5Rxdad8", duration: 254 },
  { id: "h18", title: "Deva Shree Ganesha", artist: "Ajay Gogavale", album: "Agneepath", year: 2012, language: "hindi", youtubeId: "dLf4jF212B4", duration: 349 },
  { id: "h19", title: "Tujhe Sochta Hoon", artist: "KK", album: "Jannat 2", year: 2012, language: "hindi", youtubeId: "SoazBypEfLg", duration: 289 },
  { id: "h20", title: "Tera Deedar Hua", artist: "KK", album: "Jannat 2", year: 2012, language: "hindi", youtubeId: "BQSMgvwrilI", duration: 300 },
  { id: "h21", title: "Rab Ka Shukrana", artist: "Mohit Chauhan, Shreya Ghoshal", album: "Jannat 2", year: 2012, language: "hindi", youtubeId: "o8dOljHt_mU", duration: 305 },
  { id: "h22", title: "Daaru Desi", artist: "Benny Dayal, Shalmali Kholgade", album: "Cocktail", year: 2012, language: "hindi", youtubeId: "kJhCA0hcTP0", duration: 260 },
  { id: "h23", title: "Second Hand Jawaani", artist: "Nakash Aziz, Neha Kakkar, Miss Pooja", album: "Cocktail", year: 2012, language: "hindi", youtubeId: "wLPex8H36MI", duration: 231 },
  { id: "h24", title: "Piya O Re Piya", artist: "Atif Aslam, Shreya Ghoshal", album: "Tere Naal Love Ho Gaya", year: 2012, language: "hindi", youtubeId: "vBeEy1QT2qY", duration: 273 },
  { id: "h25", title: "Sun Raha Hai Na Tu", artist: "Ankit Tiwari", album: "Aashiqui 2", year: 2013, language: "hindi", youtubeId: "-hTB4pB1XdE", duration: 302 },
  { id: "h26", title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", year: 2013, language: "hindi", youtubeId: "Umqb9KENgmk", duration: 262 },
  { id: "h27", title: "Manja", artist: "Amit Trivedi", album: "Kai Po Che!", year: 2013, language: "hindi", youtubeId: "", duration: 244 },
  { id: "h28", title: "Kabira", artist: "Tochi Raina, Rekha Bhardwaj", album: "Yeh Jawaani Hai Deewani", year: 2013, language: "hindi", youtubeId: "jHNNMj5bNQw", duration: 232 },

  // PUNJABI
  { id: "p1", title: "Brown Rang", artist: "Yo Yo Honey Singh", album: "International Villager", year: 2012, language: "punjabi", youtubeId: "iX4qQlm-0NY", duration: 261 },
  { id: "p2", title: "Angreji Beat", artist: "Gippy Grewal, Yo Yo Honey Singh", album: "International Villager", year: 2012, language: "punjabi", youtubeId: "ZTgvgmhC1gQ", duration: 254 },
  { id: "p3", title: "High Heels", artist: "Jaz Dhami, Yo Yo Honey Singh", album: "The Next Level", year: 2012, language: "punjabi", youtubeId: "Tkgad9gngOQ", duration: 263 },
  { id: "p4", title: "Dope Shope", artist: "Yo Yo Honey Singh, Deep Money", album: "International Villager", year: 2011, language: "punjabi", youtubeId: "NrXdauEv9HY", duration: 279 },
  { id: "p5", title: "Proper Patola", artist: "Diljit Dosanjh, Badshah", album: "Proper Patola", year: 2013, language: "punjabi", youtubeId: "GVhmynWOPoM", duration: 236 },
  { id: "p6", title: "Lak 28 Kudi Da", artist: "Diljit Dosanjh", album: "The Lion of Punjab", year: 2011, language: "punjabi", youtubeId: "LUXrfuOugnA", duration: 244 },
  { id: "p7", title: "Ki Samjaiye", artist: "Amrinder Gill ft. Dr Zeus", album: "Judaa", year: 2012, language: "punjabi", youtubeId: "2HxkiaDfWqw", duration: 218 },
  { id: "p8", title: "Gabru", artist: "J-Star ft. Yo Yo Honey Singh", album: "International Villager", year: 2011, language: "punjabi", youtubeId: "_1cM6Jujb8g", duration: 218 },
  { id: "p9", title: "Phulkari", artist: "Gippy Grewal", album: "Phulkari", year: 2012, language: "punjabi", youtubeId: "", duration: 258 },
  { id: "p10", title: "Naag", artist: "Jazzy B", album: "Oh Kedi", year: 2000, language: "punjabi", youtubeId: "FESUzWhwmHc", duration: 266 },
  { id: "p11", title: "Saj Dhaj Ke", artist: "Mika Singh", album: "Mausam", year: 2011, language: "punjabi", youtubeId: "scdMD9PvWOo", duration: 231 },
  { id: "p12", title: "Jaan Ton Pyara", artist: "Miss Pooja", album: "Jaan Ton Pyara", year: 2011, language: "punjabi", youtubeId: "", duration: 268 },
  { id: "p15", title: "This Party Getting Hot", artist: "Jazzy B, Yo Yo Honey Singh", album: "This Party Getting Hot", year: 2012, language: "punjabi", youtubeId: "RsrhJp7Dwy0", duration: 234 },
  { id: "p18", title: "Amplifier", artist: "Imran Khan", album: "Unforgettable", year: 2009, language: "punjabi", youtubeId: "uuCFRaFWjwY", duration: 232 },
  { id: "p19", title: "Satisfya", artist: "Imran Khan", album: "Satisfya", year: 2013, language: "punjabi", youtubeId: "pfVODjDBFxU", duration: 180 },
  { id: "p20", title: "Pata Chalgea", artist: "Imran Khan", album: "Unforgettable", year: 2009, language: "punjabi", youtubeId: "mywMbbCD2zE", duration: 285 },
  { id: "p21", title: "Aaja We Mahiya", artist: "Imran Khan", album: "Unforgettable", year: 2009, language: "punjabi", youtubeId: "qRTG8uF2ES4", duration: 232 },

  // ENGLISH
  { id: "e1", title: "Somebody That I Used to Know", artist: "Gotye ft. Kimbra", album: "Making Mirrors", year: 2011, language: "english", youtubeId: "8UVNT4wvIGY", duration: 244 },
  { id: "e2", title: "Call Me Maybe", artist: "Carly Rae Jepsen", album: "Kiss", year: 2012, language: "english", youtubeId: "fWNaR-rxAic", duration: 193 },
  { id: "e3", title: "We Are Young", artist: "fun. ft. Janelle Monáe", album: "Some Nights", year: 2011, language: "english", youtubeId: "Sv6dMFF_yts", duration: 260 },
  { id: "e4", title: "Some Nights", artist: "fun.", album: "Some Nights", year: 2012, language: "english", youtubeId: "qQkBeOisNM0", duration: 277 },
  { id: "e5", title: "Payphone", artist: "Maroon 5 ft. Wiz Khalifa", album: "Overexposed", year: 2012, language: "english", youtubeId: "KRaWnd3LJfs", duration: 231 },
  { id: "e6", title: "Titanium", artist: "David Guetta ft. Sia", album: "Nothing but the Beat", year: 2011, language: "english", youtubeId: "JRfuAukYTKg", duration: 245 },
  { id: "e7", title: "Lights", artist: "Ellie Goulding", album: "Lights", year: 2012, language: "english", youtubeId: "0NLmz-0auy0", duration: 213 },
  { id: "e8", title: "Glad You Came", artist: "The Wanted", album: "Battleground", year: 2011, language: "english", youtubeId: "rWk1PN0h3EI", duration: 199 },
  { id: "e9", title: "What Makes You Beautiful", artist: "One Direction", album: "Up All Night", year: 2011, language: "english", youtubeId: "QJO3ROT-A4E", duration: 200 },
  { id: "e10", title: "We Found Love", artist: "Rihanna ft. Calvin Harris", album: "Talk That Talk", year: 2011, language: "english", youtubeId: "tg00YEETFzg", duration: 275 },
  { id: "e11", title: "Starships", artist: "Nicki Minaj", album: "Pink Friday: Roman Reloaded", year: 2012, language: "english", youtubeId: "iP6XpLQM2Cs", duration: 210 },
  { id: "e12", title: "Wild Ones", artist: "Flo Rida ft. Sia", album: "Wild Ones", year: 2012, language: "english", youtubeId: "fPO76Jlnz6c", duration: 232 },
  { id: "e13", title: "Wide Awake", artist: "Katy Perry", album: "Teenage Dream", year: 2012, language: "english", youtubeId: "k0BWlvnBmIE", duration: 221 },
  { id: "e14", title: "Stronger (What Doesn't Kill You)", artist: "Kelly Clarkson", album: "Stronger", year: 2011, language: "english", youtubeId: "Xn676-fLq7I", duration: 222 },
  { id: "e15", title: "Drive By", artist: "Train", album: "California 37", year: 2012, language: "english", youtubeId: "oxqnFJ3lp5k", duration: 195 },
  { id: "e16", title: "Whistle", artist: "Flo Rida", album: "Wild Ones", year: 2012, language: "english", youtubeId: "cSnkWzZ7ZAA", duration: 224 },
  { id: "e17", title: "Domino", artist: "Jessie J", album: "Who You Are", year: 2011, language: "english", youtubeId: "UJtBUvcbFsA", duration: 233 },
  { id: "e18", title: "Don't You Worry Child", artist: "Swedish House Mafia ft. John Martin", album: "Until Now", year: 2012, language: "english", youtubeId: "1y6smkh6c-0", duration: 213 },
  { id: "e19", title: "Feel So Close", artist: "Calvin Harris", album: "18 Months", year: 2011, language: "english", youtubeId: "dGghkjpNCo8", duration: 205 },
  { id: "e20", title: "Gangnam Style", artist: "PSY", album: "Psy 6 (Six Rules), Part 1", year: 2012, language: "english", youtubeId: "9bZkp7q19f0", duration: 253 },
  { id: "e21", title: "Good Feeling", artist: "Flo Rida", album: "Wild Ones", year: 2011, language: "english", youtubeId: "3OnnDqH6Wj8", duration: 246 },
  { id: "e22", title: "The A Team", artist: "Ed Sheeran", album: "+", year: 2011, language: "english", youtubeId: "UAWcs5H-qgQ", duration: 258 },
  { id: "e23", title: "Lego House", artist: "Ed Sheeran", album: "+", year: 2011, language: "english", youtubeId: "bpOSxM0rNPM", duration: 245 },
  { id: "e24", title: "Paradise", artist: "Coldplay", album: "Mylo Xyloto", year: 2011, language: "english", youtubeId: "1G4isv_Fylg", duration: 278 },
  { id: "e25", title: "Princess of China", artist: "Coldplay ft. Rihanna", album: "Mylo Xyloto", year: 2012, language: "english", youtubeId: "PN_hbGkPmZI", duration: 239 },
  { id: "e26", title: "Where Have You Been", artist: "Rihanna", album: "Talk That Talk", year: 2012, language: "english", youtubeId: "HBxt_v0WF6Y", duration: 240 },
  { id: "e27", title: "Take Care", artist: "Drake ft. Rihanna", album: "Take Care", year: 2011, language: "english", youtubeId: "XU0Ecwqbnpo", duration: 277 },
  { id: "e28", title: "Party Rock Anthem", artist: "LMFAO", album: "Sorry for Party Rocking", year: 2011, language: "english", youtubeId: "KQ6zr6kCPj8", duration: 262 },
  { id: "e29", title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", year: 2011, language: "english", youtubeId: "dX3k_QDnzHE", duration: 244 },
  { id: "e30", title: "Little Talks", artist: "Of Monsters and Men", album: "My Head Is an Animal", year: 2012, language: "english", youtubeId: "ghb6eDopW8I", duration: 266 },
]

export const PLAYLIST: Track[] = RAW.filter((t) => Boolean(t.youtubeId)).map((t) => ({
  ...t,
  artwork: `https://img.youtube.com/vi/${t.youtubeId}/mqdefault.jpg`,
}))

const LABELS: Record<LanguageChoice, string> = {
  english: "ENGLISH",
  hindi: "HINDI",
  punjabi: "PUNJABI",
  mix: "MIX",
}

export function languageLabel(choice: LanguageChoice): string {
  return LABELS[choice] ?? String(choice).toUpperCase()
}

export function tracksForChoice(choice: LanguageChoice): Track[] {
  if (choice === "mix") return PLAYLIST
  return PLAYLIST.filter((t) => t.language === choice)
}

export function artworkFor(track: Track): string {
  return track.artwork
}

export function formatTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds || 0))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

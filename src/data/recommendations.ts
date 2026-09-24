import type { Place } from '../types'
import { PLACES_BY_ID } from './places'

// ---------------------------------------------------------------------------
// "LOCAL PICKS" — the editorially-curated highlight rail for the Home page.
// Deliberately leans toward the Seoul-Life / niche side rather than the
// obvious tourist hits.
// ---------------------------------------------------------------------------

export interface LocalPick {
  id: string
  tag: string
  blurb: string
}

const PICKS: LocalPick[] = [
  { id: 'daelim-changgo', tag: 'Seongsu', blurb: 'The original warehouse cafe that started Seongsu’s whole industrial-cool scene.' },
  { id: 'nogari-alley', tag: 'Euljiro', blurb: 'Grilled fish and beer in an old alley — the Seoul evening locals actually go to.' },
  { id: 'mangwon-market', tag: 'Mangwon', blurb: 'A real neighbourhood market without the Gwangjang crowds.' },
  { id: 'sewoon-plaza', tag: 'Euljiro', blurb: 'A retro electronics arcade with a rooftop view that reframes the whole city.' },
  { id: 'le-labo-citron', tag: 'Hannam', blurb: 'CITRON 28 — Le Labo’s Seoul city-exclusive, sold nowhere else on earth.' },
  { id: 'seoul-forest', tag: 'Seongsu', blurb: 'The green lung that gives the shopping day a slower, local rhythm.' },
]

export const LOCAL_PICKS: (LocalPick & { place: Place })[] = PICKS.map((p) => ({
  ...p,
  place: PLACES_BY_ID[p.id],
})).filter((p) => p.place)

export const ALL_PICKS = PICKS

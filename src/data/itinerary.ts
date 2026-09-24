import type { DayIntensity, DayPlan } from '../types'
import { DATE_LABELS } from './trip'

// ---------------------------------------------------------------------------
// The five-day skeleton. Fixed events are locked and marked `confirmed: true`.
// `suggested` lists are place ids from places.ts — they're flexible, ordered
// roughly by geography so the day reads as a walkable route, not a checklist.
// ---------------------------------------------------------------------------

export const DAY_PLANS: DayPlan[] = [
  {
    day: 1,
    date: DATE_LABELS[0].date,
    label: DATE_LABELS[0].label,
    weekday: DATE_LABELS[0].weekday,
    title: 'Arrival + Touch Five',
    fixed: [
      {
        id: 'ev-touch-five',
        day: 1,
        title: 'Touch Five',
        time: 'Evening',
        venue: 'To confirm',
        area: 'To confirm',
        notes: 'Fixed event on arrival day — keep the evening open for this.',
        confirmed: true,
        kind: 'FIXED',
      },
    ],
    focus: ['Arrive & settle in', 'Touch Five (evening)'],
    suggested: [],
    notes: 'Arrival day. Leave buffer for check-in and jet lag — only one commitment tonight.',
  },
  {
    day: 2,
    date: DATE_LABELS[1].date,
    label: DATE_LABELS[1].label,
    weekday: DATE_LABELS[1].weekday,
    title: 'EXO Concert',
    fixed: [
      {
        id: 'ev-exo-concert',
        day: 2,
        title: 'EXO Seoul Concert',
        titleKr: 'EXO 서울 콘서트',
        time: 'Evening',
        venue: 'To confirm',
        area: 'To confirm',
        notes: 'THE main event of the trip — keep the whole day light and stress-free.',
        confirmed: true,
        kind: 'FIXED',
      },
    ],
    focus: ['EXO Seoul Concert (THE priority)', 'Easy morning, low-key afternoon'],
    suggested: [],
    notes: 'Concert day. Plan almost nothing else — rest, eat well, arrive early.',
  },
  {
    day: 3,
    date: DATE_LABELS[2].date,
    label: DATE_LABELS[2].label,
    weekday: DATE_LABELS[2].weekday,
    title: 'WILD WILD + Euljiro',
    fixed: [
      {
        id: 'ev-wild-wild',
        day: 3,
        title: 'WILD WILD',
        time: 'Evening',
        venue: 'To confirm',
        area: 'To confirm',
        notes: 'Fixed evening event.',
        confirmed: true,
        kind: 'FIXED',
      },
    ],
    focus: ['WILD WILD (evening)', 'Euljiro / Mangwon local Seoul'],
    suggested: ['nogari-alley', 'sewoon-plaza', 'mangwon-market', 'gyeongui-forest', 'ikseon-dong'],
    notes: 'Free daytime before the evening show — use it for the local, un-touristy side of Seoul.',
  },
  {
    day: 4,
    date: DATE_LABELS[3].date,
    label: DATE_LABELS[3].label,
    weekday: DATE_LABELS[3].weekday,
    title: 'Seongsu + Shopping Day',
    fixed: [],
    focus: ['Seongsu crawl (cafes, bakeries, jewelry)', 'Shopping: fragrance + fashion', 'Haemok dinner (SUHO pick)'],
    suggested: [
      'milky-butter',
      'daelim-changgo',
      'center-coffee',
      'onion',
      'nudake',
      'tamburins',
      'hanna-ring',
      'ader-error',
      'alo',
      'juuneedu',
      'sw19',
      'low-coffee',
      'le-labo-citron',
      'loewe-perfume',
      'gentle-monster',
      'haemok',
    ],
    notes: 'The fullest day. Group stops by area: Seongsu (east) → Hannam/Apgujeong (west) → Haemok dinner in Gangnam.',
  },
  {
    day: 5,
    date: DATE_LABELS[4].date,
    label: DATE_LABELS[4].label,
    weekday: DATE_LABELS[4].weekday,
    title: 'Han River + Departure',
    fixed: [],
    focus: ['Cheonggyecheon photo', 'N Seoul Tower (afternoon)', 'Han River ramen', 'Last-minute shopping'],
    suggested: [
      'cheonggyecheon',
      'n-seoul-tower',
      'han-river-ramen',
      'olive-young',
      'auntie-annes',
      'sinchon-gamjatang',
      'fritz-coffee',
      'mcdonalds-korea',
    ],
    notes: 'Departure day. Keep it flexible around your flight — Cheonggyecheon and Han River are easy, low-cost closers.',
  },
]

export const DAY_PLANS_BY_DAY: Record<number, DayPlan> = Object.fromEntries(
  DAY_PLANS.map((d) => [d.day, d]),
)

export function dayPlan(day: number): DayPlan | undefined {
  return DAY_PLANS_BY_DAY[day]
}

export function computeIntensity(plan: DayPlan): DayIntensity {
  const n = plan.fixed.length + plan.suggested.length
  if (n <= 2) return 'RELAXED'
  if (n <= 5) return 'MODERATE'
  return 'HEAVY'
}

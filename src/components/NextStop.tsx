import { Check, MapPin, Ticket } from 'lucide-react'
import { DAY_PLANS } from '../data/itinerary'
import { PLACES_BY_ID } from '../data/places'
import { dateLabel } from '../data/trip'
import type { FixedEvent, Place } from '../types'
import { useStore } from '../lib/store'

type Stop =
  | { kind: 'fixed'; key: string; day: number; title: string; time?: string; venue?: string; event: FixedEvent }
  | { kind: 'place'; key: string; day: number; place: Place }

function buildStops(): Stop[] {
  const stops: Stop[] = []
  for (const plan of DAY_PLANS) {
    for (const ev of plan.fixed) {
      stops.push({
        kind: 'fixed',
        key: `ev:${ev.id}`,
        day: plan.day,
        title: ev.title,
        time: ev.time,
        venue: ev.venue,
        event: ev,
      })
    }
    for (const id of plan.suggested) {
      const place = PLACES_BY_ID[id]
      if (place) stops.push({ kind: 'place', key: place.id, day: plan.day, place })
    }
  }
  return stops
}

export default function NextStop() {
  const { statusFor, setStatus } = useStore()
  const stops = buildStops()
  const isDone = (s: Stop) => statusFor(s.key, undefined) === 'VISITED'
  const next = stops.find((s) => !isDone(s))
  const doneCount = stops.filter(isDone).length

  if (!next) {
    return (
      <div className="bg-ink text-paper rounded-2xl p-5 sm:p-6">
        <p className="text-[11px] uppercase tracking-widest2 text-paper/60 mb-2">Next stop</p>
        <h3 className="font-serif text-2xl font-semibold">All done ✨</h3>
        <p className="text-sm text-paper/70 mt-1">Every planned stop is marked visited. Enjoy the city.</p>
      </div>
    )
  }

  const isFixed = next.kind === 'fixed'
  const title = isFixed ? next.title : next.place.name
  const subtitle = isFixed
    ? next.venue ?? next.time ?? 'Fixed event'
    : `${next.place.area} · ${next.place.why ?? next.place.signature ?? ''}`

  return (
    <div className="bg-ink text-paper rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] uppercase tracking-widest2 text-paper/60">Next stop</span>
        <span className="text-[11px] text-paper/60">
          {doneCount}/{stops.length} done
        </span>
      </div>

      <p className="text-[12px] uppercase tracking-widest text-paper/60">{dateLabel(next.day)}</p>

      <div className="flex items-start gap-3 mt-2">
        <span className="mt-1 text-paper/70">{isFixed ? <Ticket size={20} /> : <MapPin size={20} />}</span>
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-paper/70 mt-1">{subtitle}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setStatus(next.key, 'VISITED')}
        className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-white transition-colors"
      >
        <Check size={15} />
        Mark done
      </button>
    </div>
  )
}

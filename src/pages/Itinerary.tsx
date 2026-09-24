import { Ticket } from 'lucide-react'
import { DAY_PLANS, computeIntensity } from '../data/itinerary'
import { PLACES_BY_ID } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import { IntensityBadge, SectionHeading } from '../components/ui'

export default function Itinerary() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="Itinerary"
        title="Five days in Seoul"
        sub="Fixed events are locked. Suggested stops are flexible — reorder by mood and energy."
      />

      <div className="space-y-10">
        {DAY_PLANS.map((d) => (
          <section key={d.day}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-widest2 text-graywarm">
                  Day {d.day} · {d.label} · {d.weekday}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink">{d.title}</h3>
                {d.notes ? <p className="text-sm text-graywarm mt-1 max-w-2xl">{d.notes}</p> : null}
              </div>
              <IntensityBadge level={computeIntensity(d)} />
            </div>

            {d.fixed.length > 0 ? (
              <div className="mb-4 space-y-2">
                {d.fixed.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-start gap-3 bg-wine/5 border border-wine/20 rounded-xl px-4 py-3"
                  >
                    <Ticket size={18} className="text-wine mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-ink">
                        {ev.title}
                        <span className="text-[11px] font-normal text-wine ml-2">FIXED</span>
                      </p>
                      <p className="text-[12px] text-graywarm">
                        {[ev.time, ev.venue, ev.area].filter(Boolean).join(' · ')}
                      </p>
                      {ev.notes ? <p className="text-[12px] text-ink-soft mt-1">{ev.notes}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {d.suggested.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {d.suggested.map((id) => {
                  const p = PLACES_BY_ID[id]
                  return p ? <PlaceCard key={id} place={p} /> : null
                })}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  )
}

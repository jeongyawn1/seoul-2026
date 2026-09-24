import { Link } from 'react-router-dom'
import { TRIP } from '../data/trip'
import { DAY_PLANS, computeIntensity } from '../data/itinerary'
import { PLACES } from '../data/places'
import NextStop from '../components/NextStop'
import WhatShouldIDoNow from '../components/WhatShouldIDoNow'
import LocalPicks from '../components/LocalPicks'
import WanderMode from '../components/WanderMode'
import { SectionHeading } from '../components/ui'
import { INTENSITY_META, cn } from '../lib/utils'

export default function Home() {
  return (
    <div>
      <section className="border-b border-line bg-paper2/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm mb-3">{TRIP.dateRange}</p>
          <h1 className="font-serif text-5xl sm:text-7xl font-semibold tracking-tight text-ink leading-none">
            SEOUL
          </h1>
          <p className="text-lg sm:text-xl text-ink-soft mt-4 font-medium">{TRIP.tagline}</p>
          <p className="text-sm text-graywarm mt-2">
            {TRIP.destination} · {TRIP.days} days · {TRIP.nights} nights
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[12px]">
            <span className="px-3 py-1 rounded-full bg-ink text-paper">{PLACES.length} places saved</span>
            <span className="px-3 py-1 rounded-full border border-line bg-white">3 fixed events</span>
            <span className="px-3 py-1 rounded-full border border-line bg-white">EXO · 08 NOV</span>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <section>
          <SectionHeading eyebrow="Right now" title="What's next" />
          <div className="grid lg:grid-cols-2 gap-4">
            <NextStop />
            <WhatShouldIDoNow />
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Local picks"
            title="Seoul, like a local"
            sub="A few we added that aren't on the usual lists — markets, warehouses, rooftops."
          />
          <LocalPicks />
        </section>

        <section>
          <SectionHeading eyebrow="Feel like exploring?" title="Wander mode" />
          <WanderMode />
        </section>

        <section>
          <SectionHeading
            eyebrow="At a glance"
            title="The five days"
            sub="Intensity is auto-calculated from how much is planned each day."
          />
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {DAY_PLANS.map((d) => {
              const meta = INTENSITY_META[computeIntensity(d)]
              return (
                <Link
                  key={d.day}
                  to="/itinerary"
                  className="bg-white border border-line rounded-xl p-3 text-center hover:border-ink/30 transition-colors"
                >
                  <p className="text-[11px] text-graywarm">D{d.day}</p>
                  <p className="text-[12px] font-semibold text-ink">{d.label}</p>
                  <p className={cn('text-[10px] font-semibold uppercase tracking-wider mt-1', meta.className)}>
                    {meta.label}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

import { useMemo } from 'react'
import { PLACES } from '../data/places'
import MapView from '../components/MapView'
import { SectionHeading } from '../components/ui'

export default function MapPage() {
  const mapped = useMemo(() => PLACES.filter((p) => p.lat != null && p.lng != null), [])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="Map"
        title="Everything on one map"
        sub={`${mapped.length} places with approximate coordinates — tap a pin for details. Use the search links on each card for exact directions.`}
      />

      <MapView
        places={mapped}
        className="h-[60vh] sm:h-[65vh] w-full rounded-2xl overflow-hidden border border-line"
      />

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {mapped.map((p) => (
          <div key={p.id} className="flex items-center gap-2 text-[13px]">
            <span className="inline-block w-2 h-2 rounded-full bg-seoul shrink-0" />
            <span className="font-medium text-ink">{p.name}</span>
            <span className="text-graywarm truncate">· {p.area}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

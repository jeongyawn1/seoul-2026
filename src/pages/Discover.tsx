import { DISCOVER_PLACES } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import { SectionHeading } from '../components/ui'

export default function Discover() {
  const areas = [...new Set(DISCOVER_PLACES.map((p) => p.area))]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="Discover"
        title="Seoul Life, off the tourist path"
        sub="Curated local spots to round out the trip — markets, warehouse cafes, hidden rooftops. Hours are indicative; verify before you go."
      />

      {areas.map((area) => (
        <section key={area} className="mb-8">
          <h3 className="text-[12px] uppercase tracking-widest2 text-graywarm mb-3">{area}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {DISCOVER_PLACES.filter((p) => p.area === area).map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

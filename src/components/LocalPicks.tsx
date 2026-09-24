import { MapPin } from 'lucide-react'
import { LOCAL_PICKS } from '../data/recommendations'

export default function LocalPicks() {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
      {LOCAL_PICKS.map((p) => (
        <article
          key={p.id}
          className="shrink-0 w-64 bg-white border border-line rounded-2xl p-4 flex flex-col gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest2 text-seoul font-semibold">{p.tag}</span>
          <h3 className="font-semibold text-ink leading-tight">{p.place.name}</h3>
          {p.place.nameKr ? <p className="text-[12px] text-graywarm -mt-1">{p.place.nameKr}</p> : null}
          <p className="text-[12px] text-ink-soft leading-relaxed">{p.blurb}</p>
          <span className="mt-auto inline-flex items-center gap-1 text-[11px] text-graywarm">
            <MapPin size={11} />
            {p.place.area}
          </span>
        </article>
      ))}
    </div>
  )
}

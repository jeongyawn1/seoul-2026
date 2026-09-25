import { AlertTriangle, MapPin, Ticket } from 'lucide-react'
import { DAY_PLANS, computeIntensity } from '../data/itinerary'
import { PLACES_BY_ID } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import { IntensityBadge, SectionHeading } from '../components/ui'
import { cn } from '../lib/utils'
import type { TimelineItem } from '../types'

const TIMELINE_ICON: Record<TimelineItem['type'], string> = {
  fixed: '🎫',
  place: '📍',
  food: '🍜',
  coffee: '☕',
  free: '☕',
  transit: '🚇',
  note: '▸',
  return: '✈️',
}

function TimelineRow({ item }: { item: TimelineItem }) {
  const highlighted = item.fixed || item.highlight
  return (
    <div className="relative pl-4 py-2.5">
      <div className="flex items-start gap-3">
        {item.time ? (
          <span className="shrink-0 text-[12px] font-mono text-graywarm w-14 text-right leading-5 pt-0.5">
            {item.time}
          </span>
        ) : (
          <span className="shrink-0 w-14" />
        )}
        <div className="min-w-0 flex-1">
          <p className={cn('text-sm font-medium leading-snug', highlighted ? 'text-wine' : 'text-ink')}>
            <span className="mr-1.5">{TIMELINE_ICON[item.type]}</span>
            {item.title}
            {highlighted ? <span className="ml-2 text-[10px] font-semibold text-wine">固定</span> : null}
          </p>
          {item.detail ? <p className="text-[12px] text-graywarm mt-0.5 leading-relaxed">{item.detail}</p> : null}
          {item.traffic ? <p className="text-[12px] text-ink-soft mt-0.5">{item.traffic}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default function Itinerary() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="每日行程"
        title="首尔五天"
        sub="固定活动已锁定（不可修改）。建议地点可灵活调整——按心情和体力重新排序。"
      />

      <div className="space-y-10">
        {DAY_PLANS.map((d) => (
          <section key={d.day}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-widest2 text-graywarm">
                  第 {d.day} 天 · {d.label} · {d.weekday}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink">{d.title}</h3>
              </div>
              <IntensityBadge level={computeIntensity(d)} />
            </div>

            {d.routeNote ? (
              <div className="mb-4 bg-seoul/5 border border-seoul/20 rounded-xl px-4 py-3">
                <p className="text-[11px] font-semibold text-seoul-deep mb-1">📌 今日路线说明</p>
                <p className="text-[13px] text-ink-soft leading-relaxed">{d.routeNote}</p>
              </div>
            ) : null}

            {d.conflicts && d.conflicts.length > 0 ? (
              <div className="mb-4 bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 space-y-2">
                {d.conflicts.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-amber-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[13px] font-medium text-amber-900">⚠️ 行程冲突：{c.reason}</p>
                      <p className="text-[12px] text-amber-800 mt-0.5 leading-relaxed">可调整：{c.fix}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {d.fixed.length > 0 ? (
              <div className="mb-4 space-y-2">
                {d.fixed.map((ev) => (
                  <div key={ev.id} className="flex items-start gap-3 bg-wine/5 border border-wine/25 rounded-xl px-4 py-3">
                    <Ticket size={18} className="text-wine mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        {ev.title}
                        {ev.titleKr ? <span className="text-[12px] font-normal text-graywarm ml-2">{ev.titleKr}</span> : null}
                        <span className="text-[11px] font-semibold text-wine ml-2">🔴 已确定</span>
                      </p>
                      <p className="text-[12px] text-graywarm mt-0.5">
                        {[ev.time, ev.venue, ev.area].filter(Boolean).join(' · ')}
                      </p>
                      {ev.address ? <p className="text-[12px] text-graywarm">{ev.address}</p> : null}
                      {ev.nearestStation ? (
                        <p className="text-[12px] text-graywarm flex items-center gap-1 mt-0.5">
                          <MapPin size={12} />
                          {ev.nearestStation}
                        </p>
                      ) : null}
                      {ev.notes ? <p className="text-[12px] text-ink-soft mt-1 leading-relaxed">{ev.notes}</p> : null}
                      {ev.conflict ? (
                        <p className="text-[12px] text-amber-800 mt-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 leading-relaxed">
                          {ev.conflict}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {d.timeline && d.timeline.length > 0 ? (
              <div className="mb-4 bg-white border border-line rounded-2xl px-3 py-2 divide-y divide-line/60">
                {d.timeline.map((item, i) => (
                  <TimelineRow key={i} item={item} />
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

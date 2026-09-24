import { CalendarDays, Sparkles } from 'lucide-react'
import { DAY_PLANS } from '../data/itinerary'
import { PLACES_BY_ID } from '../data/places'
import type { Place } from '../types'
import { useStore } from '../lib/store'
import { BUCKET_LABEL, daysUntilTrip, isAfterTrip, isBeforeTrip, timeBucket, tripDayIndex } from '../lib/clock'

interface Rec {
  label: string
  title: string
  subtitle: string
  placeId?: string
}

const CATS_FOR_BUCKET: Record<string, string[]> = {
  morning: ['cafe', 'bakery', 'dessert'],
  midday: ['food', 'bakery', 'dessert'],
  afternoon: ['shopping', 'fragrance', 'beauty', 'jewelry', 'lifestyle', 'attraction', 'hidden-gem'],
  evening: ['food', 'bar', 'hidden-gem', 'attraction', 'dessert'],
  late: ['food', 'hidden-gem'],
}

function pickPlace(ids: string[], cats: string[], isVisited: (id: string) => boolean): Place | undefined {
  const pool = ids.map((id) => PLACES_BY_ID[id]).filter((p): p is Place => Boolean(p))
  const unvisited = pool.filter((p) => !isVisited(p.id))
  const inCat = unvisited.filter((p) => cats.includes(p.category))
  return inCat[0] ?? unvisited[0] ?? pool[0]
}

function buildRec(now: Date, isVisited: (id: string) => boolean): Rec {
  if (isBeforeTrip(now)) {
    const d = daysUntilTrip(now)
    return {
      label: 'Countdown',
      title: `${d} days to Seoul`,
      subtitle: 'Trip starts 07 NOV. Day 1 is arrival + Touch Five in the evening — keep it easy.',
    }
  }
  if (isAfterTrip(now)) {
    return {
      label: 'Wrap up',
      title: 'Trip complete',
      subtitle: 'Hope Seoul delivered. Safe travels home — see you next time.',
    }
  }

  const day = tripDayIndex(now) ?? 1
  const plan = DAY_PLANS.find((p) => p.day === day)
  const bucket = timeBucket(now)
  const bucketLabel = BUCKET_LABEL[bucket]
  const label = `${bucketLabel} · Day ${day}`
  const fixed = plan?.fixed[0]

  if (bucket === 'evening' || bucket === 'late') {
    if (fixed) {
      return { label, title: fixed.title, subtitle: fixed.notes ?? 'Fixed event — get there on time.' }
    }
  }

  if (!plan || plan.suggested.length === 0) {
    if (fixed) {
      return {
        label,
        title: `${fixed.title} tonight`,
        subtitle: 'Keep the day light — rest, eat well, and arrive early. This is the priority.',
      }
    }
    return { label, title: 'Free & easy', subtitle: 'No fixed plans — take it slow and wander.' }
  }

  const cats = CATS_FOR_BUCKET[bucket]
  const place = pickPlace(plan.suggested, cats, isVisited)
  if (place) {
    return {
      label,
      title: place.name,
      subtitle: `${place.area} — ${place.why ?? place.signature ?? ''}`,
      placeId: place.id,
    }
  }
  return { label, title: 'You’ve covered today', subtitle: 'All planned stops are visited — enjoy the moment.' }
}

export default function WhatShouldIDoNow() {
  const { statusFor } = useStore()
  const now = new Date()
  const rec = buildRec(now, (id) => statusFor(id, undefined) === 'VISITED')
  const place = rec.placeId ? PLACES_BY_ID[rec.placeId] : undefined

  return (
    <div className="bg-white border border-line rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={15} className="text-seoul" />
        <span className="text-[11px] uppercase tracking-widest2 text-graywarm">What should I do now?</span>
      </div>

      <p className="text-[12px] text-graywarm flex items-center gap-1.5 mb-3">
        <CalendarDays size={13} />
        {rec.label}
      </p>

      <h3 className="font-serif text-2xl font-semibold text-ink leading-tight">{rec.title}</h3>
      <p className="text-sm text-ink-soft mt-1 leading-relaxed">{rec.subtitle}</p>

      {place ? (
        <p className="mt-3 text-[12px] text-graywarm">
          {place.nameKr ?? ''} · {place.category} · {place.priceLevel ?? ''}
        </p>
      ) : null}
    </div>
  )
}

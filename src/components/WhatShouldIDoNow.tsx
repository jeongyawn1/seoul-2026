import { CalendarDays, Sparkles } from 'lucide-react'
import { DAY_PLANS } from '../data/itinerary'
import { PLACES_BY_ID } from '../data/places'
import type { Place } from '../types'
import { useStore } from '../lib/store'
import { CATEGORY_LABEL } from '../lib/utils'
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
      label: '倒计时',
      title: `距首尔还有 ${d} 天`,
      subtitle: '行程 11/07 开始。第一天是抵达 + 晚上 Touch Five，轻松为主。',
    }
  }
  if (isAfterTrip(now)) {
    return {
      label: '收尾',
      title: '旅程结束',
      subtitle: '希望首尔给你留下了好回忆。一路平安，下次见。',
    }
  }

  const day = tripDayIndex(now) ?? 1
  const plan = DAY_PLANS.find((p) => p.day === day)
  const bucket = timeBucket(now)
  const bucketLabel = BUCKET_LABEL[bucket]
  const label = `${bucketLabel} · 第 ${day} 天`
  const fixed = plan?.fixed[0]

  if (bucket === 'evening' || bucket === 'late') {
    if (fixed) {
      return { label, title: fixed.title, subtitle: fixed.notes ?? '固定活动——按时到场。' }
    }
  }

  if (!plan || plan.suggested.length === 0) {
    if (fixed) {
      return {
        label,
        title: `今晚：${fixed.title}`,
        subtitle: '今天轻松点——休息好、吃好、提前到场，这是重点。',
      }
    }
    return { label, title: '自由活动', subtitle: '没有固定安排——慢慢逛，随意走走。' }
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
  return { label, title: '今天已逛完', subtitle: '所有计划点都已打卡——享受当下吧。' }
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
        <span className="text-[11px] uppercase tracking-widest2 text-graywarm">现在做什么？</span>
      </div>

      <p className="text-[12px] text-graywarm flex items-center gap-1.5 mb-3">
        <CalendarDays size={13} />
        {rec.label}
      </p>

      <h3 className="font-serif text-2xl font-semibold text-ink leading-tight">{rec.title}</h3>
      <p className="text-sm text-ink-soft mt-1 leading-relaxed">{rec.subtitle}</p>

      {place ? (
        <p className="mt-3 text-[12px] text-graywarm">
          {place.nameKr ?? ''} · {CATEGORY_LABEL[place.category]} · {place.priceLevel ?? ''}
        </p>
      ) : null}
    </div>
  )
}

import { useState } from 'react'
import { Shuffle } from 'lucide-react'
import { DISCOVER_PLACES } from '../data/places'
import type { Place } from '../types'
import PlaceCard from './PlaceCard'

export default function WanderMode() {
  const [current, setCurrent] = useState<Place | null>(null)

  const pick = () => {
    if (DISCOVER_PLACES.length === 0) return
    const i = Math.floor(Math.random() * DISCOVER_PLACES.length)
    setCurrent(DISCOVER_PLACES[i])
  }

  return (
    <div className="bg-paper2 border border-line rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm mb-0.5">漫游模式</p>
          <h3 className="font-serif text-xl font-semibold text-ink">没有计划，随便逛</h3>
        </div>
        <button
          type="button"
          onClick={pick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-paper text-[13px] font-medium hover:bg-ink-soft transition-colors"
        >
          <Shuffle size={15} />
          漫游
        </button>
      </div>

      {current ? (
        <PlaceCard place={current} compact />
      ) : (
        <p className="text-sm text-graywarm">
          点「漫游」随机推荐一个首尔生活打卡点——本地咖啡、市场或隐藏地标。
        </p>
      )}
    </div>
  )
}

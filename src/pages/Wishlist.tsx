import { useState } from 'react'
import { WISHLIST_PLACES } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import { useStore } from '../lib/store'
import { SectionHeading } from '../components/ui'
import { STATUS_META, STATUS_ORDER, cn } from '../lib/utils'
import type { WishlistStatus } from '../types'

type Filter = 'ALL' | WishlistStatus

const TABS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  ...STATUS_ORDER.map((s) => ({ key: s as Filter, label: STATUS_META[s].label })),
]

export default function Wishlist() {
  const { statusFor } = useStore()
  const [filter, setFilter] = useState<Filter>('ALL')

  const items = WISHLIST_PLACES.filter((p) => {
    const s = statusFor(p.id, 'WANT')
    return filter === 'ALL' || s === filter
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="Wishlist"
        title="Everything you saved"
        sub="Tap a status pill on any card to cycle: Want → In trip → Visited → Skipped."
      />

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors',
              filter === t.key ? 'bg-ink text-paper border-ink' : 'text-ink-soft border-line hover:bg-paper2',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-graywarm">Nothing here yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      )}
    </div>
  )
}

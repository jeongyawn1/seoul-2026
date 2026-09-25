import { Check, Clock, ExternalLink, MapPin, Plus } from 'lucide-react'
import type { Place } from '../types'
import { useStore } from '../lib/store'
import { CATEGORY_LABEL, cn, googleMapsUrl, kakaoMapsUrl, naverMapsUrl } from '../lib/utils'
import { PriorityBadge, StatusPill } from './ui'

function isUnconfirmed(p: Place): boolean {
  const text = [p.lastVerified, p.source, p.signature, p.notes].filter(Boolean).join(' ')
  return text.includes('待确认') || text.includes('not yet verified') || text.includes('出发前确认')
}

export default function PlaceCard({ place, compact }: { place: Place; compact?: boolean }) {
  const { statusFor, cycleStatus, isPlanned, togglePlanned } = useStore()
  const status = statusFor(place.id, place.fromWishlist ? 'WANT' : undefined)
  const planned = isPlanned(place.id)
  const unconfirmed = isUnconfirmed(place)

  return (
    <article className="bg-white border border-line rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-ink leading-tight">{place.name}</h3>
          {place.nameKr ? <p className="text-[13px] text-graywarm mt-0.5">{place.nameKr}</p> : null}
          {place.nameEn && place.nameEn !== place.name ? (
            <p className="text-[12px] text-graywarm/80">{place.nameEn}</p>
          ) : null}
        </div>
        <PriorityBadge priority={place.priority} />
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-graywarm">
        <span className="font-medium text-ink-soft">{CATEGORY_LABEL[place.category]}</span>
        {place.area ? <span>· {place.area}</span> : null}
        {place.priceLevel ? <span>· {place.priceLevel}</span> : null}
        {place.recommendedDuration ? (
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {place.recommendedDuration} 分钟
          </span>
        ) : null}
      </div>

      {place.openingHours ? (
        <p className="text-[12px] text-graywarm">
          <span className="text-ink-soft font-medium">营业时间 </span>
          {place.openingHours}
        </p>
      ) : null}

      {place.signature && place.signature !== '待确认' ? (
        <p className="text-[13px] text-ink-soft">
          <span className="text-graywarm">特色 — </span>
          {place.signature}
        </p>
      ) : null}

      {!compact && place.why ? (
        <p className="text-[13px] text-ink-soft leading-relaxed">{place.why}</p>
      ) : null}

      {!compact && place.notes ? (
        <p className="text-[12px] text-graywarm leading-relaxed border-l-2 border-sand pl-2">{place.notes}</p>
      ) : null}

      {place.conflict ? (
        <p className="text-[12px] text-amber-800 leading-relaxed bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
          ⚠️ {place.conflict}
        </p>
      ) : null}

      <div className="mt-auto pt-2 flex flex-wrap items-center gap-2">
        {place.nearestStation ? (
          <span className="inline-flex items-center gap-1 text-[12px] text-graywarm">
            <MapPin size={13} />
            {place.nearestStation}
          </span>
        ) : null}
        <span className="flex-1" />

        {status ? (
          <button
            type="button"
            onClick={() => cycleStatus(place.id)}
            title="点击切换：想要 → 已安排 → 已打卡 → 跳过"
            className="transition-opacity hover:opacity-80"
          >
            <StatusPill status={status} />
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => togglePlanned(place.id)}
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium border transition-colors',
            planned ? 'bg-seoul text-paper border-seoul' : 'text-ink-soft border-line hover:bg-paper2',
          )}
        >
          {planned ? <Check size={13} /> : <Plus size={13} />}
          {planned ? '已加入行程' : '加入行程'}
        </button>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-line text-[11px] text-graywarm">
        <a
          href={googleMapsUrl(place.nameKr ?? place.name)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-ink-soft"
        >
          <ExternalLink size={11} />
          Google Maps
        </a>
        <a href={naverMapsUrl(place.nameKr ?? place.name)} target="_blank" rel="noreferrer" className="hover:text-ink-soft">
          Naver
        </a>
        <a href={kakaoMapsUrl(place.nameKr ?? place.name)} target="_blank" rel="noreferrer" className="hover:text-ink-soft">
          Kakao
        </a>
        {unconfirmed ? <span className="ml-auto text-amber-700">⚠️ 待确认</span> : null}
      </div>

      {place.source ? (
        <p className="text-[11px] text-graywarm -mt-2">来源：{place.source}</p>
      ) : null}
    </article>
  )
}

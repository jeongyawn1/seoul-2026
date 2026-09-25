import { AREA_RECS } from '../data/recommendations'
import { DISCOVER_PLACES, PLACES_BY_ID } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import { SectionHeading } from '../components/ui'

export default function Discover() {
  const areas = [...new Set(DISCOVER_PLACES.map((p) => p.area))]
  const recAreas = Object.keys(AREA_RECS)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="推荐"
        title="首尔生活 · 避开游客路线"
        sub="市场、仓库咖啡、隐藏天台——补充进来的本地生活打卡点。营业时间为示意，出发前请确认。"
      />

      <section className="mb-8 bg-paper2 border border-line rounded-2xl p-5">
        <h3 className="font-serif text-lg font-semibold text-ink mb-1">🚶 附近推荐 · 按区域聚类</h3>
        <p className="text-[13px] text-graywarm">
          同一区域的地点步行串联（约 500m 内），减少跨城折返。「稍远」表示约 1km 内，可取舍。
        </p>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recAreas.map((area) => (
            <div key={area} className="bg-white border border-line rounded-xl p-3">
              <p className="font-semibold text-ink">{area}</p>
              <ul className="mt-1.5 space-y-1">
                {AREA_RECS[area].map((r) => {
                  const p = PLACES_BY_ID[r.placeId]
                  return p ? (
                    <li key={r.placeId} className="text-[12px] text-ink-soft flex justify-between gap-2">
                      <span className="truncate">{p.name}</span>
                      <span className="text-graywarm shrink-0">
                        {r.distance === 'within' ? '步行可达' : '稍远'}
                      </span>
                    </li>
                  ) : null
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

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

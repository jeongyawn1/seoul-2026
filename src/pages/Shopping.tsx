import { PLACES, PLACES_BY_ID } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import Checklist from '../components/Checklist'
import { SectionHeading } from '../components/ui'
import { CATEGORY_LABEL } from '../lib/utils'
import type { Category } from '../types'

const SHOP_CATS: Category[] = ['shopping', 'fragrance', 'beauty', 'jewelry', 'lifestyle', 'vintage']

const SHOP_CHECKLIST_IDS = [
  'gentle-monster',
  'alo',
  'olive-young',
  'juuneedu',
  'loe',
  'le-labo-citron',
  'sw19',
  'hanna543',
]

export default function Shopping() {
  const checklist = SHOP_CHECKLIST_IDS.map((id) => PLACES_BY_ID[id]).filter(Boolean)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="购物"
        title="带什么回家"
        sub="时尚、香水、美妆、首饰——按品类分组，方便规划逛店路线。"
      />

      <div className="mb-8">
        <Checklist items={checklist} emoji="🛍" title="购物清单" verb="购买" />
      </div>

      {SHOP_CATS.map((cat) => {
        const items = PLACES.filter((p) => p.category === cat)
        if (items.length === 0) return null
        return (
          <section key={cat} className="mb-8">
            <h3 className="text-[12px] uppercase tracking-widest2 text-graywarm mb-3">{CATEGORY_LABEL[cat]}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

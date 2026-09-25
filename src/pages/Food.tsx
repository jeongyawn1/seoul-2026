import { PLACES, PLACES_BY_ID } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import Checklist from '../components/Checklist'
import { SectionHeading } from '../components/ui'
import { CATEGORY_LABEL } from '../lib/utils'
import type { Category } from '../types'

const FOOD_CATS: Category[] = ['food', 'cafe', 'dessert', 'bakery', 'bar']

const FOOD_CHECKLIST_IDS = [
  'han-river-ramen',
  'sinchon-gamjatang',
  'western-food',
  'mcdonalds-korea',
  'auntie-annes',
  'milky-butter',
  'suho-restaurant',
]

export default function Food() {
  const checklist = FOOD_CHECKLIST_IDS.map((id) => PLACES_BY_ID[id]).filter(Boolean)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="美食"
        title="吃遍首尔"
        sub="想吃的清单 + 本地发现的餐厅咖啡，一站式记录「已吃」进度。"
      />

      <div className="mb-8">
        <Checklist items={checklist} emoji="🍜" title="美食清单" verb="吃" />
      </div>

      {FOOD_CATS.map((cat) => {
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

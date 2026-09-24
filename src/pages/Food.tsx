import { PLACES } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import { SectionHeading } from '../components/ui'
import { CATEGORY_LABEL } from '../lib/utils'
import type { Category } from '../types'

const FOOD_CATS: Category[] = ['food', 'cafe', 'dessert', 'bakery', 'bar']

export default function Food() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="Food & drink"
        title="Eat your way through Seoul"
        sub="Wishlist favorites plus a few local finds — everything edible and drinkable in one place."
      />

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

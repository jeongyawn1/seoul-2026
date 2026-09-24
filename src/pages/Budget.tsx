import {
  SHOPPING_BUDGET,
  TRAVEL_BUDGET,
  formatKRW,
  grandTotal,
  shoppingTotal,
  travelTotal,
} from '../data/budget'
import type { BudgetLine } from '../data/budget'
import { SectionHeading } from '../components/ui'

function BudgetBlock({
  title,
  subtitle,
  items,
  total,
}: {
  title: string
  subtitle: string
  items: BudgetLine[]
  total: number
}) {
  return (
    <section className="bg-white border border-line rounded-2xl p-5 sm:p-6">
      <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
      <p className="text-sm text-graywarm mb-4">{subtitle}</p>
      <ul className="divide-y divide-line">
        {items.map((l) => (
          <li key={l.id} className="py-2.5 flex items-baseline gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{l.label}</p>
              {l.note ? <p className="text-[12px] text-graywarm">{l.note}</p> : null}
            </div>
            <span className="text-sm text-ink-soft tabular-nums">{formatKRW(l.amountKRW)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between pt-4 mt-2 border-t border-line">
        <span className="text-sm font-semibold text-ink">Subtotal</span>
        <span className="font-semibold text-ink tabular-nums">{formatKRW(total)}</span>
      </div>
    </section>
  )
}

export default function Budget() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="Budget"
        title="Two budgets, kept separate"
        sub="Travel (the trip itself) vs. shopping & beauty (discretionary). Estimates only — no payment or account data is stored here."
      />

      <div className="grid md:grid-cols-2 gap-4">
        <BudgetBlock
          title="Travel"
          subtitle="Transport, food, tickets, entry"
          items={TRAVEL_BUDGET}
          total={travelTotal()}
        />
        <BudgetBlock
          title="Shopping & beauty"
          subtitle="Fashion, fragrance, beauty, gifts"
          items={SHOPPING_BUDGET}
          total={shoppingTotal()}
        />
      </div>

      <div className="mt-6 bg-ink text-paper rounded-2xl p-5 sm:p-6 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-paper/60">Estimated total</p>
          <p className="text-sm text-paper/70 mt-1">
            Travel + shopping, before flights & hotel are filled in.
          </p>
        </div>
        <span className="font-serif text-3xl font-semibold tabular-nums">{formatKRW(grandTotal())}</span>
      </div>
    </div>
  )
}

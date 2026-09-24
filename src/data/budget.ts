// ---------------------------------------------------------------------------
// Budget — two separate tracks (per the spec):
//   · TRAVEL  — the trip itself (transport, food, tickets, entry).
//   · SHOPPING — discretionary spending (beauty, fashion, fragrance, gifts).
// Everything here is an ESTIMATE for planning, not a record. No real card /
// account / payment data is stored anywhere in this project.
// ---------------------------------------------------------------------------

export type BudgetCategory = 'transport' | 'food' | 'tickets' | 'entry' | 'misc'

export interface BudgetLine {
  id: string
  label: string
  labelKr?: string
  category: BudgetCategory
  amountKRW: number
  note?: string
}

export const TRAVEL_BUDGET: BudgetLine[] = [
  { id: 'tb-flight', label: 'Flights', category: 'transport', amountKRW: 0, note: 'To fill in — round trip' },
  { id: 'tb-hotel', label: 'Hotel (4 nights)', category: 'misc', amountKRW: 0, note: 'To fill in' },
  { id: 'tb-transit', label: 'T-money + subway / bus', category: 'transport', amountKRW: 60000, note: '~₩12,000/day × 5' },
  { id: 'tb-food', label: 'Food & coffee', category: 'food', amountKRW: 300000, note: '~₩60,000/day incl. Haemok' },
  { id: 'tb-touch-five', label: 'Touch Five ticket', category: 'tickets', amountKRW: 0, note: 'To fill in' },
  { id: 'tb-exo', label: 'EXO concert ticket', category: 'tickets', amountKRW: 0, note: 'To fill in' },
  { id: 'tb-wildwild', label: 'WILD WILD ticket', category: 'tickets', amountKRW: 0, note: 'To fill in' },
  { id: 'tb-tower', label: 'N Seoul Tower observatory', category: 'entry', amountKRW: 30000, note: 'Optional cable car' },
]

export const SHOPPING_BUDGET: BudgetLine[] = [
  { id: 'sb-fragrance', label: 'Fragrance (Le Labo / Loewe / SW19)', category: 'misc', amountKRW: 300000, note: 'Le Labo is the big one' },
  { id: 'sb-fashion', label: 'Fashion (ALO / Juuneedu / Ader)', category: 'misc', amountKRW: 300000, note: 'Set aside for ALO sets' },
  { id: 'sb-beauty', label: 'Beauty (Olive Young / clinic)', category: 'misc', amountKRW: 150000, note: 'Clinic optional, book ahead' },
  { id: 'sb-accessories', label: 'Accessories (GM / HANNA)', category: 'misc', amountKRW: 200000, note: 'Gentle Monster frames' },
  { id: 'sb-souvenirs', label: 'Souvenirs & snacks (Milky / Auntie’s)', category: 'misc', amountKRW: 80000, note: 'Butter Sand for gifts' },
]

export const CURRENCY = '₩'

export function travelTotal(): number {
  return TRAVEL_BUDGET.reduce((s, l) => s + l.amountKRW, 0)
}

export function shoppingTotal(): number {
  return SHOPPING_BUDGET.reduce((s, l) => s + l.amountKRW, 0)
}

export function grandTotal(): number {
  return travelTotal() + shoppingTotal()
}

export function formatKRW(n: number): string {
  if (n === 0) return '—'
  return '₩' + n.toLocaleString('en-US')
}

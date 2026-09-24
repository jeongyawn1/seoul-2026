export const TRIP = {
  title: 'SEOUL',
  dateRange: '07—11 NOVEMBER 2026',
  tagline: 'EXO / FOOD / SHOPPING / COFFEE / SEOUL LIFE',
  destination: 'Seoul, South Korea',
  startISO: '2026-11-07',
  endISO: '2026-11-11',
  days: 5,
  nights: 4,
}

export const DATE_LABELS = [
  { day: 1, date: '2026-11-07', label: '07 NOV', weekday: 'Saturday' },
  { day: 2, date: '2026-11-08', label: '08 NOV', weekday: 'Sunday' },
  { day: 3, date: '2026-11-09', label: '09 NOV', weekday: 'Monday' },
  { day: 4, date: '2026-11-10', label: '10 NOV', weekday: 'Tuesday' },
  { day: 5, date: '2026-11-11', label: '11 NOV', weekday: 'Wednesday' },
] as const

export function dateLabel(day: number): string {
  const d = DATE_LABELS.find((x) => x.day === day)
  return d ? `${d.label} · ${d.weekday}` : ''
}

export const TRIP = {
  title: '首尔',
  titleEn: 'SEOUL',
  dateRange: '2026.11.07 — 11.11',
  tagline: 'EXO 首尔安可 · 购物 · 美食 · 咖啡 · 香水 · 首尔生活',
  destination: '韩国 · 首尔',
  startISO: '2026-11-07',
  endISO: '2026-11-11',
  days: 5,
  nights: 4,
  fixedEvents: 3,
}

export const DATE_LABELS = [
  { day: 1, date: '2026-11-07', label: '11/07', weekday: '周六' },
  { day: 2, date: '2026-11-08', label: '11/08', weekday: '周日' },
  { day: 3, date: '2026-11-09', label: '11/09', weekday: '周一' },
  { day: 4, date: '2026-11-10', label: '11/10', weekday: '周二' },
  { day: 5, date: '2026-11-11', label: '11/11', weekday: '周三' },
] as const

export function dateLabel(day: number): string {
  const d = DATE_LABELS.find((x) => x.day === day)
  return d ? `${d.label} · ${d.weekday}` : ''
}

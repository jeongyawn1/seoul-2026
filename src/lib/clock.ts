import { TRIP } from '../data/trip'

export type TimeBucket = 'morning' | 'midday' | 'afternoon' | 'evening' | 'late'

export function timeBucket(date: Date): TimeBucket {
  const h = date.getHours()
  if (h < 11) return 'morning'
  if (h < 14) return 'midday'
  if (h < 18) return 'afternoon'
  if (h < 22) return 'evening'
  return 'late'
}

const DAY_MS = 24 * 60 * 60 * 1000

export function startOfTrip(): Date {
  return new Date(`${TRIP.startISO}T00:00:00`)
}

export function endOfTrip(): Date {
  return new Date(`${TRIP.endISO}T23:59:59`)
}

export function isBeforeTrip(date: Date): boolean {
  return date.getTime() < startOfTrip().getTime()
}

export function isAfterTrip(date: Date): boolean {
  return date.getTime() > endOfTrip().getTime()
}

/** 1..days while inside the trip window, otherwise null. */
export function tripDayIndex(date: Date): number | null {
  const t = date.getTime()
  if (t < startOfTrip().getTime() || t > endOfTrip().getTime()) return null
  return Math.floor((t - startOfTrip().getTime()) / DAY_MS) + 1
}

export function daysUntilTrip(date: Date): number {
  return Math.ceil((startOfTrip().getTime() - date.getTime()) / DAY_MS)
}

export const BUCKET_LABEL: Record<TimeBucket, string> = {
  morning: 'Morning',
  midday: 'Lunch',
  afternoon: 'Afternoon',
  evening: 'Evening',
  late: 'Late night',
}
